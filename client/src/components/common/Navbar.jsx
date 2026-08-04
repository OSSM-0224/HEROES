import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { toast } from 'sonner';
import { useAuth } from '../../services/auth.service.jsx';
import {
  LogOut,
  LayoutDashboard,
  BarChart3,
  Sparkles,
  ArrowRight,
  Menu,
  X,
} from 'lucide-react';
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
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
  TooltipProvider,
} from '@/components/ui/tooltip';

const TAGLINE = 'High Efficiency Relationship & Opportunity Engagement System';

const LANDING_LINKS = [
  { href: '#product', label: 'Product' },
  { href: '#features', label: 'Features' },
  { href: '#workflow', label: 'How it Works' },
  { href: '#testimonials', label: 'Testimonials' },
  { href: '#pricing', label: 'Pricing' },
];

export const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

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
    <TooltipProvider delayDuration={200}>
      <header
        className={`sticky top-0 z-50 w-full border-b bg-white/85 backdrop-blur-md transition-all duration-300 ${scrolled
          ? 'border-slate-200 shadow-[0_8px_24px_-16px_rgba(15,23,42,0.25)]'
          : 'border-slate-200/60 shadow-none'
          }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-8">
            <Link to="/" className="flex items-center gap-2.5 group shrink-0">
              <div className="relative w-9 h-9 group-hover:scale-105 transition-all duration-300">
                <img src="/HEROES_LOGO.svg" alt="HEROES" className="w-full h-full drop-shadow-sm" />
              </div>
              <div className="flex items-center gap-2">
                <span className="font-black text-xl tracking-tight text-slate-900 font-heading">
                  HEROES
                </span>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Badge
                      variant="outline"
                      className="hidden sm:inline-flex text-[10px] uppercase font-extrabold tracking-wider bg-emerald-50 text-emerald-700 border-emerald-200 cursor-default hover:border-emerald-300"
                    >
                      CRM
                    </Badge>
                  </TooltipTrigger>
                  <TooltipContent side="bottom" className="text-[11px] font-medium">
                    {TAGLINE}
                  </TooltipContent>
                </Tooltip>
              </div>
            </Link>

            {isLanding && (
              <nav className="hidden md:flex items-center gap-6 text-xs font-semibold text-slate-600">
                {LANDING_LINKS.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    className="relative py-1 transition-colors hover:text-emerald-600 after:absolute after:left-0 after:-bottom-0.5 after:h-[2px] after:w-0 after:bg-emerald-600 after:transition-all after:duration-300 hover:after:w-full"
                  >
                    {link.label}
                  </a>
                ))}
              </nav>
            )}
          </div>

          <nav className="flex items-center gap-3">
            <Link
              to="/capture"
              className="text-xs font-semibold text-slate-600 hover:text-emerald-600 transition-colors hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg hover:bg-emerald-50"
            >
              <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
              Public Form
            </Link>

            {user ? (
              <div className="hidden sm:flex items-center gap-3">
                <Link to="/dashboard">
                  <Button
                    variant={location.pathname.startsWith('/dashboard') ? 'default' : 'outline'}
                    size="sm"
                    className={`gap-1.5 font-bold text-xs transition-all ${location.pathname.startsWith('/dashboard')
                      ? 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-sm shadow-emerald-600/30'
                      : 'border-slate-200 text-slate-700 hover:border-emerald-300 hover:bg-emerald-50 hover:text-emerald-700'
                      }`}
                  >
                    <LayoutDashboard className="w-3.5 h-3.5" />
                    Dashboard
                  </Button>
                </Link>
                <Link to="/reports">
                  <Button
                    variant={location.pathname === '/reports' ? 'default' : 'ghost'}
                    size="sm"
                    className={`gap-1.5 font-bold text-xs ${location.pathname === '/reports'
                      ? 'bg-emerald-600 hover:bg-emerald-700 text-white'
                      : 'text-slate-700 hover:text-emerald-700 hover:bg-emerald-50'
                      }`}
                  >
                    <BarChart3 className="w-3.5 h-3.5" />
                    Reports
                  </Button>
                </Link>

                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <button className="flex items-center gap-2 p-0.5 rounded-full hover:ring-4 hover:ring-emerald-50 transition-all cursor-pointer outline-none focus:ring-4 focus:ring-emerald-100">
                      <Avatar className="h-8 w-8 ring-2 ring-emerald-100">
                        <AvatarFallback className="bg-gradient-to-br from-emerald-500 to-emerald-700 text-white text-xs font-bold">
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
                        {user.organization?.name && (
                          <p className="text-[11px] leading-none text-slate-500 flex items-center gap-1">
                            <Sparkles className="w-3 h-3 text-emerald-600" />
                            {user.organization.name}
                          </p>
                        )}
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
              <div className="hidden sm:flex items-center gap-2">
                <Link to="/login">
                  <Button variant="ghost" size="sm" className="font-bold text-xs text-slate-700 hover:text-emerald-600 hover:bg-emerald-50">
                    Login
                  </Button>
                </Link>
                <Link to="/register">
                  <Button size="sm" className="font-bold text-xs bg-emerald-600 hover:bg-emerald-700 text-white shadow-md shadow-emerald-500/25 gap-1.5">
                    Start Free Demo
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Button>
                </Link>
              </div>
            )}

            {/* Mobile toggle */}
            <button
              onClick={() => setMobileOpen((v) => !v)}
              className="sm:hidden p-2 rounded-lg text-slate-600 hover:bg-slate-100 transition-colors"
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </nav>
        </div>

        {/* Mobile panel */}
        {mobileOpen && (
          <div className="sm:hidden border-t border-slate-200 bg-white px-4 py-4 space-y-2 animate-in slide-in-from-top-2 duration-200">
            {user ? (
              <>
                <Link to="/dashboard" className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-semibold text-slate-700 hover:bg-emerald-50 hover:text-emerald-700">
                  <LayoutDashboard className="w-4 h-4" /> Dashboard
                </Link>
                <Link to="/reports" className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-semibold text-slate-700 hover:bg-emerald-50 hover:text-emerald-700">
                  <BarChart3 className="w-4 h-4" /> Reports
                </Link>
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-semibold text-rose-600 hover:bg-rose-50"
                >
                  <LogOut className="w-4 h-4" /> Sign out
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="block px-3 py-2 rounded-lg text-sm font-semibold text-slate-700 hover:bg-emerald-50">
                  Login
                </Link>
                <Link to="/register" className="block px-3 py-2 rounded-lg text-sm font-semibold text-white bg-emerald-600 text-center">
                  Start Free Demo
                </Link>
              </>
            )}
          </div>
        )}
      </header>
    </TooltipProvider>
  );
};