import { useEffect } from "react";
import { Button, Card, Col, Image, ListGroup, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import CheckoutSteps from "../components/CheckoutSteps";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { clearCartItems } from "../slices/cartSlice";
import { useCreateOrderMutation } from "../slices/orderApiSlice";
const PlaceOrderScreen = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const cart = useSelector((state) => state.cart);
	const [createOrder, { isLoading, error }] = useCreateOrderMutation();
	useEffect(() => {
		if (!cart.shippingAddress.address) {
			navigate("/shipping");
		} else if (!cart.paymentMethod) {
			navigate("/payment");
		}
	}, [cart.paymentMethod, cart.shippingAddress.address, navigate]);
	const placeOrderHandler = async () => {
		console.log("createOrder123", createOrder);

		try {
			const res = await createOrder({
				orderItems: cart.cartItems,
				shippingAddress: cart.shippingAddress,
				paymentMethod: cart.paymentMethod,
				itemsPrice: cart.itemsPrice,
				shippingPrice: cart.shippingPrice,
				taxPrice: cart.taxPrice,
				totalPrice: cart.totalPrice,
			}).unwrap();
			dispatch(clearCartItems());
			navigate(`/order/${res._id}`);
		} catch (error) {
			toast.error(error?.data?.message || error?.error);
		}
	};
	return (
		<>
			<CheckoutSteps step1 step2 step3 step4 />
			<Row>
				<Col md={8}>
					<ListGroup variant="flush">
						<ListGroup.Item>
							<h2>Shipping address</h2>
							<p>
								<strong>Address: </strong>
								{cart.shippingAddress.address}, {cart.shippingAddress.city},{" "}
								{cart.shippingAddress.postalCode},{" "}
								{cart.shippingAddress.country}
							</p>
						</ListGroup.Item>
						<ListGroup.Item>
							<h2>Payment method</h2>
							<strong>Method: </strong>
							{cart.paymentMethod}
						</ListGroup.Item>
						<ListGroup.Item>
							<h2>Order items</h2>
							{cart.cartItems.length === 0 ? (
								<Message>Cart is Empty</Message>
							) : (
								<ListGroup variant="flush">
									{cart.cartItems.map((item) => (
										<ListGroup.Item key={item._id}>
											<Row>
												<Col md={1}>
													<Image
														src={item.image}
														alt={item.name}
														fluid
														rounded
													/>
												</Col>
												<Col>
													<Link to={`/product/${item._id}`}>{item.name}</Link>
												</Col>
												<Col md={4}>
													{item.qty} x ${item.price} = ${item.qty * item.price}
												</Col>
											</Row>
										</ListGroup.Item>
									))}
								</ListGroup>
							)}
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
									<Col>Items:</Col>
									<Col>${cart.itemsPrice}</Col>
								</Row>
							</ListGroup.Item>
							<ListGroup.Item>
								<Row>
									<Col>Shipping:</Col>
									<Col>${cart.shippingPrice}</Col>
								</Row>
							</ListGroup.Item>
							<ListGroup.Item>
								<Row>
									<Col>Tax:</Col>
									<Col>${cart.taxPrice}</Col>
								</Row>
							</ListGroup.Item>
							<ListGroup.Item>
								<Row>
									<Col>Total:</Col>
									<Col>${cart.totalPrice}</Col>
								</Row>
							</ListGroup.Item>

							<ListGroup.Item>
								<ListGroup.Item>
									{error && (
										<Message variant="danger">
											{error?.data?.message || error?.error}
										</Message>
									)}
								</ListGroup.Item>
							</ListGroup.Item>

							<ListGroup.Item>
								<Button
									type="button"
									className="btn-block"
									disabled={cart.cartItems.length === 0}
									onClick={placeOrderHandler}
								>
									Place Order
								</Button>
								{isLoading && <Loader />}
							</ListGroup.Item>
						</ListGroup>
					</Card>
				</Col>
			</Row>
		</>
	);
};
export default PlaceOrderScreen;
