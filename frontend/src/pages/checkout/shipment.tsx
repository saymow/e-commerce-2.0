import React, { FormEvent, useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { LocalShipping } from "@styled-icons/material-outlined";
import MaskedInput from "react-text-mask";
import { toast } from "react-toastify";
import styled from "styled-components";
import {
  ShipmentCalculatorState,
  SuccessPostalCodeServiceResponse,
} from "../../@types/redux/services";
import { getShipmentMethods } from "../../actions/servicesActions";
import CheckoutLayout from "../../components/checkout/CheckoutLayout";
import Layout from "../../components/core/Layout";
import Button from "../../components/ui/Button";
import { reduxStore } from "../../store";
import { priceFormmater } from "../../utils";
import useSession from "../../hooks/useSession";
import Link from "../../components/core/Link";
import { useRouter } from "next/router";
import { createShipmentData } from "../../actions/checkoutActions";
import { DefaultState } from "../../@types/redux";
import { ShipmentCreateState } from "../../@types/redux/checkout";

const Container = styled.div``;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Input = styled(MaskedInput)`
  font-size: 2rem;
  padding: 0.5rem 1rem;

  background: var(--bg-Color);
  color: var(--primary-Color);
  outline: 0;
  border: 1px solid var(--light-Grey);

  margin-bottom: 2rem;
`;

const InputContainer = styled.div`
  padding: 1rem;
  border: 1px solid var(--lighter-Grey);
`;

const ResultContainer = styled.article`
  display: flex;
  flex-direction: column;

  margin: 1rem 0;
  padding: 1rem 0.5rem;
  border: 1px solid var(--lighter-Grey);
`;

export const OptionsContainer = styled.div`
  margin: 1rem 0;
  padding: 1rem;
  border: 1px solid var(--lighter-Grey);
`;

const ShipmentMethod = styled.section<{ selected?: boolean }>`
  cursor: pointer;

  display: grid;
  align-items: center;
  grid-template-columns: 1fr 1fr 1.2fr 2fr;

  margin: 0.5rem;
  padding: 0.5rem;
  border: 1px solid
    ${({ selected }) =>
      selected ? "var(--secondary-Color)" : "var(--light-Grey)"};

  svg {
    fill: ${({ selected }) =>
      selected ? "var(--secondary-Color)" : "var(--light-Grey)"};
  }

  p,
  strong {
    color: ${({ selected }) =>
      selected ? "var(--secondary-Color)" : "inherit"};
  }
`;

const TruckIcon = styled(LocalShipping)`
  width: 2rem;
  height: 2rem;

  fill: var(--light-Grey);
`;

interface SuccessPostalCodeServiceResponseOnInterface
  extends SuccessPostalCodeServiceResponse {
  selected?: boolean;
}

const Shipment: React.FC = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [userSession, userSessionLoading] = useSession();

  const [postalCode, setPostalCode] = useState("");
  const [shipmentController, setShipmentController] = useState<{
    postalCode?: string;
    methods: SuccessPostalCodeServiceResponseOnInterface[];
  }>({ methods: [] });
  const [showNextButton, setShowNextButton] = useState(false);

  const {
    services,
    postalCode: servicePostalCode,
    loading: serviceLoading,
    success: serviceSuccess,
    error: serviceError,
    reset: serviceReset,
  } = useSelector<typeof reduxStore>(
    (state) => state.shipmentCalculator
  ) as ShipmentCalculatorState;

  const {
    id: checkoutId,
    loading: shipmentCreationLoading,
    success: shipmentCreationSuccess,
    error: shipmentCreationError,
    reset: shipmentCreationReset,
  } = useSelector<typeof reduxStore>(
    (state) => state.checkoutShipmentCreate
  ) as ShipmentCreateState;

  useEffect(() => {
    if (serviceSuccess) {
      const successfulMethods = [] as SuccessPostalCodeServiceResponse[];

      services.forEach((service) => {
        if (service.error) {
          toast.error(`${service.name}: ${service.error.message}`);
        } else {
          successfulMethods.push(service);
        }
      });

      setShipmentController({
        postalCode: servicePostalCode,
        methods: successfulMethods,
      });
    }
  }, [serviceSuccess]);

  useEffect(() => {
    if (serviceError && serviceReset) {
      toast.error(serviceError.message);
      dispatch(serviceReset());
    }
  }, [serviceError, serviceReset]);

  useEffect(() => {
    if (shipmentCreationError && shipmentCreationReset) {
      toast.error("Error on saving shipment options");
      dispatch(shipmentCreationReset());
    }
  }, [shipmentCreationError, shipmentCreationReset]);

  useEffect(() => {
    if (shipmentCreationSuccess && shipmentCreationReset && checkoutId) {
      router.push(`/checkout/${checkoutId}/address/`);
      dispatch(shipmentCreationReset());
    }
  }, [shipmentCreationSuccess, shipmentCreationReset]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    setShipmentController({ methods: [] });
    setShowNextButton(false);
    dispatch(getShipmentMethods(postalCode));
  };

  const handleSelectMethod = (code: string) => {
    const newMethodsArray = shipmentController.methods.map((service) => ({
      ...service,
      selected: service.code === code,
    }));

    setShowNextButton(true);
    setShipmentController({
      ...shipmentController,
      methods: newMethodsArray,
    });
  };

  const handleContinueCheckout = () => {
    if (!userSession) return router.push("/signin?redirect=checkout/shipment");

    const choosenMethod = shipmentController.methods.find(
      (method) => method.selected
    ) as SuccessPostalCodeServiceResponseOnInterface;

    const shipmentData = {
      ...choosenMethod,
      postalCode: shipmentController.postalCode as string,
    };

    // this will store the data on redis.
    dispatch(createShipmentData(shipmentData));
  };

  return (
    <Layout>
      <CheckoutLayout title="shipment method">
        {!userSessionLoading && (
          <Container>
            <InputContainer>
              <Form onSubmit={handleSubmit}>
                <Input
                  id="postalCode"
                  name="postalCode"
                  placeholder="XXXXX-XXX"
                  pattern="(\d{5})(-{1})(\d{3})"
                  required
                  mask={[/\d/, /\d/, /\d/, /\d/, /\d/, "-", /\d/, /\d/, /\d/]}
                  value={postalCode}
                  onChange={(e: any) => setPostalCode(e.target.value)}
                />
                <Button variant="fill" disabled={serviceLoading}>
                  CHECK POSTAL CODE
                </Button>
              </Form>
            </InputContainer>
            {shipmentController.methods.length !== 0 &&
              shipmentController.postalCode && (
                <ResultContainer>
                  {shipmentController.methods.map((service) => (
                    <ShipmentMethod
                      key={service.code}
                      selected={service.selected}
                      onClick={() => handleSelectMethod(service.code)}
                    >
                      <TruckIcon />
                      <strong>{service.name}</strong>
                      <p>{priceFormmater(service.value)}</p>
                      <p>Deadline: {service.deadline} working days.</p>
                    </ShipmentMethod>
                  ))}
                </ResultContainer>
              )}
            {showNextButton && (
              <OptionsContainer>
                <Button
                  variant="fill"
                  disabled={shipmentCreationLoading}
                  onClick={handleContinueCheckout}
                >
                  CONTINUE CHECKOUT
                </Button>
              </OptionsContainer>
            )}
          </Container>
        )}
      </CheckoutLayout>
    </Layout>
  );
};

export default Shipment;
