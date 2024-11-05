// src/components/ui/dialog.jsx
import { Fragment } from 'react';
import { Dialog as HeadlessDialog, Transition } from '@headlessui/react';
import PropTypes from 'prop-types';

// Main Dialog Component
const Dialog = ({ open, onOpenChange, children }) => {
  return (
    <Transition show={open} as={Fragment}>
      <HeadlessDialog
        as="div"
        className="fixed inset-0 z-50 overflow-y-auto"
        onClose={onOpenChange}
      >
        <div className="min-h-screen px-4 text-center">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <HeadlessDialog.Overlay className="fixed inset-0 bg-black bg-opacity-50" />
          </Transition.Child>

          <span
            className="inline-block h-screen align-middle"
            aria-hidden="true"
          >
            &#8203;
          </span>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <div className="my-8 inline-block w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
              {children}
            </div>
          </Transition.Child>
        </div>
      </HeadlessDialog>
    </Transition>
  );
};

// PropTypes for Main Dialog Component
Dialog.propTypes = {
  open: PropTypes.bool.isRequired,
  onOpenChange: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
};

// Subcomponent: DialogContent
const DialogContent = ({ children, className = '' }) => {
  return <div className={`p-4 ${className}`}>{children}</div>;
};

// PropTypes for DialogContent
DialogContent.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

// Subcomponent: DialogHeader
const DialogHeader = ({ children }) => {
  return <div className="mb-4 border-b pb-2">{children}</div>;
};

// PropTypes for DialogHeader
DialogHeader.propTypes = {
  children: PropTypes.node.isRequired,
};

// Subcomponent: DialogTitle
const DialogTitle = ({ children, className = '' }) => {
  return <h2 className={`text-lg font-semibold ${className}`}>{children}</h2>;
};

// PropTypes for DialogTitle
DialogTitle.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

// Subcomponent: DialogFooter
const DialogFooter = ({ children }) => {
  return <div className="flex justify-end gap-2 border-t pt-4">{children}</div>;
};

// PropTypes for DialogFooter
DialogFooter.propTypes = {
  children: PropTypes.node.isRequired,
};

// Exporting components
Dialog.Content = DialogContent;
Dialog.Header = DialogHeader;
Dialog.Title = DialogTitle;
Dialog.Footer = DialogFooter;

export { Dialog };
