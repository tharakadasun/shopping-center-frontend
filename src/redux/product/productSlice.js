import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import baseURL from "../../config/baseUrl";

const initialState = {
  loading: true,
  error: "",
  products: null,
  product: null,
};

export const productFetch = createAsyncThunk("allproducts", async () => {
  const response = await fetch(`${baseURL}/product/all`);
  return response.json();
});

export const productFetchById = createAsyncThunk("getproduct", async (id) => {
  const token = localStorage.getItem('token')
  const response = await fetch(`${baseURL}/product/${id}`,{
    headers: {
        'Authorization': `Bearer ${token}`
      },
    mode:'cors'
  });
  return response.json();
});

export const productSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(productFetch.pending, (state) => {
        state.loading = true;
      })
      .addCase(productFetch.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
      })
      .addCase(productFetch.rejected, (state, action) => {
        state.error = action.error;
        state.loading = true;
      })
      .addCase(productFetchById.pending, (state) => {
        state.loading = true;
      })
      .addCase(productFetchById.fulfilled, (state, action) => {
        state.loading = false;
        state.product = action.payload;
      })
      .addCase(productFetchById.rejected, (state, action) => {
        state.error = action.error;
        state.loading = true;
      });
  },
});

export default productSlice.reducer;
