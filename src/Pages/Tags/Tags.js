import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import InfoContext from '../../InfoContext';
import { toast } from 'react-toastify';

toast.configure();
function Tags() {
    
    let { lang } = useContext(InfoContext);
    let navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    let token = localStorage.getItem("userToken");
    const [allTags, setAllTags] = useState([]);
    const [tagId, setTagId] = useState(null);
    const [createTagNamear, setCreateTagNamear] = useState("");
    const [createTagNameen, setCreateTagNameen] = useState("");
    const [tagDetails, settagDetails] = useState();
    const [btnLoading, setBtnLoading] = useState(false);

    const getTags = async () => {
        setLoading(true);
        let { data } = await axios.get("http://saheembackend.augresearch.com/apiAdmin/Tag/all", {
            headers: {
                Authorization: `${token}`
            }
        });
        setAllTags(data.data.data);
        setLoading(false)
    }

    useEffect(() => {
        getTags();
        // eslint-disable-next-line
    }, []);

    const handleSubmitCreate = async () => {
        setBtnLoading(true)
        const formData = new FormData();
        formData.append('name_ar', createTagNamear);
        formData.append('name_en', createTagNameen);
        try {
            const response = await axios({
                method: "post",
                url: "http://saheembackend.augresearch.com/apiAdmin/Tag/create",
                data: formData,
                headers: { "Content-Type": "multipart/form-data", authorization: `${token}` },
            });

            if (response.data.message === "Tag added successfully") {
                setBtnLoading(false)
                handleCloseCreateTagMdal()
                getTags();
            }
        } catch (error) {
            setBtnLoading(false)
        }
    }

    const handleCloseCreateTagMdal = () => {
        document.getElementById("createTagMdal").classList.remove("show", "d-block");
        document.querySelectorAll(".modal-backdrop").forEach(el => el.classList.remove("modal-backdrop"));
        document.querySelector("body").classList.remove("modal-open");
    }

    const handleDelete = async () => {
        setBtnLoading(true)
        const { data } = await axios.post(`http://saheembackend.augresearch.com/apiAdmin/Tag/delete?tag_id=${tagId}`, {}, {
            headers: {
                authorization: `${token}`
            }
        })

        if (data.message === "Tag deleted successfully") {
            setBtnLoading(false);
            toast.success("Tag deleted successfully !",{position: "bottom-right",});
            handleCloseDeleteModal();
            getTags();
        }
        else{
            toast.error("Error deleting tag !",{position: "bottom-right",});
            handleCloseDeleteModal();
        }
    }
    const handleCloseDeleteModal = () => {
        document.getElementById("deleteModal").classList.remove("show", "d-block");
        document.querySelectorAll(".modal-backdrop").forEach(el => el.classList.remove("modal-backdrop"));
        document.querySelector("body").classList.remove("modal-open");
    }
    
    const handleSubmitEdit = async () => {
        setBtnLoading(true)
        const formData = new FormData();
        formData.append('name_ar', tagDetails.name_ar);
        formData.append('name_en', tagDetails.name_en);
        formData.append('tag_id',  tagDetails.id);
        try {
            const response = await axios({
                method: "post",
                url: "http://saheembackend.augresearch.com/apiAdmin/Tag/edit",
                data: formData,
                headers: { "Content-Type": "multipart/form-data", authorization: `${token}` },
            });

            if (response.data.message === "Tag updated successfully") {
                setBtnLoading(false);
                toast.success("Changes Saved !",{position: "bottom-right",});
                handleCloseUpdateModal();
                getTags();
            }
        } catch (error) {
            toast.error("Error editing Tag !",{position: "bottom-right",});
            setBtnLoading(false);
        }
    }
    const handleCloseUpdateModal = () => {
        document.getElementById("editModal").classList.remove("show", "d-block");
        document.querySelectorAll(".modal-backdrop").forEach(el => el.classList.remove("modal-backdrop"));
        document.querySelector("body").classList.remove("modal-open");
    }
    const setTagDetail = (e)=>{
        let myDets = {...tagDetails};
        myDets[e.target.name] = e.target.value;
        settagDetails(myDets);
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
                                        <h4>{lang === "en" ?"Tags":"العلامات"}</h4>
                                        <div className='d-flex justify-content-end mb-3'>
                                            <div className='d-flex cursr ' data-toggle="modal" data-target="#createTagMdal">
                                                <p>{lang === "en" ?"Create Tag":"انشاء علامة"}</p>
                                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-file-plus text-main"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="12" y1="18" x2="12" y2="12"></line><line x1="9" y1="15" x2="15" y2="15"></line></svg>
                                            </div>

                                        </div>
                                        <table className="table table-bordered table-hover table-striped mb-4">
                                            <thead>
                                                <tr>
                                                    <th className='text-center'>id</th>
                                                    <th>Name</th>
                                                    
                                                    <th className='text-center'>Action</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {allTags && allTags.map(tag => (<tr key={tag.id}>
                                                    <td className='text-center'>{tag.id}</td>
                                                    <td>{lang === "en" ?tag.name_en:tag.name_ar}</td>
                                                    
                                                    <td className="text-center action-row">

                                                        <svg _ngcontent-ahm-c61="" onClick={() => setTagId(tag.id)} data-toggle="modal" data-target="#deleteModal" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="m-1 cursr feather feather-trash-2 text-danger"><polyline _ngcontent-ahm-c61="" points="3 6 5 6 21 6"></polyline><path _ngcontent-ahm-c61="" d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path><line _ngcontent-ahm-c61="" x1="10" y1="11" x2="10" y2="17"></line><line _ngcontent-ahm-c61="" x1="14" y1="11" x2="14" y2="17"></line></svg>

                                                        <svg onClick={() => { setTagId(tag.id); settagDetails(tag) ;}} data-toggle="modal" data-target="#editModal" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="m-1 cursr feather feather-edit-2 text-warning"><path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"></path></svg>

                                                        <svg onClick={() => navigate(`/dashboard/tag/${tag.id}`, { replace: true })} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="m-1 cursr feather feather-eye text-secondary"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>

                                                    </td>
                                                </tr>))}


                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                    <div className="modal fade " id="createTagMdal" tabIndex="-1" role="dialog" aria-labelledby="createTagMdalLabel" aria-hidden="true">
                        <div className="modal-dialog modal-xl" role="document">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title" id="createTagMdalLabel">Create Tag</h5>
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
                                                                        <input onChange={(e) => setCreateTagNamear(e.target.value)} value={createTagNamear} type="text" className="form-control mb-4" id="name_ar" name='name_ar' placeholder="Name_ar" />
                                                                    </div>
                                                                </div>
                                                                <div className="col-sm-6">
                                                                    <div className="form-group">
                                                                        <label htmlFor="name_en">Name_en</label>
                                                                        <input onChange={(e) => setCreateTagNameen(e.target.value)} type="text" name='name_en' className="form-control mb-4" id="name_en" placeholder="Name_en" value={createTagNameen} />
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
                                    <button type="button" onClick={handleSubmitCreate} className="btn btn-primary">{btnLoading ? <i className="fas fa-spinner  fa-spin"></i> : "Create"}</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="modal fade" id="deleteModal" tabIndex="-1" role="dialog" aria-labelledby="deleteModalLabel" aria-hidden="true">
                        <div className="modal-dialog" role="document">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title" id="deleteModalLabel">Are you sure u want to delete tag of id:{tagId}</h5>
                                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-x"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                                    </button>
                                </div>
                                <div className="modal-body">
                                    <p className="modal-text"></p>
                                </div>
                                <div className="modal-footer">
                                    <button className="btn" data-dismiss="modal"><i className="flaticon-cancel-12"></i> Discard</button>
                                    <button type="button" onClick={handleDelete} className="btn btn-primary">{btnLoading ? <i className="fas fa-spinner  fa-spin"></i> : "Yes i'm sure"}</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="modal fade" id="editModal" tabIndex="-1" role="dialog" aria-labelledby="editModalLabel" aria-hidden="true">
                        <div className="modal-dialog modal-xl" role="document">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title" id="createTagMdalLabel">Update Tag</h5>
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
                                                                        <input onChange={setTagDetail} value={tagDetails && tagDetails.name_ar}  type="text" className="form-control mb-4" id="name_ar" name='name_ar' placeholder="Name_ar" />
                                                                    </div>
                                                                </div>
                                                                <div className="col-sm-6">
                                                                    <div className="form-group">
                                                                        <label htmlFor="name_en">Name_en</label>
                                                                        <input value={tagDetails && tagDetails.name_en}  onChange={setTagDetail} type="text" name='name_en' className="form-control mb-4" id="name_en" placeholder="Name_en"  />
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
                                    <button type="button" onClick={handleSubmitEdit} className="btn btn-primary">{btnLoading ? <i className="fas fa-spinner  fa-spin"></i> : "Update"}</button>
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

export default Tags;
