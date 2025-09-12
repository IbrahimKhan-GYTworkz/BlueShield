import { Suspense, lazy } from 'react'
import { Route, Routes } from 'react-router-dom'
import MainLayout from '../layouts/MainLayout'

const Home = lazy(() => import('../pages/Homepage/Homepage'))
const NotFound = lazy(() => import('../pages/NotFound/NotFound'))

export default function AppRoutes() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} /> {/* path="/" */}
          {/* path="/about" */}
          <Route path="*" element={<NotFound />} /> {/* catch-all */}
        </Route>
      </Routes>
    </Suspense>
  )
}
