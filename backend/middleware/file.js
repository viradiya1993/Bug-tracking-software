const multer = require("multer");

const MIME_TYPE_MAP = {
    'image/png': 'png',
    'image/jpeg': 'jpg',
    'image/jpg': 'jpg'
}

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        // console.log(req, file);
        const isValid = MIME_TYPE_MAP[file.mimetype];
        let error = new Error("Invalid Image MIME type");
        if (isValid) {
            error = null;
        }
        cb(error, "backend/images");
    },
    filename: (req, file, cb) => {
        console.log(file);
        const name = req.body.bug_title.toLocaleLowerCase().split(' ').join('-');
        // const name = file.originalname.toLocaleLowerCase().split(' ').join('-');
        const ext = MIME_TYPE_MAP[file.mimetype];
        cb(null, name + "-" + Date.now() + "." + ext);
    }
});

module.exports = multer({ storage: storage }).single("image");