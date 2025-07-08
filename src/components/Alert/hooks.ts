import { ModalStackParams, useModal } from '@/components/Modal';

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
