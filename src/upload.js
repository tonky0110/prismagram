import multer from 'multer';

const upload = multer({ dest: 'upload/' });
export const uploadMiddleware = upload.single('file');

export const uploadController = (req, res) => {
	const { file: { path } } = req;
	console.log('path: ', path);
	res.json({ path });
};
