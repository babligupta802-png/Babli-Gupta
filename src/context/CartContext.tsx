import React, { createContext, useContext, useState, useEffect } from 'react';
import { MenuItem } from '../data/restaurantData';

export interface CartItem {
  id: string; // unique cart entry key, e.g. "vs-1" or "tan-1-half"
  item: MenuItem;
  quantity: number;
  selectedPortion?: 'Half' | 'Full';
  unitPrice: number;
  instructions?: string;
}

export interface OrderReceipt {
  orderId: string;
  customerName: string;
  customerPhone: string;
  orderType: 'dine_in' | 'takeaway' | 'delivery';
  address?: string;
  tableNumber?: string;
  items: CartItem[];
  subtotal: number;
  gst: number;
  deliveryFee: number;
  discount: number;
  total: number;
  timestamp: string;
  paymentMethod: string;
  status: 'Received' | 'Preparing' | 'Ready';
}

interface CartContextType {
  cart: CartItem[];
  addToCart: (item: MenuItem, portion?: 'Half' | 'Full', instructions?: string) => void;
  updateQuantity: (cartId: string, delta: number) => void;
  removeFromCart: (cartId: string) => void;
  clearCart: () => void;
  totalItemsCount: number;
  subtotal: number;
  gst: number;
  deliveryFee: number;
  discount: number;
  couponCode: string;
  setCouponCode: (code: string) => void;
  applyCoupon: () => boolean;
  couponApplied: boolean;
  total: number;
  orderType: 'dine_in' | 'takeaway' | 'delivery';
  setOrderType: (type: 'dine_in' | 'takeaway' | 'delivery') => void;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  placedOrder: OrderReceipt | null;
  setPlacedOrder: (order: OrderReceipt | null) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('tmk_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [orderType, setOrderType] = useState<'dine_in' | 'takeaway' | 'delivery'>('delivery');
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [placedOrder, setPlacedOrder] = useState<OrderReceipt | null>(null);
  const [couponCode, setCouponCode] = useState('');
  const [couponApplied, setCouponApplied] = useState(false);

  useEffect(() => {
    try {
      localStorage.setItem('tmk_cart', JSON.stringify(cart));
    } catch {
      // storage quota or private mode
    }
  }, [cart]);

  const addToCart = (item: MenuItem, portion?: 'Half' | 'Full', instructions?: string) => {
    const unitPrice = portion === 'Half' && item.halfPrice ? item.halfPrice : item.price;
    const cartItemId = portion ? `${item.id}-${portion.toLowerCase()}` : item.id;

    setCart((prev) => {
      const existing = prev.find((ci) => ci.id === cartItemId);
      if (existing) {
        return prev.map((ci) =>
          ci.id === cartItemId ? { ...ci, quantity: ci.quantity + 1 } : ci
        );
      }
      return [
        ...prev,
        {
          id: cartItemId,
          item,
          quantity: 1,
          selectedPortion: portion,
          unitPrice,
          instructions,
        },
      ];
    });
  };

  const updateQuantity = (cartId: string, delta: number) => {
    setCart((prev) =>
      prev
        .map((ci) => {
          if (ci.id === cartId) {
            const newQty = ci.quantity + delta;
            return newQty > 0 ? { ...ci, quantity: newQty } : null;
          }
          return ci;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  const removeFromCart = (cartId: string) => {
    setCart((prev) => prev.filter((ci) => ci.id !== cartId));
  };

  const clearCart = () => {
    setCart([]);
    setCouponApplied(false);
    setCouponCode('');
  };

  const totalItemsCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = cart.reduce((sum, item) => sum + item.unitPrice * item.quantity, 0);

  const applyCoupon = () => {
    if (couponCode.trim().toUpperCase() === 'ROYALKING' || couponCode.trim().toUpperCase() === 'ROYAL10') {
      setCouponApplied(true);
      return true;
    }
    return false;
  };

  const discount = couponApplied ? Math.round(subtotal * 0.1) : 0;
  const gst = Math.round(subtotal * 0.05); // 5% GST on restaurant food
  const deliveryFee = orderType === 'delivery' ? (subtotal > 500 || subtotal === 0 ? 0 : 40) : 0;
  const total = Math.max(0, subtotal - discount + gst + deliveryFee);

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        totalItemsCount,
        subtotal,
        gst,
        deliveryFee,
        discount,
        couponCode,
        setCouponCode,
        applyCoupon,
        couponApplied,
        total,
        orderType,
        setOrderType,
        isCartOpen,
        setIsCartOpen,
        placedOrder,
        setPlacedOrder,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
