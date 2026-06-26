import { z } from 'zod';

export const gifEditSchema = z.object({
  title: z.string().trim().min(1, '이름을 입력해주세요').max(15, '15자 이내로 입력해주세요'),
  description: z.string().trim().max(200, '200자 이내로 입력해주세요').optional(),
  tagsInput: z.string().optional(),
  isPublic: z.boolean(),
});

export type GifEditFormValues = z.infer<typeof gifEditSchema>;
