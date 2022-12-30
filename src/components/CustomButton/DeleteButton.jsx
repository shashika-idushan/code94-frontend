import { useDispatch } from 'react-redux';
import { deleteProducts } from '../../features/products/productSlice';

function DeleteButton({product}) {
    const dispatch = useDispatch()
    return (
        <> 
            <button className="btn icon-btn mr-2" data-toggle="modal" data-target="#deleteModal" >
                <svg width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M21.0938 6.25H17.9688V4.29688C17.9688 3.43506 17.2681 2.73438 16.4062 2.73438H8.59375C7.73193 2.73438 7.03125 3.43506 7.03125 4.29688V6.25H3.90625C3.47412 6.25 3.125 6.59912 3.125 7.03125V7.8125C3.125 7.91992 3.21289 8.00781 3.32031 8.00781H4.79492L5.39795 20.7764C5.43701 21.6089 6.12549 22.2656 6.95801 22.2656H18.042C18.877 22.2656 19.563 21.6113 19.6021 20.7764L20.2051 8.00781H21.6797C21.7871 8.00781 21.875 7.91992 21.875 7.8125V7.03125C21.875 6.59912 21.5259 6.25 21.0938 6.25ZM16.2109 6.25H8.78906V4.49219H16.2109V6.25Z" fill="#001EB9"/>
                </svg>
            </button>

        <div class="modal fade" id="deleteModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body p-4 ">
                            <div className="row d-flex align-items-center justify-content-center">
                                <svg width="61" height="61" viewBox="0 0 61 61" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M30.1773 5.01694C25.216 5.01694 20.366 6.48816 16.2408 9.24454C12.1156 12.0009 8.90041 15.9187 7.00178 20.5024C5.10315 25.086 4.60639 30.1298 5.5743 34.9958C6.54221 39.8618 8.93133 44.3316 12.4395 47.8398C15.9477 51.348 20.4175 53.7371 25.2835 54.705C30.1495 55.6729 35.1933 55.1762 39.777 53.2775C44.3606 51.3789 48.2784 48.1637 51.0348 44.0385C53.7911 39.9133 55.2624 35.0633 55.2624 30.102C55.2624 26.8078 54.6135 23.5458 53.3529 20.5024C52.0922 17.4589 50.2445 14.6935 47.9151 12.3642C45.5858 10.0348 42.8204 8.18707 39.777 6.92643C36.7335 5.66579 33.4715 5.01694 30.1773 5.01694ZM30.1773 42.6445C29.6812 42.6445 29.1962 42.4974 28.7837 42.2217C28.3712 41.9461 28.0496 41.5543 27.8598 41.096C27.6699 40.6376 27.6202 40.1332 27.717 39.6466C27.8138 39.16 28.0527 38.713 28.4035 38.3622C28.7544 38.0114 29.2013 37.7725 29.6879 37.6757C30.1745 37.5789 30.6789 37.6286 31.1373 37.8184C31.5957 38.0083 31.9874 38.3298 32.2631 38.7423C32.5387 39.1549 32.6858 39.6399 32.6858 40.136C32.6858 40.8013 32.4215 41.4393 31.9511 41.9098C31.4807 42.3802 30.8426 42.6445 30.1773 42.6445ZM32.6858 32.6105C32.6858 33.2758 32.4215 33.9138 31.9511 34.3843C31.4807 34.8547 30.8426 35.119 30.1773 35.119C29.512 35.119 28.874 34.8547 28.4035 34.3843C27.9331 33.9138 27.6688 33.2758 27.6688 32.6105V20.068C27.6688 19.4027 27.9331 18.7646 28.4035 18.2942C28.874 17.8238 29.512 17.5595 30.1773 17.5595C30.8426 17.5595 31.4807 17.8238 31.9511 18.2942C32.4215 18.7646 32.6858 19.4027 32.6858 20.068V32.6105Z" fill="#F82249"/>
                                </svg>
                            </div>
                            <div className="row d-flex align-items-center justify-content-center mt-3">
                                <h5>ARE YOU SURE?</h5>
                            </div>
                            <div className="row d-flex align-items-center justify-content-center mt-3">
                                <h6>You will not be able to undo this action if you proceed!</h6>
                            </div>
                            <div className="row d-flex align-items-center justify-content-center mt-3">
                                <button className='btn m-1' data-dismiss="modal">Cancel</button>
                                <button className='btn m-1' data-dismiss="modal" onClick={() => dispatch(deleteProducts(product._id))} >Delete</button>
                            </div>
                    </div>
                </div>
            </div>
        </div>
        </>
     );
}

export default DeleteButton;