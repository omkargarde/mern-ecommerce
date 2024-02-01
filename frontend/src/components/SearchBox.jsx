import { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
const SearchBox = () => {
	const navigate = useNavigate();
	const { keyword: useKeyword } = useParams();
	const [keyword, setKeyword] = useState(useKeyword || "");
	return (
		<Form onSubmit={submitHandler} className="d-flex">
			<Form.Control
				type="text"
				name="q"
				onChange={(e) => setKeyword(e.target.value)}
				placeholder="Search Products..."
				className="mr-sm-2 ml-sm-5"
			/>
			<Button type="submit" variant="outline-success" className="p-2"></Button>
		</Form>
	);
};
export default SearchBox;
