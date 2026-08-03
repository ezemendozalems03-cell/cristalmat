import { LoadingScreen } from '@/components/loading-screen'
import { CustomCursor } from '@/components/custom-cursor'
import { Navbar } from '@/components/navbar'
import { Hero } from '@/components/hero'
import { WhyChoose } from '@/components/why-choose'
import { WordSeparator } from '@/components/word-separator'
import { Projects } from '@/components/projects'
import { BeforeAfter } from '@/components/before-after'
import { Process } from '@/components/process'
import { Stats } from '@/components/stats'
import { About } from '@/components/about'
import { Testimonials } from '@/components/testimonials'
import { Faq } from '@/components/faq'
import { CtaFooter } from '@/components/cta-footer'
import { FloatingActions } from '@/components/floating-actions'

export default function Page() {
  return (
    <>
      <LoadingScreen />
      <CustomCursor />
      <Navbar />
      <main>
        <Hero />
        <WordSeparator word="DISEÑO" />
        <WhyChoose />
        <WordSeparator word="RESISTENCIA" />
        <Projects />
        <BeforeAfter />
        <Process />
        <Stats />
        <WordSeparator word="DRENAJE" />
        <About />
        <Testimonials />
        <Faq />
        <WordSeparator word="CALIDAD" />
        <CtaFooter />
      </main>
      <FloatingActions />
    </>
  )
}
