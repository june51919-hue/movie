import { BrowserRouter, Routes, Route } from 'react-router-dom'
import LandingPage from './pages/LandingPage'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        {/* 다음 단계: 테스트, 결과 페이지 */}
        <Route path="/test" element={<div style={{ color: '#fff', padding: 40 }}>테스트 페이지 — 준비 중</div>} />
      </Routes>
    </BrowserRouter>
  )
}
