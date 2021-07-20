const multer = require("multer");
const fs = require("fs")

// const MIME_TYPE_MAP = {
// 	'image/png': 'png',
// 	'image/jpeg': 'jpg',
// 	'image/jpg': 'jpg'
// }

const storage = multer.diskStorage({
	destination: (req, file, cb) => {
		// const isValid = MIME_TYPE_MAP[file.mimetype];
		// let error = new Error("Invalid Image MIME type");
		// if (isValid) {
		// 		error = null;
		// }
		let error = null;
		var dir = 'backend/images';
		if (!fs.existsSync(dir)){
			fs.mkdirSync(dir);
		}
		cb(error, "backend/images") 
	},
	filename: function (req, file, callback) {
		callback(null, `${Date.now()}_${file.originalname}`)
	},
});

module.exports = multer({ storage: storage }).array("image");