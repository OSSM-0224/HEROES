import React from 'react';
import { Link } from 'react-router-dom';

const TAGLINE = 'High Efficiency Relationship & Opportunity Engagement System';

export const Footer = () => {
  return (
    <footer className="w-full border-t border-slate-200 bg-white mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col sm:flex-row items-center sm:items-start justify-between gap-6">
          <div className="flex flex-col items-center sm:items-start gap-1.5">
            <Link to="/" className="flex items-center gap-2 group">
              <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-emerald-500 to-emerald-700 text-white flex items-center justify-center font-black text-xs shadow-sm shadow-emerald-600/25 group-hover:scale-105 transition-transform">
                H
              </div>
              <span className="font-black text-sm tracking-tight text-slate-900">HEROES</span>
              <span className="text-[10px] font-extrabold uppercase tracking-wider text-emerald-700 bg-emerald-50 border border-emerald-200 rounded px-1.5 py-0.5">
                CRM
              </span>
            </Link>
            <p className="text-[11px] text-slate-400 uppercase tracking-wide font-medium text-center sm:text-left">
              {TAGLINE}
            </p>
          </div>

          <p className="text-xs text-slate-500 text-center sm:text-right">
            Built for{' '}
            <a
              href="https://digitalheroesco.com"
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-emerald-700 hover:text-emerald-800 hover:underline underline-offset-2"
            >
              Digital Heroes
            </a>{' '}
            Training Assessment
            <br className="hidden sm:block" />
            <span className="text-slate-400">&copy; {new Date().getFullYear()} HEROES Inc. All rights reserved.</span>
          </p>
        </div>
      </div>
    </footer>
  );
};