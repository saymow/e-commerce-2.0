import { useEffect } from "react";
import { CustomFC } from "../../@types";
import Layout from "../../components/core/Layout";
import ProfileLayout from "../../components/profile/ProfileLayout";
import { useDispatch, useSelector, useStore } from "react-redux";
import { listOrders } from "../../actions/ordersActions";
import { reduxStore } from "../../store";
import { ListOrdersState } from "../../@types/redux/orders";
import ProfileOrders from "../../components/profile/ProfileOrders";
import Loading from "../../components/ui/Loading";

const Orders: CustomFC = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(listOrders);
  }, []);

  const { orders, loading } = useSelector<typeof reduxStore>(
    (state) => state.listOrders
  ) as ListOrdersState;

  console.log(orders);

  return (
    <Layout>
      <ProfileLayout>
        {loading ? <Loading /> : <ProfileOrders orders={orders} />}
      </ProfileLayout>
    </Layout>
  );
};

Orders.restrictVisibility = "private";

export default Orders;
