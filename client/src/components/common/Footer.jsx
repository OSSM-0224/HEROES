import React from 'react';

export const Footer = () => {
  return (
    <footer className="w-full border-t border-slate-200 bg-white py-8 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-md bg-blue-600 text-white flex items-center justify-center font-extrabold text-xs">
            H
          </div>
          <span className="font-bold text-slate-900 text-sm">HEROES CRM</span>
          <span className="text-slate-400 text-xs">| Lead Management System</span>
        </div>
        <p className="text-xs text-slate-500">
          Built for Digital Heroes Training Assessment &copy; {new Date().getFullYear()} HEROES Inc. All rights reserved.
        </p>
      </div>
    </footer>
  );
};
