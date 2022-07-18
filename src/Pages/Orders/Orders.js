import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import InfoContext from '../../InfoContext';

function Orders() {
    let { lang } = useContext(InfoContext)
    let navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [deleteloading, setDeleteLoading] = useState(false);
    let token = localStorage.getItem("userToken");
    const [allOrders, setAllOrders] = useState([]);
    const [orderId, setOrderId] = useState("");

    const getOrders = async () => {
        setLoading(true);
        let { data } = await axios.get("http://saheembackend.augresearch.com/apiAdmin/Order/all", {
            headers: {
                authorization: `${token}`
            }
        });
        setAllOrders(data.data.data);
        setLoading(false)
    }

    const handleDelete = async () => {
        setDeleteLoading(true)
        const { data } = await axios.post(`http://saheembackend.augresearch.com/apiAdmin/Order/delete?order_id=${orderId}`, {}, {
            headers: {
                authorization: `${token}`
            }
        })
        
        if (data.message === "Order deleted successfully") {
            setDeleteLoading(false)
            handleCloseDeleteModal();
            getOrders();
        }
    }

    const handleCloseDeleteModal = () => {
        document.getElementById("deleteOrderModal").classList.remove("show", "d-block");
        document.querySelectorAll(".modal-backdrop").forEach(el => el.classList.remove("modal-backdrop"));
        document.querySelector("body").classList.remove("modal-open");
    }

    useEffect(() => {
        getOrders();
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
                </div>) : (<div id="content" className="main-content">
                    <div className="layout-px-spacing">
                        <div className="row layout-top-spacing">
                            <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12 layout-spacing">
                                <div className="widget widget-chart-one">
                                    <div className="table-responsive">
                                        <h4>{lang === "en" ?"Orders":"الطلبات"}</h4>
                                        <table className="table table-bordered table-hover table-striped mb-4">
                                            <thead>
                                                <tr>
                                                    <th className='text-center'>id</th>
                                                    <th>note</th>
                                                    <th>status</th>
                                                    <th>addsMeters</th>
                                                    <th>adds Price</th>
                                                    <th>tax Price</th>
                                                    <th>prototype Price</th>
                                                    <th>addsMeters Price</th>
                                                    <th>total Price</th>
                                                    <th>sample Name</th>
                                                    <th className='text-center'>Action</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {allOrders && allOrders.map(order => (<tr key={order.id}>
                                                    <td className='text-center'>{order.id}</td>
                                                    <td>{order.note}</td>
                                                    <td>{order.status}</td>
                                                    <td>{order.addsMeters}</td>
                                                    <td>{order.addsPrice}</td>
                                                    <td>{order.taxPrice}</td>
                                                    <td>{order.prototypePrice}</td>
                                                    <td>{order.addsMetersPrice}</td>
                                                    <td>{order.totalPrice}</td>
                                                    <td>{order.sample.name}</td>
                                                    <td className="text-center action-row">

                                                        <svg data-toggle="modal" data-target="#deleteOrderModal" onClick={()=>setOrderId(order.id)} _ngcontent-ahm-c61="" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="m-1 cursr feather feather-trash-2 text-danger"><polyline _ngcontent-ahm-c61="" points="3 6 5 6 21 6"></polyline><path _ngcontent-ahm-c61="" d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path><line _ngcontent-ahm-c61="" x1="10" y1="11" x2="10" y2="17"></line><line _ngcontent-ahm-c61="" x1="14" y1="11" x2="14" y2="17"></line></svg>

                            

                                                        <svg onClick={() => navigate(`/dashboard/order/${order.id}`, { replace: true })} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="m-1 cursr feather feather-eye text-secondary"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>

                                                    </td>
                                                </tr>))}
                                                
                                                

                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                    <div className="modal fade" id="deleteOrderModal" tabIndex="-1" role="dialog" aria-labelledby="deleteOrderModalLabel" aria-hidden="true">
                        <div className="modal-dialog" role="document">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title" id="deleteOrderModalLabel">Are you sure u Want to delete order of id {orderId}</h5>
                                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-x"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                                    </button>
                                </div>
                                <div className="modal-footer">
                                    <button className="btn" data-dismiss="modal"><i className="flaticon-cancel-12"></i> Discard</button>
                                    <button onClick={handleDelete} type="button" className="btn btn-primary">{deleteloading ? <i className="fas fa-spinner  fa-spin"></i> : "Yes i'm sure"}</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>)
            }</>
    );
}

export default Orders;
