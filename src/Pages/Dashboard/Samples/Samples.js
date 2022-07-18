import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import InfoContext from '../../../InfoContext';

import { toast } from 'react-toastify';

toast.configure();

function Samples() {
    let navigate = useNavigate();
    let { lang } = useContext(InfoContext);
    const [loading, setLoading] = useState(false);
    let token = localStorage.getItem("userToken");
    const [allSamples, setAllSamples] = useState([]);
    const [sampleId, setSampleId] = useState(null);
    const [createSampleData, setcreateSampleData] = useState({ name_ar: "", name_en: "", desc_ar: "", desc_en: "", video: "", image: "", area: "", bedRoomNum: "", bathRoomNum: "", price: "", SampleImages: [] });
    const [sampleDets, setSampleDets] = useState([]);
    const [createSampleImages, setCreateSampleImages] = useState([]);
    const [updateSampleImages, setUpdateSampleImages] = useState([]);
    const [updateSampleImage, setupdateSampleImage] = useState(null);
    const [updateSampleVideo, setupdateSampleVideo] = useState(null);
    const [btnloading, setBtnLoading] = useState(false);

    const getSamples = async () => {
        setLoading(true);
        let { data } = await axios.get("http://saheembackend.augresearch.com/apiAdmin/Sample/all", {
            headers: {
                Authorization: `${token}`
            }
        });
        setAllSamples(data.data.data);
        setLoading(false)
    }

    useEffect(() => {
        getSamples();
        // eslint-disable-next-line
    }, []);

    const handleDelete = async () => {
        setBtnLoading(true);
        const { data } = await axios.post(`http://saheembackend.augresearch.com/apiAdmin/Sample/delete?Sample_id=${sampleId}`, {}, {
            headers: {
                authorization: `${token}`
            }
        })
        console.log();
        if (data.message === "Sample deleted successfully") {
            setBtnLoading(false);
            handleCloseDeleteModal();
            toast.success("Sample deleted successfully !",{position: "bottom-right",});
            getSamples();

        }
        else{
            setBtnLoading(false);
            toast.error("error deleting",{position: "bottom-right",});
        }
    }

    const handleCloseDeleteModal = () => {
        document.getElementById("deleteModal").classList.remove("show", "d-block");
        document.querySelectorAll(".modal-backdrop").forEach(el => el.classList.remove("modal-backdrop"));
        document.querySelector("body").classList.remove("modal-open");
    }

    const getCeatedSampleData = (e) => {
        let myCreate = { ...createSampleData };
        myCreate[e.target.name] = e.target.value;
        setcreateSampleData(myCreate);
    }

    const uploadedCreateImage = (e) => {
        let myCreate = { ...createSampleData };
        myCreate[e.target.name] = e.target.files[0];
        setcreateSampleData(myCreate);
    }

    const uploadedCreateImages = ({ target }) => {
        let myImages = [...createSampleImages];
        Promise.all([...target.files].map(image => myImages.push(image)))
        setCreateSampleImages(myImages);
    }

    const handleSubmitCreate = async () => {
        setBtnLoading(true);
        const formData = new FormData();
        formData.append('name_ar', createSampleData.name_ar);
        formData.append('name_en', createSampleData.name_en);
        formData.append('desc_ar', createSampleData.desc_ar);
        formData.append('desc_en', createSampleData.desc_en);
        formData.append("video", createSampleData.video);
        formData.append("image", createSampleData.image);
        formData.append("area", createSampleData.area);
        formData.append("bedRoomNum", createSampleData.bedRoomNum);
        formData.append("bathRoomNum", createSampleData.bathRoomNum);
        formData.append("price", createSampleData.price);
        createSampleImages.forEach(file => {
            formData.append("SampleImages[]", file);
        });
        try {
            const response = await axios({
                method: "post",
                url: "http://saheembackend.augresearch.com/apiAdmin/Sample/create",
                data: formData,
                headers: { "Content-Type": "multipart/form-data", authorization: `${token}` },
            });
            console.log(response);

            if (response.data.message === "Sample added successfully") {
                setBtnLoading(false);
                handleCloseCreateModal();
                getSamples();
                toast.success("Sample added successfully !",{position: "bottom-right",});
            }
        } catch (error) {
            setBtnLoading(false);
            console.log(error);
            toast.error(error,{position: "bottom-right",});
        }
    }

    const handleCloseCreateModal = () => {
        document.getElementById("createModal").classList.remove("show", "d-block");
        document.querySelectorAll(".modal-backdrop").forEach(el => el.classList.remove("modal-backdrop"));
        document.querySelector("body").classList.remove("modal-open");
    }

    const getSampleDetails = async (sample) => {
        setSampleDets(sample)
    }

    const getEditedampleData = (e) => {
        let myEdit = { ...sampleDets };
        myEdit[e.target.name] = e.target.value;
        setSampleDets(myEdit);
    }

    const uploadedEditImage = (e) => {
        setupdateSampleImage(e.target.files[0]);
    }

    const uploadedEditVideo = (e) => {
        setupdateSampleVideo(e.target.files[0]);
    }

    const uploadedEditImages = ({ target }) => {
        let myImages = [...updateSampleImages];
        Promise.all([...target.files].map(image => myImages.push(image)))
        setUpdateSampleImages(myImages);
    }
    
    
    const handleSubmitEdit = async () => {
        setBtnLoading(true);
        const formData = new FormData();
        formData.append('name_ar', sampleDets.name_ar);
        formData.append('name_en', sampleDets.name_en);
        formData.append('desc_ar', sampleDets.desc_ar);
        formData.append('desc_en', sampleDets.desc_en);
        
        if(updateSampleImage){
            formData.append("image", updateSampleImage);
        }
        if(updateSampleVideo){
            formData.append("video", updateSampleVideo);
        }
        
        formData.append("area", sampleDets.area);
        formData.append("bedRoomNum", sampleDets.bedRoomNum);
        formData.append("bathRoomNum", sampleDets.bathRoomNum);
        formData.append("price", sampleDets.price);
        formData.append('Sample_id', sampleDets.id);
        updateSampleImages.forEach(file => {
            formData.append("SampleImages[]", file);
        });
        for (var value of formData.values()) {
            console.log(value);
         }
        console.log(formData.get("price"));
        try {
            const response = await axios({
                method: "post",
                url: "http://saheembackend.augresearch.com/apiAdmin/Sample/edit",
                data: formData,
                headers: { "Content-Type": "multipart/form-data", authorization: `${token}` },
            });
            console.log(response);

            if (response.data.message === "Sample updated successfully") {
                setBtnLoading(false);
                handleCloseUpdateModal();
                getSamples();
                toast.success("Sample updated successfully !",{position: "bottom-right",});
            }
        } catch (error) {
            setBtnLoading(false);
            toast.error(error,{position: "bottom-right",});
            console.log(error);
        }
    }

    const handleCloseUpdateModal = () => {
        document.getElementById("editModal").classList.remove("show", "d-block");
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
                </div>) : (<div id="content" className="main-content">
                    <div className="layout-px-spacing">
                        <div className="row layout-top-spacing">
                            <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12 layout-spacing">
                                <div className="widget widget-chart-one">
                                    <div className="table-responsive">
                                        <h4>{lang === "en" ?"Samples":"العينات"}</h4>
                                        <div className='d-flex justify-content-end mb-3'>
                                            <div className='d-flex cursr ' data-toggle="modal" data-target="#createModal">
                                                <p>{lang === "en" ?"Create Sample":"انشاء عينة"}</p>
                                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-file-plus text-main"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="12" y1="18" x2="12" y2="12"></line><line x1="9" y1="15" x2="15" y2="15"></line></svg>
                                            </div>

                                        </div>
                                        <table className="table table-bordered table-hover table-striped mb-4">
                                            <thead>
                                                <tr>
                                                    <th className='text-center'>id</th>
                                                    <th>Name</th>
                                                    <th>price</th>
                                                    <th>desc</th>
                                                    <th>area</th>
                                                    <th>bathRoomNum</th>
                                                    <th>bedRoomNum</th>
                                                    <th className='text-center'>Action</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {allSamples && allSamples.map(sample => (<tr key={sample.id}>
                                                    <td className='text-center'>{sample.id}</td>
                                                    <td>{lang === "en" ? sample.name_en : sample.name_ar}</td>
                                                    <td>{sample.price}</td>
                                                    <td>{lang === "en" ? sample.desc_en : sample.desc_ar}</td>
                                                    <td>{sample.area}</td>
                                                    <td>{sample.bathRoomNum}</td>
                                                    <td>{sample.bedRoomNum}</td>
                                                    <td className="text-center action-row">

                                                        <svg _ngcontent-ahm-c61="" onClick={() => setSampleId(sample.id)} data-toggle="modal" data-target="#deleteModal" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="m-1 cursr feather feather-trash-2 text-danger"><polyline _ngcontent-ahm-c61="" points="3 6 5 6 21 6"></polyline><path _ngcontent-ahm-c61="" d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path><line _ngcontent-ahm-c61="" x1="10" y1="11" x2="10" y2="17"></line><line _ngcontent-ahm-c61="" x1="14" y1="11" x2="14" y2="17"></line></svg>

                                                        <svg onClick={() => { setSampleId(sample.id); getSampleDetails(sample) }} data-toggle="modal" data-target="#editModal" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="m-1 cursr feather feather-edit-2 text-warning"><path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"></path></svg>

                                                        <svg onClick={() => navigate(`/dashboard/sample/${sample.id}`, { replace: true })} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="m-1 cursr feather feather-eye text-secondary"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>

                                                    </td>
                                                </tr>))}


                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                    <div className="modal fade " id="createModal" tabIndex="-1" role="dialog" aria-labelledby="createModalLabel" aria-hidden="true">
                        <div className="modal-dialog modal-xl" role="document">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title" id="createModalLabel">Create Sample</h5>
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
                                                                    <div className="form-group">
                                                                        <label htmlFor="name_ar">Name_ar</label>
                                                                        <input onChange={getCeatedSampleData} type="text" className="form-control mb-4" id="name_ar" name='name_ar' placeholder="Name_ar" />
                                                                    </div>
                                                                </div>
                                                                <div className="col-sm-6">
                                                                    <div className="form-group">
                                                                        <label htmlFor="name_en">Name_en</label>
                                                                        <input onChange={getCeatedSampleData} type="text" name='name_en' className="form-control mb-4" id="name_en" placeholder="Name_en" />
                                                                    </div>
                                                                </div>
                                                                <div className="col-sm-6">
                                                                    <div className="form-group">
                                                                        <label htmlFor="desc_ar">desc_ar</label>
                                                                        <textarea onChange={getCeatedSampleData} type="text" className="form-control mb-4" id="desc_ar" name='desc_ar' placeholder="Desc_ar" ></textarea>
                                                                    </div>
                                                                </div>
                                                                <div className="col-sm-6">
                                                                    <div className="form-group">
                                                                        <label htmlFor="desc_en">desc_en</label>
                                                                        <textarea onChange={getCeatedSampleData} type="text" className="form-control mb-4" id="desc_en" name='desc_en' placeholder="Desc_en" ></textarea>
                                                                    </div>
                                                                </div>
                                                                <div className="col-sm-6">
                                                                    <div className="form-group">
                                                                        <label htmlFor="area">Area</label>
                                                                        <input onChange={getCeatedSampleData} type="number" name='area' className="form-control mb-4" id="area" placeholder="Area" />
                                                                    </div>
                                                                </div>
                                                                <div className="col-sm-6">
                                                                    <div className="form-group">
                                                                        <label htmlFor="bedRoomNum">BedRoom Num</label>
                                                                        <input onChange={getCeatedSampleData} type="number" name='bedRoomNum' className="form-control mb-4" id="bedRoomNum" placeholder="BedRoom Num" />
                                                                    </div>
                                                                </div>
                                                                <div className="col-sm-6">
                                                                    <div className="form-group">
                                                                        <label htmlFor="bathRoomNum">BathRoom Num</label>
                                                                        <input onChange={getCeatedSampleData} type="number" name='bathRoomNum' className="form-control mb-4" id="bathRoomNum" placeholder="BathRoom Num" />
                                                                    </div>
                                                                </div>
                                                                <div className="col-sm-6">
                                                                    <div className="form-group">
                                                                        <label htmlFor="price">Price</label>
                                                                        <input onChange={getCeatedSampleData} type="number" name='price' className="form-control mb-4" id="price" placeholder="Price" />
                                                                    </div>
                                                                </div>
                                                                <div className="col-sm-6">
                                                                    <div className="upload mt-4 pr-md-4">
                                                                        <input onChange={uploadedCreateImage} accept='image/*' type="file" id="input-file-max-fs" className="dropify" data-default-file="k" data-max-file-size="2M" name='image' />
                                                                        <p className="mt-2"><i className="flaticon-cloud-upload mr-1" /> Upload Image</p>
                                                                    </div>
                                                                </div>
                                                                <div className="col-sm-6">
                                                                    <div className="upload mt-4 pr-md-4">
                                                                        <input onChange={uploadedCreateImage} name='video' accept='video/*' type="file" id="input-file-max-fs" className="dropify" data-default-file="k" data-max-file-size="2M" />
                                                                        <p className="mt-2"><i className="flaticon-cloud-upload mr-1" /> Upload Video</p>
                                                                    </div>
                                                                </div>
                                                                <div className="col-sm-6">
                                                                    <div className="upload mt-4 pr-md-4">
                                                                        <input multiple onChange={uploadedCreateImages} accept='image/*' type="file" id="input-file-max-fs" className="dropify" data-default-file="k" data-max-file-size="2M" />
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
                                    <button type="button" onClick={handleSubmitCreate} className="btn btn-primary">{btnloading ? <i className="fas fa-spinner  fa-spin"></i> : "Create"}</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="modal fade" id="deleteModal" tabIndex="-1" role="dialog" aria-labelledby="deleteModalLabel" aria-hidden="true">
                        <div className="modal-dialog" role="document">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title" id="deleteModalLabel">Are you sure u want to delete</h5>
                                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-x"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                                    </button>
                                </div>
                                <div className="modal-body">
                                    <p className="modal-text"></p>
                                </div>
                                <div className="modal-footer">
                                    <button className="btn" data-dismiss="modal"><i className="flaticon-cancel-12"></i> Discard</button>
                                    <button type="button" onClick={handleDelete} className="btn btn-primary">{btnloading ? <i className="fas fa-spinner  fa-spin"></i> : "Yes I'm sure"}</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="modal fade" id="editModal" tabIndex="-1" role="dialog" aria-labelledby="editModalLabel" aria-hidden="true">
                        <div className="modal-dialog modal-xl" role="document">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title" id="createModalLabel">Create Sample</h5>
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
                                                                    <div className="form-group">
                                                                        <label htmlFor="name_ar">Name_ar</label>
                                                                        <input onChange={getEditedampleData} value={sampleDets?.name_ar} type="text" className="form-control mb-4" id="name_ar" name='name_ar' placeholder="Name_ar" />
                                                                    </div>
                                                                </div>
                                                                <div className="col-sm-6">
                                                                    <div className="form-group">
                                                                        <label htmlFor="name_en">Name_en</label>
                                                                        <input onChange={getEditedampleData} value={sampleDets?.name_en} type="text" name='name_en' className="form-control mb-4" id="name_en" placeholder="Name_en" />
                                                                    </div>
                                                                </div>
                                                                <div className="col-sm-6">
                                                                    <div className="form-group">
                                                                        <label htmlFor="desc_ar">desc_ar</label>
                                                                        <textarea onChange={getEditedampleData} value={sampleDets?.desc_ar} type="text" className="form-control mb-4" id="desc_ar" name='desc_ar' placeholder="Desc_ar" ></textarea>
                                                                    </div>
                                                                </div>
                                                                <div className="col-sm-6">
                                                                    <div className="form-group">
                                                                        <label htmlFor="desc_en">desc_en</label>
                                                                        <textarea onChange={getEditedampleData} value={sampleDets?.desc_en} type="text" className="form-control mb-4" id="desc_en" name='desc_en' placeholder="Desc_en" ></textarea>
                                                                    </div>
                                                                </div>
                                                                <div className="col-sm-6">
                                                                    <div className="form-group">
                                                                        <label htmlFor="area">Area</label>
                                                                        <input onChange={getEditedampleData} value={sampleDets?.area} type="number" name='area' className="form-control mb-4" id="area" placeholder="Area" />
                                                                    </div>
                                                                </div>
                                                                <div className="col-sm-6">
                                                                    <div className="form-group">
                                                                        <label htmlFor="bedRoomNum">BedRoom Num</label>
                                                                        <input onChange={getEditedampleData} value={sampleDets?.bedRoomNum} type="number" name='bedRoomNum' className="form-control mb-4" id="bedRoomNum" placeholder="BedRoom Num" />
                                                                    </div>
                                                                </div>
                                                                <div className="col-sm-6">
                                                                    <div className="form-group">
                                                                        <label htmlFor="bathRoomNum">BathRoom Num</label>
                                                                        <input onChange={getEditedampleData} value={sampleDets?.bathRoomNum} type="number" name='bathRoomNum' className="form-control mb-4" id="bathRoomNum" placeholder="BathRoom Num" />
                                                                    </div>
                                                                </div>
                                                                <div className="col-sm-6">
                                                                    <div className="form-group">
                                                                        <label htmlFor="price">Price</label>
                                                                        <input onChange={getEditedampleData} value={sampleDets?.price} type="number" name='price' className="form-control mb-4" id="price" placeholder="Price" />
                                                                    </div>
                                                                </div>
                                                                <div className="col-sm-6">
                                                                    <div className="upload mt-4 pr-md-4">
                                                                        <input accept='image/*' type="file" id="input-file-max-fs" className="dropify"  onChange={uploadedEditImage} data-max-file-size="2M" name='image' />
                                                                        <p className="mt-2"><i className="flaticon-cloud-upload mr-1" /> Upload Image</p>
                                                                    </div>
                                                                </div>
                                                                <div className="col-sm-6">
                                                                    <div className="upload mt-4 pr-md-4">
                                                                        <input name='video' accept='video/*' type="file" id="input-file-max-fs" className="dropify"  onChange={uploadedEditVideo} data-max-file-size="2M" />
                                                                        <p className="mt-2"><i className="flaticon-cloud-upload mr-1" /> Upload Video</p>
                                                                    </div>
                                                                </div>
                                                                <div className="col-sm-6">
                                                                    <div className="upload mt-4 pr-md-4">
                                                                        <input multiple onChange={uploadedEditImages} accept='image/*' type="file" id="input-file-max-fs" className="dropify" data-max-file-size="2M" />
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
                                    <button type="button" onClick={handleSubmitEdit} className="btn btn-primary">{btnloading ? <i className="fas fa-spinner  fa-spin"></i> : "Update"}</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* <div className="paginating-container pagination-default">
                        <ul className="pagination">
                            <li className="prev"><a href="javascript:void(0);">Prev</a></li>
                            <li><a href="javascript:void(0);">1</a></li>
                            <li className="active"><a href="javascript:void(0);">2</a></li>
                            <li><a href="javascript:void(0);">3</a></li>
                            <li className="next"><a href="javascript:void(0);">Next</a></li>
                        </ul>
                    </div> */}
                </div>)
            }</>

    )
}

export default Samples;
