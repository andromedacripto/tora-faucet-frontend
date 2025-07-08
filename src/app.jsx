import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Faucet from './components/Faucet'
import Footer from './components/Footer'
import Terms from './pages/Terms'
import Privacy from './pages/Privacy'
import './index.css'

function App() {
  return (
    <Router>
      <div className="container">
        <Routes>
          <Route path="/" element={<Faucet />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/privacy" element={<Privacy />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  )
}

export default App
