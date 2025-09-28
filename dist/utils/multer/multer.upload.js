import path from "path";
import multer from "multer";
// Supported file types
const SUPPORTED_IMAGE_TYPES = ['image/jpeg', 'image/jpg', 'image/png', 'image/svg+xml'];
const SUPPORTED_EXTENSIONS = ['.jpeg', '.jpg', '.png', '.svg'];
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'utils/multer/multerImages');
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        const fileExtension = path.extname(file.originalname);
        cb(null, `image-${uniqueSuffix}${fileExtension}`);
    }
});
const fileFilter = (req, file, cb) => {
    const fileExtension = path.extname(file.originalname).toLowerCase();
    // Check both MIME type and file extension
    const isValidMimeType = SUPPORTED_IMAGE_TYPES.includes(file.mimetype);
    const isValidExtension = SUPPORTED_EXTENSIONS.includes(fileExtension);
    if (isValidMimeType && isValidExtension) {
        cb(null, true);
    }
    else {
        cb(new Error(`Only ${SUPPORTED_EXTENSIONS.join(', ')} formats are allowed`));
    }
};
export const upload_using_multer = multer({
    storage: storage,
    limits: {
        fileSize: 5 * 1024 * 1024, // 5MB limit
        files: 1 // Limit to 1 file
    },
    fileFilter: fileFilter
}).single('image');
// Export the supported types for use elsewhere
// export const supportedImageTypes = {
//     mimeTypes: SUPPORTED_IMAGE_TYPES,
//     extensions: SUPPORTED_EXTENSIONS
// };
//# sourceMappingURL=multer.upload.js.map