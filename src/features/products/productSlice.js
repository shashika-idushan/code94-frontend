import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import productService from './productService'

const initialState = {
    products: [],
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: '',
  }


// Add new Product
export const addProduct = createAsyncThunk(
    'products/add',
    async (productData, thunkAPI) => {
      try {
        const token = thunkAPI.getState().auth.user.token
        return await productService.addProduct(productData, token)
      } catch (error) {
        const message =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString()
        return thunkAPI.rejectWithValue(message)
      }
    }
)

// Get products
export const getAllProducts = createAsyncThunk(
    'product/getAll',
    async (_, thunkAPI) => {
      try {
        const token = thunkAPI.getState().auth.user.token;
        return await productService.getAllProducts(token)
      } catch (error) {
        const message =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString()
        return thunkAPI.rejectWithValue(message)
      }
    }
)

// Edit Product
export const editProduct = createAsyncThunk(
  'products/edit',
  async (productData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token
      return await productService.editProduct(productData, token)
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString()
      return thunkAPI.rejectWithValue(message)
    }
  }
)

// Delete user goal
export const deleteProducts = createAsyncThunk(
    'product/delete',
    async (id, thunkAPI) => {
      try {
        const token = thunkAPI.getState().auth.user.token
        return await productService.deleteProduct(id, token)
      } catch (error) {
        const message =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString()
        return thunkAPI.rejectWithValue(message)
      }
    }
)


  export const productSlice = createSlice({
    name: 'product',
    initialState,
    reducers: {
      reset: (state) => initialState,
    },
    extraReducers: (builder) => {
      builder
        .addCase(addProduct.pending, (state) => {
            state.isLoading = true
        })
        .addCase(addProduct.fulfilled, (state, action) => {
            state.isLoading = false
            state.isSuccess = true
            state.products.push(action.payload.product)
        })
        .addCase(addProduct.rejected, (state, action) => {
            state.isLoading = false
            state.isError = true
            state.message = action.payload
        })
        .addCase(getAllProducts.pending, (state) => {
            state.isLoading = true
        })
        .addCase(getAllProducts.fulfilled, (state, action) => {
            state.isLoading = false
            state.isSuccess = true
            state.products = action.payload
        })
        .addCase(getAllProducts.rejected, (state, action) => {
            state.isLoading = false
            state.isError = true
            state.message = action.payload
        })
        .addCase(editProduct.pending, (state) => {
          state.isLoading = true
        })
        .addCase(editProduct.fulfilled, (state, action) => {
            state.isLoading = false
            state.isSuccess = true
            state.products.push(action.payload.product)
        })
        .addCase(editProduct.rejected, (state, action) => {
            state.isLoading = false
            state.isError = true
            state.message = action.payload
        })
        .addCase(deleteProducts.pending, (state) => {
            state.isLoading = true
        })
        .addCase(deleteProducts.fulfilled, (state, action) => {
            state.isLoading = false
            state.isSuccess = true
            state.products = state.products.filter(
              (product) => product._id !== action.payload.id
            )
        })
        .addCase(deleteProducts.rejected, (state, action) => {
            state.isLoading = false
            state.isError = true
            state.message = action.payload
        })   
    },
  })

  export const { reset } = productSlice.actions
  export default productSlice.reducer