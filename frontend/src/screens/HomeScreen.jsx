import { Col, Row } from "react-bootstrap";
import Loader from "../components/Loader";
import Message from "../components/Message";
import Product from "../components/Product";
import { useGetProductsQuery } from "../slices/productApiSlice";
const HomeScreen = () => {
  const { data: products, isLoading, isError } = useGetProductsQuery();
  console.log(products);
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
          {products.map((product) => (
            <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
              <Product product={product} />
            </Col>
          ))}
        </Row>
      </>
    );
  }

  return <>{content}</>;
};

export default HomeScreen;
