import FormViewContainer from '@/features/formViewer/container/FormViewContainer';
import { FormModeProvider } from '@/shared/contexts/FormModeContext';
const FormDetailPage = () => {
  return (
    <FormModeProvider initialMode='view'>
      <FormViewContainer />
    </FormModeProvider>
  );
};

export default FormDetailPage;
