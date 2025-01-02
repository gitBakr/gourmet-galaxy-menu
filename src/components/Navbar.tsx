import { useRef, useState } from 'react';

interface NavbarProps {
  scrollToSection: (ref: React.RefObject<HTMLDivElement>, sectionName: string) => void;
  startersRef: React.RefObject<HTMLDivElement>;
  mainsRef: React.RefObject<HTMLDivElement>;
  dessertsRef: React.RefObject<HTMLDivElement>;
  quoteFormRef: React.RefObject<HTMLDivElement>;
  tunisianRef: React.RefObject<HTMLDivElement>;
  moroccanRef: React.RefObject<HTMLDivElement>;
  algerianRef: React.RefObject<HTMLDivElement>;
  showAllSections: () => void;
  setActiveSection: (section: string) => void;
  goToHome: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ 
  scrollToSection, 
  startersRef, 
  mainsRef, 
  dessertsRef, 
  quoteFormRef,
  tunisianRef,
  moroccanRef,
  algerianRef,
  showAllSections,
  setActiveSection,
  goToHome 
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
    setIsMenuOpen(false);
  };

  const handleNavClick = (ref: React.RefObject<HTMLDivElement>, sectionName: string) => {
    scrollToSection(ref, sectionName);
    setIsMenuOpen(false);
  };

  const handleShowAll = () => {
    showAllSections();
    setIsMenuOpen(false);
  };

  const handleContactClick = () => {
    setActiveSection('contact');
    setIsMenuOpen(false);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 bg-primary/95 backdrop-blur-sm shadow-md z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo et Accueil */}
          <div className="flex items-center space-x-6">
            <button
              onClick={goToHome}
              className="text-xl font-bold text-white playfair hover:text-white/90 transition-colors"
            >
              Salim Dégustation
            </button>
            <button
              onClick={scrollToTop}
              className="text-white/80 hover:text-white transition-colors hidden md:block"
            >
              Accueil
            </button>
          </div>

          {/* Navigation Links - Version simplifiée */}
          <div className="hidden md:flex items-center space-x-6">
            <button
              onClick={handleShowAll}
              className="text-white/80 hover:text-white transition-colors"
            >
              La Carte
            </button>
            <div className="h-4 w-px bg-white/20" />
            <button
              onClick={() => handleNavClick(tunisianRef, 'tunisian')}
              className="text-white/80 hover:text-white transition-colors"
            >
              Menu Tunisien
            </button>
            <button
              onClick={() => handleNavClick(moroccanRef, 'moroccan')}
              className="text-white/80 hover:text-white transition-colors"
            >
              Menu Marocain
            </button>
            <button
              onClick={() => handleNavClick(algerianRef, 'algerian')}
              className="text-white/80 hover:text-white transition-colors"
            >
              Menu Algérien
            </button>
            <div className="h-4 w-px bg-white/20" />
            <button
              onClick={handleContactClick}
              className="text-white/80 hover:text-white transition-colors flex items-center gap-2"
            >
              <span>📞</span>
              Contact
            </button>
          </div>

          {/* Menu mobile simplifié */}
          <div className="md:hidden">
            <button 
              className="text-white/80 hover:text-white"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <span className="text-2xl">{isMenuOpen ? '✕' : '☰'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`md:hidden transition-all duration-300 ${isMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0 overflow-hidden'}`}>
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-primary/95 shadow-lg">
          <button
            onClick={() => {
              scrollToTop();
              setIsMenuOpen(false);
            }}
            className="block w-full text-left px-3 py-2 text-white/80 hover:text-white transition-colors"
          >
            Accueil
          </button>
          <button
            onClick={handleShowAll}
            className="block w-full text-left px-3 py-2 text-white/80 hover:text-white transition-colors"
          >
            La Carte
          </button>
          <div className="h-px bg-white/10 my-2" />
          <button
            onClick={() => handleNavClick(tunisianRef, 'tunisian')}
            className="block w-full text-left px-3 py-2 text-white/80 hover:text-white transition-colors"
          >
            Menu Tunisien
          </button>
          <button
            onClick={() => handleNavClick(moroccanRef, 'moroccan')}
            className="block w-full text-left px-3 py-2 text-white/80 hover:text-white transition-colors"
          >
            Menu Marocain
          </button>
          <button
            onClick={() => handleNavClick(algerianRef, 'algerian')}
            className="block w-full text-left px-3 py-2 text-white/80 hover:text-white transition-colors"
          >
            Menu Algérien
          </button>
          <div className="h-px bg-white/10 my-2" />
          <button
            onClick={handleContactClick}
            className="block w-full text-left px-3 py-2 text-white/80 hover:text-white transition-colors"
          >
            Contact
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar; 