import { Router, Express } from "express";
import adminRoutes from "./admin.route.js";
import authRoutes from "./auth.route.js";
// Import other routes as needed
// import superAdminRoutes from "./super.admin.routes.js";
// import propertyRoutes from "./property.route.js";
// import paystackRoutes from "./paystack.routes.js";

const router = Router();

function routes(app: Express) {
    app.use('/api/auth', authRoutes);
   // app.use('/api/user',);
    // app.use('/api/super-admin', superAdminRoutes);
    // app.use('/api/properties', propertyRoutes);
    // app.use('/api/paystack', paystackRoutes);
}

export default routes;