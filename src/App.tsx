import { useRoutes } from 'react-router-dom'
import routes from './routes'
import './App.css'

const App = () => {
  const content = useRoutes(routes)
  return content
}

export default App
