import PropTypes from "prop-types";
import { Pagination } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

/**
 * Paginate function
 * @param {Object} param0
 * @param {number} param0.pages - Total number of pages
 * @param {number} param0.page - Current page number
 * @param {boolean} [param0.isAdmin=false] - Flag to indicate if user is admin
 * @returns {JSX.Element|null} - Pagination component or null if there's only 1 page
 */
const Paginate = ({ pages, page, isAdmin = false }) => {
	return pages > 1 ? (
		<Pagination>
			{Array.from({ length: pages }, (_, index) => index + 1).map((x) => (
				<LinkContainer
					key={x}
					to={!isAdmin ? `/page/${x}` : `/admin/productlist/${x}`}
				>
					<Pagination.Item active={x === page}>{x}</Pagination.Item>
				</LinkContainer>
			))}
		</Pagination>
	) : null;
};
Paginate.propTypes = {
	pages: PropTypes.number.isRequired,
	page: PropTypes.number.isRequired,
	isAdmin: PropTypes.bool,
};
export default Paginate;
