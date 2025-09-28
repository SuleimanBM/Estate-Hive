import { Router } from 'express';
import { registerHandler, loginHandler, refreshHandler, logoutHandler } from '../controllers/auth.controller';
import { validateBody } from '../middleware/validate.middleware';
import { registerSchema } from '../validators/auth/register';
import { loginSchema } from '../validators/auth/login';
import { refreshSchema } from '../validators/auth/refresh';
const router = Router();
router.post('/register', validateBody(registerSchema), registerHandler);
router.post('/login', validateBody(loginSchema), loginHandler);
router.post('/refresh', validateBody(refreshSchema), refreshHandler);
router.post('/logout', validateBody(refreshSchema), logoutHandler);
export default router;
//# sourceMappingURL=auth.route.js.map