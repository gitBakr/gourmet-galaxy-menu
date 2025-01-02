import React, { createContext, useContext, useState } from 'react';

interface OrderItem {
  title: string;
  quantity: number;
  price: string;
  total: number;
}

interface OrderContextType {
  orders: OrderItem[];
  addOrder: (order: OrderItem) => void;
  clearOrders: () => void;
  totalAmount: number;
}

const OrderContext = createContext<OrderContextType | undefined>(undefined);

export const OrderProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [orders, setOrders] = useState<OrderItem[]>([]);

  const addOrder = (order: OrderItem) => {
    setOrders(prev => [...prev, order]);
  };

  const clearOrders = () => {
    setOrders([]);
  };

  const totalAmount = orders.reduce((sum, order) => sum + order.total, 0);

  return (
    <OrderContext.Provider value={{ orders, addOrder, clearOrders, totalAmount }}>
      {children}
    </OrderContext.Provider>
  );
};

export const useOrders = () => {
  const context = useContext(OrderContext);
  if (!context) {
    throw new Error('useOrders must be used within an OrderProvider');
  }
  return context;
}; 