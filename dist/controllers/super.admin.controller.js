import Admin from "../src/models/admin.model.js";
import User from "../src/models/user.model.js";
import landModel from "../src/models/land.model.js";
import buildingModel from "../src/models/building.model.js";
import transactionModel from "../src/models/transaction.model.js";
import superAdmin from "../src/models/super.admin.model.js";
export const createSuperAdmin = async (req, res) => {
    const { name, email, password } = req.body;
    try {
        const existingAdmin = await superAdmin.findOne({ email });
        if (existingAdmin) {
            return res.status(400).json({
                success: false,
                message: "Admin already exists"
            });
        }
        const newsuperAdmin = new superAdmin({ name, email, password });
        const newAdminWithoutPassword = { ...newsuperAdmin.toObject(), password: undefined };
        await newsuperAdmin.save();
        return res.status(201).json({
            success: true,
            message: "Admin created successfully",
            data: newAdminWithoutPassword
        });
    }
    catch (error) {
        console.error("Error creating admin:", error);
        return res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
};
export const getAllAdmins = async (req, res) => {
    try {
        const admins = await Admin.find().select("-password");
        if (admins.length === 0) {
            return res.status(404).json({
                success: false,
                message: "No admins found"
            });
        }
        res.status(200).json({
            success: true,
            data: admins
        });
    }
    catch (error) {
        console.error("Error fetching admins:", error);
        res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
};
export const getAllUsers = async (req, res) => {
    try {
        const users = await User.find().select("-password");
        if (users.length === 0) {
            return res.status(404).json({
                success: false,
                message: "No users found"
            });
        }
        res.status(200).json({
            success: true,
            data: users
        });
    }
    catch (error) {
        console.error("Error fetching users:", error);
        res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
};
export const getAllLands = async (req, res) => {
    try {
        const allLands = await landModel.find().populate("owner", "name email");
        if (allLands.length === 0) {
            return res.status(404).json({
                success: false,
                message: "No lands found"
            });
        }
        res.status(200).json({
            success: true,
            data: allLands
        });
    }
    catch (error) {
        console.error("Error fetching lands:", error);
        res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
};
export const getAllBuildings = async (req, res) => {
    try {
        const allBuildings = await buildingModel.find().populate("owner", "name email");
        if (allBuildings.length === 0) {
            return res.status(404).json({
                success: false,
                message: "No buildings found"
            });
        }
        return res.status(200).json({
            success: true,
            data: allBuildings
        });
    }
    catch (error) {
        console.error("Error fetching buildings:", error);
        res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
};
export const getAllTransactions = async (req, res) => {
    try {
        const allTransactions = await transactionModel.find()
            .populate("buyer", "name email")
            .populate("propertyOwner", "name email")
            .populate("property", "location type price");
        if (allTransactions.length === 0) {
            return res.status(404).json({
                success: false,
                message: "No transactions found"
            });
        }
        res.status(200).json({
            success: true,
            data: allTransactions
        });
    }
    catch (error) {
        console.error("Error fetching transactions:", error);
        res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
};
//# sourceMappingURL=super.admin.controller.js.map