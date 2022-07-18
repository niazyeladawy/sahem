import axios from 'axios'
import React, { useContext, useEffect } from 'react'
import InfoContext from '../../../InfoContext'
import CategoryPie from './CategoryPie/CategoryPie'
import DailySales from './DailySales/DailySales'
import Revenue from './Revenue/Revenue'
import TotalOrders from './TotlaOrders/TotalOrders';

const Home = () => {
    
    // let token = localStorage.getItem("userToken")

    // const getInfo=async ()=>{
    //     let {data} =await axios.get("http://saheembackend.augresearch.com/apiAdmin/Auth_private/my_info",{
    //         headers: {
    //           authorization: `${token}`
    //         }
    //       });
    //     console.log(data)
    // }
    // useEffect(() => {
    //     getInfo()
    // }, []);
    

    return (
        <div id="content" className="main-content">
            <div className="layout-px-spacing">
                <div className="row layout-top-spacing">
                    <div className="col-xl-8 col-lg-12 col-md-12 col-sm-12 col-12 layout-spacing">
                        <div className="widget widget-chart-one">
                            <div className="widget-heading">
                                <h5 className>Revenue</h5>
                                <ul className="tabs tab-pills">
                                    <li><a href="javascript:void(0);" id="tb_1" className="tabmenu">Monthly</a></li>
                                </ul>
                            </div>
                            <div className="widget-content">
                                <div className="tabs tab-content">
                                    <div id="content_1" className="tabcontent">
                                        <div>
                                            <Revenue />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-xl-4 col-lg-12 col-md-12 col-sm-12 col-12 layout-spacing">
                        <div className="widget widget-chart-two">
                            <div className="widget-heading">
                                <h5 className>Sales by Category</h5>
                            </div>
                            <div className="widget-content">
                                <div id="chart-2" className >
                                    
                                        <CategoryPie />
                                    
                                </div>

                            </div>
                        </div>
                    </div>
                    <div className="col-xl-4 col-lg-6 col-md-6 col-sm-6 col-12 layout-spacing">
                        <div className="widget-two">
                            <div className="widget-content">
                                <div className="w-numeric-value">
                                    <div className="w-content">
                                        <span className="w-value">Daily sales</span>
                                        <span className="w-numeric-title">Go to columns for details.</span>
                                    </div>
                                    <div className="w-icon">
                                        <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="feather feather-dollar-sign"><line x1={12} y1={1} x2={12} y2={23} /><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" /></svg>
                                    </div>
                                </div>
                                <div className="w-chart">
                                    <div id="daily-sales" >
                                        <DailySales/>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-xl-4 col-lg-6 col-md-6 col-sm-6 col-12 layout-spacing">
                        <div className="widget-three">
                            <div className="widget-heading">
                                <h5 className>Summary</h5>
                            </div>
                            <div className="widget-content">
                                <div className="order-summary">
                                    <div className="summary-list">
                                        <div className="w-icon">
                                            <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="feather feather-shopping-bag"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" /><line x1={3} y1={6} x2={21} y2={6} /><path d="M16 10a4 4 0 0 1-8 0" /></svg>
                                        </div>
                                        <div className="w-summary-details">
                                            <div className="w-summary-info">
                                                <h6>Income</h6>
                                                <p className="summary-count">$92,600</p>
                                            </div>
                                            <div className="w-summary-stats">
                                                <div className="progress">
                                                    <div className="progress-bar bg-gradient-secondary" role="progressbar" style={{ width: '90%' }} aria-valuenow={90} aria-valuemin={0} aria-valuemax={100} />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="summary-list">
                                        <div className="w-icon">
                                            <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="feather feather-tag"><path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z" /><line x1={7} y1={7} x2={7} y2={7} /></svg>
                                        </div>
                                        <div className="w-summary-details">
                                            <div className="w-summary-info">
                                                <h6>Profit</h6>
                                                <p className="summary-count">$37,515</p>
                                            </div>
                                            <div className="w-summary-stats">
                                                <div className="progress">
                                                    <div className="progress-bar bg-gradient-success" role="progressbar" style={{ width: '65%' }} aria-valuenow={65} aria-valuemin={0} aria-valuemax={100} />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="summary-list">
                                        <div className="w-icon">
                                            <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="feather feather-credit-card"><rect x={1} y={4} width={22} height={16} rx={2} ry={2} /><line x1={1} y1={10} x2={23} y2={10} /></svg>
                                        </div>
                                        <div className="w-summary-details">
                                            <div className="w-summary-info">
                                                <h6>Expenses</h6>
                                                <p className="summary-count">$55,085</p>
                                            </div>
                                            <div className="w-summary-stats">
                                                <div className="progress">
                                                    <div className="progress-bar bg-gradient-warning" role="progressbar" style={{ width: '80%' }} aria-valuenow={80} aria-valuemin={0} aria-valuemax={100} />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-xl-4 col-lg-12 col-md-6 col-sm-12 col-12 layout-spacing">
                        <div className="widget-one widget">
                            <div className="widget-content">
                                <div className="w-numeric-value">
                                    <div className="w-icon">
                                        <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="feather feather-shopping-cart"><circle cx={9} cy={21} r={1} /><circle cx={20} cy={21} r={1} /><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" /></svg>
                                    </div>
                                    <div className="w-content">
                                        <span className="w-value">3,192</span>
                                        <span className="w-numeric-title">Total Orders</span>
                                    </div>
                                </div>
                                <div className="w-chart">
                                    <div id="total-orders" >
                                        <TotalOrders/>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-xl-5 col-lg-12 col-md-6 col-sm-12 col-12 layout-spacing">
                        <div className="widget widget-table-one">
                            <div className="widget-heading">
                                <h5 className>Transactions</h5>
                            </div>
                            <div className="widget-content">
                                <div className="transactions-list">
                                    <div className="t-item">
                                        <div className="t-company-name">
                                            <div className="t-icon">
                                                <div className="icon">
                                                    <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="feather feather-home"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" /><polyline points="9 22 9 12 15 12 15 22" /></svg>
                                                </div>
                                            </div>
                                            <div className="t-name">
                                                <h4>Electricity Bill</h4>
                                                <p className="meta-date">4 Aug 1:00PM</p>
                                            </div>
                                        </div>
                                        <div className="t-rate rate-dec">
                                            <p><span>-$16.44</span> <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="feather feather-arrow-down"><line x1={12} y1={5} x2={12} y2={19} /><polyline points="19 12 12 19 5 12" /></svg></p>
                                        </div>
                                    </div>
                                </div>
                                <div className="transactions-list">
                                    <div className="t-item">
                                        <div className="t-company-name">
                                            <div className="t-icon">
                                                <div className="avatar avatar-xl">
                                                    <span className="avatar-title rounded-circle">SP</span>
                                                </div>
                                            </div>
                                            <div className="t-name">
                                                <h4>Shaun Park</h4>
                                                <p className="meta-date">4 Aug 1:00PM</p>
                                            </div>
                                        </div>
                                        <div className="t-rate rate-inc">
                                            <p><span>+$66.44</span> <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="feather feather-arrow-up"><line x1={12} y1={19} x2={12} y2={5} /><polyline points="5 12 12 5 19 12" /></svg></p>
                                        </div>
                                    </div>
                                </div>
                                <div className="transactions-list">
                                    <div className="t-item">
                                        <div className="t-company-name">
                                            <div className="t-icon">
                                                <div className="avatar avatar-xl">
                                                    <span className="avatar-title rounded-circle">AD</span>
                                                </div>
                                            </div>
                                            <div className="t-name">
                                                <h4>Amy Diaz</h4>
                                                <p className="meta-date">4 Aug 1:00PM</p>
                                            </div>
                                        </div>
                                        <div className="t-rate rate-inc">
                                            <p><span>+$66.44</span> <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="feather feather-arrow-up"><line x1={12} y1={19} x2={12} y2={5} /><polyline points="5 12 12 5 19 12" /></svg></p>
                                        </div>
                                    </div>
                                </div>
                                <div className="transactions-list">
                                    <div className="t-item">
                                        <div className="t-company-name">
                                            <div className="t-icon">
                                                <div className="icon">
                                                    <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="feather feather-home"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" /><polyline points="9 22 9 12 15 12 15 22" /></svg>
                                                </div>
                                            </div>
                                            <div className="t-name">
                                                <h4>Netflix</h4>
                                                <p className="meta-date">4 Aug 1:00PM</p>
                                            </div>
                                        </div>
                                        <div className="t-rate rate-dec">
                                            <p><span>-$32.00</span> <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="feather feather-arrow-down"><line x1={12} y1={5} x2={12} y2={19} /><polyline points="19 12 12 19 5 12" /></svg></p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-xl-3 col-lg-6 col-md-6 col-sm-12 col-12 layout-spacing">
                        <div className="widget widget-activity-four">
                            <div className="widget-heading">
                                <h5 className>Recent Activities</h5>
                            </div>
                            <div className="widget-content">
                                <div className="mt-container mx-auto">
                                    <div className="timeline-line">
                                        <div className="item-timeline timeline-primary">
                                            <div className="t-dot" data-original-title title>
                                            </div>
                                            <div className="t-text">
                                                <p><span>Updated</span> Server Logs</p>
                                                <span className="badge badge-danger">Pending</span>
                                                <p className="t-time">Just Now</p>
                                            </div>
                                        </div>
                                        <div className="item-timeline timeline-success">
                                            <div className="t-dot" data-original-title title>
                                            </div>
                                            <div className="t-text">
                                                <p>Send Mail to <a href="javascript:void(0);">HR</a> and <a href="javascript:void(0);">Admin</a></p>
                                                <span className="badge badge-success">Completed</span>
                                                <p className="t-time">2 min ago</p>
                                            </div>
                                        </div>
                                        <div className="item-timeline  timeline-danger">
                                            <div className="t-dot" data-original-title title>
                                            </div>
                                            <div className="t-text">
                                                <p>Backup <span>Files EOD</span></p>
                                                <span className="badge badge-danger">Pending</span>
                                                <p className="t-time">14:00</p>
                                            </div>
                                        </div>
                                        <div className="item-timeline  timeline-dark">
                                            <div className="t-dot" data-original-title title>
                                            </div>
                                            <div className="t-text">
                                                <p>Collect documents from <a href="javascript:void(0);">Sara</a></p>
                                                <span className="badge badge-success">Completed</span>
                                                <p className="t-time">16:00</p>
                                            </div>
                                        </div>
                                        <div className="item-timeline  timeline-warning">
                                            <div className="t-dot" data-original-title title>
                                            </div>
                                            <div className="t-text">
                                                <p>Conference call with <a href="javascript:void(0);">Marketing Manager</a>.</p>
                                                <span className="badge badge-primary">In progress</span>
                                                <p className="t-time">17:00</p>
                                            </div>
                                        </div>
                                        <div className="item-timeline  timeline-secondary">
                                            <div className="t-dot" data-original-title title>
                                            </div>
                                            <div className="t-text">
                                                <p>Rebooted Server</p>
                                                <span className="badge badge-success">Completed</span>
                                                <p className="t-time">17:00</p>
                                            </div>
                                        </div>
                                        <div className="item-timeline  timeline-warning">
                                            <div className="t-dot" data-original-title title>
                                            </div>
                                            <div className="t-text">
                                                <p>Send contract details to Freelancer</p>
                                                <span className="badge badge-danger">Pending</span>
                                                <p className="t-time">18:00</p>
                                            </div>
                                        </div>
                                        <div className="item-timeline  timeline-dark">
                                            <div className="t-dot" data-original-title title>
                                            </div>
                                            <div className="t-text">
                                                <p>Kelly want to increase the time of the project.</p>
                                                <span className="badge badge-primary">In Progress</span>
                                                <p className="t-time">19:00</p>
                                            </div>
                                        </div>
                                        <div className="item-timeline  timeline-success">
                                            <div className="t-dot" data-original-title title>
                                            </div>
                                            <div className="t-text">
                                                <p>Server down for maintanence</p>
                                                <span className="badge badge-success">Completed</span>
                                                <p className="t-time">19:00</p>
                                            </div>
                                        </div>
                                        <div className="item-timeline  timeline-secondary">
                                            <div className="t-dot" data-original-title title>
                                            </div>
                                            <div className="t-text">
                                                <p>Malicious link detected</p>
                                                <span className="badge badge-warning">Block</span>
                                                <p className="t-time">20:00</p>
                                            </div>
                                        </div>
                                        <div className="item-timeline  timeline-warning">
                                            <div className="t-dot" data-original-title title>
                                            </div>
                                            <div className="t-text">
                                                <p>Rebooted Server</p>
                                                <span className="badge badge-success">Completed</span>
                                                <p className="t-time">23:00</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="tm-action-btn">
                                    <button className="btn">View All <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="feather feather-chevron-down"><polyline points="6 9 12 15 18 9" /></svg></button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12 col-12 layout-spacing">
                        <div className="widget widget-account-invoice-one">
                            <div className="widget-heading">
                                <h5 className>Account Info</h5>
                            </div>
                            <div className="widget-content">
                                <div className="invoice-box">
                                    <div className="acc-total-info">
                                        <h5>Balance</h5>
                                        <p className="acc-amount">$470</p>
                                    </div>
                                    <div className="inv-detail">
                                        <div className="info-detail-1">
                                            <p>Monthly Plan</p>
                                            <p>$ 199.0</p>
                                        </div>
                                        <div className="info-detail-2">
                                            <p>Taxes</p>
                                            <p>$ 17.82</p>
                                        </div>
                                        <div className="info-detail-3 info-sub">
                                            <div className="info-detail">
                                                <p>Extras this month</p>
                                                <p>$ -0.68</p>
                                            </div>
                                            <div className="info-detail-sub">
                                                <p>Netflix Yearly Subscription</p>
                                                <p>$ 0</p>
                                            </div>
                                            <div className="info-detail-sub">
                                                <p>Others</p>
                                                <p>$ -0.68</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="inv-action">
                                        <a href className="btn btn-outline-dark">Summary</a>
                                        <a href className="btn btn-danger">Transfer</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-xl-6 col-lg-12 col-md-12 col-sm-12 col-12 layout-spacing">
                        <div className="widget widget-table-two">
                            <div className="widget-heading">
                                <h5 className>Recent Orders</h5>
                            </div>
                            <div className="widget-content">
                                <div className="table-responsive">
                                    <table className="table">
                                        <thead>
                                            <tr>
                                                <th><div className="th-content">Customer</div></th>
                                                <th><div className="th-content">Product</div></th>
                                                <th><div className="th-content">Invoice</div></th>
                                                <th><div className="th-content th-heading">Price</div></th>
                                                <th><div className="th-content">Status</div></th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td><div className="td-content customer-name"><img src="assets/assets/img/90x90.jpg" alt="avatar" />Andy King</div></td>
                                                <td><div className="td-content product-brand">Nike Sport</div></td>
                                                <td><div className="td-content">#76894</div></td>
                                                <td><div className="td-content pricing"><span className>$88.00</span></div></td>
                                                <td><div className="td-content"><span className="badge outline-badge-primary">Shipped</span></div></td>
                                            </tr>
                                            <tr>
                                                <td><div className="td-content customer-name"><img src="assets/assets/img/90x90.jpg" alt="avatar" />Irene Collins</div></td>
                                                <td><div className="td-content product-brand">Speakers</div></td>
                                                <td><div className="td-content">#75844</div></td>
                                                <td><div className="td-content pricing"><span className>$84.00</span></div></td>
                                                <td><div className="td-content"><span className="badge outline-badge-success">Paid</span></div></td>
                                            </tr>
                                            <tr>
                                                <td><div className="td-content customer-name"><img src="assets/assets/img/90x90.jpg" alt="avatar" />Laurie Fox</div></td>
                                                <td><div className="td-content product-brand">Camera</div></td>
                                                <td><div className="td-content">#66894</div></td>
                                                <td><div className="td-content pricing"><span className>$126.04</span></div></td>
                                                <td><div className="td-content"><span className="badge outline-badge-danger">Pending</span></div></td>
                                            </tr>
                                            <tr>
                                                <td><div className="td-content customer-name"><img src="assets/assets/img/90x90.jpg" alt="avatar" />Luke Ivory</div></td>
                                                <td><div className="td-content product-brand">Headphone</div></td>
                                                <td><div className="td-content">#46894</div></td>
                                                <td><div className="td-content pricing"><span className>$56.07</span></div></td>
                                                <td><div className="td-content"><span className="badge outline-badge-success">Paid</span></div></td>
                                            </tr>
                                            <tr>
                                                <td><div className="td-content customer-name"><img src="assets/assets/img/90x90.jpg" alt="avatar" />Ryan Collins</div></td>
                                                <td><div className="td-content product-brand">Sport</div></td>
                                                <td><div className="td-content">#89891</div></td>
                                                <td><div className="td-content pricing"><span className>$108.09</span></div></td>
                                                <td><div className="td-content"><span className="badge outline-badge-primary">Shipped</span></div></td>
                                            </tr>
                                            <tr>
                                                <td><div className="td-content customer-name"><img src="assets/assets/img/90x90.jpg" alt="avatar" />Nia Hillyer</div></td>
                                                <td><div className="td-content product-brand">Sunglasses</div></td>
                                                <td><div className="td-content">#26974</div></td>
                                                <td><div className="td-content pricing"><span className>$168.09</span></div></td>
                                                <td><div className="td-content"><span className="badge outline-badge-primary">Shipped</span></div></td>
                                            </tr>
                                            <tr>
                                                <td><div className="td-content customer-name"><img src="assets/assets/img/90x90.jpg" alt="avatar" />Sonia Shaw</div></td>
                                                <td><div className="td-content product-brand">Watch</div></td>
                                                <td><div className="td-content">#76844</div></td>
                                                <td><div className="td-content pricing"><span className>$110.00</span></div></td>
                                                <td><div className="td-content"><span className="badge outline-badge-success">Paid</span></div></td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-xl-6 col-lg-12 col-md-12 col-sm-12 col-12 layout-spacing">
                        <div className="widget widget-table-three">
                            <div className="widget-heading">
                                <h5 className>Top Selling Product</h5>
                            </div>
                            <div className="widget-content">
                                <div className="table-responsive">
                                    <table className="table">
                                        <thead>
                                            <tr>
                                                <th><div className="th-content">Product</div></th>
                                                <th><div className="th-content th-heading">Price</div></th>
                                                <th><div className="th-content th-heading">Discount</div></th>
                                                <th><div className="th-content">Sold</div></th>
                                                <th><div className="th-content">Source</div></th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td><div className="td-content product-name"><img src="assets/assets/img/90x90.jpg" alt="product" />Speakers</div></td>
                                                <td><div className="td-content"><span className="pricing">$84.00</span></div></td>
                                                <td><div className="td-content"><span className="discount-pricing">$10.00</span></div></td>
                                                <td><div className="td-content">240</div></td>
                                                <td><div className="td-content"><a href="javascript:void(0);" className>Direct</a></div></td>
                                            </tr>
                                            <tr>
                                                <td><div className="td-content product-name"><img src="assets/assets/img/90x90.jpg" alt="product" />Sunglasses</div></td>
                                                <td><div className="td-content"><span className="pricing">$56.07</span></div></td>
                                                <td><div className="td-content"><span className="discount-pricing">$5.07</span></div></td>
                                                <td><div className="td-content">190</div></td>
                                                <td><div className="td-content"><a href="javascript:void(0);" className>Google</a></div></td>
                                            </tr>
                                            <tr>
                                                <td><div className="td-content product-name"><img src="assets/assets/img/90x90.jpg" alt="product" />Watch</div></td>
                                                <td><div className="td-content"><span className="pricing">$88.00</span></div></td>
                                                <td><div className="td-content"><span className="discount-pricing">$20.00</span></div></td>
                                                <td><div className="td-content">66</div></td>
                                                <td><div className="td-content"><a href="javascript:void(0);" className>Ads</a></div></td>
                                            </tr>
                                            <tr>
                                                <td><div className="td-content product-name"><img src="assets/assets/img/90x90.jpg" alt="product" />Laptop</div></td>
                                                <td><div className="td-content"><span className="pricing">$110.00</span></div></td>
                                                <td><div className="td-content"><span className="discount-pricing">$33.00</span></div></td>
                                                <td><div className="td-content">35</div></td>
                                                <td><div className="td-content"><a href="javascript:void(0);" className>Email</a></div></td>
                                            </tr>
                                            <tr>
                                                <td><div className="td-content product-name"><img src="assets/assets/img/90x90.jpg" alt="product" />Camera</div></td>
                                                <td><div className="td-content"><span className="pricing">$126.04</span></div></td>
                                                <td><div className="td-content"><span className="discount-pricing">$26.04</span></div></td>
                                                <td><div className="td-content">30</div></td>
                                                <td><div className="td-content"><a href="javascript:void(0);" className>Referral</a></div></td>
                                            </tr>
                                            <tr>
                                                <td><div className="td-content product-name"><img src="assets/assets/img/90x90.jpg" alt="product" />Shoes</div></td>
                                                <td><div className="td-content"><span className="pricing">$108.09</span></div></td>
                                                <td><div className="td-content"><span className="discount-pricing">$47.09</span></div></td>
                                                <td><div className="td-content">130</div></td>
                                                <td><div className="td-content"><a href="javascript:void(0);" className>Google</a></div></td>
                                            </tr>
                                            <tr>
                                                <td><div className="td-content product-name"><img src="assets/assets/img/90x90.jpg" alt="product" />Headphone</div></td>
                                                <td><div className="td-content"><span className="pricing">$168.09</span></div></td>
                                                <td><div className="td-content"><span className="discount-pricing">$60.09</span></div></td>
                                                <td><div className="td-content">170</div></td>
                                                <td><div className="td-content"><a href="javascript:void(0);" className>Ads</a></div></td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
        </div>

    )
}

export default Home
