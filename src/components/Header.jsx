import { useDispatch, useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import profileImg from '../assets/profile.png';
import { logout, reset } from '../features/auth/authSlice';

function Header() {
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.auth)

    const onLogout = () => {
        dispatch(logout())
        dispatch(reset())
        Navigate('/')
      }
    
    return ( 
        <div className='d-flex d-flex align-items-center justify-content-end' style={{height:'20vh'}}>
            {user != null && 
            <>
            <div class="d-inline p-2 d-flex align-items-center justify-content-center" >
                <a  class=" dropdown-toggle" href="#" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" style={{color:'black'}}>
                        ADMIN
                </a>
                <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                        <a class="dropdown-item" href="#" onClick={onLogout} >Logout</a>
                </div>
       
            </div>
            <div class="d-inline d-flex align-items-center justify-content-center" >
                <img src={profileImg} style={{width:'50px', borderRadius:'50%'}} />
            </div>

            </>
            }
        </div>
     );
}

export default Header;