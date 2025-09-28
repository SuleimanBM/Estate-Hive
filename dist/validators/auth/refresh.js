import { z } from 'zod';
export const refreshSchema = z.object({
    refreshToken: z.string().min(10),
});
//# sourceMappingURL=refresh.js.map