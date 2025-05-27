import { memo } from 'react';
import { useMode } from '@/shared/contexts/FormModeContext';
import FormMetaEditor from '@/entities/form/ui/edit/FormMetaEditor';
import FormMetaView from '@/entities/form/ui/view/FormMetaView';

const FormMetaRenderer = memo((props) => {
  const { mode } = useMode();
  if (mode === 'edit') {
    return <FormMetaEditor {...props} />;
  }
  return <FormMetaView {...props} />;
});

export default FormMetaRenderer;
