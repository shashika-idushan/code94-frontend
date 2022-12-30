import React, {useEffect, useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import { addProduct, reset } from "../features/products/productSlice";
import sampleImage from "../assets/sample-image.png"



function AddNewProductPage() {
    const { user } = useSelector((state) => state.auth)
    const { products, isLoading, isError, message, isSuccess } = useSelector(
        (state) => state.products
    )

    const navigate = useNavigate()
    const dispatch = useDispatch()

    useEffect(() => {
        if (!user) {
          navigate('/login')
        }
    }, [user, navigate, dispatch])

    useEffect(() => {
        if (isSuccess) { 
            navigate('/')
        } 
    }, [isSuccess])




    // const [img1, setImg1] = useState(null);
    const [imgString, setimgString] = useState();

    const [sku, setSku] = useState();
    const [price, setPrice] = useState();
    const [name, setName] = useState();
    const [qty, setQty] = useState();
    const [description, setDescription] = useState();
    const [productImages, setProductImages] = useState([]);

    //Image data
    const [imgData1, setImgData1] = useState(null);
    const [imgData2, setImgData2] = useState(null);
    const [imgData3, setImgData3] = useState(null);

    //Preview Images
    const [img1, setImg1] = useState(null);
    const [img2, setImg2] = useState(null);
    const [img3, setImg3] = useState(null);

    // Encode file to preview : encodeFileBase64
    function imageConverter (file,index) {
        var reader = new FileReader();
        if (file) {
          reader.readAsDataURL(file);
          reader.onload = () => {
            var Base64 = reader.result;
            eval("setImg"+(index + 1)+'(\''+Base64+'\')');

          };
          reader.onerror = (error) => {
            console.log("error: ", error);
          };
        }
    };

    
    // Add new Product
    function addProductHandler(e) {
        e.preventDefault()
        const formData = new FormData();
  
        formData.append('productImage1', imgData1);
        formData.append('productImage2', imgData2);
        formData.append('productImage3', imgData3);

        formData.append('sku', sku);
        formData.append('price', price);
        formData.append('name', name);
        formData.append('qty', qty);
        formData.append('description', description);

        dispatch(addProduct(formData))

    }

    return ( 
        <div>
            <div className="row">
                <h2 className="mr-3" onClick={(e)=> navigate('/')} >PRODUCTS</h2>
                <div className="d-flex align-items-center justify-content-end">
                    <svg className="mr-3" width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M9 24.5714L17.5714 16L9 7.42857L10.7143 4L22.7143 16L10.7143 28L9 24.5714Z" fill="#001EB9"/>
                    </svg>
                    <h5 style={{color:'#001eb9'}}>Add new product</h5>
                </div>
            </div>


            <div className=" mt-5">
                <form className="product-form custom-form">
                    <div className="row">
                        <div className="col-lg-1">
                            <label>SKU</label>
                        </div>
                        <div className="col-lg-5">
                            <input type="text" className="form-control" onChange={(e)=>setSku(e.target.value)} />
                        </div>
                        <div className="col-lg-1">
                            <label>Price</label>
                        </div>
                        <div className="col-lg-5">
                            <input type="text" className="form-control" onChange={(e)=>setPrice(e.target.value)} />
                        </div>
                    </div>
                    <div className="row mt-3">
                        <div className="col-lg-1">
                            <label>Name</label>
                        </div>
                        <div className="col-lg-5">
                            <input type="text" className="form-control" onChange={(e)=>setName(e.target.value)} />
                        </div>
                        <div className="col-lg-1">
                            <label>QTY</label>
                        </div>
                        <div className="col-lg-5">
                            <input type="text" onChange={(e)=>setQty(e.target.value)} className="form-control" />
                        </div>
                    </div>

                    <div className="row mt-3">
                        <div className="col-lg-12">
                            <label>Product Description</label>
                            <p className="grey-sm-text">A small description about the project</p>
                            <textarea class="form-control"  rows="3" onChange={(e)=>setDescription(e.target.value)} ></textarea>
                        </div>
                        
                    </div>

                    <div className="row mt-3">
                        <div className="col-lg-3">
                            <label>Product Images</label>
                            <p className="grey-sm-text">JPG, PNG, SVF or GIF <br/>(Maximum file size 50MB)</p>
                            <p></p>
                        </div>
                        <div className="col-lg-9">
                            {/* <a  href="#" data-toggle="modal" data-target="#imageUpload">Add Images</a> */}
                            {productImages != null &&
                                <div>
                                    <div className="image-box d-inline mr-3" >
                                        <label for="image_1">
                                            <img src={img1 == null ? sampleImage : img1} height={"100px"} width={"100px"} />
                                        </label>
                                        <input type="file" name="photo" id="image_1" style={{display:'none'}} onChange={(e)=>{imageConverter(e.target.files[0],0); setImgData1(e.target.files[0])}}   />
                                    </div>
                                    <div className="image-box d-inline mr-3" >
                                        <label for="image_2">
                                            <img src={img2 == null ? sampleImage : img2} height={"100px"} width={"100px"} />
                                        </label>
                                        <input type="file" name="photo" id="image_2" style={{display:'none'}} onChange={(e)=>{imageConverter(e.target.files[0],1); setImgData2(e.target.files[0])}}   />
                                    </div>
                                    <div className="image-box d-inline mr-3" >
                                        <label for="image_3">
                                            <img src={img3 == null ? sampleImage : img3} height={"100px"} width={"100px"} />
                                        </label>
                                        <input type="file" name="photo" id="image_3" style={{display:'none'}} onChange={(e)=>{imageConverter(e.target.files[0],2); setImgData3(e.target.files[0])}}   />
                                    </div>                                                                
                                </div> 
                            }
                        </div>
                    </div>
                    <div className="row" style={{float:'right'}}>
                        <button className="btn btn-blue mr-3" onClick={(e)=>addProductHandler(e)} >Add Product</button>
                    </div>
                </form>
            </div>
           
        </div>
     );
}

export default AddNewProductPage;