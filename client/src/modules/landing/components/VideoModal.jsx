import React from 'react';
import { X, Play } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const VideoModal = ({ isOpen, onClose, onDemoLogin }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-3xl w-full p-6 space-y-4 border border-slate-200 shadow-2xl relative">
        <button onClick={onClose}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-600 rounded-full">
          <X className="w-5 h-5" />
        </button>
        <h3 className="text-xl font-bold text-slate-900 font-heading">HEROES Product Tour Demo</h3>
        <div className="aspect-video bg-slate-900 rounded-xl flex items-center justify-center text-white">
          <div className="text-center space-y-3 p-6">
            <Play className="w-16 h-16 text-emerald-500 mx-auto animate-bounce" />
            <p className="font-bold text-lg">Interactive CRM Demo Active</p>
            <p className="text-xs text-slate-400">Click below to enter the live interactive environment instantly.</p>
            <Button onClick={() => onDemoLogin('ADMIN')} className="bg-emerald-600 text-white font-bold">
              Launch Interactive Demo
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
