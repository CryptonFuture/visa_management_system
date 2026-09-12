import { useEffect, useState } from 'react'
import api from '../services/api'
import toast from 'react-hot-toast'
import {
  Plus,
  FileText,
  Globe2,
  User,
  CreditCard,
  X,
  BriefcaseBusiness,
  Clock3,
  CheckCircle2,
  XCircle,
  AlertCircle,
  Send,
} from 'lucide-react'

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

const statusIcons = {
  submitted: Send,
  under_review: Clock3,
  approved: CheckCircle2,
  rejected: XCircle,
  documents_required: AlertCircle,
  issued: CheckCircle2,
}

export default function Applications() {
  const [applications, setApplications] = useState([])
  const [applicants, setApplicants] = useState([])
  const [visaTypes, setVisaTypes] = useState([])
  const [filter, setFilter] = useState('')
  const [showModal, setShowModal] = useState(false)

  const [form, setForm] = useState({
    applicant: '',
    visaType: '',
    destinationCountry: '',
    purpose: '',
    priority: 'normal',
  })

  const fetchData = async () => {
    try {
      const [apps, apps2, types] = await Promise.all([
        api.get('/applications', {
          params: filter ? { status: filter } : {},
        }),
        api.get('/applicants'),
        api.get('/visa-types'),
      ])

      setApplications(apps.data.data)
      setApplicants(apps2.data.data)
      setVisaTypes(types.data.data)
    } catch {
      toast.error('Failed to load')
    }
  }

  useEffect(() => {
    fetchData()
  }, [filter])

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      await api.post('/applications', form)

      toast.success('Application created')
      setShowModal(false)

      setForm({
        applicant: '',
        visaType: '',
        destinationCountry: '',
        purpose: '',
        priority: 'normal',
      })

      fetchData()
    } catch (err) {
      toast.error(err.response?.data?.message || 'Error')
    }
  }

  const updateStatus = async (id, status) => {
    try {
      await api.patch(`/applications/${id}/status`, { status })
      toast.success('Status updated')
      fetchData()
    } catch {
      toast.error('Update failed')
    }
  }

  const filterItems = [
    {
      value: '',
      label: 'All',
      icon: FileText,
    },
    {
      value: 'submitted',
      label: 'Submitted',
      icon: Send,
    },
    {
      value: 'under_review',
      label: 'Under Review',
      icon: Clock3,
    },
    {
      value: 'approved',
      label: 'Approved',
      icon: CheckCircle2,
    },
    {
      value: 'rejected',
      label: 'Rejected',
      icon: XCircle,
    },
    {
      value: 'issued',
      label: 'Issued',
      icon: CheckCircle2,
    },
  ]

  const totalApproved = applications.filter(
    a => a.status === 'approved'
  ).length

  const totalPending = applications.filter(
    a => ['submitted', 'under_review', 'documents_required'].includes(a.status)
  ).length

  return (
    <div className="space-y-6 pb-8">

      {/* =====================================================
          HEADER
      ===================================================== */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5">

        <div>
          <div className="flex items-center gap-2 mb-2">

            <div className="w-8 h-8 rounded-lg bg-indigo-50 flex items-center justify-center">
              <BriefcaseBusiness
                size={17}
                className="text-indigo-600"
              />
            </div>

            <span className="text-xs font-semibold uppercase tracking-wider text-indigo-600">
              Visa Management
            </span>

          </div>

          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
            Applications
          </h1>

          <p className="text-sm text-slate-500 mt-1">
            Manage visa applications, review status and processing.
          </p>
        </div>

        <button
          onClick={() => setShowModal(true)}
          className="inline-flex items-center justify-center gap-2 px-5 py-3 bg-gradient-to-r from-indigo-600 to-blue-600 text-white text-sm font-semibold rounded-xl shadow-lg shadow-indigo-600/20 hover:from-indigo-700 hover:to-blue-700 hover:-translate-y-0.5 transition-all"
        >
          <Plus size={18} />
          New Application
        </button>

      </div>

      {/* =====================================================
          SUMMARY CARDS
      ===================================================== */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">

        <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">
          <div className="flex items-center justify-between">

            <div>
              <p className="text-xs font-medium text-slate-400">
                Total Applications
              </p>

              <p className="text-2xl font-bold text-slate-900 mt-1">
                {applications.length}
              </p>

              <p className="text-[11px] text-slate-400 mt-1">
                Current results
              </p>
            </div>

            <div className="w-11 h-11 rounded-xl bg-indigo-50 flex items-center justify-center">
              <FileText
                size={21}
                className="text-indigo-600"
              />
            </div>

          </div>
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">
          <div className="flex items-center justify-between">

            <div>
              <p className="text-xs font-medium text-slate-400">
                Pending Review
              </p>

              <p className="text-2xl font-bold text-slate-900 mt-1">
                {totalPending}
              </p>

              <p className="text-[11px] text-amber-500 mt-1 font-medium">
                Requires attention
              </p>
            </div>

            <div className="w-11 h-11 rounded-xl bg-amber-50 flex items-center justify-center">
              <Clock3
                size={21}
                className="text-amber-600"
              />
            </div>

          </div>
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">
          <div className="flex items-center justify-between">

            <div>
              <p className="text-xs font-medium text-slate-400">
                Approved
              </p>

              <p className="text-2xl font-bold text-slate-900 mt-1">
                {totalApproved}
              </p>

              <p className="text-[11px] text-emerald-500 mt-1 font-medium">
                Successfully approved
              </p>
            </div>

            <div className="w-11 h-11 rounded-xl bg-emerald-50 flex items-center justify-center">
              <CheckCircle2
                size={21}
                className="text-emerald-600"
              />
            </div>

          </div>
        </div>

        <div className="bg-gradient-to-br from-indigo-600 to-blue-700 rounded-2xl p-5 shadow-lg shadow-indigo-600/10 text-white">
          <div className="flex items-center justify-between">

            <div>
              <p className="text-xs font-medium text-indigo-100">
                Visa Processing
              </p>

              <p className="text-lg font-bold mt-1">
                Active
              </p>

              <p className="text-[11px] text-indigo-100 mt-1">
                Application management system
              </p>
            </div>

            <Globe2
              size={30}
              className="text-white/70"
            />

          </div>
        </div>

      </div>

      {/* =====================================================
          FILTERS
      ===================================================== */}
      <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm">

        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">

          <div>
            <p className="text-sm font-bold text-slate-800">
              Application Status
            </p>

            <p className="text-xs text-slate-400 mt-0.5">
              Filter applications by current status
            </p>
          </div>

          <div className="flex gap-2 flex-wrap">

            {filterItems.map(item => {
              const Icon = item.icon
              const active = filter === item.value

              return (
                <button
                  key={item.value}
                  onClick={() => setFilter(item.value)}
                  className={`
                    inline-flex items-center gap-1.5
                    px-3 py-2 rounded-xl text-xs font-semibold
                    border transition-all
                    ${
                      active
                        ? 'bg-indigo-600 text-white border-indigo-600 shadow-md shadow-indigo-600/20'
                        : 'bg-white text-slate-500 border-slate-200 hover:bg-slate-50 hover:border-slate-300'
                    }
                  `}
                >
                  <Icon size={14} />
                  {item.label}
                </button>
              )
            })}

          </div>

        </div>
      </div>

      {/* =====================================================
          APPLICATION TABLE
      ===================================================== */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">

        <div className="px-6 py-5 border-b border-slate-100 flex items-center justify-between">

          <div>
            <div className="flex items-center gap-2">

              <div className="w-9 h-9 rounded-xl bg-indigo-50 flex items-center justify-center">
                <FileText
                  size={17}
                  className="text-indigo-600"
                />
              </div>

              <h3 className="font-bold text-slate-900">
                Application Directory
              </h3>

            </div>

            <p className="text-xs text-slate-400 mt-2 ml-11">
              Review and update visa application records
            </p>
          </div>

          <span className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-50 border border-emerald-100 text-xs font-semibold text-emerald-700">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            Live
          </span>

        </div>

        <div className="overflow-x-auto">

          <table className="w-full text-sm">

            <thead>
              <tr className="bg-slate-50/80 border-b border-slate-100">

                <th className="text-left px-6 py-3.5 text-[11px] font-bold uppercase tracking-wider text-slate-400">
                  Application
                </th>

                <th className="text-left px-5 py-3.5 text-[11px] font-bold uppercase tracking-wider text-slate-400">
                  Applicant
                </th>

                <th className="text-left px-5 py-3.5 text-[11px] font-bold uppercase tracking-wider text-slate-400">
                  Visa Type
                </th>

                <th className="text-left px-5 py-3.5 text-[11px] font-bold uppercase tracking-wider text-slate-400">
                  Destination
                </th>

                <th className="text-left px-5 py-3.5 text-[11px] font-bold uppercase tracking-wider text-slate-400">
                  Fee
                </th>

                <th className="text-left px-5 py-3.5 text-[11px] font-bold uppercase tracking-wider text-slate-400">
                  Status
                </th>

                <th className="text-right px-6 py-3.5 text-[11px] font-bold uppercase tracking-wider text-slate-400">
                  Action
                </th>

              </tr>
            </thead>

            <tbody className="divide-y divide-slate-100">

              {applications.length === 0 ? (

                <tr>
                  <td colSpan="7">

                    <div className="text-center py-16">

                      <div className="w-14 h-14 mx-auto rounded-2xl bg-slate-50 flex items-center justify-center">
                        <FileText
                          size={25}
                          className="text-slate-300"
                        />
                      </div>

                      <p className="mt-4 font-semibold text-slate-600">
                        No applications found
                      </p>

                      <p className="text-xs text-slate-400 mt-1">
                        Applications matching this filter will appear here.
                      </p>

                    </div>

                  </td>
                </tr>

              ) : (

                applications.map(a => {

                  const StatusIcon =
                    statusIcons[a.status] || FileText

                  return (
                    <tr
                      key={a._id}
                      className="group hover:bg-slate-50/80 transition-colors"
                    >

                      {/* Application Number */}
                      <td className="px-6 py-4">

                        <div className="flex items-center gap-3">

                          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-100 to-blue-100 flex items-center justify-center">
                            <FileText
                              size={17}
                              className="text-indigo-600"
                            />
                          </div>

                          <div>
                            <p className="font-bold text-sm text-slate-800 font-mono">
                              {a.applicationNumber}
                            </p>

                            <p className="text-[11px] text-slate-400 mt-0.5">
                              Visa Application
                            </p>
                          </div>

                        </div>

                      </td>

                      {/* Applicant */}
                      <td className="px-5 py-4">

                        <div className="flex items-center gap-2.5">

                          <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center">
                            <User
                              size={15}
                              className="text-slate-500"
                            />
                          </div>

                          <span className="text-sm font-medium text-slate-700">
                            {a.applicant?.firstName}{' '}
                            {a.applicant?.lastName}
                          </span>

                        </div>

                      </td>

                      {/* Visa Type */}
                      <td className="px-5 py-4">

                        <span className="text-sm text-slate-600">
                          {a.visaType?.name}
                        </span>

                      </td>

                      {/* Destination */}
                      <td className="px-5 py-4">

                        <div className="flex items-center gap-2">

                          <Globe2
                            size={15}
                            className="text-indigo-500"
                          />

                          <span className="text-sm text-slate-600">
                            {a.destinationCountry}
                          </span>

                        </div>

                      </td>

                      {/* Fee */}
                      <td className="px-5 py-4">

                        <div className="flex items-center gap-2">

                          <CreditCard
                            size={14}
                            className="text-slate-400"
                          />

                          <span className="text-sm font-semibold text-slate-700">
                            Rs {a.fee?.toLocaleString()}
                          </span>

                        </div>

                      </td>

                      {/* Status */}
                      <td className="px-5 py-4">

                        <span
                          className={`
                            inline-flex items-center gap-1.5
                            text-[11px] font-semibold
                            px-2.5 py-1.5 rounded-full border
                            capitalize
                            ${
                              statusColors[a.status] ||
                              'bg-slate-100 text-slate-600 border-slate-200'
                            }
                          `}
                        >
                          <StatusIcon size={12} />
                          {a.status?.replace(/_/g, ' ')}
                        </span>

                      </td>

                      {/* Action */}
                      <td className="px-6 py-4 text-right">

                        <select
                          value={a.status}
                          onChange={e =>
                            updateStatus(
                              a._id,
                              e.target.value
                            )
                          }
                          className="h-9 text-xs font-medium bg-white border border-slate-200 rounded-lg px-2.5 outline-none cursor-pointer text-slate-600 hover:border-indigo-300 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 transition"
                        >
                          {[
                            'submitted',
                            'under_review',
                            'documents_required',
                            'approved',
                            'rejected',
                            'issued',
                            'cancelled',
                          ].map(s => (
                            <option
                              key={s}
                              value={s}
                            >
                              {s.replace(/_/g, ' ')}
                            </option>
                          ))}
                        </select>

                      </td>

                    </tr>
                  )
                })

              )}

            </tbody>

          </table>

        </div>
      </div>

      {/* =====================================================
          NEW APPLICATION MODAL
      ===================================================== */}
      {showModal && (

        <div className="fixed inset-0 bg-slate-950/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">

          <div className="bg-white rounded-3xl w-full max-w-lg shadow-2xl overflow-hidden">

            {/* Header */}
            <div className="px-6 py-5 border-b border-slate-100 flex items-center justify-between">

              <div className="flex items-center gap-3">

                <div className="w-11 h-11 rounded-xl bg-indigo-50 flex items-center justify-center">
                  <FileText
                    size={21}
                    className="text-indigo-600"
                  />
                </div>

                <div>
                  <h2 className="text-lg font-bold text-slate-900">
                    New Application
                  </h2>

                  <p className="text-xs text-slate-400 mt-0.5">
                    Create a new visa application
                  </p>
                </div>

              </div>

              <button
                type="button"
                onClick={() => setShowModal(false)}
                className="w-9 h-9 rounded-xl hover:bg-slate-100 flex items-center justify-center text-slate-400 hover:text-slate-600 transition"
              >
                <X size={18} />
              </button>

            </div>

            {/* Form */}
            <form
              onSubmit={handleSubmit}
              className="p-6 space-y-5"
            >

              {/* Applicant */}
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-2">
                  Applicant
                </label>

                <div className="relative">
                  <User
                    size={16}
                    className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
                  />

                  <select
                    value={form.applicant}
                    onChange={e =>
                      setForm({
                        ...form,
                        applicant: e.target.value,
                      })
                    }
                    className="w-full h-11 pl-10 pr-3.5 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none focus:bg-white focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 transition"
                    required
                  >
                    <option value="">
                      Select Applicant
                    </option>

                    {applicants.map(a => (
                      <option
                        key={a._id}
                        value={a._id}
                      >
                        {a.firstName} {a.lastName} ({a.applicantId})
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Visa Type */}
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-2">
                  Visa Type
                </label>

                <div className="relative">
                  <Globe2
                    size={16}
                    className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
                  />

                  <select
                    value={form.visaType}
                    onChange={e =>
                      setForm({
                        ...form,
                        visaType: e.target.value,
                      })
                    }
                    className="w-full h-11 pl-10 pr-3.5 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none focus:bg-white focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 transition"
                    required
                  >
                    <option value="">
                      Select Visa Type
                    </option>

                    {visaTypes.map(v => (
                      <option
                        key={v._id}
                        value={v._id}
                      >
                        {v.name} — Rs {v.fee}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Destination */}
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-2">
                  Destination Country
                </label>

                <div className="relative">
                  <Globe2
                    size={16}
                    className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
                  />

                  <input
                    placeholder="e.g. United Kingdom"
                    value={form.destinationCountry}
                    onChange={e =>
                      setForm({
                        ...form,
                        destinationCountry: e.target.value,
                      })
                    }
                    className="w-full h-11 pl-10 pr-3.5 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none focus:bg-white focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 transition"
                    required
                  />
                </div>
              </div>

              {/* Purpose */}
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-2">
                  Purpose of Travel
                  <span className="text-slate-400 font-normal">
                    {' '}
                    (Optional)
                  </span>
                </label>

                <textarea
                  placeholder="Enter purpose of travel..."
                  value={form.purpose}
                  onChange={e =>
                    setForm({
                      ...form,
                      purpose: e.target.value,
                    })
                  }
                  rows={3}
                  className="w-full px-3.5 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none resize-none focus:bg-white focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 transition"
                />
              </div>

              {/* Priority */}
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-2">
                  Application Priority
                </label>

                <div className="grid grid-cols-3 gap-2">

                  {[
                    {
                      value: 'normal',
                      label: 'Normal',
                    },
                    {
                      value: 'urgent',
                      label: 'Urgent',
                    },
                    {
                      value: 'express',
                      label: 'Express',
                    },
                  ].map(item => (

                    <button
                      key={item.value}
                      type="button"
                      onClick={() =>
                        setForm({
                          ...form,
                          priority: item.value,
                        })
                      }
                      className={`
                        h-10 rounded-xl border text-xs font-semibold transition
                        ${
                          form.priority === item.value
                            ? 'bg-indigo-50 border-indigo-500 text-indigo-700'
                            : 'bg-slate-50 border-slate-200 text-slate-500 hover:bg-white'
                        }
                      `}
                    >
                      {item.label}
                    </button>

                  ))}

                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-3 pt-1">

                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="flex-1 h-11 border border-slate-200 bg-white hover:bg-slate-50 text-slate-600 font-semibold text-sm rounded-xl transition"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="flex-1 h-11 bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700 text-white font-semibold text-sm rounded-xl shadow-lg shadow-indigo-600/20 transition"
                >
                  Create Application
                </button>

              </div>

            </form>
          </div>
        </div>
      )}

    </div>
  )
}

