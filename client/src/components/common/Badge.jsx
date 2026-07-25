import React from 'react';
import { Badge as ShadcnBadge } from '@/components/ui/badge';

export const Badge = ({ children, className = '', variant = 'default' }) => {
  let shadcnVariant = 'default';
  if (variant === 'blue') shadcnVariant = 'info';
  else if (variant === 'green') shadcnVariant = 'success';
  else if (variant === 'amber') shadcnVariant = 'warning';
  else if (variant === 'rose') shadcnVariant = 'destructive';

  return (
    <ShadcnBadge variant={shadcnVariant} className={className}>
      {children}
    </ShadcnBadge>
  );
};
