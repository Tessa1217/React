import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { changeValue } from '@/entities/form/model/form.slice';
import {
  addQuestion,
  removeQuestion,
  changeQuestionText,
  changeRequired,
  addOption,
  removeOption,
  changeOption,
} from '@/entities/question/model/question.slice';
import {
  selectCurrentForm,
  selectQuestions,
} from '@/features/formEditor/model/formEditor.selectors';
import { saveFormRequest } from '@/features/formEditor/model/formEditor.slice';
import { HiCheckCircle } from 'react-icons/hi';
import FormMetaEditor from '@/entities/form/ui/FormMetaEditor';
import EditableQuestionCard from '@/entities/question/ui/EditableQuestionCard';
import QuestionTypeSelector from '@/entities/question/ui/QuestionTypeSelector';

const FormEditorContainer = () => {
  const form = useSelector(selectCurrentForm);
  const questions = useSelector(selectQuestions);
  const [type, setType] = useState('multiple_choice');

  const dispatch = useDispatch();

  const handleChange = (id, value) => {
    dispatch(changeValue({ id, value }));
  };

  const handleTypeChange = (type) => {
    setType(type);
  };

  const handleAddQuestion = () => {
    dispatch(addQuestion(type));
  };

  const handleSaveForm = () => {
    const formData = {
      ...form,
      questionList: questions,
    };
    dispatch(saveFormRequest(formData));
  };

  return (
    <div className='max-w-4xl mx-auto p-6 space-y-6'>
      <FormMetaEditor {...form} onChange={handleChange} />
      <QuestionTypeSelector
        type={type}
        onChange={handleTypeChange}
        onAddQuestion={handleAddQuestion}
      />
      {questions.length > 0 &&
        questions.map((question) => (
          <EditableQuestionCard
            key={question.id}
            {...question}
            onRemoveQuestion={() => dispatch(removeQuestion(question.id))}
            handleQuestionTextChange={(questionText) =>
              dispatch(changeQuestionText({ id: question.id, questionText }))
            }
            handleRequiredChange={(required) =>
              dispatch(changeRequired({ id: question.id, required }))
            }
            handleOptionChange={(optionId, optionText) =>
              dispatch(changeOption({ id: question.id, optionId, optionText }))
            }
            onAddOption={() => dispatch(addOption(question.id))}
            onRemoveOption={(optionId) =>
              dispatch(removeOption({ id: question.id, optionId }))
            }
          />
        ))}
      <div className='flex space-y-6 w-full max-w-3xl mx-auto justify-end-safe'>
        <button
          className='flex items-center gap-1 bg-blue-500 hover:bg-blue-600 text-white px-3 py-2 rounded-lg transition cursor-pointer'
          onClick={() => handleSaveForm()}
        >
          저장 <HiCheckCircle />
        </button>
      </div>
    </div>
  );
};

export default FormEditorContainer;
