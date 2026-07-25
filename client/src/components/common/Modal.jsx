import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

export const Modal = ({ isOpen, onClose, title, children, maxWidth = 'max-w-2xl' }) => {
  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className={`${maxWidth} max-h-[90vh] overflow-y-auto`}>
        {title && (
          <DialogHeader>
            <DialogTitle className="text-lg font-bold text-slate-900">{title}</DialogTitle>
          </DialogHeader>
        )}
        <div className="py-2">{children}</div>
      </DialogContent>
    </Dialog>
  );
};
