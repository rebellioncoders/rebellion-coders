import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Domains from '@/components/Domains';
import Community from '@/components/Community';
import Projects from '@/components/Projects';
import Events from '@/components/Events';
import Founder from '@/components/Founder';
import JoinForm from '@/components/JoinForm';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';

export default function App() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <main>
        <Hero />
        <About />
        <Domains />
        <Community />
        <Projects />
        <Events />
        <Founder />
        <JoinForm />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
