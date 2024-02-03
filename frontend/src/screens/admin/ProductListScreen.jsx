import { Button, Col, Row, Table } from "react-bootstrap";
import { FaEdit, FaTrash } from "react-icons/fa";
import { LinkContainer } from "react-router-bootstrap";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import Loader from "../../components/Loader";
import Message from "../../components/Message";
import Paginate from "../../components/Paginate";
import {
	useCreateProductMutation,
	useDeleteProductMutation,
	useGetProductsQuery,
} from "../../slices/productApiSlice";
const ProductListScreen = () => {
	const { pageNumber } = useParams();
	const { data, isLoading, error, refetch } = useGetProductsQuery({
		pageNumber,
	});
	const [createProduct, { isLoading: loadingCreate }] =
		useCreateProductMutation();
	const [deleteProduct, { isLoading: loadingDelete }] =
		useDeleteProductMutation();

	/**
	 * Asynchronous function for handling the deletion of a specified item.
	 *
	 * @param {type} id - The identifier of the item to be deleted
	 * @return {type} undefined
	 */
	const deleteHandler = async (id) => {
		if (window.confirm("Are you sure you want to delete this product?")) {
			try {
				await deleteProduct(id).unwrap();
				toast.success("Product deleted successfully");
				refetch();
			} catch (error) {
				toast.error(error?.data?.message || error?.error);
			}
		}
	};

	/**
	 * Asynchronous function for creating a product.
	 */
	const createProductHandler = async () => {
		if (window.confirm("Are you sure you want to create this product?")) {
			try {
				await createProduct().unwrap();
				refetch();
			} catch (error) {
				toast.error(error?.data?.message || error?.error);
			}
		}
	};

	let content;
	if (isLoading) {
		content = <Loader />;
	} else if (error) {
		content = (
			<Message variant="danger">{error?.data?.message || error?.error}</Message>
		);
	} else {
		content = (
			<>
				<Table striped bordered hover responsive className="table-sm">
					<thead>
						<tr>
							<th>ID</th>
							<th>NAME</th>
							<th>PRICE</th>
							<th>CATEGORY</th>
							<th>BRAND</th>
							<th />
						</tr>
					</thead>
					<tbody>
						{data.products.map((product) => (
							<tr key={product._id}>
								<td>{product._id}</td>
								<td>{product.name}</td>
								<td>${product.price}</td>
								<td>{product.category}</td>
								<td>{product.brand}</td>
								<td>
									<LinkContainer to={`/admin/productlist/${product._id}/edit`}>
										<Button variant="light" className="btn-sm mx-2">
											<FaEdit />
										</Button>
									</LinkContainer>
									<Button
										variant="danger"
										className="btn-sm"
										onClick={() => {
											deleteHandler(product._id);
										}}
									>
										<FaTrash />
									</Button>
								</td>
							</tr>
						))}
					</tbody>
				</Table>
				<Paginate pages={data.pages} page={data.page} isAdmin={true} />
			</>
		);
	}

	return (
		<>
			<Row className="align-items-center">
				<Col>
					<h1>Products</h1>
				</Col>
				<Col className="text-end">
					<Button className="btn-sm m-3" onClick={createProductHandler}>
						<FaEdit />
						Create Product
					</Button>
				</Col>
			</Row>
			{loadingCreate && <Loader />}
			{loadingDelete && <Loader />}
			{content}
		</>
	);
};

export default ProductListScreen;
