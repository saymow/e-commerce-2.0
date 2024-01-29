import { LocalShipping } from "@styled-icons/material-outlined";
import { useRouter } from "next/router";
import React, { FormEvent, useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import MaskedInput from "react-text-mask";
import { toast } from "react-toastify";
import styled from "styled-components";
import { CartState } from "../../@types/redux";
import { FetchedAddress, GivenAddress } from "../../@types/redux/address";
import {
  CheckoutCreateState,
  FilledCartState,
} from "../../@types/redux/checkout";
import {
  ShipmentCalculatorState,
  SuccessPostalCodeServiceResponse,
} from "../../@types/redux/services";
import {
  addShipmmentDataToCart,
  unlockCart,
  lockCart,
  addAddressDataToCart,
} from "../../actions/cartActions";
import { createCheckout } from "../../actions/checkoutActions";
import { getShipmentMethods } from "../../actions/servicesActions";
import CheckoutLayout from "../../components/checkout/CheckoutLayout";
import Layout from "../../components/core/Layout";
import Button from "../../components/ui/Button";
import useSession from "../../hooks/useSession";
import { reduxStore } from "../../store";
import { priceFormmater } from "../../utils";
import { POSTAL_CODE_MASK } from "../../utils/masks";

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

const Shipment: React.FC = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [userSession, userSessionLoading] = useSession();

  const [postalCode, setPostalCode] = useState("");
  const [shipmentController, setShipmentController] = useState<{
    postalCode?: string;
    methods: SuccessPostalCodeServiceResponse[];
    address?: FetchedAddress;
  }>({ methods: [] });
  
  const {
    services,
    address,
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
    (state) => state.checkoutCreate
  ) as CheckoutCreateState;

  const cartData = useSelector<typeof reduxStore>(
    (state) => state.cart
  ) as CartState;

  useEffect(() => {
    if (cartData.shipmentMethod) {
      setPostalCode(cartData.shipmentMethod.postalCode);
    }
  }, []);



  useEffect(() => {
    if (serviceSuccess && serviceReset) {
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
        address,
      });
      serviceReset();
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
    () => {
      dispatch(unlockCart());
    };
  }, []);

  useEffect(() => {
    if (shipmentCreationSuccess && shipmentCreationReset && checkoutId) {
      router.push(`/checkout/${checkoutId}/address/`);
      dispatch(shipmentCreationReset());
    }
  }, [shipmentCreationSuccess, shipmentCreationReset]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    setShipmentController({ methods: [] });
    dispatch(lockCart());
    dispatch(getShipmentMethods(postalCode));
  };

  const handleSelectMethod = (code: string) => {
    const choosenMethod = shipmentController.methods.find(
      (method) => method.code === code
    ) as SuccessPostalCodeServiceResponse;

    const shipmentMethod = {
      ...choosenMethod,
      selected: undefined,
      postalCode: shipmentController.postalCode as string,
    };

    dispatch(addShipmmentDataToCart(shipmentMethod));
    dispatch(
      addAddressDataToCart(shipmentController.address as FetchedAddress)
    );
  };

  const handleContinueCheckout = () => {
    if (!userSession) return router.push(`/signin?redirect=checkout/shipment`);

    let keys = [
      "products",
      "total",
      "shippingCost",
      "products",
      "shipmentMethod",
      "shipmentAddress",
    ];
    const cartDataKeys = Object.keys(cartData);

    if (!keys.every((key) => cartDataKeys.includes(key))) {
      toast.error("Checkout cart data missing");
    } else dispatch(createCheckout(cartData as FilledCartState));
  };

  const showNextButton = useMemo(() => !!cartData.shipmentMethod, [cartData])

  return (
    <Layout>
      <CheckoutLayout title="shipment method" detailed>
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
                  mask={POSTAL_CODE_MASK}
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
                      selected={service.code === cartData.shipmentMethod?.code}
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
