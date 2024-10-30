import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home.tsx'
import Now from './pages/Now.tsx'
import Previous from './pages/Previous.tsx'

function App() {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/now" element={<Now />} />
            <Route path="/previous" element={<Previous />} />
        </Routes>
    )
}

export default App