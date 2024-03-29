import { Button, Table } from "react-bootstrap";
import { FaCheck, FaEdit, FaTimes, FaTrash } from "react-icons/fa";
import { LinkContainer } from "react-router-bootstrap";
import { toast } from "react-toastify";
import Loader from "../../components/Loader";
import Message from "../../components/Message";
import {
	useDeleteUserMutation,
	useGetUsersQuery,
} from "../../slices/usersApiSlice";
const UserListScreen = () => {
	const { data: users, refetch, isLoading, error } = useGetUsersQuery();
	const [deleteUser, { isLoading: loadingDelete }] = useDeleteUserMutation();
	const deleteHandler = async (id) => {
		if (window.confirm("Are you sure you want to delete this user?")) {
			try {
				await deleteUser(id);
				toast.success("User deleted successfully");
				refetch();
			} catch (error) {
				toast.error(error?.data?.message || error?.error);
			}
		}
	};
	if (error) {
		return (
			<Message variant="danger">{error?.data?.message || error?.error}</Message>
		);
	}
	if (isLoading) {
		return <Loader />;
	}
	if (loadingDelete) {
		return <Loader />;
	}
	return (
		<>
			<h1>Users</h1>
			<Table striped bordered hover responsive className="table-sm">
				<thead>
					<tr>
						<th>ID</th>
						<th>NAME</th>
						<th>EMAIL</th>
						<th>ADMIN</th>
						<th />
					</tr>
				</thead>
				<tbody>
					{users.map((user) => (
						<tr key={user._id}>
							<td>{user._id}</td>
							<td>{user.name}</td>
							<td>
								<a href={`mailto:${user.email}`}>{user.email}</a>
							</td>
							<td>
								{user.isAdmin ? (
									<FaCheck style={{ color: "green" }} />
								) : (
									<FaTimes style={{ color: "red" }} />
								)}
							</td>
							<td>
								<LinkContainer to={`/admin/userlist/${user._id}/edit`}>
									<Button variant="light" className="btn-sm">
										<FaEdit />
									</Button>
								</LinkContainer>
								<Button
									variant="danger"
									className="btn-sm"
									onClick={() => deleteHandler(user._id)}
								>
									<FaTrash style={{ color: "white" }} />
								</Button>
							</td>
						</tr>
					))}
				</tbody>
			</Table>
		</>
	);
};
export default UserListScreen;
