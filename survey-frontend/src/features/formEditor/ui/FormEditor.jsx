import FormMetaRenderer from '@/entities/form/ui/FormMetaRenderer';
import QuestionCardRenderer from '@/entities/question/ui/QuestionCardRenderer';
import FormEditorSidebar from '@/features/formEditor/ui/FormEditorSidebar';
import ButtonSave from '@/shared/ui/common/ButtonSave';
import ButtonCancel from '@/shared/ui/common/ButtonCancel';
const FormEditor = ({
  form,
  onChange,
  onChangeCheckbox,
  questions,
  onAddQuestion,
  onRemoveQuestion,
  onQuestionTextChange,
  onRequiredChange,
  onAddOption,
  onRemoveOption,
  onOptionTextChange,
  onTypeChange,
  onSave,
  onCancel,
  type,
}) => {
  return (
    <div className='relative min-h-screen bg-gray-100 py-12 px-6'>
      <div className='max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-[3fr_1fr] gap-8'>
        {/* 메인 컨텐츠 */}
        <main className='space-y-8'>
          <FormMetaRenderer
            {...form}
            onChange={onChange}
            onChangeCheckbox={onChangeCheckbox}
          />
          <section className='space-y-6'>
            {questions &&
              questions.map((question) => (
                <QuestionCardRenderer
                  key={question.id}
                  {...question}
                  onRemoveQuestion={onRemoveQuestion}
                  handleQuestionTextChange={onQuestionTextChange}
                  handleRequiredChange={onRequiredChange}
                  onAddOption={onAddOption}
                  onRemoveOption={onRemoveOption}
                  handleOptionChange={onOptionTextChange}
                />
              ))}
          </section>
          <section className='flex justify-end gap-3 mt-6 mr-10'>
            <ButtonSave onSaveButtonClick={onSave} size={20} />
            <ButtonCancel onCancelButtonClick={onCancel} size={20} />
          </section>
        </main>
        {/* 사이드바 */}
        <aside className='bg-white shadow-md rounded-xl p-6 h-fit sticky top-12'>
          <FormEditorSidebar
            type={type}
            onChange={onTypeChange}
            onAddQuestion={onAddQuestion}
          />
        </aside>
      </div>
    </div>
  );
};
export default FormEditor;
