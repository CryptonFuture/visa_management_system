
import { useEffect, useState } from 'react'
import api from '../services/api'
import toast from 'react-hot-toast'
import {
  Plus,
  Plane,
  Clock3,
  CalendarDays,
  FileText,
  CreditCard,
  X,
  Sparkles,
  ShieldCheck,
} from 'lucide-react'

export default function VisaTypes() {
  const [types, setTypes] = useState([])
  const [showModal, setShowModal] = useState(false)

  const [form, setForm] = useState({
    name: '',
    code: '',
    durationDays: 90,
    fee: '',
    processingDays: 15,
    description: '',
  })

  const fetchData = () => {
    api.get('/visa-types')
      .then(res => setTypes(res.data.data))
      .catch(() => toast.error('Failed to load'))
  }

  useEffect(() => {
    fetchData()
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      await api.post('/visa-types', {
        ...form,
        fee: +form.fee,
        durationDays: +form.durationDays,
        processingDays: +form.processingDays,
      })

      toast.success('Visa type created')
      setShowModal(false)

      setForm({
        name: '',
        code: '',
        durationDays: 90,
        fee: '',
        processingDays: 15,
        description: '',
      })

      fetchData()
    } catch (err) {
      toast.error(err.response?.data?.message || 'Error')
    }
  }

  return (
    <div className="space-y-7">

      {/* =====================================================
          HEADER
      ===================================================== */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-slate-950 via-indigo-950 to-indigo-900 p-6 sm:p-7 shadow-xl">

        {/* Decorative circles */}
        <div className="absolute -right-16 -top-20 h-52 w-52 rounded-full bg-indigo-500/20 blur-2xl" />
        <div className="absolute -bottom-20 left-1/3 h-44 w-44 rounded-full bg-blue-500/10 blur-2xl" />

        <div className="relative flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">

          <div>
            <div className="mb-2 flex items-center gap-2 text-indigo-300">
              <Sparkles size={15} />
              <span className="text-xs font-semibold uppercase tracking-[0.18em]">
                Visa Management
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-bold text-white">
              Visa Types
            </h1>

            <p className="mt-2 max-w-xl text-sm text-slate-300">
              Manage available visa categories, fees, duration and processing
              requirements from one place.
            </p>
          </div>

          <button
            onClick={() => setShowModal(true)}
            className="inline-flex items-center justify-center gap-2 rounded-xl
                       bg-white px-5 py-3 text-sm font-semibold text-indigo-700
                       shadow-lg shadow-black/10 transition-all duration-200
                       hover:-translate-y-0.5 hover:bg-indigo-50 active:translate-y-0"
          >
            <Plus size={18} />
            Add Visa Type
          </button>

        </div>
      </div>


      {/* =====================================================
          SUMMARY
      ===================================================== */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">

        <div className="group rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
                Total Visa Types
              </p>
              <p className="mt-2 text-2xl font-bold text-slate-900">
                {types.length}
              </p>
            </div>

            <div className="rounded-xl bg-indigo-50 p-3 text-indigo-600">
              <Plane size={21} />
            </div>
          </div>
        </div>

        <div className="group rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
                Average Processing
              </p>
              <p className="mt-2 text-2xl font-bold text-slate-900">
                {types.length
                  ? Math.round(
                      types.reduce(
                        (sum, item) => sum + Number(item.processingDays || 0),
                        0
                      ) / types.length
                    )
                  : 0}
                <span className="ml-1 text-sm font-medium text-slate-400">
                  days
                </span>
              </p>
            </div>

            <div className="rounded-xl bg-amber-50 p-3 text-amber-600">
              <Clock3 size={21} />
            </div>
          </div>
        </div>

        <div className="group rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
                Active Configuration
              </p>
              <p className="mt-2 text-2xl font-bold text-emerald-600">
                Ready
              </p>
            </div>

            <div className="rounded-xl bg-emerald-50 p-3 text-emerald-600">
              <ShieldCheck size={21} />
            </div>
          </div>
        </div>

      </div>


      {/* =====================================================
          VISA TYPE CARDS
      ===================================================== */}
      {types.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-slate-300 bg-white py-16 text-center shadow-sm">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-600">
            <Plane size={25} />
          </div>

          <h3 className="mt-4 text-lg font-semibold text-slate-900">
            No visa types yet
          </h3>

          <p className="mt-1 text-sm text-slate-500">
            Create your first visa type to get started.
          </p>

          <button
            onClick={() => setShowModal(true)}
            className="mt-5 inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-indigo-700"
          >
            <Plus size={17} />
            Add Visa Type
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">

          {types.map((t) => (
            <div
              key={t._id}
              className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-indigo-200 hover:shadow-xl"
            >

              {/* Top accent */}
              <div className="h-1.5 bg-gradient-to-r from-indigo-600 via-blue-500 to-cyan-400" />

              <div className="p-5">

                {/* Card Header */}
                <div className="flex items-start justify-between gap-3">

                  <div className="flex min-w-0 items-center gap-3">

                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-50 to-blue-50 text-indigo-600 transition group-hover:from-indigo-600 group-hover:to-blue-600 group-hover:text-white">
                      <Plane size={20} />
                    </div>

                    <div className="min-w-0">
                      <h3 className="truncate text-lg font-bold text-slate-900">
                        {t.name}
                      </h3>

                      <span className="mt-1 inline-flex rounded-md bg-slate-100 px-2 py-0.5 font-mono text-[11px] font-semibold tracking-wider text-slate-600">
                        {t.code}
                      </span>
                    </div>

                  </div>

                  <div className="shrink-0 text-right">
                    <p className="text-[10px] font-semibold uppercase tracking-wide text-slate-400">
                      Fee
                    </p>

                    <p className="mt-0.5 text-base font-bold text-indigo-600">
                      Rs {t.fee?.toLocaleString()}
                    </p>
                  </div>

                </div>


                {/* Description */}
                <div className="mt-5 min-h-[48px]">
                  <p className="line-clamp-2 text-sm leading-6 text-slate-500">
                    {t.description || 'No description available for this visa type.'}
                  </p>
                </div>


                {/* Stats */}
                <div className="mt-5 grid grid-cols-2 gap-3">

                  <div className="rounded-xl border border-slate-100 bg-slate-50 p-3">
                    <div className="flex items-center gap-2">
                      <CalendarDays
                        size={15}
                        className="text-indigo-500"
                      />

                      <span className="text-[11px] font-medium text-slate-400">
                        Duration
                      </span>
                    </div>

                    <p className="mt-1 text-sm font-bold text-slate-800">
                      {t.durationDays}
                      <span className="ml-1 text-xs font-normal text-slate-400">
                        days
                      </span>
                    </p>
                  </div>

                  <div className="rounded-xl border border-slate-100 bg-slate-50 p-3">
                    <div className="flex items-center gap-2">
                      <Clock3
                        size={15}
                        className="text-amber-500"
                      />

                      <span className="text-[11px] font-medium text-slate-400">
                        Processing
                      </span>
                    </div>

                    <p className="mt-1 text-sm font-bold text-slate-800">
                      {t.processingDays}
                      <span className="ml-1 text-xs font-normal text-slate-400">
                        days
                      </span>
                    </p>
                  </div>

                </div>


                {/* Documents */}
                {t.requiredDocuments?.length > 0 && (
                  <div className="mt-5 border-t border-slate-100 pt-4">

                    <div className="mb-2 flex items-center gap-2">
                      <FileText
                        size={14}
                        className="text-slate-400"
                      />

                      <p className="text-xs font-semibold text-slate-500">
                        Required Documents
                      </p>
                    </div>

                    <div className="flex flex-wrap gap-1.5">
                      {t.requiredDocuments.map((d, i) => (
                        <span
                          key={i}
                          className="rounded-lg border border-indigo-100 bg-indigo-50 px-2.5 py-1 text-[11px] font-medium text-indigo-700"
                        >
                          {d}
                        </span>
                      ))}
                    </div>

                  </div>
                )}

              </div>
            </div>
          ))}

        </div>
      )}


      {/* =====================================================
          ADD VISA TYPE MODAL
      ===================================================== */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 p-4 backdrop-blur-sm">

          <div
            className="absolute inset-0"
            onClick={() => setShowModal(false)}
          />

          <div className="relative w-full max-w-lg overflow-hidden rounded-2xl bg-white shadow-2xl">

            {/* Modal Header */}
            <div className="bg-gradient-to-br from-slate-950 via-indigo-950 to-indigo-900 px-6 py-5">

              <div className="flex items-start justify-between">

                <div className="flex items-center gap-3">

                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/10 text-white ring-1 ring-white/10">
                    <Plus size={21} />
                  </div>

                  <div>
                    <h2 className="text-lg font-bold text-white">
                      Add Visa Type
                    </h2>

                    <p className="mt-0.5 text-xs text-indigo-200">
                      Create a new visa configuration
                    </p>
                  </div>

                </div>

                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="rounded-lg p-2 text-slate-300 transition hover:bg-white/10 hover:text-white"
                >
                  <X size={19} />
                </button>

              </div>

            </div>


            {/* Modal Body */}
            <form onSubmit={handleSubmit} className="space-y-4 p-6">

              {/* Name + Code */}
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">

                <div>
                  <label className="mb-1.5 block text-xs font-semibold text-slate-600">
                    Visa Name
                  </label>

                  <input
                    placeholder="e.g. Tourist Visa"
                    value={form.name}
                    onChange={e =>
                      setForm({
                        ...form,
                        name: e.target.value,
                      })
                    }
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-500/10"
                    required
                  />
                </div>

                <div>
                  <label className="mb-1.5 block text-xs font-semibold text-slate-600">
                    Visa Code
                  </label>

                  <input
                    placeholder="e.g. TRV"
                    value={form.code}
                    onChange={e =>
                      setForm({
                        ...form,
                        code: e.target.value,
                      })
                    }
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 font-mono text-sm uppercase text-slate-900 outline-none transition placeholder:normal-case placeholder:font-sans placeholder:text-slate-400 focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-500/10"
                    required
                  />
                </div>

              </div>


              {/* Description */}
              <div>
                <label className="mb-1.5 block text-xs font-semibold text-slate-600">
                  Description
                </label>

                <textarea
                  rows={3}
                  placeholder="Describe this visa type..."
                  value={form.description}
                  onChange={e =>
                    setForm({
                      ...form,
                      description: e.target.value,
                    })
                  }
                  className="w-full resize-none rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-500/10"
                />
              </div>


              {/* Numeric Fields */}
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">

                <div>
                  <label className="mb-1.5 flex items-center gap-1.5 text-xs font-semibold text-slate-600">
                    <CalendarDays size={13} />
                    Duration
                  </label>

                  <input
                    type="number"
                    placeholder="90"
                    value={form.durationDays}
                    onChange={e =>
                      setForm({
                        ...form,
                        durationDays: e.target.value,
                      })
                    }
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm outline-none transition focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-500/10"
                    required
                  />
                </div>

                <div>
                  <label className="mb-1.5 flex items-center gap-1.5 text-xs font-semibold text-slate-600">
                    <CreditCard size={13} />
                    Fee
                  </label>

                  <input
                    type="number"
                    placeholder="5000"
                    value={form.fee}
                    onChange={e =>
                      setForm({
                        ...form,
                        fee: e.target.value,
                      })
                    }
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm outline-none transition focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-500/10"
                    required
                  />
                </div>

                <div>
                  <label className="mb-1.5 flex items-center gap-1.5 text-xs font-semibold text-slate-600">
                    <Clock3 size={13} />
                    Processing
                  </label>

                  <input
                    type="number"
                    placeholder="15"
                    value={form.processingDays}
                    onChange={e =>
                      setForm({
                        ...form,
                        processingDays: e.target.value,
                      })
                    }
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm outline-none transition focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-500/10"
                  />
                </div>

              </div>


              {/* Footer Buttons */}
              <div className="flex gap-3 border-t border-slate-100 pt-5">

                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="flex-1 rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-semibold text-slate-600 transition hover:bg-slate-50"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="flex-1 rounded-xl bg-gradient-to-r from-indigo-600 to-blue-600 px-4 py-2.5 text-sm font-semibold text-white shadow-lg shadow-indigo-600/20 transition hover:from-indigo-700 hover:to-blue-700 hover:shadow-indigo-600/30"
                >
                  Create Visa Type
                </button>

              </div>

            </form>

          </div>
        </div>
      )}

    </div>
  )
}

