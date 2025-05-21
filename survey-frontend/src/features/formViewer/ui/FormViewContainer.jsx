import { useNavigate, useParams } from 'react-router-dom';
import { useCallback, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchFormRequest, resetForm } from '@/entities/form/model/form.slice';
import { resetQuestions } from '@/entities/question/model/question.slice';
import { selectForm } from '@/entities/form/model/form.selectors';
import { selectQuestions } from '@/entities/question/model/question.selectors';
import FormMetaRenderer from '@/entities/form/ui/FormMetaRenderer';
import QuestionCardRenderer from '@/entities/question/ui/QuestionCardRenderer';
const FormViewContainer = () => {
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const { id: formId } = useParams();

  const form = useSelector(selectForm);
  const questions = useSelector(selectQuestions);

  useEffect(() => {
    dispatch(fetchFormRequest({ formId }));
  }, [dispatch, formId]);

  const handleCancel = useCallback(() => {
    dispatch(resetForm());
    dispatch(resetQuestions());
    navigate('/forms');
  }, [dispatch, navigate]);

  return (
    <div className='max-w-4xl mx-auto p-6 space-y-6'>
      <FormMetaRenderer {...form} />
      {questions &&
        questions.length > 0 &&
        questions.map((question) => (
          <QuestionCardRenderer key={question.id} {...question} />
        ))}
      <div className='flex space-y-6 w-full max-w-3xl mx-auto justify-end-safe gap-2'>
        <button
          className='flex items-center gap-1 bg-blue-500 hover:bg-blue-600 text-white px-3 py-2 rounded-lg transition cursor-pointer'
          onClick={() => handleCancel()}
        >
          목록
        </button>
      </div>
    </div>
  );
};

export default FormViewContainer;
