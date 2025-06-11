import FormEditorContainer from '@/features/formEditor/container/FormEditorContainer';
import { FormModeProvider } from '@/shared/contexts/FormModeContext';

const FormEditorPage = () => {
  return (
    <FormModeProvider initialMode='edit'>
      <FormEditorContainer />
    </FormModeProvider>
  );
};

export default FormEditorPage;
