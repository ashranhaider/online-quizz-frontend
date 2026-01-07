import { toast, type ToastOptions } from "react-toastify";

const defaultOptions: ToastOptions = {
  position: "top-right",
  autoClose: 3000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
};

class ToastService {
  success(message: string, options?: ToastOptions) {
    toast.success(message, { ...defaultOptions, ...options });
  }

  error(message: string, options?: ToastOptions) {
    toast.error(message, { ...defaultOptions, ...options });
  }

  info(message: string, options?: ToastOptions) {
    toast.info(message, { ...defaultOptions, ...options });
  }

  warning(message: string, options?: ToastOptions) {
    toast.warning(message, { ...defaultOptions, ...options });
  }

  loading(message: string, options?: ToastOptions) {
    return toast.loading(message, { ...defaultOptions, ...options });
  }

  update(
    toastId: string | number,
    message: string,
    options?: ToastOptions
  ) {
    toast.update(toastId, {
      render: message,
      type: options?.type ?? "default",
      isLoading: false,
      autoClose: 3000,
      ...options,
    });
  }
}

export const toastService = new ToastService();
