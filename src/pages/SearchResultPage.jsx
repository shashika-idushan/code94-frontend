import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';

function SearchResultPage(props) {

    const location = useLocation();
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
       
    }, [user, navigate, dispatch])

    const [searchValue, setSearchValue] = useState(location.state?.searchValue);
    const [searchResult, setSearchResult] = useState([]);

    useEffect(() => {
        searchHandler();
    }, []);


    function searchHandler(){
        let temp = [];

        for(let product of products){
            if(product.name.toLowerCase().startsWith(searchValue.toLowerCase())){
                temp.push(product)
            }
        }

        setSearchResult(temp);
    }

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
            

        <h2 onClick={(e)=> navigate('/')}>PRODUCTS</h2>

        <div className="row">
            <div className="col-lg-8">
                <div className=" p-2 search-form row">
                    <div className=" col-lg-10">
                        <input className="form-control" type="text" value={searchValue} onChange={(e)=>{searchSuggestionHandler(e.target.value); setSearchValue(e.target.value)}} />
                           
                    </div>
                    <div className=" col-lg-2 d-flex align-items-center justify-content-center"  >
                        <button className="btn search-btn pr-4 pl-4 mr-2" onClick={searchHandler} ><i class="fa fa-search"></i> Search</button>
                    </div>
                </div>
            </div>
            <div className="col-lg-4">
                <div className=" p-2 row" style={{float:'right'}}>
                    <button className="btn btn-blue mr-3" onClick={(e)=> navigate('/addNewProduct')} > New Product</button>
                    <button className="btn icon-btn-blue" onClick={()=> navigate('/favouriteProducts')}><i class="fa fa-star"></i></button>
                </div>
            </div>
            <div className="col-lg-4 search-drop-down">
                {suggestions.map(
                    s=><button class="dropdown-item" type="button" key={s._id} onClick={(e)=>{setSearchValue(s.name);setSuggestions([])}} >{s.name}</button>
                )}
            </div>
        </div>
        <h6>{searchResult.length} results found for '{searchValue}'</h6>
        <table class="table table-hover mt-5">
        
            <tbody>
                {searchResult.map(
                    product =>
                    <tr >
                        <td className="row">
                            <div className="col-lg-10">
                                <div className="p-3" >
                                    <h6 className="row" style={{color:'#001eb9'}}>{product.sku}</h6>
                                    <h5 className="row">{product.name}</h5>
                                    <p className="row" style={{color:'#969797'}}>{product.description}</p>
                                </div>
                            </div>
                            <div className="col-lg-2 d-flex align-items-center justify-content-end">
                                <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M9 24.5714L17.5714 16L9 7.42857L10.7143 4L22.7143 16L10.7143 28L9 24.5714Z" fill="#001EB9"/>
                                </svg>
                            </div>
                        </td>
                    </tr>
                )}
                

               

               
                
            </tbody>
        </table>

    </div>
    );
}

export default SearchResultPage;