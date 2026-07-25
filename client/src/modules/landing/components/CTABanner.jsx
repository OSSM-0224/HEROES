import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const CTABanner = ({ onDemoLogin }) => (
  <section className="py-20 bg-gradient-to-r from-emerald-700 via-emerald-600 to-teal-700 text-white text-center">
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
      <h2 className="text-3xl sm:text-5xl font-black tracking-tight font-heading">
        Ready to accelerate your lead pipeline response?
      </h2>
      <p className="text-emerald-100 text-lg max-w-2xl mx-auto font-medium">
        Join hundreds of agile revenue teams closing more deals with HEROES CRM today.
      </p>
      <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
        <Link to="/register">
          <Button size="lg" className="px-8 py-4 bg-white text-emerald-800 hover:bg-slate-100 font-black text-base shadow-xl">
            Start Free Demo Now
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
        </Link>
        <Button variant="outline" size="lg" onClick={() => onDemoLogin('ADMIN')}
          className="px-8 py-4 border-white text-white hover:bg-white/10 font-bold text-base">
          1-Click Admin Demo
        </Button>
      </div>
    </div>
  </section>
);
