import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import toast from 'react-hot-toast'
import {
  Globe,
  Mail,
  Lock,
  ArrowRight,
  ShieldCheck,
  Sparkles,
} from 'lucide-react'

export default function Login() {
  const [email, setEmail] = useState('admin@visa.com')
  const [password, setPassword] = useState('admin123')
  const [loading, setLoading] = useState(false)

  const { login } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      await login(email, password)
      toast.success('Welcome!')
      navigate('/')
    } catch (err) {
      toast.error(err.response?.data?.message || 'Login failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-slate-950 via-indigo-950 to-slate-900 flex items-center justify-center px-4 py-8">

      {/* Background Glow */}
      <div className="absolute -top-32 -left-32 w-96 h-96 bg-indigo-600/20 rounded-full blur-3xl" />
      <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl" />

      {/* Decorative Grid */}
      <div
        className="absolute inset-0 opacity-[0.035]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,.8) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.8) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }}
      />

      {/* Login Card */}
      <div className="relative w-full max-w-[440px]">

        {/* Top Brand */}
        <div className="text-center mb-7">
          <div className="inline-flex items-center gap-2.5">
            <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-indigo-500 to-blue-600 flex items-center justify-center shadow-lg shadow-indigo-600/30">
              <Globe className="text-white" size={23} />
            </div>

            <div className="text-left">
              <h2 className="text-white font-bold text-lg leading-none">
                Visa Management
              </h2>
              <p className="text-slate-400 text-xs mt-1">
                Smart Immigration Platform
              </p>
            </div>
          </div>
        </div>

        {/* Main Card */}
        <div className="bg-white/[0.97] backdrop-blur-xl rounded-3xl shadow-2xl shadow-black/30 border border-white/20 p-8">

          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-5">
              <div className="w-12 h-12 rounded-2xl bg-indigo-50 flex items-center justify-center">
                <ShieldCheck
                  size={25}
                  className="text-indigo-600"
                />
              </div>

              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-50 border border-emerald-100">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                <span className="text-xs font-medium text-emerald-700">
                  Secure Login
                </span>
              </div>
            </div>

            <h1 className="text-3xl font-bold tracking-tight text-slate-900">
              Welcome back
            </h1>

            <p className="text-slate-500 mt-2 text-sm">
              Sign in to access your visa management dashboard.
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">

            {/* Email */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Email address
              </label>

              <div className="relative">
                <Mail
                  size={18}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                />

                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="w-full h-12 pl-11 pr-4 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 placeholder:text-slate-400 outline-none transition-all focus:bg-white focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10"
                  required
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="block text-sm font-semibold text-slate-700">
                  Password
                </label>

                <button
                  type="button"
                  className="text-xs font-semibold text-indigo-600 hover:text-indigo-700"
                >
                  Forgot password?
                </button>
              </div>

              <div className="relative">
                <Lock
                  size={18}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                />

                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="w-full h-12 pl-11 pr-4 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 placeholder:text-slate-400 outline-none transition-all focus:bg-white focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10"
                  required
                />
              </div>
            </div>

            {/* Remember */}
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="remember"
                className="w-4 h-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500"
              />

              <label
                htmlFor="remember"
                className="text-sm text-slate-500 cursor-pointer"
              >
                Keep me signed in
              </label>
            </div>

            {/* Button */}
            <button
              type="submit"
              disabled={loading}
              className="group w-full h-12 rounded-xl bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700 text-white font-semibold text-sm shadow-lg shadow-indigo-600/20 transition-all duration-200 hover:-translate-y-0.5 disabled:opacity-60 disabled:hover:translate-y-0 flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                  Signing in...
                </>
              ) : (
                <>
                  Sign in to dashboard
                  <ArrowRight
                    size={18}
                    className="transition-transform group-hover:translate-x-1"
                  />
                </>
              )}
            </button>
          </form>

          {/* Demo Accounts */}
          <div className="mt-7 rounded-2xl border border-indigo-100 bg-gradient-to-br from-indigo-50 to-blue-50 p-4">

            <div className="flex items-center gap-2 mb-3">
              <Sparkles size={16} className="text-indigo-600" />

              <p className="text-sm font-bold text-indigo-900">
                Demo Accounts
              </p>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between rounded-xl bg-white/80 px-3 py-2.5 border border-white">
                <div>
                  <p className="text-xs font-semibold text-slate-700">
                    Admin
                  </p>
                  <p className="text-[11px] text-slate-500">
                    admin@visa.com
                  </p>
                </div>

                <span className="text-[11px] font-semibold text-indigo-600 bg-indigo-50 px-2 py-1 rounded-lg">
                  admin123
                </span>
              </div>

              <div className="flex items-center justify-between rounded-xl bg-white/80 px-3 py-2.5 border border-white">
                <div>
                  <p className="text-xs font-semibold text-slate-700">
                    Agent
                  </p>
                  <p className="text-[11px] text-slate-500">
                    agent@visa.com
                  </p>
                </div>

                <span className="text-[11px] font-semibold text-indigo-600 bg-indigo-50 px-2 py-1 rounded-lg">
                  agent123
                </span>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="mt-7 text-center">
            <p className="text-xs text-slate-400">
              Protected by secure authentication
            </p>
          </div>
        </div>

        {/* Bottom */}
        <p className="text-center text-xs text-slate-500 mt-5">
          © 2026 Visa Management System. All rights reserved.
        </p>
      </div>
    </div>
  )
}


