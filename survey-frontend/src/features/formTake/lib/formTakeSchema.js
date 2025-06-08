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
    selectedOption: z
      .array(
        z.object({
          optionId: z.union([z.string(), z.number()]),
          isEtc: z.boolean().default(false),
        })
      )
      .optional(),
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
  )
  .refine(
    (data) => {
      const hasEtc = data.selectedOption?.some((option) => option.isEtc);
      if (hasEtc) {
        return !!(data.answerText && data.answerText.trim().length > 0);
      }
      return true; // 기타 옵션이 없으면 검증 통과
    },
    {
      message: '기타 항목 선택 시 기타 항목에 대한 내용을 작성해주세요.',
      path: ['answerText'],
    }
  );

export const formResponseSchema = z.object({
  formId: z.number(),
  formAnswers: z.array(formAnswerSchema),
});
