import { Link } from 'react-router-dom'

const NotFound = () => {
  return (
    <main>
      <h1>404 — Page not found</h1>
      <p>
        Go back <Link to="/">home</Link>.
      </p>
    </main>
  )
}

export default NotFound
