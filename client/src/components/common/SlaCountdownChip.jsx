import React, { useEffect, useState } from 'react';
import { Clock, AlertTriangle } from 'lucide-react';

export const SlaCountdownChip = ({ createdAt }) => {
  const [timeLeft, setTimeLeft] = useState('');
  const [hoursLeft, setHoursLeft] = useState(24);
  const [isBreached, setIsBreached] = useState(false);

  useEffect(() => {
    if (!createdAt) return;

    const computeTime = () => {
      const created = new Date(createdAt).getTime();
      const target = created + 24 * 60 * 60 * 1000; // 24 hours SLA deadline
      const now = Date.now();
      const diff = target - now;

      if (diff <= 0) {
        setIsBreached(true);
        setHoursLeft(0);
        setTimeLeft('SLA Breached');
      } else {
        setIsBreached(false);
        const hrs = Math.floor(diff / (1000 * 60 * 60));
        const mins = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        setHoursLeft(hrs);
        setTimeLeft(`${hrs}h ${mins}m`);
      }
    };

    computeTime();
    const interval = setInterval(computeTime, 30000); // update every 30s
    return () => clearInterval(interval);
  }, [createdAt]);

  if (!createdAt) return null;

  let badgeStyle = 'bg-emerald-50 text-emerald-700 border-emerald-200';
  
  if (isBreached) {
    badgeStyle = 'bg-rose-50 text-rose-700 border-rose-300 animate-pulse';
  } else if (hoursLeft < 2) {
    badgeStyle = 'bg-rose-50 text-rose-700 border-rose-300 animate-pulse';
  } else if (hoursLeft < 12) {
    badgeStyle = 'bg-amber-50 text-amber-700 border-amber-300';
  }

  return (
    <span
      className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold border transition-all ${badgeStyle}`}
      title={isBreached ? 'Target 24h SLA breached' : `SLA response deadline in ${timeLeft}`}
    >
      {isBreached ? <AlertTriangle className="w-3 h-3 text-rose-600" /> : <Clock className="w-3 h-3" />}
      {timeLeft}
    </span>
  );
};
