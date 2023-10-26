'use client';

import { useRef, type FC, ReactNode, use } from 'react';
import { useOutsideClick } from 'src/hooks/useOutsideClick.hook';
import Button from 'src/components/Button';

type ModalType = 'submit' | 'delete';

interface ModalProps {
  isOpen: boolean;
  setClose: () => void;
  onSubmit?: () => void;
  hasFooter?: boolean;
  isFilled?: boolean;
  type: ModalType;
  title: string;
  children: ReactNode | JSX.Element;
}

const Modal: FC<ModalProps> = ({ isOpen, setClose, onSubmit, hasFooter, type, title, children, isFilled }) => {
  if (!isOpen) return null;

  const modalRef = useRef<HTMLDivElement>(null);

  useOutsideClick(modalRef, setClose);

  return (
    <div className="relative z-10" aria-labelledby="modal-title" role="dialog" aria-modal="true">
      <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>

      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
          <div
            ref={modalRef}
            className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg"
          >
            <h3 className="font-bold mt-4 mx-7">{title}</h3>

            <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
              <div className="sm:flex sm:items-start">{children}</div>
            </div>
            {hasFooter && (
              <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6 gap-2">
                <Button label="Cancel" onClick={setClose} />
                {type === 'submit' && <Button label="Submit" onClick={onSubmit} color="primary" disable={!isFilled} />}
                {type === 'delete' && <Button label="Delete" onClick={onSubmit} color="danger" />}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
export default Modal;
