import FormResponseContainer from '@/features/formResponse/ui/FormResponseContainer';
import { FormModeProvider } from '@/shared/contexts/FormModeContext';
const ResponseDetailPage = () => {
  return (
    <FormModeProvider initialMode='view'>
      <FormResponseContainer />
    </FormModeProvider>
  );
};
export default ResponseDetailPage;
