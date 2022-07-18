import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

function OrderDetails() {
    const { id } = useParams();
    let token = localStorage.getItem("userToken");
    const [orderDetails, setorderDetails] = useState([]);
    const [loading, setLoading] = useState(false);

    const getOrderDetails = async () => {
        setLoading(true)
        let { data } = await axios.get(`http://saheembackend.augresearch.com/apiAdmin/Order/single?order_id=${id}`, {
            headers: {
                authorization: `${token}`
            }
        });
        setLoading(false);
        setorderDetails(data.data);
        

    }
    useEffect(() => {
        getOrderDetails();
        // eslint-disable-next-line
    }, []);
    
    return (
        <>
            {
                loading ? (<div id="load_screen">
                    <div className="loader">
                        <div className="loader-content">
                            <div className="spinner-grow align-self-center"></div>
                        </div>
                    </div>
                </div>) : <div id="content" className="main-content">
                    <div className="layout-px-spacing">

                        <div className="row layout-spacing">


                            <div className="col-xl-4 col-lg-6 col-md-5 col-sm-12 layout-top-spacing">

                                <div className="user-profile layout-spacing">
                                    <div className="widget-content widget-content-area">
                                        <div className="d-flex justify-content-between">
                                            <h3 className="">Info</h3>

                                        </div>
                                        <div className="text-center user-info">
                                            {/* <img src={sampleDets && sampleDets.image} className='w-25' alt="avatar" /> */}
                                            <p className="">{orderDetails && orderDetails.id}</p>
                                        </div>
                                        <div className="user-info-list">

                                            <div className="">
                                                <ul className="contacts-block list-unstyled">
                                                    {/* <li className="contacts-block__item d-flex align-items-center">
                                                        <i className="fas  mr-3 fa-money-check-alt"></i><strong className='text-uppercase text-main'> Price: </strong>{sampleDets && sampleDets.price}
                                                    </li>
                                                    <li className="contacts-block__item">
                                                        <i className="fas mr-3 fa-home"></i><strong className='text-uppercase text-main'>Area: </strong>{sampleDets && sampleDets.area}
                                                    </li>
                                                    <li className="contacts-block__item">
                                                        <i className="fas mr-3 fa-sort-numeric-up-alt"></i><strong className='text-uppercase text-main'> BathRoomNum: </strong> {sampleDets && sampleDets.bathRoomNum}
                                                    </li>
                                                    <li className="contacts-block__item">
                                                        <i className="fas mr-3 fa-sort-numeric-up-alt"></i> <strong className='text-uppercase text-main'> BedRoomNum: </strong>{sampleDets && sampleDets.bedRoomNum}
                                                    </li> */}

                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                               
                            </div>
                           

                        </div>
                    </div>
                </div>}
        </>

    );
}

export default OrderDetails;
