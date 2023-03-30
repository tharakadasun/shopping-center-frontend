import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const cartSlice = createSlice({
  name: "cart",
  initialState: { items: [], loading: true, error: "" },
  reducers: {
    addItem: (state, action) => {
      const newItem = action.payload;
      let cartItems = JSON.parse(localStorage.getItem("cart")) || [];
      const existingCartItem = cartItems.find((item) => item.id === newItem.id);
      if (existingCartItem) {
        toast.success("Already added this item")
        existingCartItem.quantity += newItem.quantity;
      } else {
        toast.success("Add to cart"+" "+ newItem.productName+" successfully")
        cartItems.push(newItem);
      }
      localStorage.setItem("cart", JSON.stringify(cartItems));
      
      const existingItemIndex = state.items.findIndex((item) => item.id === newItem.id);
      if (existingItemIndex !== -1) {
        state.items[existingItemIndex].quantity += newItem.quantity;
      } else {
        state.items.push(newItem);
      }
    },
    removeItem: (state, action) => {
      const itemId = action.payload;
      state.items = state.items.filter((item) => item.id !== itemId);
      localStorage.setItem("cart", JSON.stringify(state.items));
    },
    updateQuantity: (state, action) => {
      const { id, quantity } = action.payload;
      const item = state.items.find((item) => item.id === id);
      if (item) {
        item.quantity = quantity;
      }
    },
    addItems:(state)=>{
      const cartItems = localStorage.getItem('cart');
      if(cartItems != null){
        state.items = JSON.parse(cartItems); 
      }
    },
    clearCart: (state) => {
      state.items = [];
    },
  },
});

export const { addItem, removeItem, updateQuantity, clearCart, addItems } =
  cartSlice.actions;
export default cartSlice.reducer;
