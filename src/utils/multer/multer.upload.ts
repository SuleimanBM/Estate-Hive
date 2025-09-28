import { uploadImage } from "../cloudinary/uploadImage.js";
import path from "path";
import multer, { FileFilterCallback, DiskStorageOptions } from "multer";
import { Request } from "express";

type DestinationCallback = (error: Error | null, destination: string) => void;
type FileNameCallback = (error: Error | null, filename: string) => void;

// Supported file types
const SUPPORTED_IMAGE_TYPES = ['image/jpeg', 'image/jpg', 'image/png', 'image/svg+xml'];
const SUPPORTED_EXTENSIONS = ['.jpeg', '.jpg', '.png', '.svg'];

const storage = multer.diskStorage({
    destination: (req: Request, file: Express.Multer.File, cb: DestinationCallback) => {
        cb(null, 'utils/multer/multerImages');
    },
    filename: (req: Request, file: Express.Multer.File, cb: FileNameCallback) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        const fileExtension = path.extname(file.originalname);
        cb(null, `image-${uniqueSuffix}${fileExtension}`);
    }
});

const fileFilter = (req: Request, file: Express.Multer.File, cb: FileFilterCallback) => {
    const fileExtension = path.extname(file.originalname).toLowerCase();

    // Check both MIME type and file extension
    const isValidMimeType = SUPPORTED_IMAGE_TYPES.includes(file.mimetype);
    const isValidExtension = SUPPORTED_EXTENSIONS.includes(fileExtension);

    if (isValidMimeType && isValidExtension) {
        cb(null, true);
    } else {
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