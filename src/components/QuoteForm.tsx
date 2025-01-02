import { useOrders } from '../context/OrderContext';
import { useState } from 'react';
import { useToast } from "@/components/ui/use-toast";

const QuoteForm: React.FC = () => {
  const { orders, totalAmount, clearOrders } = useOrders();
  const [isExpanded, setIsExpanded] = useState(false);
  const { toast } = useToast();
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("🚀 Début de la soumission du formulaire");
    
    const formData = new FormData(e.target as HTMLFormElement);
    const orderDetails = orders.map(order => 
      `${order.quantity}x ${order.title} (${order.total}€)`
    ).join('\n');

    console.log("📦 Détails de la commande:", orderDetails);
    console.log("💰 Montant total:", totalAmount);

    try {
      toast({
        title: "Commande confirmée !",
        description: (
          <div className="mt-2 space-y-2">
            <p className="font-medium">Merci pour votre commande !</p>
            <p>Nous avons bien reçu votre demande d'un montant de {totalAmount}€.</p>
            <p>Un email de confirmation vous a été envoyé.</p>
            <p className="text-sm text-white/80">Notre équipe vous contactera dans les plus brefs délais.</p>
          </div>
        ),
        duration: 10000,
        className: "bg-primary text-white border-white",
      });
      console.log("✅ Toast déclenché avec succès");

      clearOrders();
      setIsExpanded(false);
      (e.target as HTMLFormElement).reset();
    } catch (error) {
      console.error("❌ Erreur lors du déclenchement du toast:", error);
      toast({
        variant: "destructive",
        title: "Erreur",
        description: "Une erreur est survenue lors de la validation de votre commande.",
        duration: 10000,
      });
    }
  };

  return (
    <div 
      className={`fixed bg-primary text-white rounded-lg transition-all duration-300
        ${isExpanded ? 'w-[95%] md:w-96 max-h-[90vh] overflow-y-auto' : 'w-48 cursor-pointer hover:bg-primary/90'}
        ring-4 ring-white ring-opacity-100`}
      style={{
        position: 'fixed',
        bottom: '20px',
        right: '20px',
        transform: 'translateZ(0)',
        willChange: 'transform',
        zIndex: 99999,
        border: '3px solid white',
        boxShadow: `
          0 0 10px rgba(255,255,255,0.5),
          0 0 20px rgba(255,255,255,0.3),
          0 0 30px rgba(255,255,255,0.2)
        `,
      }}
    >
      {!isExpanded ? (
        <div 
          className="p-4 flex items-center justify-between bg-primary hover:bg-primary/90 rounded-lg cursor-pointer"
          onClick={() => setIsExpanded(true)}
        >
          <div className="flex items-center gap-2">
            <span className="text-2xl">🛒</span>
            <span className="font-bold text-white text-lg">{orders.length}</span>
          </div>
          <span className="font-bold text-white text-lg">{totalAmount}€</span>
        </div>
      ) : (
        <div className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-bold text-xl text-white">Récapitulatif</h3>
            <button 
              onClick={() => setIsExpanded(false)}
              className="text-white/80 hover:text-white text-xl"
            >
              ✕
            </button>
          </div>

          <div className="bg-white/10 p-4 rounded-lg mb-6">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <span className="text-2xl">🛒</span>
                <span className="text-lg">Articles: {orders.length}</span>
              </div>
              <span className="text-lg font-bold">{totalAmount}€</span>
            </div>

            <div className="space-y-3 max-h-48 overflow-y-auto">
              {orders.map((order, index) => (
                <div key={index} className="bg-white/5 p-3 rounded-lg">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-bold">{order.title}</h4>
                      <p className="text-sm text-white/80">Quantité: {order.quantity}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold">{order.total}€</p>
                      <p className="text-sm text-white/80">{order.price}€/unité</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="border-t border-white/20 mt-4 pt-4">
              <div className="flex justify-between text-lg">
                <span>Total</span>
                <span className="font-bold">{totalAmount}€</span>
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-3">
              <input
                type="text"
                name="name"
                placeholder="Votre nom"
                required
                className="w-full p-2 border rounded bg-white/10 text-white placeholder-white/70 focus:ring-2 focus:ring-white/50 focus:border-transparent"
              />
              <input
                type="email"
                name="email"
                placeholder="Votre email"
                required
                className="w-full p-2 border rounded bg-white/10 text-white placeholder-white/70 focus:ring-2 focus:ring-white/50 focus:border-transparent"
              />
              <input
                type="tel"
                name="phone"
                placeholder="Votre téléphone"
                required
                className="w-full p-2 border rounded bg-white/10 text-white placeholder-white/70 focus:ring-2 focus:ring-white/50 focus:border-transparent"
              />
              <div className="space-y-1">
                <label className="block text-sm text-white/90">
                  Date de l'événement
                </label>
                <div 
                  className="relative w-full"
                  onClick={(e) => {
                    const input = e.currentTarget.querySelector('input');
                    if (input) input.showPicker();
                  }}
                >
                  <input
                    type="date"
                    name="eventDate"
                    required
                    min={new Date().toISOString().split('T')[0]}
                    className="w-full p-2 border rounded bg-white text-primary cursor-pointer focus:ring-2 focus:ring-white/50 focus:border-transparent font-medium"
                  />
                  <div className="absolute inset-0" />
                </div>
              </div>
              <div className="space-y-1">
                <label className="block text-sm text-white/90">
                  Heure souhaitée
                </label>
                <select
                  name="eventTime"
                  required
                  className="w-full p-2 border rounded bg-white text-primary focus:ring-2 focus:ring-white/50 focus:border-transparent font-medium"
                >
                  <option value="" className="text-gray-500">Sélectionnez une heure</option>
                  {Array.from({ length: 11 }, (_, i) => i + 10).map((hour) => (
                    <option 
                      key={hour} 
                      value={`${hour}:00`}
                      className="text-primary font-medium"
                    >
                      {hour}:00
                    </option>
                  ))}
                </select>
              </div>
              <textarea
                name="message"
                placeholder="Message supplémentaire"
                className="w-full p-2 border rounded bg-white/10 text-white placeholder-white/70 focus:ring-2 focus:ring-white/50 focus:border-transparent"
                rows={3}
              />
            </div>

            <button
              type="submit"
              className="w-full bg-white text-primary py-3 rounded hover:bg-white/90 transition-colors font-bold text-lg"
              disabled={orders.length === 0}
            >
              Valider la commande
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default QuoteForm;