
import { useEffect, useState } from 'react'
import axios from 'axios'
import toast from 'react-hot-toast'
import {
  TrendingUp,
  Clock,
  Sparkles,
  BarChart3,
  CheckCircle2,
  Timer,
  Wallet,
  Globe2,
  AlertTriangle,
  Zap,
  Activity,
} from 'lucide-react'

const PYTHON_API = "https://visapython-service.vercel.app/"

export default function Analytics() {
  const [summary, setSummary] = useState(null)
  const [processing, setProcessing] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    Promise.all([
      axios.get(`${PYTHON_API}/reports/summary`).catch(() => null),
      axios.get(`${PYTHON_API}/reports/processing-time`).catch(() => null),
    ])
      .then(([s, p]) => {
        if (s) setSummary(s.data.data)
        if (p) setProcessing(p.data.data)

        if (!s && !p) {
          toast.error('Python service offline (port 8002)')
        }
      })
      .finally(() => setLoading(false))
  }, [])

  if (loading) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <div className="text-center">
          <div className="mx-auto flex h-12 w-12 animate-pulse items-center justify-center rounded-2xl bg-indigo-50 text-indigo-600">
            <BarChart3 size={23} />
          </div>

          <p className="mt-4 text-sm font-medium text-slate-600">
            Loading analytics...
          </p>

          <p className="mt-1 text-xs text-slate-400">
            Fetching insights from Python FastAPI
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-7">

      {/* =====================================================
          HEADER
      ===================================================== */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-slate-950 via-indigo-950 to-indigo-900 p-6 sm:p-7 shadow-xl">

        <div className="absolute -right-16 -top-20 h-56 w-56 rounded-full bg-indigo-500/20 blur-3xl" />
        <div className="absolute -bottom-24 left-1/3 h-48 w-48 rounded-full bg-blue-500/10 blur-3xl" />

        <div className="relative flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">

          <div>
            <div className="mb-2 flex items-center gap-2 text-indigo-300">
              <Sparkles size={15} />

              <span className="text-xs font-semibold uppercase tracking-[0.18em]">
                Visa Management
              </span>
            </div>

            <h1 className="text-2xl font-bold text-white sm:text-3xl">
              Analytics
            </h1>

            <p className="mt-2 max-w-xl text-sm text-slate-300">
              Monitor application performance, approval rates, revenue and
              visa processing insights in real time.
            </p>
          </div>

          <div className="flex w-fit items-center gap-2 rounded-xl border border-white/10 bg-white/10 px-4 py-2.5 backdrop-blur-sm">
            <Activity size={16} className="text-emerald-400" />

            <span className="text-xs font-medium text-slate-200">
              Powered by Python FastAPI
            </span>
          </div>

        </div>
      </div>


      {/* =====================================================
          OFFLINE STATE
      ===================================================== */}
      {!summary && !processing && (
        <div className="overflow-hidden rounded-2xl border border-amber-200 bg-white shadow-sm">

          <div className="flex flex-col items-center px-6 py-12 text-center">

            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-amber-50 text-amber-600">
              <AlertTriangle size={25} />
            </div>

            <h3 className="mt-4 text-base font-bold text-slate-900">
              Python Service is Offline
            </h3>

            <p className="mt-1 max-w-md text-sm text-slate-500">
              Analytics data could not be loaded because the FastAPI
              service is not currently running.
            </p>

            <div className="mt-5 rounded-xl border border-amber-100 bg-amber-50 px-4 py-3 text-left">

              <p className="mb-1 text-xs font-semibold text-amber-700">
                Start the Python service
              </p>

              <code className="break-all text-xs text-amber-800">
                cd python-service && uvicorn main:app --reload --port 8002
              </code>

            </div>

          </div>
        </div>
      )}


      {/* =====================================================
          APPLICATION SUMMARY
      ===================================================== */}
      {summary && (
        <div className="space-y-5">

          {/* Section Heading */}
          <div className="flex items-center gap-3">

            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
              <TrendingUp size={19} />
            </div>

            <div>
              <h2 className="text-base font-bold text-slate-900">
                Application Summary
              </h2>

              <p className="text-xs text-slate-500">
                Overall application performance
              </p>
            </div>

          </div>


          {/* KPI Cards */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">

            {/* Total Applications */}
            <div className="group rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md">

              <div className="flex items-start justify-between">

                <div>
                  <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
                    Total Applications
                  </p>

                  <p className="mt-2 text-2xl font-bold text-slate-900">
                    {summary.total_applications}
                  </p>

                  <p className="mt-1 text-xs text-slate-400">
                    All submitted applications
                  </p>
                </div>

                <div className="rounded-xl bg-indigo-50 p-3 text-indigo-600 transition group-hover:bg-indigo-600 group-hover:text-white">
                  <BarChart3 size={21} />
                </div>

              </div>

            </div>


            {/* Approval Rate */}
            <div className="group rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md">

              <div className="flex items-start justify-between">

                <div>
                  <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
                    Approval Rate
                  </p>

                  <p className="mt-2 text-2xl font-bold text-emerald-600">
                    {summary.approval_rate}%
                  </p>

                  <p className="mt-1 text-xs text-slate-400">
                    Application success rate
                  </p>
                </div>

                <div className="rounded-xl bg-emerald-50 p-3 text-emerald-600 transition group-hover:bg-emerald-600 group-hover:text-white">
                  <CheckCircle2 size={21} />
                </div>

              </div>

            </div>


            {/* Processing */}
            <div className="group rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md">

              <div className="flex items-start justify-between">

                <div>
                  <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
                    Avg Processing
                  </p>

                  <p className="mt-2 text-2xl font-bold text-blue-600">
                    {summary.avg_processing_days}
                    <span className="ml-1 text-sm font-medium text-slate-400">
                      days
                    </span>
                  </p>

                  <p className="mt-1 text-xs text-slate-400">
                    Average processing time
                  </p>
                </div>

                <div className="rounded-xl bg-blue-50 p-3 text-blue-600 transition group-hover:bg-blue-600 group-hover:text-white">
                  <Timer size={21} />
                </div>

              </div>

            </div>


            {/* Revenue */}
            <div className="group rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md">

              <div className="flex items-start justify-between">

                <div>
                  <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
                    Revenue
                  </p>

                  <p className="mt-2 text-2xl font-bold text-violet-600">
                    Rs {summary.revenue?.toLocaleString()}
                  </p>

                  <p className="mt-1 text-xs text-slate-400">
                    Total application revenue
                  </p>
                </div>

                <div className="rounded-xl bg-violet-50 p-3 text-violet-600 transition group-hover:bg-violet-600 group-hover:text-white">
                  <Wallet size={21} />
                </div>

              </div>

            </div>

          </div>


          {/* =================================================
              BREAKDOWN
          ================================================= */}
          <div className="grid grid-cols-1 gap-5 xl:grid-cols-2">

            {/* By Visa Type */}
            <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">

              <div className="border-b border-slate-100 px-5 py-4">

                <div className="flex items-center gap-3">

                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-indigo-50 text-indigo-600">
                    <FileTextIcon />
                  </div>

                  <div>
                    <h3 className="text-sm font-bold text-slate-900">
                      By Visa Type
                    </h3>

                    <p className="text-xs text-slate-500">
                      Applications and revenue by category
                    </p>
                  </div>

                </div>

              </div>


              <div className="p-5">

                {summary.by_visa_type?.length ? (
                  <div className="space-y-3">

                    {summary.by_visa_type.map((v, i) => (

                      <div
                        key={i}
                        className="group rounded-xl border border-slate-100 bg-slate-50/70 p-4 transition hover:border-indigo-100 hover:bg-indigo-50/40"
                      >

                        <div className="flex items-center justify-between gap-4">

                          <div className="flex min-w-0 items-center gap-3">

                            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white text-indigo-600 shadow-sm">
                              <span className="text-xs font-bold">
                                {i + 1}
                              </span>
                            </div>

                            <span className="truncate text-sm font-semibold text-slate-800">
                              {v.type}
                            </span>

                          </div>

                          <div className="shrink-0 text-right">

                            <p className="text-sm font-bold text-slate-800">
                              {v.count}
                              <span className="ml-1 text-xs font-normal text-slate-400">
                                apps
                              </span>
                            </p>

                            <p className="mt-0.5 text-xs font-medium text-indigo-600">
                              Rs {v.revenue?.toLocaleString()}
                            </p>

                          </div>

                        </div>

                      </div>

                    ))}

                  </div>
                ) : (
                  <div className="py-8 text-center text-sm text-slate-400">
                    No visa type data available
                  </div>
                )}

              </div>

            </div>


            {/* Top Destinations */}
            <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">

              <div className="border-b border-slate-100 px-5 py-4">

                <div className="flex items-center gap-3">

                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
                    <Globe2 size={18} />
                  </div>

                  <div>
                    <h3 className="text-sm font-bold text-slate-900">
                      Top Destinations
                    </h3>

                    <p className="text-xs text-slate-500">
                      Most requested destination countries
                    </p>
                  </div>

                </div>

              </div>


              <div className="p-5">

                {summary.top_destinations?.length ? (
                  <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">

                    {summary.top_destinations.map((d, i) => (

                      <div
                        key={i}
                        className="flex items-center gap-3 rounded-xl border border-slate-100 bg-slate-50/70 p-3 transition hover:border-blue-100 hover:bg-blue-50/50"
                      >

                        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-white text-blue-600 shadow-sm">
                          <Globe2 size={16} />
                        </div>

                        <div className="min-w-0">
                          <p className="truncate text-sm font-semibold text-slate-800">
                            {d}
                          </p>

                          <p className="text-[11px] text-slate-400">
                            Destination #{i + 1}
                          </p>
                        </div>

                      </div>

                    ))}

                  </div>
                ) : (
                  <div className="py-8 text-center text-sm text-slate-400">
                    No destination data available
                  </div>
                )}

              </div>

            </div>

          </div>

        </div>
      )}


      {/* =====================================================
          PROCESSING TIME ANALYSIS
      ===================================================== */}
      {processing && (
        <div className="space-y-5">

          {/* Section Heading */}
          <div className="flex items-center gap-3">

            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
              <Clock size={19} />
            </div>

            <div>
              <h2 className="text-base font-bold text-slate-900">
                Processing Time Analysis
              </h2>

              <p className="text-xs text-slate-500">
                Visa processing performance and turnaround time
              </p>
            </div>

          </div>


          {/* Processing KPI */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">

            {/* Average */}
            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">

              <div className="flex items-center justify-between">

                <div>
                  <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
                    Average Days
                  </p>

                  <p className="mt-2 text-2xl font-bold text-slate-900">
                    {processing.average_days}
                  </p>
                </div>

                <div className="rounded-xl bg-slate-100 p-3 text-slate-600">
                  <Clock size={21} />
                </div>

              </div>

            </div>


            {/* Fastest */}
            <div className="rounded-2xl border border-emerald-100 bg-white p-5 shadow-sm">

              <div className="flex items-center justify-between">

                <div>
                  <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
                    Fastest
                  </p>

                  <p className="mt-2 text-2xl font-bold text-emerald-600">
                    {processing.fastest}
                  </p>

                  <p className="mt-1 text-xs text-slate-400">
                    Minimum processing time
                  </p>
                </div>

                <div className="rounded-xl bg-emerald-50 p-3 text-emerald-600">
                  <Zap size={21} />
                </div>

              </div>

            </div>


            {/* Slowest */}
            <div className="rounded-2xl border border-red-100 bg-white p-5 shadow-sm">

              <div className="flex items-center justify-between">

                <div>
                  <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
                    Slowest
                  </p>

                  <p className="mt-2 text-2xl font-bold text-red-600">
                    {processing.slowest}
                  </p>

                  <p className="mt-1 text-xs text-slate-400">
                    Maximum processing time
                  </p>
                </div>

                <div className="rounded-xl bg-red-50 p-3 text-red-600">
                  <Clock size={21} />
                </div>

              </div>

            </div>

          </div>


          {/* Processing By Type */}
          <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">

            <div className="border-b border-slate-100 px-5 py-4">

              <div className="flex items-center gap-3">

                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
                  <TrendingUp size={18} />
                </div>

                <div>
                  <h3 className="text-sm font-bold text-slate-900">
                    Processing by Visa Type
                  </h3>

                  <p className="text-xs text-slate-500">
                    Average processing time for each visa category
                  </p>
                </div>

              </div>

            </div>


            <div className="p-5">

              {processing.by_type?.length ? (
                <div className="space-y-3">

                  {processing.by_type.map((t, i) => (

                    <div
                      key={i}
                      className="flex items-center justify-between rounded-xl border border-slate-100 bg-slate-50/70 px-4 py-3 transition hover:border-blue-100 hover:bg-blue-50/40"
                    >

                      <div className="flex items-center gap-3">

                        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white text-blue-600 shadow-sm">
                          <Clock size={14} />
                        </div>

                        <span className="text-sm font-semibold text-slate-800">
                          {t.type}
                        </span>

                      </div>

                      <div className="flex items-center gap-2">

                        <span className="text-sm font-bold text-blue-600">
                          {t.avg_days}
                        </span>

                        <span className="text-xs text-slate-400">
                          days avg
                        </span>

                      </div>

                    </div>

                  ))}

                </div>
              ) : (
                <div className="py-8 text-center text-sm text-slate-400">
                  No processing data available
                </div>
              )}

            </div>

          </div>

        </div>
      )}

    </div>
  )
}


/* ============================================================
   SMALL ICON COMPONENT
============================================================ */
function FileTextIcon() {
  return (
    <svg
      width="17"
      height="17"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z" />
      <path d="M14 2v6h6" />
      <path d="M8 13h8" />
      <path d="M8 17h6" />
    </svg>
  )
}
