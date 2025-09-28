import cloudinary from "./cloudinary.js";
// Function to upload an image to Cloudinary
export const uploadImage = async (filePath, publicId) => {
    try {
        const result = await cloudinary.uploader.upload(filePath, {
            public_id: publicId,
            resource_type: 'image',
            folder: 'images'
        });
        console.log(`Uploaded ${publicId || 'image'}: ${result.secure_url}`);
        return result.secure_url;
    }
    catch (error) {
        console.error(`Error uploading ${publicId || 'image'}: `, error);
        throw error;
    }
};
//# sourceMappingURL=uploadImage.js.map