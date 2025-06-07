import { memo } from 'react';
import FormMetaRenderer from '@/entities/form/ui/FormMetaRenderer';
import QuestionCardRenderer from '@/entities/question/ui/QuestionCardRenderer';
import ButtonList from '@/shared/ui/common/ButtonList';
import ButtonSave from '@/shared/ui/common/ButtonSave';

const FormTake = memo(
  ({
    form,
    questions,
    formAnswers,
    onAnswerTextChange,
    onSelectedOptionChange,
    onSelectedOptionsChange,
    onSave,
    onCancel,
    isSaving,
  }) => {
    return (
      <div className='max-w-4xl mx-auto p-6 space-y-6'>
        <FormMetaRenderer {...form} />
        {questions &&
          questions.length > 0 &&
          questions.map((question) => {
            return (
              <QuestionCardRenderer
                key={question.id}
                {...question}
                {...formAnswers.get(question.id)}
                onAnswerTextChange={onAnswerTextChange}
                onSelectedOptionChange={onSelectedOptionChange}
                onSelectedOptionsChange={onSelectedOptionsChange}
              />
            );
          })}
        <div className='flex w-full max-w-3xl mx-auto justify-end gap-3'>
          <ButtonSave
            onSaveButtonClick={onSave}
            size={20}
            isPending={isSaving}
          />
          <ButtonList onListButtonClick={onCancel} size={20} />
        </div>
      </div>
    );
  }
);

export default FormTake;
