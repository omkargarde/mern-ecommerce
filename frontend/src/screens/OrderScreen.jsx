import { PayPalButtons, usePayPalScriptReducer } from "@paypal/react-paypal-js";
import { useEffect } from "react";
import { Button, Card, Col, Image, ListGroup, Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import Loader from "../components/Loader";
import Message from "../components/Message";
import {
	useDeliverOrderMutation,
	useGetOrderDetailsQuery,
	useGetPayPalClientIdQuery,
	usePayOrderMutation,
} from "../slices/orderApiSlice";
const OrderScreen = () => {
	const { id: orderId } = useParams();
	const {
		data: order,
		refetch,
		isLoading,
		error,
	} = useGetOrderDetailsQuery(orderId);

	const [payOrder, { isLoading: loadingPay }] = usePayOrderMutation();
	const [deliverOrder, { isLoading: loadingDeliver }] =
		useDeliverOrderMutation();
	const [{ isPending }, paypalDispatch] = usePayPalScriptReducer();
	const {
		data: paypal,
		isLoading: loadingPayPal,
		error: errorPayPal,
	} = useGetPayPalClientIdQuery();
	const { userInfo } = useSelector((state) => state.auth);
	useEffect(() => {
		if (!errorPayPal && !loadingPayPal && paypal.clientId) {
			const loadingPayPalScript = async () => {
				paypalDispatch({
					type: "resetOptions",
					value: {
						"client-id": paypal.clientId,
						currency: "USD",
					},
				});
				paypalDispatch({ type: "setLoadingStatus", value: "pending" });
			};
			if (order && !order.isPaid) {
				if (!window.paypal) {
					loadingPayPalScript();
				}
			}
		}
	}, [errorPayPal, loadingPayPal, order, paypal, paypalDispatch]);

	function onApprove(data, actions) {
		// details come from paypal
		return actions.order.capture().then(async (details) => {
			try {
				await payOrder({ orderId, details });
				refetch();
				toast.success("Payment successful");
			} catch (error) {
				toast.error(error?.data?.message || error?.error);
			}
		});
	}
	function onError(error) {
		toast.error(error?.data?.message || error?.error);
	}
	function createOrder(data, actions) {
		return actions.order
			.create({
				purchase_units: [
					{
						amount: {
							value: order.totalPrice,
						},
					},
				],
			})
			.then((orderId) => {
				return orderId;
			});
	}
	const deliverOrderHandler = async () => {
		try {
			await deliverOrder(orderId);
			refetch();
			toast.success("Order is delivered");
		} catch (error) {
			toast.error(error.data?.message || error?.message);
		}
	};
	if (error) {
		return (
			<Message variant="danger">{error?.data?.message || error?.error}</Message>
		);
	}
	if (isLoading) {
		return <Loader />;
	}
	console.log(order.orderItems);
	return (
		<>
			<h1>Order {order._id}</h1>
			<Row>
				<Col md={8}>
					<ListGroup variant="flush">
						<ListGroup.Item>
							<h2>Shipping</h2>
							<p>
								<strong>Name: </strong>
								{order.user.name}
							</p>
							<p>
								<strong>Email: </strong>
								{order.user.email}
							</p>
							<p>
								<strong>Address: </strong>
								{order.shippingAddress.address}, {order.shippingAddress.city}{" "}
								{order.shippingAddress.postalCode},{" "}
								{order.shippingAddress.country}
							</p>
							{order.isDelivered ? (
								<Message variant="success">
									Delivered on {order.deliveredAt}
								</Message>
							) : (
								<Message variant="danger">Not Delivered</Message>
							)}
						</ListGroup.Item>
						<ListGroup.Item>
							<h2>Payment method</h2>
							<p>
								<strong>Method: </strong>
								{order.paymentMethod}
							</p>
							{order.isPaid ? (
								<Message variant="success">Paid on {order.paidAt}</Message>
							) : (
								<Message variant="danger">Not Paid</Message>
							)}
						</ListGroup.Item>
						<ListGroup.Item>
							<h2>Order items</h2>
							{order.orderItems.map((item) => (
								<ListGroup.Item key={item.product}>
									<Row>
										<Col md={1}>
											<Image src={item.image} alt={item.name} fluid rounded />
										</Col>
										<Col>
											<Link to={`/product/${item.product}`}>{item.name}</Link>
										</Col>
										<Col md={4}>
											{item.qty} x ${item.price} = ${item.qty * item.price}
										</Col>
									</Row>
								</ListGroup.Item>
							))}
						</ListGroup.Item>
					</ListGroup>
				</Col>
				<Col md={4}>
					<Card>
						<ListGroup variant="flush">
							<ListGroup.Item>
								<h2>Order summary</h2>
							</ListGroup.Item>
							<ListGroup.Item>
								<Row>
									<Col>Items</Col>
									<Col>${order.itemsPrice}</Col>
								</Row>
								<Row>
									<Col>Shipping</Col>
									<Col>${order.shippingPrice}</Col>
								</Row>
								<Row>
									<Col>Tax</Col>
									<Col>${order.taxPrice}</Col>
								</Row>
								<Row>
									<Col>Total</Col>
									<Col>${order.totalPrice}</Col>
								</Row>
							</ListGroup.Item>
							{!order.isPaid && (
								<ListGroup.Item>
									{loadingPay && <Loader />}
									{isPending ? (
										<Loader />
									) : (
										<div>
											<div>
												<PayPalButtons
													createOrder={createOrder}
													onApprove={onApprove}
													onError={onError}
												/>
											</div>
										</div>
									)}
								</ListGroup.Item>
							)}
							{loadingDeliver && <Loader />}
							{userInfo?.isAdmin && order.isPaid && !order.isDelivered && (
								<ListGroup.Item>
									<Button
										type="button"
										className="btn btn-block"
										onClick={deliverOrderHandler}
									>
										Mark as delivered
									</Button>
								</ListGroup.Item>
							)}
						</ListGroup>
					</Card>
				</Col>
			</Row>
		</>
	);
};

export default OrderScreen;
