import { Carousel, Image } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useGetTopProductsQuery } from "../slices/productApiSlice";
import Loader from "./Loader";
import Message from "./Message";
const ProductCarousel = () => {
	const { data: products, isLoading, isError } = useGetTopProductsQuery();
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
	return (
		<Carousel pause="hover" className="bg-primary mb-4">
			{products.map((product) => (
				<Carousel.Item key={product._id}>
					<Link to={`/product/${product._id}`}>
						<Image src={product.image} alt={product.name} fluid />
						<Carousel.Item>
							<h1>{product.name}</h1>
						</Carousel.Item>
						<Carousel.Caption className="carousel-caption">
							<h2>
								{product.name} (${product.price})
							</h2>
						</Carousel.Caption>
					</Link>
				</Carousel.Item>
			))}
		</Carousel>
	);
};
export default ProductCarousel;
