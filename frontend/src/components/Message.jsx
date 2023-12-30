import PropTypes from "prop-types";
import { Alert } from "react-bootstrap";

const Message = ({ variant, children }) => {
  return <Alert variant={variant}>{children}</Alert>;
};

Message.propTypes = {
  variant: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

Message.propTypes = {
  variant: PropTypes.string.isRequired,
};

Message.defaultProps = {};

export default Message;
