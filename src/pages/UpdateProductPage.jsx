import React, {useEffect, useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { editProduct, reset } from "../features/products/productSlice";
import sampleImage from "../assets/sample-image.png"



function UpdateProductPage() {
    const { user } = useSelector((state) => state.auth)
    const { products, isLoading, isError, message, isSuccess } = useSelector(
        (state) => state.products
    )

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const location = useLocation();

    const product = location.state?.product;

    useEffect(() => {
        if (!user) {
          navigate('/login')
        }
    }, [user, navigate, dispatch])

    useEffect(() => {
        if (isSuccess) { 
            alert("Product Added Successfully")
        } 
    }, [isSuccess])



    const [sku, setSku] = useState(product.sku);
    const [price, setPrice] = useState(product.price);
    const [name, setName] = useState(product.name);
    const [qty, setQty] = useState(product.qty);
    const [description, setDescription] = useState(product.description);
    const [productImages, setProductImages] = useState(product.productImages);

       //Image data
       const [imgData1, setImgData1] = useState(null);
       const [imgData2, setImgData2] = useState(null);
       const [imgData3, setImgData3] = useState(null);
   
       //Preview Images
       const [img1, setImg1] = useState(typeof productImages[0] === 'undefined' ? sampleImage : productImages[0]);
       const [img2, setImg2] = useState(typeof productImages[1] === 'undefined' ? sampleImage : productImages[1]);
       const [img3, setImg3] = useState(typeof productImages[2] === 'undefined' ? sampleImage : productImages[2]);
   
    

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


    // Encode file to preview
    function encodeFileBase64 (file,index) {
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

    
    // Edit Product
    function editProductHandler(e) {
        e.preventDefault()
        const formData = new FormData();
  
        if(imgData1 != null){
            formData.append('productImage1', imgData1);
        }

        if(imgData2 != null) {
            formData.append('productImage2', imgData2);
        }
        
        if(imgData3 != null){
            formData.append('productImage3', imgData3);
        }

        formData.append('id', product._id);
        
        formData.append('sku', sku);
        formData.append('price', price);
        formData.append('name', name);
        formData.append('qty', qty);
        formData.append('description', description);

        dispatch(editProduct(formData))

    }

    return ( 
        <div>
            <div className="row">
                <h2 className="mr-3" onClick={(e)=> window.location.href = '/'} >PRODUCTS</h2>
                <div className="d-flex align-items-center justify-content-end">
                    <svg className="mr-3" width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M9 24.5714L17.5714 16L9 7.42857L10.7143 4L22.7143 16L10.7143 28L9 24.5714Z" fill="#001EB9"/>
                    </svg>
                    <h5 style={{color:'#001eb9'}}>Edit product</h5>
                </div>
            </div>


            <div className=" mt-5">
                <form className="product-form">
                    <div className="row">
                        <div className="col-lg-1">
                            <label>SKU</label>
                        </div>
                        <div className="col-lg-5">
                            <input type="text" value={sku} className="form-control" onChange={(e)=>setSku(e.target.value)} />
                        </div>
                        <div className="col-lg-1">
                            <label>Price</label>
                        </div>
                        <div className="col-lg-5">
                            <input type="text" value={price} className="form-control" onChange={(e)=>setPrice(e.target.value)} />
                        </div>
                    </div>
                    <div className="row mt-3">
                        <div className="col-lg-1">
                            <label>Name</label>
                        </div>
                        <div className="col-lg-5">
                            <input type="text" value={name} className="form-control" onChange={(e)=>setName(e.target.value)} />
                        </div>
                        <div className="col-lg-1">
                            <label>QTY</label>
                        </div>
                        <div className="col-lg-5">
                            <input type="text" value={qty} onChange={(e)=>setQty(e.target.value)} className="form-control" />
                        </div>
                    </div>

                    <div className="row mt-3">
                        <div className="col-lg-12">
                            <label>Product Description</label>
                            <p>A small description about the project</p>
                            <textarea class="form-control"  rows="3" value={description} onChange={(e)=>setDescription(e.target.value)} ></textarea>
                        </div>
                        
                    </div>

                    <div className="row mt-3">
                        <div className="col-lg-3">
                            <label>Product Images</label>
                            <p>JPG, PNG, SVF or GIF <br/>(Maximum file size 50MB)</p>
                            <p></p>
                        </div>
                        <div className="col-lg-9">
                            {/* <a  href="#" data-toggle="modal" data-target="#imageUpload">Add Images</a> */}
                            {productImages != null &&
                                <div>
                                    {/* <img className="mr-2" src={ img1 == null ? productImages[0] : img1} width={'100px'} height={'100px'} />
                                    <img className="mr-2" src={ img2 == null ? productImages[1] : img2} width={'100px'} height={'100px'} />
                                    <img className="mr-2" src={ img3 == null ? productImages[2] : img3} width={'100px'} height={'100px'} />         */}
                                    <div>
                                        <div className="image-box d-inline mr-3" >
                                            <label for="image_1">
                                                <img src={img1 == null ? productImages[0] : img1} height={"100px"} width={"100px"} />
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
                                </div> 
                            }
                           
                        </div>
                    </div>
                    <div className="row" style={{float:'right'}}>
                        <button className="btn btn-blue mr-3" onClick={(e)=>editProductHandler(e)} >Save Changes</button>
                    </div>
                </form>
            </div>
           
        </div>
     );
}

export default UpdateProductPage;