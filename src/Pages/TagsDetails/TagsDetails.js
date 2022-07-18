import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

function TagsDetails() {
    const { id } = useParams();
    let token = localStorage.getItem("userToken");
    const [tagDetails, setTagDetails] = useState([]);
    const [loading, setLoading] = useState(false);

    const getTagDetails = async () => {
        setLoading(true)
        let { data } = await axios.get(`http://saheembackend.augresearch.com/apiAdmin/Tag/single?tag_id=${id}`, {
            headers: {
                authorization: `${token}`
            }
        });
        setLoading(false);
        setTagDetails(data.data);


    }
    useEffect(() => {
        getTagDetails();
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
                                            {/* <img src={tagDetails && tagDetails.image} className='w-25' alt="avatar" /> */}
                                            <p className="">{tagDetails && tagDetails.id}</p>
                                        </div>
                                        <div className="user-info-list">

                                            <div className="">
                                                <ul className="contacts-block list-unstyled">
                                                    <li className="contacts-block__item d-flex align-items-center">
                                                        <i className="fas  mr-3 fa-money-check-alt"></i><strong className='text-uppercase text-main'> Name: </strong>{tagDetails && tagDetails.name}
                                                    </li>
                                                    <li className="contacts-block__item">
                                                        <i className="fas mr-3 fa-home"></i><strong className='text-uppercase text-main'>Name ar: </strong>{tagDetails && tagDetails.name_ar}
                                                    </li>
                                                    <li className="contacts-block__item">
                                                        <i className="fas mr-3 fa-sort-numeric-up-alt"></i><strong className='text-uppercase text-main'> Name en: </strong> {tagDetails && tagDetails.name_en}
                                                    </li>
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

export default TagsDetails;
