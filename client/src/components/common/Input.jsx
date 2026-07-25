import React from 'react';
import { Input as ShadcnInput } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export const Input = React.forwardRef(({ label, error, required, id, className = '', ...props }, ref) => {
  const inputId = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);

  return (
    <div className="w-full space-y-1.5">
      {label && (
        <Label htmlFor={inputId} className="text-xs font-semibold text-slate-700">
          {label} {required && <span className="text-rose-500">*</span>}
        </Label>
      )}
      <ShadcnInput id={inputId} ref={ref} error={error} className={className} {...props} />
      {error && <p className="text-xs text-rose-500 font-medium">{error}</p>}
    </div>
  );
});

Input.displayName = 'Input';
