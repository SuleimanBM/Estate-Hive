import { z } from 'zod';
export declare const refreshSchema: z.ZodObject<{
    refreshToken: z.ZodString;
}, "strip", z.ZodTypeAny, {
    refreshToken: string;
}, {
    refreshToken: string;
}>;
export type RefreshInput = z.infer<typeof refreshSchema>;
//# sourceMappingURL=refresh.d.ts.map