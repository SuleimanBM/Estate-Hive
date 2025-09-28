import landModel from "../src/models/land.model.js";
import buildingModel from "../src/models/building.model.js";
import mongoose from "mongoose";
import { upload_using_multer } from "../src/utils/multer/multer.upload.js";
import { uploadImage } from "../src/utils/cloudinary/uploadImage.js";
export const createLand = async (req, res) => {
    try {
        const newLand = new landModel(req.body);
        const existingLand = await landModel.findOne({ location: newLand.location });
        if (existingLand) {
            return res.status(400).json({
                message: "Land with this location already exists",
                success: false
            });
        }
        await newLand.save();
        res.status(201).json(newLand);
    }
    catch (error) {
        res.status(500).json({ message: "Error creating land", error });
    }
};
export const createBuilding = async (req, res) => {
    try {
        const existingBuilding = await buildingModel.findOne({ "location.address": req.body.location.address });
        if (existingBuilding) {
            return res.status(400).json({
                message: "Building with this location already exists",
                success: false
            });
        }
        const newBuilding = new buildingModel(req.body);
        await newBuilding.save();
        res.status(201).json(newBuilding);
    }
    catch (error) {
        res.status(500).json({ message: "Error creating building", error });
    }
};
export const getAllLands = async (req, res) => {
    try {
        const allLands = await landModel.find().populate("owner", "name email");
        res.status(200).json({
            data: allLands
        });
    }
    catch (error) {
        res.status(500).json({ message: "Error fetching lands", error });
    }
};
export const getAllBuildings = async (req, res) => {
    try {
        const allBuildings = await buildingModel.find().populate("owner", "name email");
        res.status(200).json({
            data: allBuildings
        });
    }
    catch (error) {
        res.status(500).json({ message: "Error fetching buildings", error });
    }
};
export const editLandById = async (req, res) => {
    const { id } = req.params;
    const { updatedData } = req.body;
    try {
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                message: "Invalid land ID",
                success: false
            });
        }
        const land = await landModel.findById(id);
        if (!land) {
            return res.status(404).json({
                message: "Land not found",
                success: false
            });
        }
        if (!updatedData || typeof updatedData !== 'object' || Object.keys(updatedData).length === 0) {
            return res.status(400).json({
                message: "Invalid data provided for update",
                success: false
            });
        }
        const updatedLand = await landModel.findByIdAndUpdate(id, { $set: updatedData }, { new: true, runValidators: true, select: '-__v' });
        if (!updatedLand) {
            return res.status(404).json({
                message: "Land not found",
                success: false
            });
        }
        res.status(200).json({
            message: "Land updated successfully",
            data: updatedLand,
            success: true
        });
    }
    catch (error) {
        return res.status(500).json({
            message: "Error updating land",
            error,
            success: false
        });
    }
};
export const editBuildingById = async (req, res) => {
    const { id } = req.params;
    const { updatedData } = req.body;
    try {
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                message: "Invalid building ID",
                success: false
            });
        }
        const building = await buildingModel.findById(id);
        if (!building) {
            return res.status(404).json({
                message: "Building not found",
                success: false
            });
        }
        if (!updatedData || typeof updatedData !== 'object' || Object.keys(updatedData).length === 0) {
            return res.status(400).json({
                message: "Invalid data provided for update",
                success: false
            });
        }
        const updatedBuilding = await buildingModel.findByIdAndUpdate(id, { $set: updatedData }, { new: true, runValidators: true, select: '-__v' });
        if (!updatedBuilding) {
            return res.status(404).json({
                message: "Building not found",
                success: false
            });
        }
        res.status(200).json({
            message: "Building updated successfully",
            data: updatedBuilding,
            success: true
        });
    }
    catch (error) {
        return res.status(500).json({
            message: "Error updating building",
            error,
            success: false
        });
    }
};
export const deleteLandById = async (req, res) => {
    const { id } = req.params;
    try {
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                message: "Invalid land ID",
                success: false
            });
        }
        const deletedLand = await landModel.findByIdAndDelete(id);
        if (!deletedLand) {
            return res.status(404).json({
                message: "Land not found",
                success: false
            });
        }
        res.status(200).json({
            message: "Land deleted successfully",
            success: true
        });
    }
    catch (error) {
        return res.status(500).json({
            message: "Error deleting land",
            error,
            success: false
        });
    }
};
export const deleteBuildingById = async (req, res) => {
    const { id } = req.params;
    try {
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                message: "Invalid building ID",
                success: false
            });
        }
        const deletedBuilding = await buildingModel.findByIdAndDelete(id);
        if (!deletedBuilding) {
            return res.status(404).json({
                message: "Building not found",
                success: false
            });
        }
        res.status(200).json({
            message: "Building deleted successfully",
            success: true
        });
    }
    catch (error) {
        return res.status(500).json({
            message: "Error deleting building",
            error,
            success: false
        });
    }
};
export const uploadLandImage = async (req, res) => {
    upload_using_multer(req, res, async (err) => {
        if (err) {
            return res.status(400).json({
                message: "Error uploading image",
                error: err.message,
                success: false
            });
        }
        try {
            if (!req.file) {
                return res.status(400).json({
                    message: "No file uploaded",
                    success: false
                });
            }
            const imagePath = req.file.path;
            const uploadedImage = await uploadImage(imagePath);
            res.status(200).json({
                message: "Image uploaded successfully",
                data: uploadedImage,
                success: true
            });
        }
        catch (error) {
            res.status(500).json({
                message: "Error uploading image to cloud",
                error,
                success: false
            });
        }
    });
};
//# sourceMappingURL=property.controller.js.map