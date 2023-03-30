import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import baseURL from "../../config/baseUrl";

const initialState = {
  loading: true,
  error: "",
  orderDetails: null,
};

export const createOrder = createAsyncThunk("createOrder", async (body) => {
  console.log('body',body);
  const token = localStorage.getItem("token");
  const response = await fetch(`http://${baseURL}/order/create`, {
    method: "post",
    mode: "cors",
    headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(body),
  });
  return response.json();
});
export const updateOrder = createAsyncThunk("updateOrder", async (body) => {
  console.log('id',body);
  const order = {
    paymentMethodId: body.paymentId
  }
  const token = localStorage.getItem("token");
  const response = await fetch(`http://${baseURL}/order/update/${body.id}`, {
    method: "post",
    mode: "cors",
    headers: {
        "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(order),
  });
  return response.json();
});

export const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder
      .addCase(createOrder.pending, (state) => {
        state.loading = true;
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.orderDetails = action.payload;
      })
      .addCase(createOrder.rejected, (state, action) => {
        state.error = action.error;
        state.loading = true;
      })
      .addCase(updateOrder.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.orderDetails = action.payload;
      })
      .addCase(updateOrder.rejected, (state, action) => {
        state.error = action.error;
        state.loading = true;
      });
  },
});

export default orderSlice.reducer;
