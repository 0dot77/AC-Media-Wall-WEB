import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout.tsx'
import Home from './pages/Home.tsx'
import Now from './pages/Now.tsx'
import Previous from './pages/Previous.tsx'

function App() {
    return (
        <Layout>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/now" element={<Now />} />
                <Route path="/previous" element={<Previous />} />
        </Routes>
        </Layout>
    )
}

export default App