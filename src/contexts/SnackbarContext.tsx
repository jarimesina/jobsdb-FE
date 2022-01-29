import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@mui/material/Alert';
import React, { createContext, useContext, useState } from 'react';

export type MessageStatus = 'info' | 'warning' | 'error' | 'success';

export type Message = {
  status: MessageStatus;
  message: string;
};

export interface SnackbarContext{
  show: (message: Message) => void;
}

export const SnackbarContext = createContext<SnackbarContext>({} as any);

export const SnackbarProvider: React.FC = ({ children }) => {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState<MessageStatus>();

  const show = (message: Message) => {
    setOpen(true);
    setMessage(message.message);
    setStatus(message.status);
  }

  const handleClose = () => {
    setOpen(false);
    setMessage('');
  }

  return (
    <SnackbarContext.Provider value={{ show }}>
      <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
        <Alert onClose={handleClose} severity={status} sx={{ width: '100%' }}>
          {message}
        </Alert>
      </Snackbar>
      {children}
    </SnackbarContext.Provider>
  );
}

export function useSnackbar() {
  return useContext(SnackbarContext);
}