import PropTypes from "prop-types";
import { Pagination } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

/**
 * Paginate function to generate pagination component based on the number of pages,
 * current page, and isAdmin and keyword status.
 *
 * @param {object} pages - the total number of pages
 * @param {number} page - the current page number
 * @param {boolean} isAdmin - optional, indicates if the user is an admin
 * @param {string} keyword - optional, the search keyword
 * @return {JSX.Element} Pagination component based on the given parameters
 */
const Paginate = ({ pages, page, isAdmin = false, keyword = "" }) => {
	const generatePath = (isAdmin, keyword, pageNumber) => {
		if (isAdmin) {
			return `/admin/productlist/${pageNumber}`;
		}
		if (keyword) {
			return `/search/${keyword}/page/${pageNumber}`;
		}
		return `/page/${pageNumber}`;
	};
	return pages > 1 ? (
		<Pagination>
			{[...Array(pages).keys()].map((pageNumber) => (
				<LinkContainer
					key={pageNumber + 1}
					to={generatePath(isAdmin, keyword, pageNumber + 1)}
				>
					<Pagination.Item active={pageNumber + 1 === page}>
						{pageNumber + 1}
					</Pagination.Item>
				</LinkContainer>
			))}
		</Pagination>
	) : null;
};
Paginate.propTypes = {
	pages: PropTypes.number.isRequired,
	page: PropTypes.number.isRequired,
	isAdmin: PropTypes.bool,
	keyword: PropTypes.string,
};
export default Paginate;
