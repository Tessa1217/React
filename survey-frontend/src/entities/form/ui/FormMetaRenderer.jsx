import { memo } from 'react';
import { useMode } from '@/shared/contexts/FormModeContext';
import { MODE_FORM_COMPONENT_MAP } from '@/entities/form/ui/formComponentMap';

const FormMetaRenderer = memo((props) => {
  const { mode } = useMode();
  const Component =
    MODE_FORM_COMPONENT_MAP[mode] || MODE_FORM_COMPONENT_MAP['view'];
  return <Component {...props} />;
});

export default FormMetaRenderer;
