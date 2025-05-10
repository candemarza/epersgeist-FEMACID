import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Ubicaciones from './pages/Ubicaciones'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/ubicaciones" element={<Ubicaciones />} />
    </Routes>
  )
}

export default App