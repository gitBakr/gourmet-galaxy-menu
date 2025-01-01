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
        image: "/placeholder.svg",
        price: "15€/pers"
      },
      {
        title: "Saumon Gravlax",
        description: "Saumon mariné aux herbes, crème d'aneth",
        image: "/placeholder.svg",
        price: "12€/pers"
      },
      {
        title: "Velouté de Saison",
        description: "Crème de potimarron, châtaignes torréfiées",
        image: "/placeholder.svg",
        price: "10€/pers"
      }
    ],
    mains: [
      {
        title: "Suprême de Volaille",
        description: "Volaille fermière, sauce aux morilles, gratin dauphinois",
        image: "/placeholder.svg",
        price: "25€/pers"
      },
      {
        title: "Filet de Bœuf Wellington",
        description: "Bœuf en croûte, duxelles de champignons, légumes de saison",
        image: "/placeholder.svg",
        price: "30€/pers"
      },
      {
        title: "Pavé de Saumon",
        description: "Saumon rôti, beurre blanc, risotto aux asperges",
        image: "/placeholder.svg",
        price: "22€/pers"
      }
    ],
    desserts: [
      {
        title: "Royal Chocolat",
        description: "Mousse au chocolat, croustillant praliné",
        image: "/placeholder.svg",
        price: "12€/pers"
      },
      {
        title: "Fraisier",
        description: "Génoise, crème mousseline, fraises fraîches",
        image: "/placeholder.svg",
        price: "12€/pers"
      },
      {
        title: "Mignardises",
        description: "Assortiment de petits fours et macarons",
        image: "/placeholder.svg",
        price: "10€/pers"
      }
    ]
  };

  const quoteFormRef = useRef<HTMLDivElement>(null);

  const scrollToQuoteForm = () => {
    quoteFormRef.current?.scrollIntoView({ behavior: 'smooth' });
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
        <Button 
          onClick={scrollToQuoteForm}
          size="lg"
          className="bg-primary hover:bg-primary/90 text-white"
        >
          Demander un devis
        </Button>
      </header>

      <main className="container mx-auto px-4 pb-20">
        <section className="mb-20 fade-in">
          <h2 className="section-title">Nos Entrées</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {menuItems.starters.map((item, index) => (
              <MenuItem key={`starter-${index}`} {...item} />
            ))}
          </div>
        </section>

        <section className="mb-20 fade-in">
          <h2 className="section-title">Nos Plats</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {menuItems.mains.map((item, index) => (
              <MenuItem key={`main-${index}`} {...item} />
            ))}
          </div>
        </section>

        <section className="mb-20 fade-in">
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