import { useContext } from 'react';
import { ApplicationsContext } from '../state/ApplicationsContext';

export const useApplications = () => {
  const context = useContext(ApplicationsContext);
  if (!context) {
    throw new Error('useApplications must be used within ApplicationsContextProvider');
  }
  return context;
};
