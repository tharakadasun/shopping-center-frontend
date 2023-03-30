import { configureStore } from '@reduxjs/toolkit';
import authSlice from './auth/authSlice';
import cartSlice from './cart/cartSlice';
import productSlice from './product/productSlice';

import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import  orderSlice  from './order/OrderSlice';

const persistConfig = {
  key: 'root',
  storage,
};

const persistedReducer = persistReducer(persistConfig, cartSlice);

export const store = configureStore({
  reducer: {
    products: productSlice,
    user:authSlice,
    cart:persistedReducer,
    order:orderSlice
  },
});
