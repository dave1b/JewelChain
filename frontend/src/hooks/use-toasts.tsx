import { Toast, ToastMessageType } from 'primereact/toast';
import React, { createContext, ReactNode, useContext, useRef } from 'react';

// utility for showing PrimeReact toasts with a hook
//
// const { showToast } = useToasts();
// showToast({
//   severity: 'error',
//   summary: 'Failed to add new step.',
//   detail: String(error),
//   sticky: true,
// });

const ToastsContext = createContext<{
  showToast: (message: ToastMessageType) => void;
}>({
  showToast: () =>
    console.error('showToast was called outside of toasts context or before proper toasts context initialization.'),
});

export const useToasts = () => {
  return useContext(ToastsContext);
};

interface ToastsProviderProps {
  children: ReactNode;
}

export const ToastsProvider = ({ children }: ToastsProviderProps) => {
  const toast = useRef<Toast>(null);

  return (
    <>
      <Toast ref={toast} position="bottom-left" baseZIndex={20000} appendTo={document.body} />
      <ToastsContext.Provider
        value={{
          showToast: (message: ToastMessageType) => {
            if (toast && toast.current) {
              toast.current.show(message);
            }
          },
        }}
      >
        {children}
      </ToastsContext.Provider>
    </>
  );
};
