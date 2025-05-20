import FormEditorContainer from '@/features/formEditor/ui/FormEditorContainer';
import { FormModeProvider } from '@/shared/contexts/FormModeContext';

const FormEditorPage = () => {
  return (
    <FormModeProvider>
      <FormEditorContainer />
    </FormModeProvider>
  );
};

export default FormEditorPage;
