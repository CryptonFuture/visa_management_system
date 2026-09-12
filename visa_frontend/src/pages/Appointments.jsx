
import { useEffect, useState } from 'react'
import api from '../services/api'
import toast from 'react-hot-toast'
import {
  Plus,
  CalendarDays,
  Clock3,
  MapPin,
  UserRound,
  FileText,
  CheckCircle2,
  XCircle,
  AlertCircle,
  Sparkles,
  X,
  ClipboardCheck,
} from 'lucide-react'

export default function Appointments() {
  const [appointments, setAppointments] = useState([])
  const [applications, setApplications] = useState([])
  const [showModal, setShowModal] = useState(false)

  const [form, setForm] = useState({
    application: '',
    applicant: '',
    date: '',
    timeSlot: '09:00',
    type: 'biometrics',
    location: 'Main Office',
  })

  const fetchData = async () => {
    try {
      const [apts, apps] = await Promise.all([
        api.get('/appointments'),
        api.get('/applications'),
      ])

      setAppointments(apts.data.data)
      setApplications(apps.data.data)
    } catch {
      toast.error('Failed to load')
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      const app = applications.find(
        a => a._id === form.application
      )

      await api.post('/appointments', {
        ...form,
        applicant: app?.applicant?._id || app?.applicant,
      })

      toast.success('Appointment scheduled')
      setShowModal(false)

      setForm({
        application: '',
        applicant: '',
        date: '',
        timeSlot: '09:00',
        type: 'biometrics',
        location: 'Main Office',
      })

      fetchData()
    } catch (err) {
      toast.error(err.response?.data?.message || 'Error')
    }
  }

  const updateStatus = async (id, status) => {
    try {
      await api.patch(`/appointments/${id}/status`, { status })
      toast.success('Updated')
      fetchData()
    } catch {
      toast.error('Failed')
    }
  }

  const getStatusConfig = (status) => {
    switch (status) {
      case 'completed':
        return {
          label: 'Completed',
          icon: CheckCircle2,
          className: 'bg-emerald-50 text-emerald-700 border-emerald-100',
          dot: 'bg-emerald-500',
        }

      case 'cancelled':
        return {
          label: 'Cancelled',
          icon: XCircle,
          className: 'bg-red-50 text-red-700 border-red-100',
          dot: 'bg-red-500',
        }

      case 'no_show':
        return {
          label: 'No Show',
          icon: AlertCircle,
          className: 'bg-orange-50 text-orange-700 border-orange-100',
          dot: 'bg-orange-500',
        }

      default:
        return {
          label: 'Scheduled',
          icon: CalendarDays,
          className: 'bg-blue-50 text-blue-700 border-blue-100',
          dot: 'bg-blue-500',
        }
    }
  }

  const formatType = (type) =>
    type
      ?.replace(/_/g, ' ')
      .replace(/\b\w/g, char => char.toUpperCase())

  const scheduledCount = appointments.filter(
    a => a.status === 'scheduled'
  ).length

  const completedCount = appointments.filter(
    a => a.status === 'completed'
  ).length

  const cancelledCount = appointments.filter(
    a => a.status === 'cancelled'
  ).length

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

            <h1 className="text-2xl sm:text-3xl font-bold text-white">
              Appointments
            </h1>

            <p className="mt-2 max-w-xl text-sm text-slate-300">
              Schedule and manage applicant appointments, interviews,
              biometrics and document submissions.
            </p>
          </div>

          <button
            onClick={() => setShowModal(true)}
            className="inline-flex items-center justify-center gap-2 rounded-xl
                       bg-white px-5 py-3 text-sm font-semibold text-indigo-700
                       shadow-lg transition-all duration-200
                       hover:-translate-y-0.5 hover:bg-indigo-50
                       active:translate-y-0"
          >
            <Plus size={18} />
            Schedule Appointment
          </button>

        </div>
      </div>


      {/* =====================================================
          SUMMARY CARDS
      ===================================================== */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">

        {/* Total */}
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md">
          <div className="flex items-center justify-between">

            <div>
              <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
                Total Appointments
              </p>

              <p className="mt-2 text-2xl font-bold text-slate-900">
                {appointments.length}
              </p>
            </div>

            <div className="rounded-xl bg-indigo-50 p-3 text-indigo-600">
              <CalendarDays size={21} />
            </div>

          </div>
        </div>


        {/* Scheduled */}
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md">
          <div className="flex items-center justify-between">

            <div>
              <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
                Scheduled
              </p>

              <p className="mt-2 text-2xl font-bold text-blue-600">
                {scheduledCount}
              </p>
            </div>

            <div className="rounded-xl bg-blue-50 p-3 text-blue-600">
              <Clock3 size={21} />
            </div>

          </div>
        </div>


        {/* Completed */}
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md">
          <div className="flex items-center justify-between">

            <div>
              <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
                Completed
              </p>

              <p className="mt-2 text-2xl font-bold text-emerald-600">
                {completedCount}
              </p>
            </div>

            <div className="rounded-xl bg-emerald-50 p-3 text-emerald-600">
              <CheckCircle2 size={21} />
            </div>

          </div>
        </div>


        {/* Cancelled */}
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md">
          <div className="flex items-center justify-between">

            <div>
              <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
                Cancelled
              </p>

              <p className="mt-2 text-2xl font-bold text-red-600">
                {cancelledCount}
              </p>
            </div>

            <div className="rounded-xl bg-red-50 p-3 text-red-600">
              <XCircle size={21} />
            </div>

          </div>
        </div>

      </div>


      {/* =====================================================
          APPOINTMENTS TABLE
      ===================================================== */}
      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">

        {/* Table Header */}
        <div className="flex flex-col gap-3 border-b border-slate-100 px-5 py-4 sm:flex-row sm:items-center sm:justify-between">

          <div>
            <h2 className="text-base font-bold text-slate-900">
              Appointment Directory
            </h2>

            <p className="mt-0.5 text-xs text-slate-500">
              View and manage scheduled appointments
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs text-slate-500">
            <ClipboardCheck size={15} />
            {appointments.length} records
          </div>

        </div>


        <div className="overflow-x-auto">

          <table className="w-full text-sm">

            <thead>
              <tr className="border-b border-slate-100 bg-slate-50/70">

                <th className="whitespace-nowrap px-5 py-3.5 text-left text-[11px] font-bold uppercase tracking-wider text-slate-500">
                  Appointment
                </th>

                <th className="whitespace-nowrap px-5 py-3.5 text-left text-[11px] font-bold uppercase tracking-wider text-slate-500">
                  Applicant
                </th>

                <th className="whitespace-nowrap px-5 py-3.5 text-left text-[11px] font-bold uppercase tracking-wider text-slate-500">
                  Type
                </th>

                <th className="whitespace-nowrap px-5 py-3.5 text-left text-[11px] font-bold uppercase tracking-wider text-slate-500">
                  Date & Time
                </th>

                <th className="whitespace-nowrap px-5 py-3.5 text-left text-[11px] font-bold uppercase tracking-wider text-slate-500">
                  Location
                </th>

                <th className="whitespace-nowrap px-5 py-3.5 text-left text-[11px] font-bold uppercase tracking-wider text-slate-500">
                  Status
                </th>

                <th className="whitespace-nowrap px-5 py-3.5 text-right text-[11px] font-bold uppercase tracking-wider text-slate-500">
                  Action
                </th>

              </tr>
            </thead>


            <tbody className="divide-y divide-slate-100">

              {appointments.length === 0 ? (

                <tr>
                  <td colSpan="7" className="px-5 py-16 text-center">

                    <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-600">
                      <CalendarDays size={25} />
                    </div>

                    <h3 className="mt-4 text-base font-semibold text-slate-900">
                      No appointments
                    </h3>

                    <p className="mt-1 text-sm text-slate-500">
                      There are currently no appointments to display.
                    </p>

                  </td>
                </tr>

              ) : (

                appointments.map(a => {

                  const status = getStatusConfig(a.status)
                  const StatusIcon = status.icon

                  return (
                    <tr
                      key={a._id}
                      className="group transition-colors hover:bg-slate-50/70"
                    >

                      {/* Appointment */}
                      <td className="px-5 py-4">

                        <div className="flex items-center gap-3">

                          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-indigo-50 text-indigo-600">
                            <CalendarDays size={17} />
                          </div>

                          <div>
                            <p className="font-mono text-xs font-bold text-slate-800">
                              {a.appointmentNumber}
                            </p>

                            <p className="mt-0.5 text-[10px] text-slate-400">
                              Appointment ID
                            </p>
                          </div>

                        </div>

                      </td>


                      {/* Applicant */}
                      <td className="px-5 py-4">

                        <div className="flex items-center gap-2.5">

                          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-indigo-100 to-blue-100 text-indigo-600">
                            <UserRound size={15} />
                          </div>

                          <div>
                            <p className="font-semibold text-slate-800">
                              {a.applicant?.firstName}{' '}
                              {a.applicant?.lastName}
                            </p>
                          </div>

                        </div>

                      </td>


                      {/* Type */}
                      <td className="px-5 py-4">

                        <div className="inline-flex items-center gap-2 rounded-lg bg-slate-100 px-2.5 py-1.5">

                          <FileText
                            size={13}
                            className="text-slate-500"
                          />

                          <span className="text-xs font-medium text-slate-700">
                            {formatType(a.type)}
                          </span>

                        </div>

                      </td>


                      {/* Date + Time */}
                      <td className="px-5 py-4">

                        <div>
                          <div className="flex items-center gap-1.5 text-sm font-semibold text-slate-800">
                            <CalendarDays
                              size={14}
                              className="text-indigo-500"
                            />

                            {new Date(a.date).toLocaleDateString()}
                          </div>

                          <div className="mt-1 flex items-center gap-1.5 text-xs text-slate-400">
                            <Clock3 size={13} />
                            {a.timeSlot}
                          </div>
                        </div>

                      </td>


                      {/* Location */}
                      <td className="px-5 py-4">

                        <div className="flex max-w-[160px] items-center gap-1.5">

                          <MapPin
                            size={14}
                            className="shrink-0 text-slate-400"
                          />

                          <span className="truncate text-xs font-medium text-slate-600">
                            {a.location}
                          </span>

                        </div>

                      </td>


                      {/* Status */}
                      <td className="px-5 py-4">

                        <span
                          className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[11px] font-semibold ${status.className}`}
                        >

                          <span
                            className={`h-1.5 w-1.5 rounded-full ${status.dot}`}
                          />

                          <StatusIcon size={12} />

                          {status.label}

                        </span>

                      </td>


                      {/* Action */}
                      <td className="px-5 py-4 text-right">

                        <select
                          value={a.status}
                          onChange={e =>
                            updateStatus(
                              a._id,
                              e.target.value
                            )
                          }
                          className="cursor-pointer rounded-lg border border-slate-200 bg-white px-2.5 py-2 text-xs font-medium text-slate-600 outline-none transition focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 hover:border-slate-300"
                        >
                          {[
                            'scheduled',
                            'completed',
                            'cancelled',
                            'no_show',
                          ].map(s => (
                            <option key={s} value={s}>
                              {s.replace('_', ' ')}
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
          SCHEDULE APPOINTMENT MODAL
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
                    <CalendarDays size={21} />
                  </div>

                  <div>
                    <h2 className="text-lg font-bold text-white">
                      Schedule Appointment
                    </h2>

                    <p className="mt-0.5 text-xs text-indigo-200">
                      Create a new applicant appointment
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
            <form
              onSubmit={handleSubmit}
              className="space-y-4 p-6"
            >

              {/* Application */}
              <div>

                <label className="mb-1.5 flex items-center gap-1.5 text-xs font-semibold text-slate-600">
                  <FileText size={13} />
                  Application
                </label>

                <select
                  value={form.application}
                  onChange={e =>
                    setForm({
                      ...form,
                      application: e.target.value,
                    })
                  }
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-sm text-slate-800 outline-none transition focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-500/10"
                  required
                >
                  <option value="">
                    Select Application
                  </option>

                  {applications.map(a => (
                    <option key={a._id} value={a._id}>
                      {a.applicationNumber} —{' '}
                      {a.applicant?.firstName}{' '}
                      {a.applicant?.lastName}
                    </option>
                  ))}
                </select>

              </div>


              {/* Date + Time */}
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">

                <div>

                  <label className="mb-1.5 flex items-center gap-1.5 text-xs font-semibold text-slate-600">
                    <CalendarDays size={13} />
                    Appointment Date
                  </label>

                  <input
                    type="date"
                    value={form.date}
                    onChange={e =>
                      setForm({
                        ...form,
                        date: e.target.value,
                      })
                    }
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-sm text-slate-800 outline-none transition focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-500/10"
                    required
                  />

                </div>


                <div>

                  <label className="mb-1.5 flex items-center gap-1.5 text-xs font-semibold text-slate-600">
                    <Clock3 size={13} />
                    Time Slot
                  </label>

                  <select
                    value={form.timeSlot}
                    onChange={e =>
                      setForm({
                        ...form,
                        timeSlot: e.target.value,
                      })
                    }
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-sm text-slate-800 outline-none transition focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-500/10"
                  >
                    {[
                      '09:00',
                      '10:00',
                      '11:00',
                      '12:00',
                      '14:00',
                      '15:00',
                      '16:00',
                    ].map(t => (
                      <option key={t} value={t}>
                        {t}
                      </option>
                    ))}
                  </select>

                </div>

              </div>


              {/* Appointment Type */}
              <div>

                <label className="mb-1.5 flex items-center gap-1.5 text-xs font-semibold text-slate-600">
                  <ClipboardCheck size={13} />
                  Appointment Type
                </label>

                <select
                  value={form.type}
                  onChange={e =>
                    setForm({
                      ...form,
                      type: e.target.value,
                    })
                  }
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-sm text-slate-800 outline-none transition focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-500/10"
                >
                  <option value="biometrics">
                    Biometrics
                  </option>

                  <option value="interview">
                    Interview
                  </option>

                  <option value="document_submission">
                    Document Submission
                  </option>

                  <option value="collection">
                    Collection
                  </option>
                </select>

              </div>


              {/* Location */}
              <div>

                <label className="mb-1.5 flex items-center gap-1.5 text-xs font-semibold text-slate-600">
                  <MapPin size={13} />
                  Location
                </label>

                <input
                  placeholder="e.g. Main Office"
                  value={form.location}
                  onChange={e =>
                    setForm({
                      ...form,
                      location: e.target.value,
                    })
                  }
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-500/10"
                />

              </div>


              {/* Buttons */}
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
                  Schedule Appointment
                </button>

              </div>

            </form>

          </div>

        </div>

      )}

    </div>
  )
}
