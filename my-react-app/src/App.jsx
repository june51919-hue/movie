import { useEffect, useRef } from 'react'
import './App.css'

/* ── Matrix Rain Canvas ── */
function MatrixRain() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    let animId

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener('resize', resize)

    const fontSize = 14
    let cols = Math.floor(canvas.width / fontSize)
    const drops = Array(cols).fill(1)

    const chars = 'アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ'

    function draw() {
      ctx.fillStyle = 'rgba(0,0,0,0.05)'
      ctx.fillRect(0, 0, canvas.width, canvas.height)
      ctx.fillStyle = '#00ff41'
      ctx.font = `${fontSize}px 'Courier New', monospace`

      cols = Math.floor(canvas.width / fontSize)
      while (drops.length < cols) drops.push(1)

      for (let i = 0; i < cols; i++) {
        const char = chars[Math.floor(Math.random() * chars.length)]
        ctx.fillText(char, i * fontSize, drops[i] * fontSize)
        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) drops[i] = 0
        drops[i]++
      }
      animId = requestAnimationFrame(draw)
    }
    draw()

    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return <canvas ref={canvasRef} className="matrix-canvas" />
}

/* ── Data ── */
const META = [
  { key: '개봉', val: '1999년 3월 31일' },
  { key: '감독', val: '워쇼스키 자매' },
  { key: '장르', val: 'SF / 액션 / 철학' },
  { key: '러닝타임', val: '136분' },
  { key: '제작비', val: '6,300만 달러' },
  { key: '전세계 흥행', val: '4억 6,700만 달러' },
  { key: '수상', val: '아카데미 4관왕 (시각효과 외)' },
]

const CHARACTERS = [
  { name: 'Neo', actor: 'Keanu Reeves', desc: '"The One". 해커 토머스 앤더슨에서 인류의 구원자로 각성하는 주인공.' },
  { name: 'Morpheus', actor: 'Laurence Fishburne', desc: '오라클의 예언을 믿고 네오를 찾아 나선 자유의 전사. 노브셔도 호의 선장.' },
  { name: 'Trinity', actor: 'Carrie-Anne Moss', desc: '뛰어난 전투 능력과 해킹 실력을 갖춘 반군 전사. 네오의 운명적 파트너.' },
  { name: 'Agent Smith', actor: 'Hugo Weaving', desc: '매트릭스를 수호하는 요원. 냉혹한 논리와 압도적인 힘으로 반군을 추격한다.' },
  { name: 'Oracle', actor: 'Gloria Foster', desc: '예언을 전하는 신비로운 존재. 달콤한 쿠키와 함께 진실을 건넨다.' },
  { name: 'Tank', actor: 'Marcus Chong', desc: '매트릭스에서 태어나지 않은 순수한 인간. 노브셔도 호의 오퍼레이터.' },
]

const QUOTES = [
  { text: '"당신이 진실을 알기를 원한다면, 진실은 당신을 자유롭게 할 것입니다. 그러나 먼저 진실이 당신을 화나게 할 것입니다."', speaker: 'Morpheus' },
  { text: '"파란 약을 먹으면 이야기는 끝납니다. 당신은 침대에서 깨어나 믿고 싶은 것을 믿게 됩니다. 빨간 약을 먹으면 이상한 나라에 남아 토끼굴이 얼마나 깊은지 보여드리겠습니다."', speaker: 'Morpheus' },
  { text: '"숟가락은 없다."', speaker: 'Spoon Boy' },
  { text: '"나는 미래가 정해져 있다고 생각하지 않는다. 우리는 각자 자신의 길을 만들어간다."', speaker: 'Trinity' },
]

const TRILOGY = [
  { num: '01', title: 'THE MATRIX', year: '1999', active: true, note: '빨간 약 혹은 파란 약. 현실의 베일이 벗겨지다.' },
  { num: '02', title: 'RELOADED', year: '2003', active: false, note: '선택의 진정한 의미와 시스템의 균형.' },
  { num: '03', title: 'REVOLUTIONS', year: '2003', active: false, note: '인간과 기계, 최후의 전쟁.' },
]

/* ── App ── */
export default function App() {
  return (
    <>
      <MatrixRain />
      <div className="site">

        {/* Nav */}
        <nav className="nav">
          <span className="nav-logo">Matrix</span>
          <ul className="nav-links">
            <li><a href="#about">소개</a></li>
            <li><a href="#characters">등장인물</a></li>
            <li><a href="#quotes">명대사</a></li>
            <li><a href="#trilogy">시리즈</a></li>
          </ul>
        </nav>

        {/* Hero */}
        <div className="hero">
          <p className="hero-eyebrow">1999 · 워쇼스키 자매</p>
          <h1 className="hero-title">THE MATRIX</h1>
          <p className="hero-subtitle">Wake up, Neo...</p>
          <p className="hero-tagline">
            "매트릭스가 무엇인지 아무도 설명할 수 없다. 직접 눈으로 보아야 한다."
          </p>
          <div className="hero-buttons">
            <button className="btn" onClick={() => document.getElementById('about').scrollIntoView({ behavior: 'smooth' })}>
              진실을 보다
            </button>
            <button className="btn btn-ghost" onClick={() => document.getElementById('trilogy').scrollIntoView({ behavior: 'smooth' })}>
              시리즈 전체
            </button>
          </div>
        </div>

        <hr className="divider" />

        {/* About */}
        <section id="about">
          <p className="section-label">About</p>
          <h2 className="section-title">영화 소개</h2>
          <div className="about-grid">
            <div className="about-text">
              <p>
                1999년, 워쇼스키 자매가 만들어낸 <strong style={{ color: '#00ff41' }}>《매트릭스》</strong>는
                SF 영화의 역사를 완전히 바꾼 작품입니다. 철학적 질문과 혁명적인 시각효과,
                동양 무술을 결합한 이 영화는 개봉 즉시 문화적 아이콘이 되었습니다.
              </p>
              <p>
                컴퓨터 해커 토머스 앤더슨은 어느 날 모피어스라는 인물을 통해
                충격적인 진실을 마주합니다. 자신이 살아온 세계 전체가 인공지능이 만들어낸
                거대한 시뮬레이션 — 바로 '매트릭스'였던 것입니다.
              </p>
              <p>
                버렛타임(Bullet Time) 기법, 홍콩 누아르 스타일의 액션, 플라톤의 동굴 우화,
                장 보드리야르의 시뮬라크르 이론이 녹아든 이 작품은 지금도 수많은
                철학적 담론과 팝 컬처에 영향을 미치고 있습니다.
              </p>
            </div>
            <div className="about-meta">
              {META.map(({ key, val }) => (
                <div className="meta-item" key={key}>
                  <span className="meta-key">{key}</span>
                  <span className="meta-val">{val}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <hr className="divider" />

        {/* Characters */}
        <section id="characters">
          <p className="section-label">Characters</p>
          <h2 className="section-title">등장인물</h2>
          <div className="characters-grid">
            {CHARACTERS.map((c) => (
              <div className="char-card" key={c.name}>
                <div className="char-name">{c.name}</div>
                <div className="char-actor">{c.actor}</div>
                <div className="char-desc">{c.desc}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Quotes */}
        <div className="quotes-section" id="quotes">
          <div className="quotes-inner">
            <p className="section-label">Quotes</p>
            <h2 className="section-title">명대사</h2>
            <div className="quotes-grid">
              {QUOTES.map((q, i) => (
                <div className="quote-card" key={i}>
                  <p className="quote-text">{q.text}</p>
                  <span className="quote-speaker">— {q.speaker}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Trilogy */}
        <section id="trilogy">
          <p className="section-label">Trilogy</p>
          <h2 className="section-title">매트릭스 시리즈</h2>
          <div className="trilogy-grid">
            {TRILOGY.map((t) => (
              <div className={`trilogy-card${t.active ? ' active' : ''}`} key={t.num}>
                <div className="trilogy-num">{t.num}</div>
                <div className="trilogy-title">{t.title}</div>
                <div className="trilogy-year">{t.year}</div>
                <div className="trilogy-note">{t.note}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Footer */}
        <footer className="footer">
          <p>THE MATRIX &copy; 1999 Warner Bros. Pictures · Village Roadshow Pictures</p>
          <p style={{ marginTop: '0.4rem' }}>이 페이지는 팬이 제작한 비상업적 소개 사이트입니다.</p>
        </footer>

      </div>
    </>
  )
}
