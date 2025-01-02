import { Button } from "@/components/ui/button";
import MenuItem from "@/components/MenuItem";
import { useRef, useState, useEffect } from "react";
import Navbar from '@/components/Navbar';
import OrderModal from '@/components/OrderModal';
import { useOrders } from '../context/OrderContext';

const Index = () => {
  const menuItems = {
    starters: [
      {
        title: "Foie Gras Maison",
        description: "Foie gras mi-cuit, chutney de figues et pain brioché",
        image: "https://images.unsplash.com/photo-1618160702438-9b02ab6515c9",
        price: "15€/pers"
      },
      {
        title: "Saumon Gravlax",
        description: "Saumon mariné aux herbes, crème d'aneth",
        image: "https://images.unsplash.com/photo-1485833077593-4278bba3f11f",
        price: "12€/pers"
      },
      {
        title: "Velouté de Saison",
        description: "Crème de potimarron, châtaignes torréfiées",
        image: "https://images.unsplash.com/photo-1498936178812-4b2e558d2937",
        price: "10€/pers"
      }
    ],
    mains: [
      {
        title: "Suprême de Volaille",
        description: "Volaille fermière, sauce aux morilles, gratin dauphinois",
        image: "https://images.unsplash.com/photo-1465379944081-7f47de8d74ac",
        price: "25€/pers"
      },
      {
        title: "Filet de Bœuf Wellington",
        description: "Bœuf en croûte, duxelles de champignons, légumes de saison",
        image: "https://images.unsplash.com/photo-1493962853295-0fd70327578a",
        price: "30€/pers"
      },
      {
        title: "Pavé de Saumon",
        description: "Saumon rôti, beurre blanc, risotto aux asperges",
        image: "https://images.unsplash.com/photo-1518877593221-1f28583780b4",
        price: "22€/pers"
      }
    ],
    desserts: [
      {
        title: "Royal Chocolat",
        description: "Mousse au chocolat, croustillant praliné",
        image: "https://images.unsplash.com/photo-1721322800607-8c38375eef04",
        price: "12€/pers"
      },
      {
        title: "Fraisier",
        description: "Génoise, crème mousseline, fraises fraîches",
        image: "https://images.unsplash.com/photo-1439886183900-e79ec0057170",
        price: "12€/pers"
      },
      {
        title: "Mignardises",
        description: "Assortiment de petits fours et macarons",
        image: "https://images.unsplash.com/photo-1441057206919-63d19fac2369",
        price: "10€/pers"
      }
    ],
    tunisian: {
      title: "Menu Tunisien",
      price: "35€/pers",
      items: [
        {
          title: "Entrées Tunisiennes",
          description: "Assortiment de salades tunisiennes, Brick à l'œuf, Salade méchouia",
          image: "https://images.unsplash.com/photo-1541518763669-27fef04b14ea",
          price: "inclus"
        },
        {
          title: "Plat Principal",
          description: "Couscous royal ou Poisson à la tunisienne",
          image: "https://images.unsplash.com/photo-1516714435131-44d6b64dc6a2",
          price: "inclus"
        },
        {
          title: "Desserts & Café",
          description: "Pâtisseries tunisiennes, Thé à la menthe",
          image: "https://images.unsplash.com/photo-1593729371374-e8cc7d32455e",
          price: "inclus"
        }
      ]
    },
    moroccan: {
      title: "Menu Marocain",
      price: "35€/pers",
      items: [
        {
          title: "Entrées Marocaines",
          description: "Assortiment de salades marocaines, Pastilla, Briouates",
          image: "https://images.unsplash.com/photo-1541518763669-27fef04b14ea",
          price: "inclus"
        },
        {
          title: "Plat Principal",
          description: "Tajine au choix ou Couscous royal",
          image: "https://images.unsplash.com/photo-1511690743698-d9d85f2fbf38",
          price: "inclus"
        },
        {
          title: "Desserts & Thé",
          description: "Pâtisseries marocaines, Thé à la menthe",
          image: "https://images.unsplash.com/photo-1593729371374-e8cc7d32455e",
          price: "inclus"
        }
      ]
    },
    algerian: {
      title: "Menu Algérien",
      price: "35€/pers",
      items: [
        {
          title: "Entrées Algériennes",
          description: "Bourek, Chorba, Salade variée",
          image: "https://images.unsplash.com/photo-1541518763669-27fef04b14ea",
          price: "inclus"
        },
        {
          title: "Plat Principal",
          description: "Couscous algérien ou Rechta",
          image: "https://images.unsplash.com/photo-1516714435131-44d6b64dc6a2",
          price: "inclus"
        },
        {
          title: "Desserts & Café",
          description: "Pâtisseries algériennes, Café à l'orientale",
          image: "https://images.unsplash.com/photo-1593729371374-e8cc7d32455e",
          price: "inclus"
        }
      ]
    }
  };

  const quoteFormRef = useRef<HTMLDivElement>(null);
  const startersRef = useRef<HTMLDivElement>(null);
  const mainsRef = useRef<HTMLDivElement>(null);
  const dessertsRef = useRef<HTMLDivElement>(null);
  const tunisianRef = useRef<HTMLDivElement>(null);
  const moroccanRef = useRef<HTMLDivElement>(null);
  const algerianRef = useRef<HTMLDivElement>(null);

  // État pour gérer la section active
  const [activeSection, setActiveSection] = useState<string | null>(null);

  // Effet pour scroll en haut à l'ouverture et réinitialiser la section active
  useEffect(() => {
    window.scrollTo(0, 0);
    setActiveSection(null);
  }, []);

  const scrollToQuoteForm = () => {
    quoteFormRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSectionChange = (ref: React.RefObject<HTMLDivElement>, sectionName: string) => {
    setActiveSection(sectionName);
    
    setTimeout(() => {
      if (ref.current) {
        const navbarHeight = 80;
        const elementPosition = ref.current.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - navbarHeight - 20;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    }, 100);
  };

  // Fonction pour revenir à l'accueil
  const goToHome = () => {
    setActiveSection(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const showAllSections = () => {
    setActiveSection('all'); // Nouvelle valeur 'all' pour afficher tout
  };

  const showSection = (sectionName: string) => {
    setActiveSection(sectionName);
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar 
        scrollToSection={handleSectionChange}
        startersRef={startersRef}
        mainsRef={mainsRef}
        dessertsRef={dessertsRef}
        quoteFormRef={quoteFormRef}
        tunisianRef={tunisianRef}
        moroccanRef={moroccanRef}
        algerianRef={algerianRef}
        showAllSections={showAllSections}
        setActiveSection={setActiveSection}
        goToHome={goToHome}
      />
      
      <header className="pt-32 py-20 text-center">
        <h1 className="text-5xl md:text-6xl font-bold playfair mb-4">
          Salim Dégustation
        </h1>
        <p className="text-lg text-gray-600 mb-8">
          Une expérience gastronomique unique pour vos événements
        </p>
      </header>

      <main className="container mx-auto px-4 pb-20">
        <section 
          className={`transition-all duration-500 mb-20 ${
            activeSection === 'starters' || activeSection === 'all'
              ? 'opacity-100 translate-y-0 relative' 
              : 'opacity-0 translate-y-10 pointer-events-none absolute'
          }`} 
          ref={startersRef}
        >
          <h2 className="section-title">Nos Entrées</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {menuItems.starters.map((item, index) => (
              <MenuItem key={`starter-${index}`} {...item} />
            ))}
          </div>
        </section>

        <section 
          className={`transition-all duration-500 mb-20 ${
            activeSection === 'mains' || activeSection === 'all'
              ? 'opacity-100 translate-y-0 relative' 
              : 'opacity-0 translate-y-10 pointer-events-none absolute'
          }`} 
          ref={mainsRef}
        >
          <h2 className="section-title">Nos Plats</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {menuItems.mains.map((item, index) => (
              <MenuItem key={`main-${index}`} {...item} />
            ))}
          </div>
        </section>

        <section 
          className={`transition-all duration-500 mb-20 ${
            activeSection === 'desserts' || activeSection === 'all'
              ? 'opacity-100 translate-y-0 relative' 
              : 'opacity-0 translate-y-10 pointer-events-none absolute'
          }`} 
          ref={dessertsRef}
        >
          <h2 className="section-title">Nos Desserts</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {menuItems.desserts.map((item, index) => (
              <MenuItem key={`dessert-${index}`} {...item} />
            ))}
          </div>
        </section>

        {['tunisian', 'moroccan', 'algerian'].map((menuType) => {
          const [isModalOpen, setIsModalOpen] = useState(false);
          const { addOrder } = useOrders();

          const handleOrderMenu = (quantity: number) => {
            const menu = menuItems[menuType];
            addOrder({
              title: menu.title,
              quantity,
              price: menu.price,
              total: parseFloat(menu.price) * quantity
            });
            setIsModalOpen(false);
          };

          return (
            <section 
              key={menuType}
              className={`transition-all duration-500 mb-20 ${
                activeSection === menuType || activeSection === 'all'
                  ? 'opacity-100 translate-y-0 relative' 
                  : 'opacity-0 translate-y-10 pointer-events-none absolute'
              }`} 
              ref={menuType === 'tunisian' ? tunisianRef : menuType === 'moroccan' ? moroccanRef : algerianRef}
            >
              <h2 className="section-title">{menuItems[menuType].title}</h2>
              <div className="grid md:grid-cols-3 gap-8">
                {menuItems[menuType].items.map((item, index) => (
                  <MenuItem key={`${menuType}-${index}`} {...item} isMenu={true} />
                ))}
              </div>
              <div className="text-center mt-8">
                <p className="text-2xl font-bold text-primary mb-4">
                  Menu complet : {menuItems[menuType].price}
                </p>
                <button
                  className="bg-primary text-white px-8 py-3 rounded-lg text-lg font-bold hover:bg-primary/90 transition-colors"
                  onClick={() => setIsModalOpen(true)}
                >
                  Commander ce menu
                </button>
              </div>

              <OrderModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                item={{
                  title: menuItems[menuType].title,
                  price: menuItems[menuType].price
                }}
                onOrder={handleOrderMenu}
              />
            </section>
          );
        })}

        <section 
          className={`transition-all duration-500 mb-20 ${
            activeSection === 'contact' || activeSection === 'all'
              ? 'opacity-100 translate-y-0 relative' 
              : 'opacity-0 translate-y-10 pointer-events-none absolute'
          }`}
        >
          <h2 className="section-title">Contactez-nous</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {/* Informations de contact */}
            <div className="space-y-6">
              <div className="bg-white rounded-lg p-6 shadow-md">
                <h3 className="text-xl font-bold text-primary mb-4">Nos coordonnées</h3>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">📍</span>
                    <div>
                      <p className="font-medium">Adresse</p>
                      <p className="text-gray-600">123 Avenue de la Gastronomie, Paris</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">📞</span>
                    <div>
                      <p className="font-medium">Téléphone</p>
                      <p className="text-gray-600">01 23 45 67 89</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">✉️</span>
                    <div>
                      <p className="font-medium">Email</p>
                      <p className="text-gray-600">contact@salim-degustation.fr</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg p-6 shadow-md">
                <h3 className="text-xl font-bold text-primary mb-4">Horaires d'ouverture</h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="font-medium">Lundi - Vendredi</span>
                    <span className="text-gray-600">9h - 18h</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium">Samedi</span>
                    <span className="text-gray-600">10h - 16h</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium">Dimanche</span>
                    <span className="text-gray-600">Fermé</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Message d'accueil */}
            <div className="bg-white rounded-lg p-6 shadow-md">
              <h3 className="text-xl font-bold text-primary mb-4">À votre service</h3>
              <div className="space-y-4 text-gray-600">
                <p>
                  Bienvenue chez Salim Dégustation ! Nous sommes ravis de vous accueillir et de vous faire découvrir notre passion pour la gastronomie.
                </p>
                <p>
                  Notre équipe est à votre disposition pour répondre à toutes vos questions et vous accompagner dans l'organisation de vos événements.
                </p>
                <p>
                  N'hésitez pas à nous contacter par téléphone ou par email pour toute demande de devis ou d'information complémentaire.
                </p>
                <div className="mt-6 p-4 bg-primary/10 rounded-lg">
                  <p className="font-medium text-primary">
                    Pour une réponse rapide, privilégiez le formulaire de commande en cliquant sur le panier 🛒
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-primary text-white mt-auto pb-32">
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="space-y-4">
              <h3 className="text-xl font-bold playfair">Salim Dégustation</h3>
              <div className="space-y-2">
                <p className="flex items-center gap-2">
                  <span>📍</span>
                  <span>123 Avenue de la Gastronomie, Paris</span>
                </p>
                <p className="flex items-center gap-2">
                  <span>📞</span>
                  <span>01 23 45 67 89</span>
                </p>
                <p className="flex items-center gap-2">
                  <span>✉️</span>
                  <span>contact@salim-degustation.fr</span>
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-xl font-bold playfair">Horaires</h3>
              <div className="space-y-2">
                <p>Lundi - Vendredi : 9h - 18h</p>
                <p>Samedi : 10h - 16h</p>
                <p>Dimanche : Fermé</p>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-xl font-bold playfair">Menu</h3>
              <div className="space-y-2">
                <p className="cursor-pointer hover:text-white/80" onClick={() => scrollToSection(startersRef, 'starters')}>
                  Nos Entrées
                </p>
                <p className="cursor-pointer hover:text-white/80" onClick={() => scrollToSection(mainsRef, 'mains')}>
                  Nos Plats
                </p>
                <p className="cursor-pointer hover:text-white/80" onClick={() => scrollToSection(dessertsRef, 'desserts')}>
                  Nos Desserts
                </p>
              </div>
            </div>
          </div>

          <div className="border-t border-white/20 mt-8 pt-8 text-center text-sm">
            <p>© {new Date().getFullYear()} Salim Dégustation. Tous droits réservés.</p>
            <div className="mt-2 space-x-4 mb-4">
              <a href="#" className="hover:text-white/80">Mentions légales</a>
              <span>|</span>
              <a href="#" className="hover:text-white/80">Politique de confidentialité</a>
              <span>|</span>
              <a href="#" className="hover:text-white/80">CGV</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;