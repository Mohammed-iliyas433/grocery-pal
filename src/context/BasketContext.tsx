import React, { createContext, useContext, useReducer, ReactNode } from 'react';

export interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  category: string;
  hasNuts?: boolean;
  isHighProtein?: boolean;
  isLowSugar?: boolean;
  isHealthy?: boolean;
}

export interface BasketItem extends Product {
  quantity: number;
}

export interface NudgeRecommendation {
  type: 'add' | 'swap';
  product: Product;
  reason: string;
  originalProduct?: Product;
}

interface BasketState {
  items: BasketItem[];
  total: number;
  nudgeRecommendation: NudgeRecommendation | null;
  showAllergyAlert: boolean;
  allergyProduct: Product | null;
  recommendations: Product[];
}

type BasketAction =
  | { type: 'ADD_ITEM'; product: Product }
  | { type: 'REMOVE_ITEM'; productId: string }
  | { type: 'UPDATE_QUANTITY'; productId: string; quantity: number }
  | { type: 'SHOW_NUDGE'; recommendation: NudgeRecommendation }
  | { type: 'HIDE_NUDGE' }
  | { type: 'SHOW_ALLERGY_ALERT'; product: Product }
  | { type: 'HIDE_ALLERGY_ALERT' }
  | { type: 'UPDATE_RECOMMENDATIONS'; recommendations: Product[] }
  | { type: 'CLEAR_BASKET' };

const basketReducer = (state: BasketState, action: BasketAction): BasketState => {
  switch (action.type) {
    case 'ADD_ITEM': {
      const existingItem = state.items.find(item => item.id === action.product.id);
      let newItems;
      
      if (existingItem) {
        newItems = state.items.map(item =>
          item.id === action.product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        newItems = [...state.items, { ...action.product, quantity: 1 }];
      }

      const newTotal = newItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
      
      return {
        ...state,
        items: newItems,
        total: newTotal,
      };
    }

    case 'REMOVE_ITEM': {
      const newItems = state.items.filter(item => item.id !== action.productId);
      const newTotal = newItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
      
      return {
        ...state,
        items: newItems,
        total: newTotal,
      };
    }

    case 'UPDATE_QUANTITY': {
      const newItems = state.items.map(item =>
        item.id === action.productId
          ? { ...item, quantity: Math.max(0, action.quantity) }
          : item
      ).filter(item => item.quantity > 0);

      const newTotal = newItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
      
      return {
        ...state,
        items: newItems,
        total: newTotal,
      };
    }

    case 'SHOW_NUDGE':
      return {
        ...state,
        nudgeRecommendation: action.recommendation,
      };

    case 'HIDE_NUDGE':
      return {
        ...state,
        nudgeRecommendation: null,
      };

    case 'SHOW_ALLERGY_ALERT':
      return {
        ...state,
        showAllergyAlert: true,
        allergyProduct: action.product,
      };

    case 'HIDE_ALLERGY_ALERT':
      return {
        ...state,
        showAllergyAlert: false,
        allergyProduct: null,
      };

    case 'UPDATE_RECOMMENDATIONS':
      return {
        ...state,
        recommendations: action.recommendations,
      };

    case 'CLEAR_BASKET':
      return {
        ...state,
        items: [],
        total: 0,
      };

    default:
      return state;
  }
};

const initialState: BasketState = {
  items: [],
  total: 0,
  nudgeRecommendation: null,
  showAllergyAlert: false,
  allergyProduct: null,
  recommendations: [],
};

interface BasketContextType {
  state: BasketState;
  dispatch: React.Dispatch<BasketAction>;
  addItem: (product: Product) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  scanProduct: (product: Product) => void;
}

const BasketContext = createContext<BasketContextType | undefined>(undefined);

export const BasketProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(basketReducer, initialState);

  const addItem = (product: Product) => {
    dispatch({ type: 'ADD_ITEM', product });
  };

  const removeItem = (productId: string) => {
    dispatch({ type: 'REMOVE_ITEM', productId });
  };

  const updateQuantity = (productId: string, quantity: number) => {
    dispatch({ type: 'UPDATE_QUANTITY', productId, quantity });
  };

  const scanProduct = (product: Product) => {
    // Check for allergy alert first
    if (product.hasNuts) {
      dispatch({ type: 'SHOW_ALLERGY_ALERT', product });
      return;
    }

    // Add to basket
    addItem(product);

    // Generate nudge recommendations based on product
    const nudgeRecommendation = generateNudgeRecommendation(product, state.items);
    if (nudgeRecommendation) {
      dispatch({ type: 'SHOW_NUDGE', recommendation: nudgeRecommendation });
    }

    // Update recommendations carousel
    const recommendations = generateRecommendations(product, state.items);
    dispatch({ type: 'UPDATE_RECOMMENDATIONS', recommendations });
  };

  const value = {
    state,
    dispatch,
    addItem,
    removeItem,
    updateQuantity,
    scanProduct,
  };

  return (
    <BasketContext.Provider value={value}>
      {children}
    </BasketContext.Provider>
  );
};

export const useBasket = () => {
  const context = useContext(BasketContext);
  if (context === undefined) {
    throw new Error('useBasket must be used within a BasketProvider');
  }
  return context;
};

// Mock recommendation logic
function generateNudgeRecommendation(product: Product, basketItems: BasketItem[]): NudgeRecommendation | null {
  // Greek Yogurt → Recommend High-Protein Granola
  if (product.name.toLowerCase().includes('yogurt')) {
    return {
      type: 'add',
      product: {
        id: 'granola-hp',
        name: 'High-Protein Granola',
        price: 2.50,
        image: '/placeholder-granola.jpg',
        category: 'breakfast',
        isHighProtein: true,
      },
      reason: 'Power-up pairing: Add High-Protein Granola (intro £2.50)',
    };
  }

  // Regular Energy Bar → Suggest High-Protein Low-Sugar Bar
  if (product.name.toLowerCase().includes('energy bar') && !product.isHighProtein) {
    return {
      type: 'swap',
      product: {
        id: 'protein-bar',
        name: 'High-Protein Low-Sugar Bar',
        price: product.price,
        image: '/placeholder-protein-bar.jpg',
        category: 'snacks',
        isHighProtein: true,
        isLowSugar: true,
      },
      reason: 'Swap with High-Protein Low-Sugar Bar (same price, more protein)',
      originalProduct: product,
    };
  }

  return null;
}

function generateRecommendations(product: Product, basketItems: BasketItem[]): Product[] {
  const recommendations: Product[] = [];

  // Bread → Suggest Butter and Jam
  if (product.name.toLowerCase().includes('bread')) {
    recommendations.push(
      {
        id: 'butter',
        name: 'Organic Butter 250g',
        price: 2.45,
        image: '/placeholder-butter.jpg',
        category: 'dairy',
      },
      {
        id: 'strawberry-jam',
        name: 'Strawberry Jam 340g',
        price: 2.15,
        image: '/placeholder-jam.jpg',
        category: 'condiments',
      }
    );
  }

  // Pasta → Suggest Tomato Pasta Sauce
  if (product.name.toLowerCase().includes('pasta')) {
    recommendations.push({
      id: 'tomato-sauce',
      name: 'Tomato Pasta Sauce',
      price: 1.75,
      image: '/placeholder-sauce.jpg',
      category: 'condiments',
    });
  }

  // Whole Milk → Suggest Low-Fat Protein Shake
  if (product.name.toLowerCase().includes('milk')) {
    recommendations.push({
      id: 'protein-shake',
      name: 'Low-Fat Protein Shake',
      price: 3.25,
      image: '/placeholder-shake.jpg',
      category: 'drinks',
      isHighProtein: true,
    });
  }

  // Chicken + Potatoes in basket → Recommend Veggies + Gravy
  const hasChicken = basketItems.some(item => item.name.toLowerCase().includes('chicken'));
  const hasPotatoes = basketItems.some(item => item.name.toLowerCase().includes('potato'));
  
  if (hasChicken && hasPotatoes) {
    recommendations.push(
      {
        id: 'steamed-veggies',
        name: 'Steamed Vegetables',
        price: 2.00,
        image: '/placeholder-veggies.jpg',
        category: 'vegetables',
        isHealthy: true,
      },
      {
        id: 'gravy',
        name: 'Sunday Roast Gravy',
        price: 1.50,
        image: '/placeholder-gravy.jpg',
        category: 'condiments',
      }
    );
  }

  return recommendations;
}