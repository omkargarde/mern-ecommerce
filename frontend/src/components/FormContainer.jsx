import PropTypes from "prop-types";
import { Col, Container, Row } from "react-bootstrap";

const FormContainer = ({ children }) => (
  <Container>
    <Row className="justify-content-md-center">
      <Col xs={12} md={6}>
        {children}
      </Col>
    </Row>
  </Container>
);

FormContainer.propTypes = {
  children: PropTypes.node.isRequired,
};

export default FormContainer;
