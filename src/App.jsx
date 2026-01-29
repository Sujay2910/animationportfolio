import { useState } from 'react'
import './App.css'

import Navbar from './components/Navbar'
import Home from './section/Home'
import About from './section/About'
import Skills from './section/Skills'
import Project from './section/Project'
import Experence from './section/Experence'
import Testmonials from './section/Testmonials'
import Footer from './section/Footer'
import Contact from './section/contact'
import ParticlesBackground from './components/ParticlesBackground'
import CustomCursor from './components/CustomCursor'
import IntroAnimation from './components/IntroAnimation'

function App() {
  const [introDone, setIntroDone] = useState(false)

  return (
    <>
      {!introDone && <IntroAnimation onFinish={() => setIntroDone(true)} />}
      {introDone && (
        <div className="relative gradient text-white">
          <CustomCursor />
          {/* <ParticlesBackground /> */}
          <Navbar />
          <Home />
          <About />
          <Skills />
          <Project />
          <Experence />
          <Testmonials />
          <Contact />
          <Footer />
        </div>
      )}
    </>
  )
}

export default App
