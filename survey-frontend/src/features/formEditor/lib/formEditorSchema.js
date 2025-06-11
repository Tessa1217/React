import { z } from 'zod';

/**
 * 보기(option) 스키마 정의
 */
const optionSchema = z.object({
  id: z.number().optional(),
  optionText: z.string().trim().min(1, '옵션 내용은 필수값입니다.'),
  isEtc: z.boolean().default(false),
  optionOrder: z.number().optional(),
});

/**
 * 질문(question) 스키마 정의
 */
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
    // MULTIPLE_CHOICE, CHECKBOX, DROPDOWN 타입은 옵션이 1개 이상 필요
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

/**
 * 설문(form) 전체 스키마 정의
 */
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
