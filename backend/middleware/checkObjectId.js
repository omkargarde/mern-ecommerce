import { isValidObjectId } from "mongoose";

const checkObjectId = (req, res, next) => {
	if (!isValidObjectId(req.params.id)) {
		return res.status(400).send("Invalid Object ID");
	}
	next();
};
export default checkObjectId;
