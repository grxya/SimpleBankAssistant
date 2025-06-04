import { AlertCircle } from "lucide-react";

const Modal = ({ title, message, onConfirm, onCancel }) => (
  <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
    <div className="rounded-xl shadow-xl p-6 w-96 border border-surface-hover bg-background max-w-[90%]">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 rounded-full bg-red-500/10 text-red-500">
          <AlertCircle className="h-6 w-6" />
        </div>
        <h2 className="text-lg font-semibold">{title}</h2>
      </div>
      <p className="mb-8 text-muted">{message}</p>
      <div className="flex justify-end gap-4">
        <button
          onClick={onCancel}
          className="px-4 py-2 rounded-md border border-surface-hover hover:bg-surface-hover transition-colors"
        >
          Ləğv et
        </button>
        <button
          onClick={onConfirm}
          className="px-4 py-2 rounded-md bg-red-500 text-white hover:bg-red-600 transition-colors"
        >
          Təsdiq et
        </button>
      </div>
    </div>
  </div>
);

export default Modal;
