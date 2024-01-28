import { useState } from "react";
import {
  Button,
  Card,
  Col,
  Form,
  Image,
  ListGroup,
  Row,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import Loader from "../components/Loader";
import Message from "../components/Message";
import Rating from "../components/Rating";
import { addToCart } from "../slices/cartSlice";
import {
	useCreateReviewMutation,
	useGetProductsDetailsQuery,
} from "../slices/productApiSlice";
const ProductScreen = () => {
  const { id: productId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [qty, setQty] = useState(1);
  const [rating, setRating] = useState(0);
		const [comment, setComment] = useState("");
  const {
			data: product,
			isLoading,
			isError,
			refetch,
		} = useGetProductsDetailsQuery(productId);
  const [createReview, { isLoading: isReviewLoading }] =
			useCreateReviewMutation();
		const { userInfo } = useSelector((state) => state.auth);
  const addToCartHandler = () => {
			dispatch(addToCart({ ...product, qty }));
			navigate("/cart");
		};
  if (isError) {
    return (
      <Message variant="danger">
        {isError?.data?.message || isError.error}
      </Message>
    );
  }
  if (isLoading) {
			return <Loader />;
		}
		if (isReviewLoading) {
			return <Loader />;
		}
  return (
			<>
				<Link className="btn btn-light my-3" to="/">
					Go Back
				</Link>
				<Row>
					{" "}
					<Col md={5}>
						<Image src={product.image} alt={product.name} fluid />
					</Col>
					<Col md={4}>
						<ListGroup variant="flush">
							<ListGroup.Item>
								<h3>{product.name}</h3>
							</ListGroup.Item>
							<ListGroup.Item>
								<Rating
									value={product.rating}
									text={`${product.numReviews} reviews`}
								/>
							</ListGroup.Item>
							<ListGroup.Item>Price: ${product.price}</ListGroup.Item>
							<ListGroup.Item>
								Description: {product.description}
							</ListGroup.Item>
						</ListGroup>
					</Col>
					<Col md={3}>
						<Card>
							<ListGroup variant="flush">
								<ListGroup.Item>
									<Row>
										<Col>Price:</Col>
										<Col>
											<strong>${product.price}</strong>
										</Col>
									</Row>
								</ListGroup.Item>
								<ListGroup.Item>
									<Row>
										<Col>Status:</Col>
										<Col>
											<strong>
												$
												{product.countInStock > 0 ? "In Stock" : "Out of Stock"}
											</strong>
										</Col>
									</Row>
								</ListGroup.Item>
								{product.countInStock > 0 && (
									<ListGroup.Item>
										<Row>
											<Col>Qty</Col>
											<Col>
												<Form.Control
													as="select"
													value={qty}
													onChange={(e) => setQty(e.target.value)}
												>
													{[...Array(product.countInStock).keys()].map((x) => (
														<option key={x + 1} value={x + 1}>
															{x + 1}
														</option>
													))}
												</Form.Control>
											</Col>
										</Row>
									</ListGroup.Item>
								)}
								<ListGroup.Item>
									<Button
										className="btn-block"
										type="button"
										disabled={product.countInStock === 0}
										onClick={addToCartHandler}
									>
										Add to Cart
									</Button>
								</ListGroup.Item>
							</ListGroup>
						</Card>
					</Col>
				</Row>
				<Row className="review">
					<Col md={6}>
						<h2>Reviews</h2>
						{product.reviews.length === 0 && <Message>No Reviews</Message>}
						<ListGroup variant="flush">
							{product.reviews.map((review) => (
								<ListGroup.Item key={review._id}>
									<strong>{review.name}</strong>
									<Rating value={review.rating} />
									<p>{review.createdAt.substring(0, 10)}</p>
									<p>{review.comment}</p>
								</ListGroup.Item>
							))}
							<ListGroup.Item>
								<h2>Write a Customer Review</h2>
								{isReviewLoading && <Loader />}
								{userInfo ? (
									<Form>
										<Form.Group
											controlId="rating"
											className="my-2"
										></Form.Group>
									</Form>
								) : (
									<h1>asd</h1>
								)}
							</ListGroup.Item>
						</ListGroup>
					</Col>
				</Row>
			</>
		);
};
export default ProductScreen;
