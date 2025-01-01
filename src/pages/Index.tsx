import MenuItem from "@/components/MenuItem";
import QuoteForm from "@/components/QuoteForm";
import { Button } from "@/components/ui/button";
import { useRef } from "react";

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
    ]
  };

  const quoteFormRef = useRef<HTMLDivElement>(null);
  const startersRef = useRef<HTMLDivElement>(null);
  const mainsRef = useRef<HTMLDivElement>(null);
  const dessertsRef = useRef<HTMLDivElement>(null);

  const scrollToQuoteForm = () => {
    quoteFormRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToSection = (ref: React.RefObject<HTMLDivElement>) => {
    ref.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="py-20 text-center">
        <h1 className="text-5xl md:text-6xl font-bold playfair mb-4">
          Salim Dégustation
        </h1>
        <p className="text-lg text-gray-600 mb-8">
          Une expérience gastronomique unique pour vos événements
        </p>
        <div className="flex flex-col md:flex-row gap-4 justify-center items-center mb-8">
          <Button 
            variant="secondary"
            onClick={() => scrollToSection(startersRef)}
            className="w-full md:w-auto"
          >
            Nos Entrées
          </Button>
          <Button 
            variant="secondary"
            onClick={() => scrollToSection(mainsRef)}
            className="w-full md:w-auto"
          >
            Nos Plats
          </Button>
          <Button 
            variant="secondary"
            onClick={() => scrollToSection(dessertsRef)}
            className="w-full md:w-auto"
          >
            Nos Desserts
          </Button>
        </div>
        <Button 
          onClick={scrollToQuoteForm}
          size="lg"
          className="bg-primary hover:bg-primary/90 text-white"
        >
          Demander un devis
        </Button>
      </header>

      <main className="container mx-auto px-4 pb-20">
        <section className="mb-20 fade-in" ref={startersRef}>
          <h2 className="section-title">Nos Entrées</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {menuItems.starters.map((item, index) => (
              <MenuItem key={`starter-${index}`} {...item} />
            ))}
          </div>
        </section>

        <section className="mb-20 fade-in" ref={mainsRef}>
          <h2 className="section-title">Nos Plats</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {menuItems.mains.map((item, index) => (
              <MenuItem key={`main-${index}`} {...item} />
            ))}
          </div>
        </section>

        <section className="mb-20 fade-in" ref={dessertsRef}>
          <h2 className="section-title">Nos Desserts</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {menuItems.desserts.map((item, index) => (
              <MenuItem key={`dessert-${index}`} {...item} />
            ))}
          </div>
        </section>

        <section className="fade-in" ref={quoteFormRef}>
          <h2 className="section-title">Demander un Devis</h2>
          <QuoteForm />
        </section>
      </main>
    </div>
  );
};

export default Index;