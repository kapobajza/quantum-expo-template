import { useModal } from '@/components/Modal/context';
import { ModalStackParams } from '@/components/Modal/types';

export const useAlert = () => {
  const { showModal, hideModal } = useModal();

  return {
    showAlert: (args: ModalStackParams['Alert']) => {
      showModal('Alert', {
        args,
        options: {
          backdropProps: {
            disabled: args.type === 'prompt',
          },
        },
      });
    },
    hideAlert: () => {
      hideModal('Alert');
    },
  };
};
