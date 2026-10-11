import { useEffect, useState } from 'react'
import { ArrowDown, ArrowRight, ArrowUpRight, Heart, Home, Menu, MessageCircle, Plus, Search, Send, Users, X } from 'lucide-react'
import './index.css'

type AppView = 'inicio' | 'circulos' | 'conversas'

function BrandMark({ className = '' }: { className?: string }) {
  return <svg className={className} viewBox="0 0 64 64" fill="none" aria-hidden="true"><path d="M27.5 11C16.2 11 7 18.8 7 28.5c0 4.2 1.7 8.1 4.6 11.1L9.5 51l11.2-5.1c2.1.7 4.4 1.1 6.8 1.1 11.3 0 20.5-7.8 20.5-18.5S38.8 11 27.5 11Z" stroke="currentColor" strokeWidth="4.5" strokeLinejoin="round"/><path d="M40.5 20C49.6 21.6 56 28.3 56 36.5c0 3.8-1.5 7.3-4 10.1L54 56l-10-4.5c-1.3.3-2.7.5-4.2.5-5.2 0-9.8-1.7-13-4.8" stroke="currentColor" strokeWidth="4.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
}

function BrandLogo({ light = false, large = false }: { light?: boolean; large?: boolean }) {
  return <a className={`brand-logo ${light ? 'brand-logo-light' : ''} ${large ? 'brand-logo-large' : ''}`} href="#inicio" aria-label="Entre Nós, voltar ao início"><BrandMark className="brand-logo-mark"/><span>entre nós<span className="brand-period">.</span></span></a>
}

function AppPreview() {
  const [view, setView] = useState<AppView>('inicio')
  const [liked, setLiked] = useState(false)
  const [joined, setJoined] = useState(false)
  const [message, setMessage] = useState('')
  const [sentMessages, setSentMessages] = useState<string[]>([])
  const sendMessage = () => { if (message.trim()) { setSentMessages((current) => [...current, message.trim()]); setMessage('') } }

  return <div className="phone" aria-label="Demonstração interativa do aplicativo Entre Nós"><div className="phone-screen">
    <div className="phone-status"><span>9:41</span><span className="status-icons">●●●  ▰</span></div>
    <div className="phone-heading"><span className="phone-wordmark">entre nós<span>.</span></span><button type="button" className="phone-icon-button" aria-label="Buscar círculos" onClick={() => setView('circulos')}><Search size={20}/></button></div>
    {view === 'inicio' && <div className="phone-content phone-feed">
      <div className="phone-greeting">Bom dia, Marina <span>✳</span></div><p className="phone-subtitle">O que anda acontecendo por aí?</p>
      <div className="story-row"><div className="story story-me"><span>+</span><small>Seu momento</small></div><div className="story"><span className="story-face story-face-one">J</span><small>Joana</small></div><div className="story"><span className="story-face story-face-two">R</span><small>Rafa</small></div><div className="story"><span className="story-face story-face-three">L</span><small>Luiza</small></div></div>
      <div className="feed-divider"/><div className="post-author"><span className="author-avatar">J</span><span><strong>Joana Martins</strong><small>há 2 horas · com amigos</small></span><span className="post-more">•••</span></div>
      <p className="post-caption">Um café, uma tarde inteira e nenhuma pressa. Precisava disso.</p><img className="post-image" src="/images/entre-nos-feed.jpg" alt="Amigos conversando em um café ao ar livre"/>
      <div className="post-actions"><button type="button" onClick={() => setLiked(!liked)} className={liked ? 'is-liked' : ''} aria-label={liked ? 'Descurtir publicação' : 'Curtir publicação'}><Heart size={20} fill={liked ? 'currentColor' : 'none'}/><span>{liked ? '129' : '128'}</span></button><button type="button" onClick={() => setView('conversas')} aria-label="Abrir conversas"><MessageCircle size={20}/><span>12</span></button><button type="button" onClick={() => setView('conversas')} aria-label="Compartilhar publicação"><Send size={19}/></button></div>
    </div>}
    {view === 'circulos' && <div className="phone-content circles-view"><span className="phone-eyebrow">SEUS ESPAÇOS</span><h3>Gente que faz<br/>sentido pra você.</h3><p>Encontre seu lugar e compartilhe o que você ama.</p><div className="circle-feature"><span className="circle-art">✳</span><span className="circle-category">CÍRCULO EM DESTAQUE</span><strong>Domingos sem pressa</strong><span className="circle-members">84 pessoas por aqui</span><button type="button" onClick={() => setJoined(!joined)}>{joined ? 'Você faz parte' : 'Fazer parte'} <ArrowUpRight size={15}/></button></div><div className="circle-list-title">Para descobrir</div><div className="circle-list-item"><span className="circle-emoji peach">✿</span><span><strong>Clube do café</strong><small>Conversas boas começam aqui</small></span><ArrowUpRight size={17}/></div><div className="circle-list-item"><span className="circle-emoji lilac">♫</span><span><strong>Som de casa</strong><small>Música para dividir</small></span><ArrowUpRight size={17}/></div></div>}
    {view === 'conversas' && <div className="phone-content messages-view"><span className="phone-eyebrow">PERTO, MESMO DE LONGE</span><h3>Conversas</h3><div className="chat-header"><span className="chat-avatar">J</span><span><strong>Joana Martins</strong><small>online agora</small></span><span className="online-dot"/></div><div className="chat-messages"><span className="chat-date">HOJE</span><p className="chat-bubble incoming">Ei! Que bom te ver por aqui.</p><p className="chat-bubble outgoing">Também estava com saudade!</p><p className="chat-bubble incoming">Vamos marcar aquele café essa semana?</p>{sentMessages.map((text, index) => <p className="chat-bubble outgoing" key={`${text}-${index}`}>{text}</p>)}</div><form className="chat-compose" onSubmit={(event) => { event.preventDefault(); sendMessage() }}><input aria-label="Escreva uma mensagem" placeholder="Escreva uma mensagem..." value={message} onChange={(event) => setMessage(event.target.value)}/><button type="submit" aria-label="Enviar mensagem"><ArrowUpRight size={19}/></button></form></div>}
    <div className="phone-nav" aria-label="Navegação do aplicativo"><button type="button" className={view === 'inicio' ? 'active' : ''} onClick={() => setView('inicio')} aria-label="Início"><Home size={21}/><span>Início</span></button><button type="button" className={view === 'circulos' ? 'active' : ''} onClick={() => setView('circulos')} aria-label="Círculos"><Users size={21}/><span>Círculos</span></button><button type="button" className="phone-add" onClick={() => setView('inicio')} aria-label="Criar publicação"><Plus size={23}/></button><button type="button" className={view === 'conversas' ? 'active' : ''} onClick={() => setView('conversas')} aria-label="Conversas"><MessageCircle size={21}/><span>Conversas</span></button><button type="button" onClick={() => setView('inicio')} aria-label="Perfil"><span className="nav-avatar">M</span><span>Perfil</span></button></div>
  </div></div>
}

function LandingPage() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [modalOpen, setModalOpen] = useState(false)
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => { entries.forEach((entry) => { if (entry.isIntersecting) { entry.target.classList.add('is-visible'); observer.unobserve(entry.target) } }) }, { threshold: 0.12 })
    document.querySelectorAll('.reveal').forEach((element) => observer.observe(element))
    return () => observer.disconnect()
  }, [])
  useEffect(() => { document.body.style.overflow = modalOpen ? 'hidden' : ''; return () => { document.body.style.overflow = '' } }, [modalOpen])
  const openModal = () => { setMenuOpen(false); setModalOpen(true) }
  const submitEmail = (event: React.FormEvent<HTMLFormElement>) => { event.preventDefault(); if (!email.trim()) return; localStorage.setItem('entre-nos-interest-email', email.trim()); setSubmitted(true) }

  return <main>
    <section className="hero" id="inicio"><div className="hero-image"/><div className="hero-shade"/>
      <header className="site-header"><BrandLogo light/><nav className={menuOpen ? 'main-nav nav-open' : 'main-nav'} aria-label="Navegação principal"><a href="#ideia" onClick={() => setMenuOpen(false)}>A ideia</a><a href="#identidade" onClick={() => setMenuOpen(false)}>Identidade</a><a href="#app" onClick={() => setMenuOpen(false)}>O aplicativo</a><button type="button" className="nav-join" onClick={openModal}>Fazer parte <ArrowUpRight size={16}/></button></nav><button type="button" className="mobile-menu-button" onClick={() => setMenuOpen(!menuOpen)} aria-label={menuOpen ? 'Fechar menu' : 'Abrir menu'}>{menuOpen ? <X size={25}/> : <Menu size={25}/>}</button></header>
      <div className="hero-content"><div className="hero-intro">UM NOVO JEITO DE ESTAR PERTO <span className="intro-line"/></div><h1>entre nós<span>.</span></h1><div className="hero-bottom"><div><h2>O melhor da vida<br/>acontece junto.</h2><p>Uma rede social para conexões reais, conversas leves e tudo o que faz a gente se sentir parte.</p></div><div className="hero-actions"><button type="button" className="primary-button" onClick={openModal}>Quero fazer parte <ArrowUpRight size={21}/></button><a className="text-link light-link" href="#ideia">Descubra a ideia <ArrowDown size={17}/></a></div></div></div><div className="hero-index">CONEXÕES QUE IMPORTAM / 01</div>
    </section>
    <div className="ticker" aria-hidden="true"><div className="ticker-track">{Array.from({ length: 4 }).map((_, index) => <span key={index}>mais presença <b>✳</b> menos comparação <b>✳</b> mais a gente <b>✳</b></span>)}</div></div>
    <section className="idea-section" id="ideia"><div className="section-container idea-grid reveal"><div className="section-kicker"><span className="kicker-dot"/> A IDEIA POR TRÁS DE TUDO</div><div className="idea-copy"><h2>Social de verdade é quando a gente <em>se encontra.</em></h2><div className="idea-bottom"><p>O Entre Nós nasce para aproximar pessoas, não para criar distâncias. Um espaço para compartilhar a vida como ela é, criar laços e descobrir novas formas de estar junto.</p><a href="#app" className="round-arrow" aria-label="Conhecer o aplicativo"><ArrowUpRight size={25}/></a></div></div></div></section>
    <section className="identity-section" id="identidade"><div className="section-container identity-content"><div className="identity-top reveal"><span className="section-kicker"><span className="kicker-dot"/> NOSSA ESSÊNCIA</span><h2>Uma marca feita<br/>para <em>aproximar.</em></h2></div><div className="identity-showcase reveal"><div className="identity-logo"><BrandMark className="giant-mark"/><div className="giant-wordmark">entre nós<span>.</span></div></div><div className="identity-description"><span>01 / A MARCA</span><p>Duas vozes, uma conversa.<br/>Um lugar que é de todo mundo.</p><small>Leve, humana e cheia de possibilidades.</small></div></div><div className="palette-header reveal"><span>02 / AS CORES</span><p>Cores que abraçam, vibram e convidam.</p></div></div><div className="palette reveal" aria-label="Paleta de cores da marca"><div className="palette-swatch palette-plum"><span>Uva profunda</span><small>#321B35</small></div><div className="palette-swatch palette-coral"><span>Coral encontro</span><small>#F48E77</small></div><div className="palette-swatch palette-cream"><span>Creme abraço</span><small>#FAF5ED</small></div><div className="palette-swatch palette-lime"><span>Verde novidade</span><small>#D8EB99</small></div></div></section>
    <section className="app-section" id="app"><div className="section-container app-grid"><div className="app-copy reveal"><span className="section-kicker"><span className="kicker-dot"/> O APLICATIVO</span><h2>O seu mundo, mais <em>perto.</em></h2><p>Compartilhe momentos sem filtros, encontre seus círculos e transforme uma mensagem em uma boa conversa.</p><div className="feature-lines"><div><span>01</span> Compartilhe o que é real</div><div><span>02</span> Encontre sua turma</div><div><span>03</span> Converse sem pressa</div></div><a className="dark-button" href="https://deepskyblue-alpaca-963954.hostingersite.com/">Quero entrar nessa <ArrowUpRight size={19}/></a></div><div className="app-visual reveal"><div className="app-orbit orbit-one"/><div className="app-orbit orbit-two"/><AppPreview/><span className="app-visual-caption">UM ESPAÇO COM A SUA CARA. E A DE TODO MUNDO.</span></div></div></section>
    <section className="closing-section"><div className="section-container closing-content reveal"><span className="section-kicker"><span className="kicker-dot"/> A GENTE SE VÊ POR AQUI</span><h2>Tem espaço<br/>pra você <em>entre nós.</em></h2><button type="button" className="primary-button" onClick={openModal}>Faça parte dessa história <ArrowUpRight size={21}/></button></div><div className="closing-decoration" aria-hidden="true"><BrandMark/></div></section>
    <footer className="footer"><BrandLogo light large/><span>Conexões reais começam aqui.</span><a href="mailto:oi@entrenos.app">Diga oi <ArrowUpRight size={15}/></a><span>Fale conosco · (11) 93208-1531</span><small>© 2026 Entre Nós · Todos os direitos reservados</small></footer>
    {modalOpen && <div className="modal-backdrop" onMouseDown={(event) => { if (event.target === event.currentTarget) setModalOpen(false) }}><div className="signup-modal" role="dialog" aria-modal="true" aria-labelledby="modal-title"><button type="button" className="modal-close" onClick={() => setModalOpen(false)} aria-label="Fechar"><X size={23}/></button><BrandMark className="modal-mark"/>{submitted ? <><span className="modal-eyebrow">VOCÊ ESTÁ NA LISTA</span><h2 id="modal-title">A gente se vê em breve.</h2><p>Que bom ter você entre nós! Seu interesse ficou salvo neste dispositivo.</p><button type="button" className="dark-button modal-submit" onClick={() => setModalOpen(false)}>Voltar ao site <ArrowRight size={19}/></button></> : <><span className="modal-eyebrow">CHEGA MAIS</span><h2 id="modal-title">O começo de uma boa conexão.</h2><p>Deixe seu e-mail para marcar seu interesse em fazer parte do Entre Nós.</p><form onSubmit={submitEmail}><label htmlFor="signup-email">Seu e-mail</label><input id="signup-email" type="email" placeholder="voce@exemplo.com" autoComplete="email" required value={email} onChange={(event) => setEmail(event.target.value)}/><button type="submit" className="dark-button modal-submit">Quero fazer parte <ArrowUpRight size={19}/></button></form><small>Sem spam. Só boas notícias.</small></>}</div></div>}
  </main>
}

function App() {
  const isApp = window.location.hash === '#app'
  return isApp ? <main className="standalone-app"><AppPreview /></main> : <LandingPage />
}

export default App
