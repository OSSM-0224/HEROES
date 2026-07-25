import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { toast } from 'sonner';
import { useAuth } from '../../services/auth.service.jsx';
import { LogOut, LayoutDashboard, BarChart3, Sparkles, FileText, HelpCircle, Shield, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

export const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = async () => {
    await logout();
    toast.info('Logged out successfully');
    navigate('/login');
  };

  const userInitials = user?.name
    ? user.name.split(' ').map((n) => n[0]).join('').toUpperCase().slice(0, 2)
    : 'U';

  const isLanding = location.pathname === '/';

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-200/80 bg-white/90 backdrop-blur-md transition-colors shadow-2xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <div className="flex items-center gap-8">
          <Link to="/" className="flex items-center gap-2.5 group">
            <div className="w-9 h-9 rounded-xl bg-emerald-600 text-white flex items-center justify-center font-black text-lg shadow-md shadow-emerald-500/20 group-hover:scale-105 transition-transform">
              H
            </div>
            <div className="flex items-center gap-2">
              <span className="font-black text-xl tracking-tight text-slate-900 font-heading">
                HEROES
              </span>
              <Badge variant="outline" className="hidden sm:inline-flex text-[10px] uppercase font-extrabold tracking-wider bg-emerald-50 text-emerald-700 border-emerald-200">
                CRM
              </Badge>
            </div>
          </Link>

          {isLanding && (
            <nav className="hidden md:flex items-center gap-6 text-xs font-semibold text-slate-600">
              <a href="#product" className="hover:text-emerald-600 transition-colors">Product</a>
              <a href="#features" className="hover:text-emerald-600 transition-colors">Features</a>
              <a href="#workflow" className="hover:text-emerald-600 transition-colors">How it Works</a>
              <a href="#testimonials" className="hover:text-emerald-600 transition-colors">Testimonials</a>
              <a href="#pricing" className="hover:text-emerald-600 transition-colors">Pricing</a>
            </nav>
          )}
        </div>

        <nav className="flex items-center gap-3">
          <Link
            to="/capture"
            className="text-xs font-semibold text-slate-600 hover:text-emerald-600 transition-colors hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg hover:bg-slate-100"
          >
            <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
            Public Form
          </Link>

          {user ? (
            <div className="flex items-center gap-3">
              <Link to="/dashboard">
                <Button
                  variant={location.pathname.startsWith('/dashboard') ? 'default' : 'outline'}
                  size="sm"
                  className="gap-1.5 font-bold text-xs bg-emerald-600 hover:bg-emerald-700 text-white shadow-xs"
                >
                  <LayoutDashboard className="w-3.5 h-3.5" />
                  Dashboard
                </Button>
              </Link>
              <Link to="/reports">
                <Button
                  variant={location.pathname === '/reports' ? 'default' : 'ghost'}
                  size="sm"
                  className="gap-1.5 font-bold text-xs text-slate-700"
                >
                  <BarChart3 className="w-3.5 h-3.5" />
                  Reports
                </Button>
              </Link>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="flex items-center gap-2 p-1 rounded-full hover:bg-slate-100 transition-colors cursor-pointer outline-none ring-2 ring-transparent focus:ring-emerald-500">
                    <Avatar className="h-8 w-8">
                      <AvatarFallback className="bg-emerald-600 text-white text-xs font-bold">
                        {userInitials}
                      </AvatarFallback>
                    </Avatar>
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56 bg-white border-slate-200">
                  <DropdownMenuLabel>
                    <div className="flex flex-col space-y-1">
                      <p className="text-xs font-bold leading-none text-slate-900">{user.name}</p>
                      <p className="text-[11px] leading-none text-slate-500">{user.email}</p>
                      <span className="inline-flex items-center w-fit px-1.5 py-0.5 rounded text-[10px] font-extrabold text-emerald-700 bg-emerald-50 mt-1 uppercase">
                        {user.role}
                      </span>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => navigate('/dashboard')} className="cursor-pointer text-xs font-medium">
                    <LayoutDashboard className="mr-2 h-4 w-4 text-emerald-600" />
                    <span>Dashboard</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => navigate('/reports')} className="cursor-pointer text-xs font-medium">
                    <BarChart3 className="mr-2 h-4 w-4 text-indigo-600" />
                    <span>Reports</span>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogout} className="text-rose-600 focus:text-rose-600 cursor-pointer text-xs font-medium">
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Sign out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Link to="/login">
                <Button variant="ghost" size="sm" className="font-bold text-xs text-slate-700 hover:text-emerald-600">
                  Login
                </Button>
              </Link>
              <Link to="/register">
                <Button size="sm" className="font-bold text-xs bg-emerald-600 hover:bg-emerald-700 text-white shadow-md shadow-emerald-500/20 gap-1.5">
                  Start Free Demo
                  <ArrowRight className="w-3.5 h-3.5" />
                </Button>
              </Link>
            </div>
          )}
        </nav>
      </div>
    </header>
  );
};
