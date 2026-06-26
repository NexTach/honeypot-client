import { z } from 'zod';

export const gifReportSchema = z.object({
  reasonTitle: z
    .string()
    .trim()
    .min(1, '신고 사유를 입력해주세요')
    .max(50, '50자 이내로 입력해주세요'),
  detail: z
    .string()
    .trim()
    .min(1, '신고 내용을 입력해주세요')
    .max(500, '500자 이내로 입력해주세요'),
});

export type GifReportFormValues = z.infer<typeof gifReportSchema>;
