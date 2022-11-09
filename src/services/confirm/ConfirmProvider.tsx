import * as React from 'react';
import { Dispatch, SetStateAction, useState } from 'react';
import ConfirmTemplate from '@/components/Templates/ConfirmTemplate';
import { Modal } from '@mui/material';

interface TButton {
  name?: string
  onClick?: (val?: string) => void
}

export interface IOptionsConfirm {
  message?: string
  buttons?: {
    confirm?: TButton
    cancel?: TButton
  }
}

interface IConfirmContextProvider {
  options: IOptionsConfirm
  showConfirm: boolean
  updateShowConfirm: Dispatch<SetStateAction<boolean>>
  updateOptions: Dispatch<SetStateAction<IOptionsConfirm>>
}

interface IProps {
  children: React.ReactNode
}

const ConfirmContext = React.createContext<IConfirmContextProvider | null>(null);

export const useContextConfirm = () => React.useContext(ConfirmContext);

const ConfirmProvider: React.FC<IProps> = ({ children }: IProps): JSX.Element => {
  const [showConfirm, updateShowConfirm] = useState(false);

  const [options, updateOptions] = useState<IOptionsConfirm>({
    message: 'Хотите подтвердить?',
    buttons: {
      confirm: {
        name: 'Подтвердить',
        onClick: () => updateShowConfirm(false)
      },
      cancel: {
        name: 'Отменить',
        onClick: () => updateShowConfirm(false)
      }
    }
  });

  const changeOptions: Dispatch<SetStateAction<IOptionsConfirm>> = (newOptions: IOptionsConfirm) => {
    const changedOptions: IOptionsConfirm = {
      ...options,
      ...newOptions
    };

    if (!changedOptions.buttons?.cancel) {
      changedOptions.buttons.cancel = options.buttons.cancel;
    }

    updateOptions(changedOptions);
  };

  return (
    <ConfirmContext.Provider
      value={{
        options,
        showConfirm,
        updateOptions: changeOptions,
        updateShowConfirm
      }}
    >
      { children }
       <Modal
         open={showConfirm}
         onClose={() => updateShowConfirm(false)}
       >
         <ConfirmTemplate
           onClose={() => updateShowConfirm(false)}
           { ...options }
         />
       </Modal>
    </ConfirmContext.Provider>
  );
};

export default ConfirmProvider;
