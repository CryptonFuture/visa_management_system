
import { useEffect, useState } from 'react'
import api from '../services/api'
import toast from 'react-hot-toast'
import {
  Plus,
  Search,
  Users,
  Mail,
  Phone,
  Globe2,
  X,
  UserPlus,
  CreditCard,
} from 'lucide-react'

export default function Applicants() {
  const [applicants, setApplicants] = useState([])
  const [search, setSearch] = useState('')
  const [showModal, setShowModal] = useState(false)

  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    nationality: 'Pakistani',
    passportNumber: '',
    gender: 'male',
  })

  const fetchData = () => {
    api
      .get('/applicants', { params: { search } })
      .then(res => setApplicants(res.data.data))
      .catch(() => toast.error('Failed to load'))
  }

  useEffect(() => {
    fetchData()
  }, [search])

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      await api.post('/applicants', form)

      toast.success('Applicant created')
      setShowModal(false)

      setForm({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        nationality: 'Pakistani',
        passportNumber: '',
        gender: 'male',
      })

      fetchData()
    } catch (err) {
      toast.error(err.response?.data?.message || 'Error')
    }
  }

  const getInitials = (firstName, lastName) => {
    return `${firstName?.[0] || ''}${lastName?.[0] || ''}`.toUpperCase()
  }

  return (
    <div className="space-y-6 pb-8">

      {/* =====================================================
          HEADER
      ===================================================== */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5">

        <div>
          <div className="flex items-center gap-2 mb-2">
            <div className="w-8 h-8 rounded-lg bg-indigo-50 flex items-center justify-center">
              <Users size={17} className="text-indigo-600" />
            </div>

            <span className="text-xs font-semibold uppercase tracking-wider text-indigo-600">
              Management
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
            Applicants
          </h1>

          <p className="text-sm text-slate-500 mt-1">
            Manage and review all registered visa applicants.
          </p>
        </div>

        <button
          onClick={() => setShowModal(true)}
          className="inline-flex items-center justify-center gap-2 px-5 py-3 bg-gradient-to-r from-indigo-600 to-blue-600 text-white text-sm font-semibold rounded-xl shadow-lg shadow-indigo-600/20 hover:from-indigo-700 hover:to-blue-700 hover:-translate-y-0.5 transition-all"
        >
          <Plus size={18} />
          Add Applicant
        </button>
      </div>

      {/* =====================================================
          SUMMARY
      ===================================================== */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">

        <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">
          <div className="flex items-center justify-between">

            <div>
              <p className="text-xs font-medium text-slate-400">
                Total Applicants
              </p>

              <p className="text-2xl font-bold text-slate-900 mt-1">
                {applicants.length}
              </p>
            </div>

            <div className="w-11 h-11 rounded-xl bg-indigo-50 flex items-center justify-center">
              <Users size={21} className="text-indigo-600" />
            </div>
          </div>
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">
          <div className="flex items-center justify-between">

            <div>
              <p className="text-xs font-medium text-slate-400">
                Search Results
              </p>

              <p className="text-2xl font-bold text-slate-900 mt-1">
                {applicants.length}
              </p>
            </div>

            <div className="w-11 h-11 rounded-xl bg-blue-50 flex items-center justify-center">
              <Search size={20} className="text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-indigo-600 to-blue-700 rounded-2xl p-5 shadow-lg shadow-indigo-600/10 text-white">
          <div className="flex items-center justify-between">

            <div>
              <p className="text-xs font-medium text-indigo-100">
                Applicant Portal
              </p>

              <p className="text-lg font-bold mt-1">
                Active
              </p>

              <p className="text-[11px] text-indigo-100 mt-1">
                Applicant management system
              </p>
            </div>

            <Globe2 size={30} className="text-white/70" />
          </div>
        </div>

      </div>

      {/* =====================================================
          SEARCH
      ===================================================== */}
      <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm">

        <div className="relative">

          <Search
            className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
            size={19}
          />

          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search by name, passport, email or applicant ID..."
            className="w-full h-12 pl-11 pr-4 bg-slate-50 border border-slate-200 rounded-xl outline-none text-sm text-slate-800 placeholder:text-slate-400 transition-all focus:bg-white focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10"
          />

          {search && (
            <button
              onClick={() => setSearch('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 w-7 h-7 rounded-lg hover:bg-slate-200 flex items-center justify-center text-slate-400"
            >
              <X size={15} />
            </button>
          )}

        </div>

        <div className="flex items-center justify-between mt-3 px-1">
          <p className="text-xs text-slate-400">
            Showing{' '}
            <span className="font-semibold text-slate-600">
              {applicants.length}
            </span>{' '}
            applicant{applicants.length !== 1 ? 's' : ''}
          </p>
        </div>

      </div>

      {/* =====================================================
          TABLE
      ===================================================== */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">

        <div className="px-6 py-5 border-b border-slate-100 flex items-center justify-between">

          <div>
            <div className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-xl bg-indigo-50 flex items-center justify-center">
                <Users size={17} className="text-indigo-600" />
              </div>

              <h3 className="font-bold text-slate-900">
                Applicant Directory
              </h3>
            </div>

            <p className="text-xs text-slate-400 mt-2 ml-11">
              Complete list of registered applicants
            </p>
          </div>

          <span className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-50 border border-emerald-100 text-xs font-semibold text-emerald-700">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
            Live
          </span>

        </div>

        <div className="overflow-x-auto">

          <table className="w-full text-sm">

            <thead>
              <tr className="bg-slate-50/80 border-b border-slate-100">

                <th className="text-left px-6 py-3.5 text-[11px] font-bold uppercase tracking-wider text-slate-400">
                  Applicant
                </th>

                <th className="text-left px-5 py-3.5 text-[11px] font-bold uppercase tracking-wider text-slate-400">
                  Passport
                </th>

                <th className="text-left px-5 py-3.5 text-[11px] font-bold uppercase tracking-wider text-slate-400">
                  Nationality
                </th>

                <th className="text-left px-5 py-3.5 text-[11px] font-bold uppercase tracking-wider text-slate-400">
                  Contact
                </th>

                <th className="text-left px-5 py-3.5 text-[11px] font-bold uppercase tracking-wider text-slate-400">
                  Email
                </th>

              </tr>
            </thead>

            <tbody className="divide-y divide-slate-100">

              {applicants.length === 0 ? (

                <tr>
                  <td colSpan="5">

                    <div className="text-center py-16">

                      <div className="w-14 h-14 mx-auto rounded-2xl bg-slate-50 flex items-center justify-center">
                        <Users
                          size={25}
                          className="text-slate-300"
                        />
                      </div>

                      <p className="mt-4 font-semibold text-slate-600">
                        No applicants found
                      </p>

                      <p className="text-xs text-slate-400 mt-1">
                        Try changing your search or add a new applicant.
                      </p>

                    </div>

                  </td>
                </tr>

              ) : (

                applicants.map(a => (

                  <tr
                    key={a._id}
                    className="group hover:bg-slate-50/80 transition-colors"
                  >

                    {/* Applicant */}
                    <td className="px-6 py-4">

                      <div className="flex items-center gap-3">

                        <div className="w-10 h-10 shrink-0 rounded-xl bg-gradient-to-br from-indigo-100 to-blue-100 flex items-center justify-center">
                          <span className="text-xs font-bold text-indigo-600">
                            {getInitials(
                              a.firstName,
                              a.lastName
                            )}
                          </span>
                        </div>

                        <div>
                          <p className="font-semibold text-slate-800">
                            {a.firstName} {a.lastName}
                          </p>

                          <p className="text-[11px] text-slate-400 mt-0.5 font-mono">
                            {a.applicantId}
                          </p>
                        </div>

                      </div>

                    </td>

                    {/* Passport */}
                    <td className="px-5 py-4">

                      <div className="inline-flex items-center gap-2 px-2.5 py-1.5 rounded-lg bg-slate-50 border border-slate-200">
                        <CreditCard
                          size={14}
                          className="text-slate-400"
                        />

                        <span className="font-mono text-xs font-semibold text-slate-600">
                          {a.passportNumber}
                        </span>
                      </div>

                    </td>

                    {/* Nationality */}
                    <td className="px-5 py-4">

                      <div className="flex items-center gap-2">

                        <Globe2
                          size={15}
                          className="text-indigo-500"
                        />

                        <span className="text-sm text-slate-600">
                          {a.nationality}
                        </span>

                      </div>

                    </td>

                    {/* Phone */}
                    <td className="px-5 py-4">

                      <div className="flex items-center gap-2 text-slate-600">

                        <Phone
                          size={14}
                          className="text-slate-400"
                        />

                        <span className="text-xs">
                          {a.phone}
                        </span>

                      </div>

                    </td>

                    {/* Email */}
                    <td className="px-5 py-4">

                      <div className="flex items-center gap-2">

                        <Mail
                          size={14}
                          className="text-slate-400"
                        />

                        <span className="text-xs text-slate-600">
                          {a.email}
                        </span>

                      </div>

                    </td>

                  </tr>

                ))

              )}

            </tbody>

          </table>

        </div>
      </div>

      {/* =====================================================
          ADD APPLICANT MODAL
      ===================================================== */}
      {showModal && (

        <div className="fixed inset-0 bg-slate-950/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">

          <div className="bg-white rounded-3xl w-full max-w-lg shadow-2xl overflow-hidden">

            {/* Modal Header */}
            <div className="px-6 py-5 border-b border-slate-100 flex items-center justify-between">

              <div className="flex items-center gap-3">

                <div className="w-11 h-11 rounded-xl bg-indigo-50 flex items-center justify-center">
                  <UserPlus
                    size={21}
                    className="text-indigo-600"
                  />
                </div>

                <div>
                  <h2 className="text-lg font-bold text-slate-900">
                    Add Applicant
                  </h2>

                  <p className="text-xs text-slate-400 mt-0.5">
                    Create a new applicant profile
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

            {/* Modal Body */}
            <form
              onSubmit={handleSubmit}
              className="p-6 space-y-5"
            >

              {/* Names */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-2">
                    First Name
                  </label>

                  <input
                    placeholder="John"
                    value={form.firstName}
                    onChange={e =>
                      setForm({
                        ...form,
                        firstName: e.target.value,
                      })
                    }
                    className="w-full h-11 px-3.5 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none focus:bg-white focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 transition"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-2">
                    Last Name
                  </label>

                  <input
                    placeholder="Doe"
                    value={form.lastName}
                    onChange={e =>
                      setForm({
                        ...form,
                        lastName: e.target.value,
                      })
                    }
                    className="w-full h-11 px-3.5 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none focus:bg-white focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 transition"
                    required
                  />
                </div>

              </div>

              {/* Email */}
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-2">
                  Email Address
                </label>

                <div className="relative">
                  <Mail
                    size={16}
                    className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
                  />

                  <input
                    type="email"
                    placeholder="john@example.com"
                    value={form.email}
                    onChange={e =>
                      setForm({
                        ...form,
                        email: e.target.value,
                      })
                    }
                    className="w-full h-11 pl-10 pr-3.5 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none focus:bg-white focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 transition"
                    required
                  />
                </div>
              </div>

              {/* Phone + Passport */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-2">
                    Phone
                  </label>

                  <div className="relative">
                    <Phone
                      size={16}
                      className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
                    />

                    <input
                      placeholder="+92 300 1234567"
                      value={form.phone}
                      onChange={e =>
                        setForm({
                          ...form,
                          phone: e.target.value,
                        })
                      }
                      className="w-full h-11 pl-10 pr-3 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none focus:bg-white focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 transition"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-2">
                    Passport Number
                  </label>

                  <input
                    placeholder="AB1234567"
                    value={form.passportNumber}
                    onChange={e =>
                      setForm({
                        ...form,
                        passportNumber: e.target.value,
                      })
                    }
                    className="w-full h-11 px-3.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-mono uppercase outline-none focus:bg-white focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 transition"
                    required
                  />
                </div>

              </div>

              {/* Nationality + Gender */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-2">
                    Nationality
                  </label>

                  <input
                    placeholder="Pakistani"
                    value={form.nationality}
                    onChange={e =>
                      setForm({
                        ...form,
                        nationality: e.target.value,
                      })
                    }
                    className="w-full h-11 px-3.5 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none focus:bg-white focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 transition"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-2">
                    Gender
                  </label>

                  <select
                    value={form.gender}
                    onChange={e =>
                      setForm({
                        ...form,
                        gender: e.target.value,
                      })
                    }
                    className="w-full h-11 px-3.5 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none focus:bg-white focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 transition"
                  >
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>
                </div>

              </div>

              {/* Actions */}
              <div className="flex gap-3 pt-2">

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
                  Save Applicant
                </button>

              </div>

            </form>
          </div>
        </div>
      )}

    </div>
  )
}

