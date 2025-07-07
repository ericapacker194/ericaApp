import React, {
  ReactElement,
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { TransactionType } from '@ericaapp/transaction-controller';
import { useDispatch } from 'react-redux';

import { setAccountDetailsAddress } from '../../../../store/actions';
import useCurrentConfirmation from '../../hooks/useCurrentConfirmation';
import syncConfirmPath from '../../hooks/syncConfirmPath';
import { Confirmation } from '../../types/confirm';

type ConfirmContextType = {
  currentConfirmation: Confirmation;
  isScrollToBottomCompleted: boolean;
  setIsScrollToBottomCompleted: React.Dispatch<React.SetStateAction<boolean>>;
};

const ConfirmContext = createContext<ConfirmContextType | undefined>(undefined);

const ConfirmContextProvider: React.FC<{ children: ReactElement }> = ({ children }) => {
  const [isScrollToBottomCompleted, setIsScrollToBottomCompleted] = useState(true);
  const { currentConfirmation } = useCurrentConfirmation();
  
  syncConfirmPath(currentConfirmation);

  const dispatch = useDispatch();

  const value = useMemo(
    () => ({
      currentConfirmation,
      isScrollToBottomCompleted,
      setIsScrollToBottomCompleted,
    }),
    [currentConfirmation, isScrollToBottomCompleted],
  );

  useEffect(() => {
    if (
      currentConfirmation &&
      (currentConfirmation.type === TransactionType.revokeDelegation ||
        currentConfirmation.type === TransactionType.batch)
    ) {
      dispatch(setAccountDetailsAddress(''));
    }
  }, [dispatch, currentConfirmation]);

 return <ConfirmContext.Provider value={value}>{children}</ConfirmContext.Provider>;
};

function useConfirmContext<T extends Confirmation = Confirmation>() {
   const context = useContext(ConfirmContext);
   if (!context) throw new Error('useConfirmContext must be used within an ConfirmContextProvider');
   return context as {
     currentConfirmation: T;
     isScrollToBottomCompleted: boolean;
     setIsScrollToBottomCompleted: React.Dispatch<React.SetStateAction<boolean>>;
   };
}

export { ConfirmContextProvider, useConfirmContext };
