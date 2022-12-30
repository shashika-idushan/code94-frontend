import React, { useEffect, useState } from 'react';
import DeleteButton from '../components/CustomButton/DeleteButton';
import EditButton from '../components/CustomButton/EditButton';
import FavButton from '../components/CustomButton/FavButton';

//hard coded images
import testImg from '../assets/product-img.png'
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getAllProducts } from '../features/products/productSlice';

function FavouriteProductsPage() {

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const { user } = useSelector((state) => state.auth)
    const { products, isLoading, isError, message } = useSelector(
        (state) => state.products
    )


    useEffect(() => {
        if (!user) {
          navigate('/login')
        }
        dispatch(getAllProducts())
    }, [user, navigate, dispatch])

    function favouriteFilter(id){
        let favIds = JSON.parse(localStorage.getItem("favIds"));
        if(favIds != null){
            for(let i of favIds){
                if(id == i){
                    return true;
                }
            }
        }
    }

    const [searchValue, setSearchValue] = useState("");
    const [suggestions, setSuggestions] = useState([]);
    function searchSuggestionHandler(value){
        if(value != ""){
            let temp = [];
            for(const p of products){
                if(p.name.toLowerCase().startsWith(value.toLowerCase())){
                    temp.push(p)
                }
            }

            setSuggestions(temp);
        } else {
            setSuggestions([]);
        }
    }

    return (
        <div>
            <h2>FAVOURITE PRODUCTS</h2>

            <div className="row">
                <div className="col-lg-8">
                    <div className=" p-2 search-form row">
                        <div className=" col-lg-10">
                            <input className="form-control" type="text" value={searchValue} onChange={(e)=>{searchSuggestionHandler(e.target.value); setSearchValue(e.target.value)}} />
                            {suggestions.map(
                                    s=><button class="dropdown-item" type="button" key={s._id} onClick={(e)=>{setSearchValue(s.name);setSuggestions([])}} >{s.name}</button>
                            )}
                        </div>
                        <div className=" col-lg-2" >
                            <button className="btn search-btn" onClick={()=>window.location.href='/search'} ><i class="fa fa-search"></i> Search</button>
                        </div>
                    </div>
                </div>
                <div className="col-lg-4">
                    <div className=" p-2 row" style={{float:'right'}}>
                        <button className="btn btn-blue mr-3" onClick={(e)=> window.location.href = '/addNewProduct'} > New Product</button>
                        <button className="btn icon-btn-blue"><i class="fa fa-star"></i></button>
                    </div>
                </div>
            </div>


            <table class="table mt-5">
                <thead>
                    <tr className="product-table-header">
                        <th scope="col">SKU</th>
                        <th scope="col">IMAGE</th>
                        <th scope="col">PRODUCT NAME</th>
                        <th scope="col">PRICE</th>
                        <th scope="col"></th>
                    </tr>
                </thead>
                <tbody>
                    {products.map(p=> favouriteFilter(p._id) &&
                    <tr>
                        <th style={{color:'#969191'}}>{p.sku}</th>
                        <td>
                            <img width={'50px'} src={testImg} />
                        </td>
                        <td>{p.name}</td>
                        <td>$24.00</td>
                        <td>
                            <DeleteButton product={p} />
                            <EditButton product={p} />
                            <FavButton product={p} />
                        </td>
                    </tr>
                    )}
                
                </tbody>
            </table>

        </div>
    );
}

export default FavouriteProductsPage;