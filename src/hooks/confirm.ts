import { IOptionsConfirm, useContextConfirm } from '@/services/confirm/ConfirmProvider';

export const useConfirm = () => {
  const { updateOptions, updateShowConfirm } = useContextConfirm();

  return (options?: IOptionsConfirm) => {
    updateOptions(options);
    updateShowConfirm(true);
  };
};
