import ModalBackground from '@/shared/ui/common/ModalBackground';
import DefaultModal from '@/shared/ui/common/DefaultModal';
const ModalDialog = ({ modal, onDimmerClick }) => {
  const { id, type } = modal;
  if (!id) return null;

  switch (type) {
    case 'confirm':
    case 'alert': {
      const { id, onSuccess, onClose } = modal;
      return (
        <ModalBackground id={id} onDimmerClick={onDimmerClick}>
          <DefaultModal
            {...modal}
            onSuccess={() => onSuccess?.()}
            onClose={onClose}
          />
        </ModalBackground>
      );
    }
    case 'custom': {
      const { id, customModal } = modal;
      return (
        <ModalBackground id={id} onDimmerClick={onDimmerClick}>
          {customModal}
        </ModalBackground>
      );
    }
    default: {
      return null;
    }
  }
};

export default ModalDialog;
