import FormViewContainer from '@/features/formViewer/ui/FormViewContainer';
import { FormModeProvider } from '@/shared/contexts/FormModeContext';
const ResponseSubmitPage = () => {
  return (
    <FormModeProvider initialMode='view'>
      <FormViewContainer />
    </FormModeProvider>
  );
};
export default ResponseSubmitPage;
