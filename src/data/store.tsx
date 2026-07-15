import { createStore, combineReducers, type Reducer, type Store } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';

const storage = {
  getItem: (key: string) => {
    const value = window.localStorage.getItem(key);
    return value ? Promise.resolve(value) : Promise.resolve(null);
  },
  setItem: (key: string, value: string) => {
    window.localStorage.setItem(key, value);
    return Promise.resolve(value);
  },
  removeItem: (key: string) => {
    window.localStorage.removeItem(key);
    return Promise.resolve();
  },
};

export interface CartItem {
  id: number;
  name: string;
  quantity: number;
  reward: number;
}

export interface CartArray {
  cart1: CartItem[];
}

interface StockState extends Array<number> {}

interface ThemeState {
  value: Theme;
}

interface RootStateShape {
  stock: StockState;
  cart3: CartArray;
  theme: ThemeState;
}

export type Theme = 'light' | 'dark' | 'auto';

const initialStock: StockState = [4, 4, 4];
const initialCart: CartArray = {
  cart1: [
    { id: 1, name: '브라키디오스', quantity: 1, reward: 27000 },
    { id: 2, name: '네로미에르', quantity: 1, reward: 35000 },
    { id: 3, name: '진오우거', quantity: 1, reward: 29000 },
  ],
};
const initialTheme: ThemeState = { value: 'auto' };

const stockReducer: Reducer<StockState> = (state = initialStock, action: { type: string; payload?: unknown }) => {
  switch (action.type) {
    case 'CHANGE_STOCK':
      return [5, 5, 5];
    default:
      return state;
  }
};

const cartReducer: Reducer<CartArray> = (state = initialCart, action: { type: string; payload?: any }) => {
  switch (action.type) {
    case 'PLUS_COUNT': {
      const targetId = action.payload as number;
      return {
        ...state,
        cart1: state.cart1.map((item) => (item.id === targetId ? { ...item, quantity: item.quantity + 1 } : item)),
      };
    }
    case 'MINUS_COUNT': {
      const targetId = action.payload as number;
      return {
        ...state,
        cart1: state.cart1
          .map((item) => (item.id === targetId ? { ...item, quantity: Math.max(0, item.quantity - 1) } : item))
          .filter((item) => item.quantity > 0 || item.id !== targetId),
      };
    }
    case 'ADD_ITEM': {
      const payload = action.payload as CartItem;
      const existingItem = state.cart1.find((item) => item.id === payload.id);
      if (existingItem) {
        return {
          ...state,
          cart1: state.cart1.map((item) => (item.id === payload.id ? { ...item, quantity: item.quantity + 1 } : item)),
        };
      }
      return {
        ...state,
        cart1: [...state.cart1, { ...payload, quantity: 1 }],
      };
    }
    case 'RESET_CART':
      return { cart1: [] };
    default:
      return state;
  }
};

const themeReducer: Reducer<ThemeState> = (state = initialTheme, action: { type: string; payload?: Theme }) => {
  switch (action.type) {
    case 'SET_THEME': {
      const newTheme = action.payload ?? state.value;
      document.documentElement.setAttribute('data-bs-theme', newTheme);
      return { value: newTheme };
    }
    default:
      return state;
  }
};

export const changeStock = () => ({ type: 'CHANGE_STOCK' });
export const plusCount = (id: number) => ({ type: 'PLUS_COUNT', payload: id });
export const minusCount = (id: number) => ({ type: 'MINUS_COUNT', payload: id });
export const addItem = (item: CartItem) => ({ type: 'ADD_ITEM', payload: item });
export const resetCart = () => ({ type: 'RESET_CART' });
export const setTheme = (theme: Theme) => ({ type: 'SET_THEME', payload: theme });

const rootReducer: Reducer<RootStateShape> = combineReducers({
  stock: stockReducer as Reducer<StockState>,
  cart3: cartReducer as Reducer<CartArray>,
  theme: themeReducer as Reducer<ThemeState>,
});

const persistConfig = {
  key: 'root',
  storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = createStore(persistedReducer);
export const persistor = persistStore(store);
export type RootState = RootStateShape;
export type AppDispatch = typeof store.dispatch;

