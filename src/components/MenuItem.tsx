import { useState } from 'react';
import OrderModal from './OrderModal';
import { useOrders } from '../context/OrderContext';

interface MenuItemProps {
  title: string;
  description: string;
  image: string;
  price: string;
  isMenu?: boolean;
  items?: Array<{title: string; description: string;}>;
}

const MenuItem: React.FC<MenuItemProps> = ({ title, description, image, price, isMenu }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { addOrder } = useOrders();

  const handleOrder = (quantity: number) => {
    const total = parseFloat(price) * quantity;
    addOrder({
      title,
      quantity,
      price,
      total
    });
    setIsModalOpen(false);
  };

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
      <div className="relative h-48">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="p-4">
        <h3 className="text-lg font-bold mb-2">{title}</h3>
        <p className="text-gray-600 mb-4">{description}</p>
        <div className="flex justify-between items-center">
          <span className="text-primary font-bold">{price}</span>
          {!isMenu && (
            <button
              className="bg-primary text-white px-4 py-2 rounded hover:bg-primary/90 transition-colors"
              onClick={() => setIsModalOpen(true)}
            >
              Commander
            </button>
          )}
        </div>
      </div>

      <OrderModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        item={{ title, price }}
        onOrder={handleOrder}
      />
    </div>
  );
};

export default MenuItem;