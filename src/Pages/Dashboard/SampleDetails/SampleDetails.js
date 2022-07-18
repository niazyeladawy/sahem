import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import InfoContext from '../../../InfoContext';

function SampleDetails() {
    const { id } = useParams();
    let { lang } = useContext(InfoContext)
    let token = localStorage.getItem("userToken");
    const [sampleDets, setSampleDets] = useState([]);
    const [sampleImgs, setSampleImgs] = useState([]);
    const [addSampleImages, setaddSampleImages] = useState([]);
    const [loading, setLoading] = useState(false);
    const [addLoading, setAddLoading] = useState(false);
    const [deleteId, setDeleteId] = useState("");

    const getSampleDetails = async () => {
        setLoading(true)
        let { data } = await axios.get(`http://saheembackend.augresearch.com/apiAdmin/Sample/single?Sample_id=${id}`, {
            headers: {
                authorization: `${token}`
            }
        });
        setLoading(false);
        setSampleDets(data.data);
        setSampleImgs(data.data.images)

    }
    useEffect(() => {
        getSampleDetails();
        // eslint-disable-next-line
    }, []);

    const uploadedAddImages = ({ target }) => {
        let myImages = [...addSampleImages];
        Promise.all([...target.files].map(image => myImages.push(image)))
        setaddSampleImages(myImages);
    }


    const handleSubmitImages = async () => {

        setAddLoading(true)
        // create formData object
        const formData = new FormData();
        addSampleImages.forEach(file => {
            formData.append("SampleImages[]", file);
        });
        formData.append("Sample_id", id)

        let { data } = await axios({
            method: "POST",
            url: 'http://saheembackend.augresearch.com/apiAdmin/Sample/addImages',
            data: formData,
            headers: {
                Authorization: `${token}`,
                "Content-Type": "multipart/form-data"
            }
        })
        if (data.message === "Images added successfully") {
            setAddLoading(false);
            handleCloseAddModal();
            getSampleDetails();
        }
        console.log(data);
    }
    console.log(deleteId);

    const handleCloseAddModal = () => {
        document.getElementById("addSampleimages").classList.remove("show", "d-block");
        document.querySelectorAll(".modal-backdrop").forEach(el => el.classList.remove("modal-backdrop"));
        document.querySelector("body").classList.remove("modal-open");
    }


    const handleDeleteImages = async () => {
        setAddLoading(true)
        let { data } = await axios({
            method: "POST",
            url: `http://saheembackend.augresearch.com/apiAdmin/Sample/deleteImage?image_id=${deleteId}`,

            headers: {
                Authorization: `${token}`
            }
        })
        if (data.message === "Image deleted successfully") {
            setAddLoading(false);
            handleCloseDeleteModal();
            getSampleDetails();
        }
    }

    const handleCloseDeleteModal = () => {
        document.getElementById("deleteSampleImages").classList.remove("show", "d-block");
        document.querySelectorAll(".modal-backdrop").forEach(el => el.classList.remove("modal-backdrop"));
        document.querySelector("body").classList.remove("modal-open");
    }
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
                                            <h3 className="">{lang ==="en" ? "Info" :"معلومات"}</h3>

                                        </div>
                                        <div className="text-center user-info">
                                            <img src={sampleDets && sampleDets.image} className='w-25' alt="avatar" />
                                            <p className="">{sampleDets && sampleDets.name_en}</p>
                                        </div>
                                        <div className="user-info-list">

                                            <div className="">
                                                <ul className="contacts-block list-unstyled">
                                                    <li className="contacts-block__item d-flex align-items-center">
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
                                                    </li>

                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="education layout-spacing ">
                                    <div className="widget-content widget-content-area">
                                        <div className='d-flex justify-content-between align-items-center'>
                                            <h3 className="">{lang ==="en" ? "Images" :"الصور"}</h3>
                                            <svg data-toggle="modal" data-target="#addSampleimages" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="cursr feather feather-file-plus text-main"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="12" y1="18" x2="12" y2="12"></line><line x1="9" y1="15" x2="15" y2="15"></line></svg>
                                        </div>
                                        <div className='row'>
                                            {
                                                sampleImgs && sampleImgs.map(imag => (
                                                    <div className='col-md-6' key={imag.id}>
                                                        <div className='item sampleImagesitem mb-3'>
                                                            <div className='position-relative'>
                                                                <img src={imag.image} className='w-100' alt='dd' />
                                                                <div className='sampleImagesOverlay position-absolute'>
                                                                    <i data-toggle="modal" data-target="#deleteSampleImages" className="fas fa-trash text-main cursr fa-2x" onClick={() => setDeleteId(imag.id)} ></i>
                                                                </div>
                                                            </div>


                                                        </div>
                                                    </div>
                                                ))
                                            }
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-xl-8 col-lg-6 col-md-7 col-sm-12 layout-top-spacing">
                                
                                <div className="bio layout-spacing ">
                                    <div className="widget-content widget-content-area">
                                        <h3 className="">{lang ==="en" ? "Description" :"الوصف"}</h3>
                                        <p>{sampleDets.desc_en}</p>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                    <div className="modal fade" id="addSampleimages" tabIndex="-1" role="dialog" aria-labelledby="addSampleimagesLabel" aria-hidden="true">
                        <div className="modal-dialog modal-xl" role="document">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title" id="createModalLabel">Add images</h5>
                                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-x"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                                    </button>
                                </div>
                                <div className="modal-body">
                                    <form>
                                        <div className="row">
                                            <div className="col-lg-11 mx-auto">
                                                <div className="row">
                                                    <div className="col-xl-12 col-lg-12 col-md-8 mt-md-0 mt-4">
                                                        <div className="form">
                                                            <div className="row">

                                                                <div className="col-sm-6">
                                                                    <div className="upload mt-4 pr-md-4">
                                                                        <input multiple onChange={uploadedAddImages} accept='image/*' type="file" id="input-file-max-fs" className="dropify" data-default-file={sampleDets?.image} data-max-file-size="2M" name='image' />
                                                                        <p className="mt-2"><i className="flaticon-cloud-upload mr-1" /> Upload Images</p>
                                                                    </div>
                                                                </div>

                                                            </div>

                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                                <div className="modal-footer">
                                    <button className="btn" data-dismiss="modal"><i className="flaticon-cancel-12"></i> Discard</button>
                                    <button type="button" onClick={handleSubmitImages} className="btn btn-primary">{addLoading ? <i className="fas fa-spinner  fa-spin"></i> : "Add Images"}</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="modal fade" id="deleteSampleImages" tabIndex="-1" role="dialog" aria-labelledby="deleteSampleImagesLabel" aria-hidden="true">
                        <div className="modal-dialog" role="document">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title" id="deleteSampleImagesLabel">Are you sure u want to delete the image</h5>
                                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-x"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                                    </button>
                                </div>
                                <div className="modal-body">
                                    <p className="modal-text"></p>
                                </div>
                                <div className="modal-footer">
                                    <button className="btn" data-dismiss="modal"><i className="flaticon-cancel-12"></i> Discard</button>
                                    <button type="button" className="btn btn-primary" onClick={handleDeleteImages}>{addLoading ? <i className="fas fa-spinner  fa-spin"></i> : "Yes I'm sure"}</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>}
        </>

    );
}

export default SampleDetails;
