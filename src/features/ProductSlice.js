import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


const API = `${import.meta.env.VITE_API_URL}/products`;


// Fetch all products
export const fetchProducts = createAsyncThunk(
  "product/fetchProducts",
  async () => {
    const response = await axios.get(API);
    return response.data;
  },
);

// Add product
export const addProduct = createAsyncThunk(
  "product/addProduct",
  async (product) => {
    const response = await axios.post(API, product);
    return response.data;
  },
);

// Update product
export const updateProduct = createAsyncThunk(
  "product/updateProduct",
  async (product) => {
    const response = await axios.put(`${API}/${product.id}`, product);
    return response.data;
  },
);

// Delete product
export const deleteProduct = createAsyncThunk(
  "product/deleteProduct",
  async (id) => {
    await axios.delete(`${API}/${id}`);
    return id;
  },
);

const ProductSlice = createSlice({
  name: "product",

  initialState: {
    products: [],
    editValue: null,
    loading: false,
    error: null,
  },

  reducers: {
    setEditValue: (state, action) => {
      state.editValue =
        state.products.find((p) => String(p.id) === String(action.payload)) ||
        null;
    },

    clearEditValue: (state) => {
      state.editValue = null;
    },
  },

  extraReducers: (builder) => {
    builder
      // Fetch products
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
      })

      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // Add product
      .addCase(addProduct.fulfilled, (state, action) => {
        state.products.push(action.payload);
      })

      // Update product
      .addCase(updateProduct.fulfilled, (state, action) => {
        const index = state.products.findIndex(
          (p) => String(p.id) === String(action.payload.id),
        );

        if (index !== -1) {
          state.products[index] = action.payload;
        }

        state.editValue = null;
      })

      // Delete product
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.products = state.products.filter(
          (p) => String(p.id) !== String(action.payload),
        );
      });
  },
});

export const { setEditValue, clearEditValue } = ProductSlice.actions;

export default ProductSlice.reducer;
