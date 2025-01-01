import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const QuoteForm = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    date: "",
    guests: "",
    starter: "",
    main: "",
    dessert: "",
    message: "",
  });

  const [totalPrice, setTotalPrice] = useState(0);

  const menuPrices = {
    starters: {
      "Foie Gras Maison": 15,
      "Saumon Gravlax": 12,
      "Velouté de Saison": 10
    },
    mains: {
      "Suprême de Volaille": 25,
      "Filet de Bœuf Wellington": 30,
      "Pavé de Saumon": 22
    },
    desserts: {
      "Royal Chocolat": 12,
      "Fraisier": 12,
      "Mignardises": 10
    }
  };

  useEffect(() => {
    const calculateTotal = () => {
      const guests = parseInt(formData.guests) || 0;
      const starterPrice = menuPrices.starters[formData.starter as keyof typeof menuPrices.starters] || 0;
      const mainPrice = menuPrices.mains[formData.main as keyof typeof menuPrices.mains] || 0;
      const dessertPrice = menuPrices.desserts[formData.dessert as keyof typeof menuPrices.desserts] || 0;
      
      const total = guests * (starterPrice + mainPrice + dessertPrice);
      setTotalPrice(total);
    };

    calculateTotal();
  }, [formData]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Demande envoyée !",
      description: "Nous vous contacterons dans les plus brefs délais.",
    });
    setFormData({
      name: "",
      email: "",
      phone: "",
      date: "",
      guests: "",
      starter: "",
      main: "",
      dessert: "",
      message: "",
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSelectChange = (value: string, field: string) => {
    setFormData({ ...formData, [field]: value });
  };

  return (
    <Card className="w-full max-w-lg mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl text-center playfair">Demande de devis</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Input
              name="name"
              placeholder="Votre nom"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <Input
              name="email"
              type="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              required
            />
            <Input
              name="phone"
              type="tel"
              placeholder="Téléphone"
              value={formData.phone}
              onChange={handleChange}
              required
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <Input
              name="date"
              type="date"
              value={formData.date}
              onChange={handleChange}
              required
            />
            <Input
              name="guests"
              type="number"
              placeholder="Nombre d'invités"
              value={formData.guests}
              onChange={handleChange}
              required
            />
          </div>
          <div className="space-y-4">
            <Select name="starter" onValueChange={(value) => handleSelectChange(value, 'starter')}>
              <SelectTrigger>
                <SelectValue placeholder="Choisir une entrée" />
              </SelectTrigger>
              <SelectContent>
                {Object.entries(menuPrices.starters).map(([name, price]) => (
                  <SelectItem key={name} value={name}>
                    {name} - {price}€/pers
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select name="main" onValueChange={(value) => handleSelectChange(value, 'main')}>
              <SelectTrigger>
                <SelectValue placeholder="Choisir un plat" />
              </SelectTrigger>
              <SelectContent>
                {Object.entries(menuPrices.mains).map(([name, price]) => (
                  <SelectItem key={name} value={name}>
                    {name} - {price}€/pers
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select name="dessert" onValueChange={(value) => handleSelectChange(value, 'dessert')}>
              <SelectTrigger>
                <SelectValue placeholder="Choisir un dessert" />
              </SelectTrigger>
              <SelectContent>
                {Object.entries(menuPrices.desserts).map(([name, price]) => (
                  <SelectItem key={name} value={name}>
                    {name} - {price}€/pers
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <Textarea
            name="message"
            placeholder="Votre message"
            value={formData.message}
            onChange={handleChange}
            className="min-h-[100px]"
          />
          <div className="text-xl font-semibold text-center text-primary">
            Estimation totale : {totalPrice}€
          </div>
          <Button type="submit" className="w-full">
            Envoyer la demande
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default QuoteForm;