import FormTakeContainer from '@/features/formTake/container/FormTakeContainer';
import { FormModeProvider } from '@/shared/contexts/FormModeContext';
const ResponseSubmitPage = () => {
  return (
    <FormModeProvider initialMode='take'>
      <FormTakeContainer />
    </FormModeProvider>
  );
};
export default ResponseSubmitPage;
