import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './LandingPage.css'

/* ─── 데이터 ─────────────────────────────────────────────── */

const POSTERS = [
  ['Before Sunrise', 'p1'],
  ['Parasite', 'p2'],
  ['Spirited Away', 'p3'],
  ['Black Swan', 'p4'],
  ['Dune', 'p5'],
  ['Mad Max', 'p6'],
  ['Eternal Sunshine', 'p7'],
  ['Dark Knight', 'p8'],
  ['Zodiac', 'p9'],
  ['Alien', 'p10'],
  ['Paterson', 'p11'],
  ['Spotlight', 'p12'],
  ['LOTR', 'p1'],
  ['Nightcrawler', 'p2'],
  ['Avatar', 'p3'],
  ['Inception', 'p4'],
  ['Her', 'p5'],
  ['Blade Runner', 'p6'],
  ['Whiplash', 'p7'],
  ['Interstellar', 'p8'],
  ['Portrait', 'p9'],
  ['Arrival', 'p10'],
  ['Midsommar', 'p11'],
  ['Mulholland Dr', 'p12'],
]

const RESULT_TYPES = [
  {
    code: 'FEI',
    name: '판타지\n감성 몽상가',
    desc: '현실보다 아름다운 세계를 꿈꾸는 사람',
    bars: [80, 20, 30],
  },
  {
    code: 'RES',
    name: '현실\n감성 관찰자',
    desc: '인간군상을 따뜻하게 담은 영화',
    bars: [25, 75, 60],
  },
  {
    code: 'FTS',
    name: '판타지\n스릴 액션파',
    desc: '박진감과 스펙터클을 원하는 사람',
    bars: [90, 15, 70],
  },
  {
    code: 'RTI',
    name: '현실\n스릴 내면파',
    desc: '심리 스릴러와 반전에 빠져드는 사람',
    bars: [20, 85, 25],
  },
  {
    code: 'FES',
    name: '판타지\n감성 세계관러',
    desc: '방대한 세계관과 서사에 몰입하는 사람',
    bars: [85, 30, 80],
  },
  {
    code: 'RTS',
    name: '현실\n스릴 사회파',
    desc: '사회 고발과 범죄 현실을 파고드는 사람',
    bars: [15, 90, 65],
  },
  {
    code: 'REI',
    name: '현실\n감성 독백러',
    desc: '잔잔하고 내면을 파고드는 영화를 사랑',
    bars: [10, 70, 20],
  },
  {
    code: 'FTI',
    name: '판타지\n스릴 다크너',
    desc: '다크 판타지와 복잡한 주인공에 빠진 사람',
    bars: [75, 80, 15],
  },
]

/* ─── 서브 컴포넌트: 포스터 배경 ─────────────────────────── */
function PosterGrid() {
  const COLS = 6
  const chunkSize = Math.ceil(POSTERS.length / COLS)

  const columns = Array.from({ length: COLS }, (_, i) =>
    [...POSTERS, ...POSTERS].slice(
      (i * chunkSize) % POSTERS.length,
      (i * chunkSize) % POSTERS.length + POSTERS.length
    )
  )

  return (
    <div className="poster-grid" aria-hidden="true">
      {columns.map((col, ci) => (
        <div key={ci} className="poster-col">
          {col.map(([title, cls], pi) => (
            <div key={pi} className={`poster-card ${cls}`}>
              <span>{title}</span>
            </div>
          ))}
        </div>
      ))}
    </div>
  )
}

/* ─── 서브 컴포넌트: 카운터 ──────────────────────────────── */
function AnimatedCounter({ target, duration = 2000 }) {
  const [count, setCount] = useState(0)
  const ref = useRef(null)
  const started = useRef(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true
          const start = performance.now()
          const tick = (now) => {
            const progress = Math.min((now - start) / duration, 1)
            const eased = 1 - Math.pow(1 - progress, 3) // ease-out cubic
            setCount(Math.floor(eased * target))
            if (progress < 1) requestAnimationFrame(tick)
          }
          requestAnimationFrame(tick)
        }
      },
      { threshold: 0.5 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [target, duration])

  return (
    <span ref={ref}>
      <strong>{count.toLocaleString()}</strong>
    </span>
  )
}

/* ─── 서브 컴포넌트: 결과 카드 ──────────────────────────── */
function ResultCard({ code, name, desc, bars }) {
  const labels = ['판', '감', '개']
  return (
    <div className="result-card">
      <div className="result-card-code">{code}</div>
      <div className="result-card-name" style={{ whiteSpace: 'pre-line' }}>{name}</div>
      <div className="result-card-desc">{desc}</div>
      <div className="result-card-bar">
        {bars.map((val, i) => (
          <div key={i} className="bar-row">
            <span className="bar-label">{labels[i]}</span>
            <div className="bar-track">
              <div className="bar-fill" style={{ width: `${val}%` }} />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

/* ─── 서브 컴포넌트: 캐러셀 ──────────────────────────────── */
function ResultsCarousel() {
  const doubled = [...RESULT_TYPES, ...RESULT_TYPES]
  return (
    <section className="carousel-section">
      <p className="carousel-label">지금 막 나온 결과들</p>
      <div className="carousel-track-wrapper">
        <div className="carousel-track">
          {doubled.map((item, i) => (
            <ResultCard key={i} {...item} />
          ))}
        </div>
      </div>
    </section>
  )
}

/* ─── 메인 컴포넌트: 랜딩 페이지 ────────────────────────── */
export default function LandingPage() {
  const navigate = useNavigate()

  return (
    <div className="landing">
      <PosterGrid />
      <div className="overlay" />

      {/* 네비게이션 */}
      <nav className="landing-nav">
        <span className="logo">CINETYPE</span>
        <span className="nav-badge">🎬 영화 성향 테스트</span>
      </nav>

      {/* 히어로 */}
      <main className="hero">
        <p className="hero-eyebrow">Movie Personality Test</p>

        <h1 className="hero-title">
          나는 어떤<br />
          <em>영화 사람</em>일까?
        </h1>

        <p className="hero-subtitle">
          7가지 질문으로 알아보는 나의 영화 성향 유형<br />
          8가지 유형 중 당신은 어디에 속할까요
        </p>

        <div className="hero-cta">
          <button
            className="cta-button"
            onClick={() => navigate('/test')}
          >
            <span>테스트 시작하기</span>
            <svg
              className="cta-arrow"
              width="18"
              height="18"
              viewBox="0 0 18 18"
              fill="none"
            >
              <path
                d="M3 9H15M15 9L10 4M15 9L10 14"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
          <span className="cta-hint">회원가입 없이 바로 시작 · 약 2분 소요</span>
        </div>
      </main>

      {/* 통계 */}
      <div className="stats-bar">
        <div className="stats-dot" />
        <p className="stats-text">
          오늘{' '}
          <AnimatedCounter target={42891} />{' '}
          명이 테스트했어요
        </p>
      </div>

      {/* 결과 캐러셀 */}
      <ResultsCarousel />
    </div>
  )
}
