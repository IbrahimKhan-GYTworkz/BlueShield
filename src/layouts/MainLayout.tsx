import { NavLink, Outlet } from "react-router-dom";

export default function MainLayout() {
  return (
    <>
      <header className="border-b border-navbar-border bg-background">
        <nav className="flex items-center gap-4 px-6 py-4">
          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              `text-button-link font-poppins ${isActive ? "font-semibold underline" : ""}`
            }
          >
            Home
          </NavLink>
          <NavLink
            to="/about"
            className={({ isActive }) =>
              `text-button-link font-poppins ${isActive ? "font-semibold underline" : ""}`
            }
          >
            About
          </NavLink>
        </nav>
      </header>

      <main className="p-6">
        <Outlet />
      </main>
    </>
  );
}
