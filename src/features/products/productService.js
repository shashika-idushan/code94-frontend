import axios from 'axios'

// const API_URL = 'http://localhost:8090/api/product/'
const API_URL = 'https://code94-app.herokuapp.com/api/product/'

//Get all products
const getAllProducts = async (token) => {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  
    const response = await axios.get(API_URL + 'getAll', config)

    return response.data
}

//Add Product
const addProduct = async (productData, token) => {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  
    const response = await axios.post(API_URL + 'addProduct', productData, config)
  
    return response.data
  }

  //Edit product
  const editProduct = async (productData, token) => {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  
    
    const response = await axios.put(API_URL + 'updateProductById', productData, config)
  
    return response.data
  }


// Delete Product
const deleteProduct = async (pid, token) => {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  
    const response = await axios.delete(API_URL + 'deleteProductById/' + pid, config)
  
    return response.data
}


const productService = {
    getAllProducts, deleteProduct, addProduct, editProduct
  }
  
  export default productService