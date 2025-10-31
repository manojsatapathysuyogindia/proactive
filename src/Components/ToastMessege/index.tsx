import React from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Success Toast
export const successToast = (message: string) => {
  toast.success(message, {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: true,
  });
};

// Error Toast
export const errorToast = (message: string) => {
  toast.error(message, {
    position: "top-right",
    autoClose: 3000,
    hideProgressBar: true,
  });
};

const ToastComponent: React.FC = () => {
  return <ToastContainer/>;
};

export default ToastComponent;
