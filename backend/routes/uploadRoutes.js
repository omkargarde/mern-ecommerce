import express from "express";
import multer from "multer";
import path from "path";

const router = express.Router();

const storage = multer.diskStorage({
  /**
   * A function to handle the destination for file uploads.
   *
   * @param {Object} req - the request object
   * @param {Object} file - the file object
   * @param {Function} callBack - the callback function
   * @return {String} the destination path for file uploads
   */
  destination(req, file, callBack) {
    callBack(null, "uploads/"); // null for error
  },
  /**
   * Generates a filename using the fieldname and the current date.
   *
   * @param {Object} req - the request object
   * @param {Object} file - the file object
   * @param {Function} callBack - the callback function
   * @return {String} the generated filename
   */
  filename(req, file, callBack) {
    callBack(
      null,
      `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`
    );
  },
});
/**
 * Checks the file type and calls the callback with an error message or true
 *
 * @param {string} file - the file to check
 * @param {function} callBack - the callback function
 * @return {void}
 */
function checkFileType(file, callBack) {
  const filetypes = /jpg|jpeg|png/;
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = filetypes.test(file.mimetype);
  if (mimetype && extname) {
    return callBack(null, true);
  } else {
    callBack("Error: Images Only!");
  }
}

const upload = multer({ storage });

router.post("/", upload.single("image"), (req, res) => {
  res.send({
    message: "Image Uploaded",
    image: `/uploads/${req.file.path}`,
  });
});
export default router;
