import { z } from 'zod';

const formAnswerSchema = z
  .object({
    questionId: z.number(),
    type: z.enum([
      'SHORT_ANSWER',
      'PARAGRAPH',
      'MULTIPLE_CHOICE',
      'CHECKBOX',
      'DROPDOWN',
    ]),
    isRequired: z.boolean(),
    answerText: z.string().optional(),
    selectedOption: z.array(z.union([z.string(), z.number()])).optional(),
  })
  .refine(
    (data) => {
      if (!data.isRequired) return true;
      if (['SHORT_ANSWER', 'PARAGRAPH'].includes(data.type)) {
        return !!(data.answerText && data.answerText.trim().length > 0);
      } else {
        return (
          Array.isArray(data.selectedOption) && data.selectedOption.length > 0
        );
      }
    },
    {
      message: '필수 설문은 반드시 응답해야 합니다.',
      path: ['isRequired'],
    }
  );

export const formResponseSchema = z.object({
  formId: z.number(),
  formAnswers: z.array(formAnswerSchema),
});
