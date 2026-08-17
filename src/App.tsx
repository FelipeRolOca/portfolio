import { useState } from 'react'
import { LanguageProvider } from './i18n/LanguageContext'
import { Navbar } from './components/Navbar'
import { Hero } from './components/Hero'
import { About } from './components/About'
import { Services } from './components/Services'
import { Projects } from './components/Projects'
import { Experience } from './components/Experience'
import { Skills } from './components/Skills'
import { Contact } from './components/Contact'
import { Footer } from './components/Footer'
import { LegalNoticeModal } from './components/LegalNoticeModal'
import { CookieBanner } from './components/CookieBanner'

export default function App() {
  const [legalOpen, setLegalOpen] = useState(false)

  return (
    <LanguageProvider>
      <div style={{ fontFamily: 'Barlow, sans-serif' }} className="pb-16 md:pb-0">
        <Navbar />
        <Hero />
        <About />
        <Services />
        <Projects />
        <Experience />
        <Skills />
        <Contact />
        <Footer onOpenLegal={() => setLegalOpen(true)} />
        <LegalNoticeModal isOpen={legalOpen} onClose={() => setLegalOpen(false)} />
        <CookieBanner onOpenLegal={() => setLegalOpen(true)} />
      </div>
    </LanguageProvider>
  )
}
