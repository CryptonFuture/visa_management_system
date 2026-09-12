
import { Outlet, NavLink, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import {
  LayoutDashboard,
  Users,
  FileText,
  Plane,
  Calendar,
  BarChart3,
  LogOut,
  Menu,
  X,
  Globe,
  ChevronRight,
  Sparkles,
} from 'lucide-react'
import { useState } from 'react'

const navItems = [
  { to: '/', icon: LayoutDashboard, label: 'Dashboard' },
  { to: '/applicants', icon: Users, label: 'Applicants' },
  { to: '/applications', icon: FileText, label: 'Applications' },
  { to: '/visa-types', icon: Plane, label: 'Visa Types' },
  { to: '/appointments', icon: Calendar, label: 'Appointments' },
  { to: '/analytics', icon: BarChart3, label: 'Analytics' },
]

export default function Layout() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const [open, setOpen] = useState(false)

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  return (
    <div className="flex h-screen overflow-hidden bg-slate-50">

      {/* Mobile Overlay */}
      {open && (
        <div
          className="fixed inset-0 z-40 bg-slate-950/60 backdrop-blur-sm lg:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      {/* ================= SIDEBAR ================= */}
      <aside
        className={`
          fixed inset-y-0 left-0 z-50 w-[270px]
          bg-gradient-to-b from-slate-950 via-indigo-950 to-slate-950
          text-white shadow-2xl shadow-indigo-950/30
          transform transition-all duration-300 ease-in-out
          lg:static lg:translate-x-0
          ${open ? 'translate-x-0' : '-translate-x-full'}
        `}
      >

        {/* Brand */}
        <div className="h-[76px] px-5 flex items-center justify-between border-b border-white/10">
          <div className="flex items-center gap-3">

            <div className="relative">
              <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-indigo-500 to-blue-600 flex items-center justify-center shadow-lg shadow-indigo-600/30">
                <Globe size={22} className="text-white" />
              </div>

              <div className="absolute -right-1 -bottom-1 w-4 h-4 rounded-full bg-emerald-400 border-[3px] border-slate-950" />
            </div>

            <div>
              <h1 className="font-bold text-[16px] tracking-tight">
                Visa System
              </h1>
              <p className="text-[10px] uppercase tracking-[0.18em] text-indigo-300 mt-0.5">
                Management Portal
              </p>
            </div>
          </div>

          <button
            onClick={() => setOpen(false)}
            className="lg:hidden p-2 rounded-xl text-slate-400 hover:text-white hover:bg-white/10 transition"
          >
            <X size={19} />
          </button>
        </div>

        {/* Navigation */}
        <div className="px-4 pt-7">

          <div className="px-3 mb-3 flex items-center justify-between">
            <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-slate-500">
              Main Menu
            </span>

            <Sparkles size={13} className="text-indigo-400" />
          </div>

          <nav className="space-y-1.5">
            {navItems.map(({ to, icon: Icon, label }) => (
              <NavLink
                key={to}
                to={to}
                end={to === '/'}
                onClick={() => setOpen(false)}
                className={({ isActive }) =>
                  `
                  group relative flex items-center gap-3
                  px-3.5 py-3 rounded-xl
                  text-sm font-medium
                  transition-all duration-200
                  ${
                    isActive
                      ? 'bg-gradient-to-r from-indigo-600 to-blue-600 text-white shadow-lg shadow-indigo-900/30'
                      : 'text-slate-400 hover:text-white hover:bg-white/[0.06]'
                  }
                  `
                }
              >
                {({ isActive }) => (
                  <>
                    {/* Active indicator */}
                    {isActive && (
                      <span className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-7 rounded-r-full bg-white" />
                    )}

                    <span
                      className={`
                        w-9 h-9 rounded-lg flex items-center justify-center
                        transition-all
                        ${
                          isActive
                            ? 'bg-white/15'
                            : 'bg-white/[0.04] group-hover:bg-white/10'
                        }
                      `}
                    >
                      <Icon size={18} />
                    </span>

                    <span className="flex-1">
                      {label}
                    </span>

                    <ChevronRight
                      size={15}
                      className={`
                        transition-all duration-200
                        ${
                          isActive
                            ? 'opacity-100 translate-x-0'
                            : 'opacity-0 -translate-x-1 group-hover:opacity-60 group-hover:translate-x-0'
                        }
                      `}
                    />
                  </>
                )}
              </NavLink>
            ))}
          </nav>
        </div>

        {/* Sidebar Bottom */}
        <div className="absolute bottom-0 left-0 right-0 p-4">

          {/* User Card */}
          <div className="rounded-2xl border border-white/10 bg-white/[0.05] backdrop-blur-sm p-3.5 mb-3">

            <div className="flex items-center gap-3">

              <div className="relative shrink-0">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center text-sm font-bold shadow-lg">
                  {user?.name?.charAt(0)?.toUpperCase() || 'U'}
                </div>

                <span className="absolute -right-0.5 -bottom-0.5 w-3 h-3 rounded-full bg-emerald-400 border-2 border-slate-950" />
              </div>

              <div className="min-w-0">
                <p className="text-sm font-semibold text-white truncate">
                  {user?.name || 'User'}
                </p>

                <p className="text-[11px] text-slate-400 capitalize truncate mt-0.5">
                  {user?.role || 'Administrator'}
                </p>
              </div>
            </div>
          </div>

          {/* Logout */}
          <button
            onClick={handleLogout}
            className="
              group flex items-center gap-3 w-full
              px-3.5 py-3 rounded-xl
              text-sm font-medium text-slate-400
              hover:text-red-300 hover:bg-red-500/10
              border border-transparent
              hover:border-red-500/10
              transition-all duration-200
            "
          >
            <span className="w-9 h-9 rounded-lg bg-white/[0.04] group-hover:bg-red-500/10 flex items-center justify-center transition">
              <LogOut size={17} />
            </span>

            <span>Logout</span>
          </button>

          <p className="text-[9px] text-center text-slate-600 mt-4 uppercase tracking-[0.15em]">
            Secure Visa Administration
          </p>
        </div>
      </aside>

      {/* ================= MAIN AREA ================= */}
      <div className="flex-1 min-w-0 flex flex-col overflow-hidden">

        {/* Top Header */}
        <header
          className="
            h-[76px] shrink-0
            bg-white/90 backdrop-blur-xl
            border-b border-slate-200/80
            flex items-center justify-between
            px-4 sm:px-6 lg:px-8
            shadow-sm
          "
        >

          <div className="flex items-center gap-3">

            {/* Mobile Menu */}
            <button
              className="
                lg:hidden p-2.5 rounded-xl
                text-slate-600
                hover:bg-slate-100
                transition
              "
              onClick={() => setOpen(true)}
            >
              <Menu size={21} />
            </button>

            <div>
              <p className="text-[10px] uppercase tracking-[0.16em] font-semibold text-indigo-500">
                Administration
              </p>

              <h2 className="font-bold text-lg text-slate-800 tracking-tight">
                Visa Management System
              </h2>
            </div>
          </div>

          {/* Header Right */}
          <div className="hidden sm:flex items-center gap-3">

            <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-emerald-50 border border-emerald-100">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-xs font-semibold text-emerald-700">
                System Online
              </span>
            </div>

            <div className="w-px h-7 bg-slate-200" />

            <div className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-500 to-blue-600 flex items-center justify-center text-white text-sm font-bold shadow-sm">
                {user?.name?.charAt(0)?.toUpperCase() || 'U'}
              </div>

              <div className="hidden md:block">
                <p className="text-xs font-semibold text-slate-700">
                  {user?.name || 'User'}
                </p>
                <p className="text-[10px] text-slate-400 capitalize">
                  {user?.role || 'Administrator'}
                </p>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto bg-gradient-to-br from-slate-50 via-white to-indigo-50/30">

          <div className="min-h-full p-4 sm:p-5 lg:p-7">
            <Outlet />
          </div>

        </main>
      </div>
    </div>
  )
}

