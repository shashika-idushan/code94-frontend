import { useNavigate} from 'react-router-dom';

function EditButton({product}) {
    const navigate = useNavigate()
    return ( 
        <button className="btn icon-btn mr-2" onClick={(e)=>navigate('/updateProduct',{state:{product:product}})}>
            <svg width="27" height="27" viewBox="0 0 27 27" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M3.375 19.4063V23.625H7.59375L20.0362 11.1825L15.8175 6.96378L3.375 19.4063ZM23.2987 7.92003C23.403 7.81596 23.4858 7.69233 23.5422 7.55624C23.5987 7.42014 23.6277 7.27425 23.6277 7.12691C23.6277 6.97957 23.5987 6.83368 23.5422 6.69758C23.4858 6.56149 23.403 6.43786 23.2987 6.33378L20.6663 3.70128C20.5622 3.59699 20.4385 3.51425 20.3025 3.4578C20.1664 3.40134 20.0205 3.37228 19.8731 3.37228C19.7258 3.37228 19.5799 3.40134 19.4438 3.4578C19.3077 3.51425 19.1841 3.59699 19.08 3.70128L17.0212 5.76003L21.24 9.97878L23.2987 7.92003Z" fill="#001EB9"/>
                </svg>
        </button>
     );
}

export default EditButton;