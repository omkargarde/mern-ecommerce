import {
  Button,
  Card,
  Col,
  Form,
  Image,
  ListGroup,
  Row,
} from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { useGetOrderDetailsQuery } from "../slices/orderApiSlice";
const OrderScreen = () => {
  const { id: orderId } = useParams();
  const {
    data: order,
    refetch,
    isLoading,
    error,
  } = useGetOrderDetailsQuery(orderId);
  if (error) {
    return (
      <Message variant="danger">{error?.data?.message || error.error}</Message>
    );
  }
  if (isLoading) {
    return <Loader />;
  }

  return (
    <>
      <h1>Order {order._id}</h1>
    </>
  );
};

export default OrderScreen;
