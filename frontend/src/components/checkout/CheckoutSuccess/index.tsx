import styled from "styled-components";
import { CheckAll } from "@styled-icons/bootstrap/CheckAll";
import Link from "next/link";

const Section = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 2rem 0;

  h1 {
    font-size: 2rem;
  }
`;

const CheckIcon = styled(CheckAll)`
  width: 10rem;
  height: 8rem;
  fill: green;
`;

const CheckoutSuccess: React.FC = () => {
  return (
    <Section>
      <h1>Order placed successfuly</h1>
      <CheckIcon />
      <p>
        Visit <Link href={"/profile/orders"}>my orders</Link> for more
        information.
      </p>
    </Section>
  );
};

export default CheckoutSuccess;
