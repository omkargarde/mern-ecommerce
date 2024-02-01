import { Col, Row } from "react-bootstrap";
import { useParams } from "react-router-dom";
import Loader from "../components/Loader";
import Message from "../components/Message";
import Paginate from "../components/Paginate";
import Product from "../components/Product";
import { useGetProductsQuery } from "../slices/productApiSlice";
const HomeScreen = () => {
	const { keyword, pageNumber } = useParams();

	const { data, isLoading, isError } = useGetProductsQuery({
		keyword,
		pageNumber,
	});
	let content;
	if (isLoading) {
		content = <Loader />;
	} else if (isError) {
		content = (
			<Message variant="danger">
				{isError?.data?.message || isError.error}
			</Message>
		);
	} else {
		content = (
			<>
				<h1>Latest Products</h1>
				<Row>
					{data.products.map((product) => (
						<Col key={product._id} sm={12} md={6} lg={4} xl={3}>
							<Product product={product} />
						</Col>
					))}
				</Row>
				<Paginate pages={data.pages} page={data.page} keyword={keyword || ""} />
			</>
		);
	}

	return <>{content}</>;
};

export default HomeScreen;
