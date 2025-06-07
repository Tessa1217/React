import { memo } from 'react';
import QuestionMeta from '@/entities/question/ui/shared/QuestionMeta';
import { QUESTION_VIEW_RENDERERS } from '@/entities/question/ui/view/questionViewMap';

const QuestionViewCard = memo(
  ({ id, questionText, isRequired, type, answer = {}, options = [] }) => {
    const { answerText, selectedOption } = answer;
    const ViewComponent = QUESTION_VIEW_RENDERERS[type];
    return (
      <QuestionMeta questionText={questionText} isRequired={isRequired}>
        <ViewComponent
          id={id}
          answerText={answerText}
          selectedOption={
            type == 'CHECKBOX' ? selectedOption : selectedOption?.[0]
          }
          options={options}
        />
      </QuestionMeta>
    );
  }
);

export default QuestionViewCard;
