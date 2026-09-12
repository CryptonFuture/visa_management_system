import { useEffect, useState } from 'react'
import api from '../services/api'
import {
  Users,
  FileText,
  Clock,
  CheckCircle,
  XCircle,
  Calendar,
  ArrowUpRight,
  Activity,
  Globe2,
} from 'lucide-react'

export default function Dashboard() {
  const [stats, setStats] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    api.get('/dashboard/stats')
      .then(res => setStats(res.data.data))
      .catch(console.error)
      .finally(() => setLoading(false))
  }, [])

  // Premium loading state
  if (loading) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 mx-auto rounded-2xl bg-indigo-50 flex items-center justify-center">
            <div className="w-6 h-6 border-2 border-indigo-600 border-t-transparent rounded-full animate-spin" />
          </div>
          <p className="mt-4 text-sm font-medium text-slate-500">
            Loading dashboard...
          </p>
        </div>
      </div>
    )
  }

  if (!stats) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center">
        <div className="text-center">
          <div className="w-14 h-14 mx-auto rounded-2xl bg-red-50 flex items-center justify-center">
            <XCircle className="text-red-500" size={26} />
          </div>
          <p className="mt-4 font-semibold text-slate-700">
            Failed to load dashboard
          </p>
          <p className="text-sm text-slate-400 mt-1">
            Please try again later.
          </p>
        </div>
      </div>
    )
  }

  const cards = [
    {
      label: 'Applicants',
      value: stats.overview.totalApplicants,
      icon: Users,
      gradient: 'from-blue-500 to-cyan-500',
      bg: 'bg-blue-50',
      text: 'text-blue-600',
    },
    {
      label: 'Applications',
      value: stats.overview.totalApplications,
      icon: FileText,
      gradient: 'from-indigo-500 to-violet-500',
      bg: 'bg-indigo-50',
      text: 'text-indigo-600',
    },
    {
      label: 'Pending',
      value: stats.overview.pendingApps,
      icon: Clock,
      gradient: 'from-amber-400 to-orange-500',
      bg: 'bg-amber-50',
      text: 'text-amber-600',
    },
    {
      label: 'Approved',
      value: stats.overview.approvedApps,
      icon: CheckCircle,
      gradient: 'from-emerald-400 to-green-500',
      bg: 'bg-emerald-50',
      text: 'text-emerald-600',
    },
    {
      label: 'Rejected',
      value: stats.overview.rejectedApps,
      icon: XCircle,
      gradient: 'from-rose-400 to-red-500',
      bg: 'bg-rose-50',
      text: 'text-rose-600',
    },
    {
      label: "Today's Appointments",
      value: stats.overview.todayAppointments,
      icon: Calendar,
      gradient: 'from-violet-500 to-purple-600',
      bg: 'bg-violet-50',
      text: 'text-violet-600',
    },
  ]

  const statusColors = {
    draft: 'bg-slate-100 text-slate-600 border-slate-200',
    submitted: 'bg-blue-50 text-blue-700 border-blue-100',
    under_review: 'bg-amber-50 text-amber-700 border-amber-100',
    documents_required: 'bg-orange-50 text-orange-700 border-orange-100',
    approved: 'bg-emerald-50 text-emerald-700 border-emerald-100',
    rejected: 'bg-red-50 text-red-700 border-red-100',
    issued: 'bg-green-50 text-green-700 border-green-100',
    cancelled: 'bg-slate-100 text-slate-500 border-slate-200',
  }

  const totalVisaApplications =
    stats.visaTypeStats.reduce((sum, item) => sum + item.count, 0)

  return (
    <div className="space-y-7 pb-8">

      {/* =====================================================
          HEADER
      ===================================================== */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">

        <div>
          <div className="flex items-center gap-2 mb-1">
            <div className="w-8 h-8 rounded-lg bg-indigo-50 flex items-center justify-center">
              <Activity size={17} className="text-indigo-600" />
            </div>

            <span className="text-xs font-semibold uppercase tracking-wider text-indigo-600">
              Overview
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
            Dashboard
          </h1>

          <p className="text-sm text-slate-500 mt-1">
            Monitor your visa applications and system activity.
          </p>
        </div>

        <div className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white border border-slate-200 shadow-sm">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-sm font-medium text-slate-600">
            System Operational
          </span>
        </div>
      </div>

      {/* =====================================================
          STAT CARDS
      ===================================================== */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">

        {cards.map((c) => {
          const Icon = c.icon

          return (
            <div
              key={c.label}
              className="group relative bg-white rounded-2xl border border-slate-200/80 p-5 shadow-sm hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 overflow-hidden"
            >
              {/* Decorative glow */}
              <div
                className={`absolute -right-8 -top-8 w-24 h-24 rounded-full bg-gradient-to-br ${c.gradient} opacity-[0.06] group-hover:opacity-[0.12] transition`}
              />

              <div className="relative flex items-start justify-between">
                <div className="min-w-0">
                  <p className="text-xs font-medium text-slate-500 truncate">
                    {c.label}
                  </p>

                  <p className="text-2xl font-bold text-slate-900 mt-2">
                    {c.value}
                  </p>

                  <div className="flex items-center gap-1 mt-2">
                    <ArrowUpRight
                      size={13}
                      className={c.text}
                    />

                    <span className={`text-[11px] font-semibold ${c.text}`}>
                      Overview
                    </span>
                  </div>
                </div>

                <div
                  className={`w-11 h-11 shrink-0 rounded-xl ${c.bg} flex items-center justify-center`}
                >
                  <Icon size={20} className={c.text} />
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* =====================================================
          MAIN CONTENT
      ===================================================== */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">

        {/* ===================================================
            RECENT APPLICATIONS
        =================================================== */}
        <div className="xl:col-span-2 bg-white rounded-2xl border border-slate-200/80 shadow-sm overflow-hidden">

          <div className="px-6 py-5 border-b border-slate-100 flex items-center justify-between">

            <div>
              <div className="flex items-center gap-2">
                <div className="w-9 h-9 rounded-xl bg-indigo-50 flex items-center justify-center">
                  <FileText size={17} className="text-indigo-600" />
                </div>

                <h3 className="font-bold text-slate-900">
                  Recent Applications
                </h3>
              </div>

              <p className="text-xs text-slate-400 mt-2 ml-11">
                Latest visa application activity
              </p>
            </div>

            <button className="text-xs font-semibold text-indigo-600 hover:text-indigo-700 px-3 py-2 rounded-lg hover:bg-indigo-50 transition">
              View All
            </button>
          </div>

          <div className="p-2">
            {stats.recentApplications.length === 0 ? (
              <div className="text-center py-14">
                <div className="w-12 h-12 mx-auto rounded-xl bg-slate-50 flex items-center justify-center">
                  <FileText size={20} className="text-slate-300" />
                </div>

                <p className="text-sm font-medium text-slate-500 mt-3">
                  No applications
                </p>

                <p className="text-xs text-slate-400 mt-1">
                  New applications will appear here.
                </p>
              </div>
            ) : (
              <div>
                {stats.recentApplications.map((a) => (
                  <div
                    key={a._id}
                    className="group flex items-center justify-between gap-4 px-4 py-4 rounded-xl hover:bg-slate-50 transition"
                  >

                    {/* Applicant */}
                    <div className="flex items-center gap-3 min-w-0">

                      <div className="w-10 h-10 shrink-0 rounded-xl bg-gradient-to-br from-indigo-100 to-blue-100 flex items-center justify-center">
                        <span className="text-sm font-bold text-indigo-600">
                          {a.applicant?.firstName?.[0] || 'A'}
                        </span>
                      </div>

                      <div className="min-w-0">
                        <p className="font-semibold text-sm text-slate-800 truncate">
                          {a.applicationNumber}
                        </p>

                        <p className="text-xs text-slate-500 mt-0.5 truncate">
                          {a.applicant?.firstName}{' '}
                          {a.applicant?.lastName}
                        </p>

                        <p className="text-[11px] text-slate-400 mt-0.5">
                          {a.visaType?.name}
                        </p>
                      </div>
                    </div>

                    {/* Status */}
                    <span
                      className={`shrink-0 text-[11px] font-semibold px-2.5 py-1.5 rounded-full border capitalize ${
                        statusColors[a.status] ||
                        'bg-slate-100 text-slate-600 border-slate-200'
                      }`}
                    >
                      {a.status?.replace(/_/g, ' ')}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* ===================================================
            VISA TYPE
        =================================================== */}
        <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm overflow-hidden">

          <div className="px-6 py-5 border-b border-slate-100">

            <div className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-xl bg-violet-50 flex items-center justify-center">
                <Globe2 size={18} className="text-violet-600" />
              </div>

              <h3 className="font-bold text-slate-900">
                By Visa Type
              </h3>
            </div>

            <p className="text-xs text-slate-400 mt-2 ml-11">
              Application distribution
            </p>
          </div>

          <div className="p-6">

            {stats.visaTypeStats.length === 0 ? (
              <div className="text-center py-10">
                <Globe2
                  size={26}
                  className="mx-auto text-slate-300"
                />

                <p className="text-sm text-slate-400 mt-3">
                  No data available
                </p>
              </div>
            ) : (
              <div className="space-y-5">

                {stats.visaTypeStats.map((v, i) => {

                  const percentage =
                    totalVisaApplications > 0
                      ? Math.round(
                          (v.count / totalVisaApplications) * 100
                        )
                      : 0

                  return (
                    <div key={i}>

                      <div className="flex items-center justify-between mb-2">

                        <span className="text-sm font-medium text-slate-700">
                          {v.name}
                        </span>

                        <div className="flex items-center gap-2">
                          <span className="text-xs text-slate-400">
                            {percentage}%
                          </span>

                          <span className="text-sm font-bold text-indigo-600">
                            {v.count}
                          </span>
                        </div>

                      </div>

                      <div className="h-2 rounded-full bg-slate-100 overflow-hidden">
                        <div
                          className="h-full rounded-full bg-gradient-to-r from-indigo-500 to-violet-500 transition-all duration-700"
                          style={{
                            width: `${percentage}%`,
                          }}
                        />
                      </div>

                    </div>
                  )
                })}

              </div>
            )}
          </div>
        </div>
      </div>

      {/* =====================================================
          BOTTOM SUMMARY
      ===================================================== */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">

        <div className="bg-gradient-to-br from-indigo-600 to-blue-700 rounded-2xl p-5 text-white shadow-lg shadow-indigo-600/10">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-indigo-100 text-xs font-medium">
                Total Applications
              </p>

              <p className="text-2xl font-bold mt-1">
                {stats.overview.totalApplications}
              </p>
            </div>

            <FileText size={24} className="text-white/70" />
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-medium text-slate-400">
                Approval Rate
              </p>

              <p className="text-2xl font-bold text-slate-900 mt-1">
                {stats.overview.totalApplications > 0
                  ? Math.round(
                      (stats.overview.approvedApps /
                        stats.overview.totalApplications) *
                        100
                    )
                  : 0}
                %
              </p>
            </div>

            <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center">
              <CheckCircle
                size={20}
                className="text-emerald-600"
              />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-medium text-slate-400">
                Today's Appointments
              </p>

              <p className="text-2xl font-bold text-slate-900 mt-1">
                {stats.overview.todayAppointments}
              </p>
            </div>

            <div className="w-10 h-10 rounded-xl bg-violet-50 flex items-center justify-center">
              <Calendar
                size={20}
                className="text-violet-600"
              />
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}

