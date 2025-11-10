import authRoutes from "./auth.route.js";
import propertyRoutes from "./property.route.js";
import applicationRoutes from "./application.routes.js";
import superAdminRoutes from "./super.admin.routes.js";
// import paystackRoutes from "./paystack.routes.js";
import { requireAuth, requireRole } from "../middleware/auth.middleware";
function routes(app) {
    app.use('/api/auth', authRoutes);
    app.use('/api/properties', propertyRoutes);
    app.use('/api/application', requireAuth, applicationRoutes);
    app.use('/api/super-admin', requireAuth, requireRole("SUPERADMIN"), superAdminRoutes);
    // app.use('/api/paystack', paystackRoutes);
}
export default routes;
//# sourceMappingURL=index.js.map