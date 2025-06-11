import FormResponseContainer from '@/features/formResponse/container/FormResponseContainer';
import { FormModeProvider } from '@/shared/contexts/FormModeContext';
const ResponseDetailPage = () => {
  return (
    <FormModeProvider initialMode='view'>
      <FormResponseContainer />
    </FormModeProvider>
  );
};
export default ResponseDetailPage;
