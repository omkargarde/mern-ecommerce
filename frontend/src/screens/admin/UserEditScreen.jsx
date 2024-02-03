import { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import FormContainer from "../../components/FormContainer";
import Loader from "../../components/Loader";
import Message from "../../components/Message";
import {
	useGetUserDetailsQuery,
	useUpdateUserMutation,
} from "../../slices/usersApiSlice";
const UserEditScreen = () => {
	const { id: userId } = useParams();
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [isAdmin, setIsAdmin] = useState(false);

	const {
		data: user,
		isLoading,
		refetch,
		error,
	} = useGetUserDetailsQuery(userId);
	const [updateUser, { isLoading: isLoadingUpdate }] = useUpdateUserMutation();

	const navigate = useNavigate();

	useEffect(() => {
		if (user) {
			setName(user.name);
			setEmail(user.email);
			setIsAdmin(user.isAdmin);
		}
	}, [user]);
	/**
	 * An asynchronous function that handles form submission.
	 *
	 * @param {Event} e - the event object
	 * @return {type} undefined
	 */
	const submitHandler = async (e) => {
		e.preventDefault();
		try {
			await updateUser({ userId, name, email, isAdmin }).unwrap();
			toast.success("User updated successfully");
			refetch();
			navigate("/admin/userlist");
		} catch (error) {
			toast.error(error?.data?.message || error?.error);
		}
	};
	if (error) {
		return (
			<Message variant="danger">{error?.data?.message || error?.error}</Message>
		);
	}
	if (isLoadingUpdate) {
		return <Loader />;
	}
	if (isLoading) {
		return <Loader />;
	}
	return (
		<>
			<Link to="/admin/userlist" className="btn btn-light my-3">
				Go back
			</Link>
			<FormContainer>
				<h1>Edit User</h1>
				<Form onSubmit={submitHandler}>
					<Form.Group controlId="name">
						<Form.Label>Name</Form.Label>
						<Form.Control
							type="text"
							placeholder="Enter name"
							value={name}
							onChange={(e) => {
								setName(e.target.value);
							}}
						/>
					</Form.Group>
					<Form.Group controlId="email" className="my-2">
						<Form.Label>Email</Form.Label>
						<Form.Control
							type="email"
							placeholder="Enter email"
							value={email}
							onChange={(e) => {
								setEmail(e.target.value);
							}}
						/>
					</Form.Group>
					<Form.Group controlId="isAdmin" className="my-2">
						<Form.Check
							type="checkbox"
							label="Is Admin"
							checked={isAdmin}
							onChange={(e) => setIsAdmin(e.target.checked)}
						/>
					</Form.Group>
					<Button type="submit" variant="primary" className="my-2">
						Update
					</Button>
				</Form>
			</FormContainer>
		</>
	);
};
export default UserEditScreen;
