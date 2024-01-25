import { CustomFC } from "../../@types";
import Layout from "../../components/core/Layout";
import ProfileLayout from "../../components/profile/ProfileLayout";

const Orders: CustomFC = () => {
  return (
    <Layout>
      <ProfileLayout>
        <h1>Orders</h1>
      </ProfileLayout>
    </Layout>
  );
};

Orders.restrictVisibility = "private";

export default Orders;
