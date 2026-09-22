import { renderToString } from 'react-dom/server'
import { StaticRouter } from 'react-router-dom/server'
import { AppRoutes } from './routes.jsx'

export function render(route) {
  return renderToString(
    <StaticRouter location={route}>
      <AppRoutes />
    </StaticRouter>,
  )
}
