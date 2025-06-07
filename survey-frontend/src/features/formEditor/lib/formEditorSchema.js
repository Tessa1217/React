import { z } from 'zod';

const optionSchema = z.object({
  id: z.number().optional(),
  optionText: z.string().trim().min(1, '옵션 내용은 필수값입니다.'),
  optionOrder: z.number().optional(),
});

const questionSchema = z
  .object({
    id: z.number().optional(),
    questionText: z.string().trim().min(1, '질문 제목은 필수값입니다.'),
    type: z.enum([
      'SHORT_ANSWER',
      'PARAGRAPH',
      'MULTIPLE_CHOICE',
      'CHECKBOX',
      'DROPDOWN',
    ]),
    isRequired: z.boolean(),
    questionOrder: z.number().optional(),
    options: z.array(optionSchema).optional().or(z.literal(null)),
  })
  .superRefine((data, ctx) => {
    if (
      ['MULTIPLE_CHOICE', 'CHECKBOX', 'DROPDOWN'].includes(data.type) &&
      (!data.options || data.options.length == 0)
    ) {
      ctx.addIssue({
        path: ['options'],
        code: z.ZodIssueCode.custom,
        message: '옵션을 1개 이상 추가해주세요.',
      });
    }
  });

export const formSchema = z.object({
  title: z.string().trim().min(1, '설문 제목은 필수값입니다.'),
  description: z.string().optional(),
  isPublic: z.boolean(),
  requiresLogin: z.boolean(),
  expiresAt: z
    .string()
    .optional()
    .refine(
      (val) => {
        if (!val) return true;
        const date = new Date(val);
        return !isNaN(date.getTime()) && date >= new Date();
      },
      { message: '만료일은 오늘 이후여야 합니다.' }
    ),
  questionList: z.array(questionSchema).min(1, '질문은 1개 이상 추가해주세요.'),
});
