import { toast, ToastOptions } from "react-toastify";

// Default toast configuration
const defaultToastOptions: ToastOptions = {
  position: "top-right",
  autoClose: 5000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  theme: "light",
};

// Show success toast
export const showSuccessToast = (message: string, options?: ToastOptions) => {
  toast.success(message, { ...defaultToastOptions, ...options });
};

// Show error toast
export const showErrorToast = (message: string, options?: ToastOptions) => {
  toast.error(message, { ...defaultToastOptions, ...options });
};

// Show info toast
export const showInfoToast = (message: string, options?: ToastOptions) => {
  toast.info(message, { ...defaultToastOptions, ...options });
};
