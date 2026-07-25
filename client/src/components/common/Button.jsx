import React from 'react';
import { Button as ShadcnButton } from '@/components/ui/button';

export const Button = React.forwardRef(({ variant = 'primary', size = 'default', children, ...props }, ref) => {
  // map legacy variant names to shadcn variants
  let shadcnVariant = variant;
  if (variant === 'primary') shadcnVariant = 'primary';
  else if (variant === 'danger') shadcnVariant = 'destructive';
  else if (variant === 'secondary') shadcnVariant = 'secondary';
  else if (variant === 'outline') shadcnVariant = 'outline';
  else if (variant === 'ghost') shadcnVariant = 'ghost';

  return (
    <ShadcnButton ref={ref} variant={shadcnVariant} size={size} {...props}>
      {children}
    </ShadcnButton>
  );
});

Button.displayName = 'Button';
