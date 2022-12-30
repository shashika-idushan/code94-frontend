import logo from './logo.svg';
import { BrowserRouter as Router, Route, Routes  } from 'react-router-dom';
import './App.css';
import './styles/styles.css'
import ProductsPage from './pages/ProductsPage';
import AddNewProductPage from './pages/AddNewProductPage';
import Header from './components/Header';
import SearchResultPage from './pages/SearchResultPage';
import FavouriteProductsPage from './pages/FavouriteProductsPage';
import Login from './pages/Login';
import UpdateProductPage from './pages/UpdateProductPage';
import { useSelector } from 'react-redux';


function App() {

  return (
    <div className='container'>
      
        <Header />
        <Router>  
              <Routes>

                  <Route exact path='*' element={<ProductsPage/>}/>

                  {/* Shashika */}
                  <Route path='/login' element={<Login />} />
                  <Route exact path='/' element={<ProductsPage/>}/>
                  <Route exact path='/favouriteProducts' element={<FavouriteProductsPage/>}/>
                  <Route exact path='/addNewProduct' element={<AddNewProductPage/>}/>
                  <Route exact path='/updateProduct' element={<UpdateProductPage/>}/>
                  <Route exact path='/search' element={<SearchResultPage/>}/>
                  {/* <Route exact path='/add_inventory_item' element={<AddInventoryItem/>}/>
                  <Route exact path='/update_inventory_item/:id' element={<UpdateInventoryItem/>}/>
                  <Route exact path='/image_upload' element={<ImageUpload/>}/> */}


              </Routes> 
          </Router>

    </div>
  );
}

export default App;
