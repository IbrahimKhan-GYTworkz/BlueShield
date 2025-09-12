import { NavLink, Outlet } from 'react-router-dom'

export default function MainLayout() {
  return (
    <>
      <header>
        <nav>
          <NavLink to="/" end>
            Home
          </NavLink>{' '}
          | <NavLink to="/about">About</NavLink>
        </nav>
      </header>

      <main style={{ padding: '1rem' }}>
        <Outlet />
      </main>
    </>
  )
}
