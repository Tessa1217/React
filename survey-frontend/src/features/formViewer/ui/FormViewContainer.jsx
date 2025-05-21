import { useMode } from '@/shared/contexts/FormModeContext';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchFormRequest } from '@/features/formViewer/model/formViewer.slice';
import {
  selectCurrentForm,
  selectQuestions,
} from '@/features/formViewer/model/formViewer.selectors';
import FormMetaView from '@/entities/form/ui/FormMetaView';
import QuestionCardRenderer from '@/entities/question/ui/QuestionCardRenderer';
const FormViewContainer = () => {
  const navigate = useNavigate();

  const { mode } = useMode();
  const dispatch = useDispatch();

  const { id: formId } = useParams();

  const form = useSelector(selectCurrentForm);
  const questions = useSelector(selectQuestions);

  useEffect(() => {
    dispatch(fetchFormRequest({ param: formId }));
  }, [dispatch, formId]);

  return (
    <div className='max-w-4xl mx-auto p-6 space-y-6'>
      <FormMetaView {...form} />
      {questions &&
        questions.length > 0 &&
        questions.map((question) => (
          <QuestionCardRenderer key={question.id} {...question} />
        ))}
      <div className='flex space-y-6 w-full max-w-3xl mx-auto justify-end-safe gap-2'>
        <button
          className='flex items-center gap-1 bg-blue-500 hover:bg-blue-600 text-white px-3 py-2 rounded-lg transition cursor-pointer'
          onClick={() => navigate('/forms')}
        >
          목록
        </button>
      </div>
    </div>
  );
};

export default FormViewContainer;
