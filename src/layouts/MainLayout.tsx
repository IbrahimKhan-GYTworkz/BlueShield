import { NavLink, Outlet } from 'react-router-dom'

function Navbar() {
  return (
    <div className="w-full bg-white sticky top-0 z-50 shadow-sm">
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex h-16 items-center justify-between">
          {/* Left Logo */}
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-md bg-[#005AA3]" />
            <div className="text-sm leading-tight">
              <div className="font-semibold tracking-tight">blue</div>
              <div className="text-[10px] -mt-1">CALIFORNIA</div>
            </div>
          </div>

          {/* Right Menu */}
          <div className="flex items-center gap-6 text-sm text-gray-700">
            <button className="inline-flex items-center gap-1">
              Plans <span>▾</span>
            </button>
            <button className="inline-flex items-center gap-1">
              Find a doctor <span>▾</span>
            </button>
            <button className="inline-flex items-center gap-1">
              Be well <span>▾</span>
            </button>
            <button className="inline-flex items-center gap-1">
              Get more <span>▾</span>
            </button>
            <button className="ml-4 rounded-full border border-gray-400 px-5 py-2 text-sm font-medium hover:bg-gray-50">
              Get Started
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function MainLayout() {
  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-bgcream">
        <Outlet />
      </main>
    </>
  )
}
