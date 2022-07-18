import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import InfoContext from '../../InfoContext';
import {toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import Joi from 'joi';

toast.configure();
function EditProfile() { 
    
    const [loading, setLoading] = useState(false);
    
    let {userInfo,setUserInfo} = useContext(InfoContext);
    let token = localStorage.getItem("userToken");
    const [name, setname] = useState(userInfo.name);
    const [email, setEmail] = useState(userInfo.email);
    const [password, setPassword] = useState("");
    const [phone, setPhone] = useState(userInfo.phone);
    const [selectedFile, setSelectedFile] = useState('');
    let user = {name:name,email:email,password:password,phone:phone,image:selectedFile};
    const [errorList, setErrorList] = useState([]);
    
    useEffect(() => {
      
        if(userInfo){
            setEmail(userInfo.email);
            setname(userInfo.name);
            setPhone(userInfo.phone);
            
        }
      
    }, [userInfo]);
    
   
    const handleSubmit = async (event) => {

        event.preventDefault();
        setLoading(true);
        const formData = new FormData();
        formData.append('name', user.name);
        formData.append('email', user.email);
        formData.append('password', user.password);
        formData.append('phone', user.phone);
        formData.append("image", user.image);
        let validationResponse = validateRegisterationForm(user);
        
        console.log(validationResponse);
        if (validationResponse.error) {

            setErrorList(validationResponse.error.details);
            setLoading(false);
            toast.error("all firelds are required",{position: "bottom-right",})
            console.log("kk");
        }
        else{
            try {
                    const response = await axios({
                        method: "post",
                        url: "http://saheembackend.augresearch.com/apiAdmin/Auth_private/edit_profile",
                        data: formData,
                        headers: { "Content-Type": "multipart/form-data", authorization: `${token}` },
                        
                    });
                    console.log(response);
                    setLoading(false);
                    if(response.data.message === "تم التعديل بنجاح"){
                        toast.success("Changes Saved !",{position: "bottom-right",})
                        getInfo();
                    }
                    
                } catch (error) {
                    setLoading(false);
                    toast.error("Error editing profile !",{position: "bottom-right",})
                }
        }

        
    }

    const handleFileSelect = (event) => {
        setSelectedFile(event.target.files[0])
    }

    const getInfo = async () => {
    
        let { data } = await axios.get("http://saheembackend.augresearch.com/apiAdmin/Auth_private/my_info", {
          headers: {
            authorization: `${token}`
          }
        });
        setUserInfo(data.data);
      }

    const resetAll = ()=>{
        setEmail("");
        setname("");
        setPhone("");
    }

    function validateRegisterationForm(user) {
        let schema = Joi.object(
            {
                email: Joi.string().required(),
                name: Joi.string().required(),
                password: Joi.string().required(),
                image: Joi.object(),
                phone: Joi.string().required()
            }
        );

        return schema.validate(user, { abortEarly: false });
    }

    return (
        <div id="content" classname="main-content">
            <div className="layout-px-spacing">
                <div className="account-settings-container layout-top-spacing">
                    <div className="account-content">
                        <div className="scrollspy-example" data-spy="scroll" data-target="#account-settings-scroll" data-offset={-100}>
                            <div className="row">
                                <div className="col-xl-12 col-lg-12 col-md-12 layout-spacing">
                                    <form id="general-info" className="section general-info" onSubmit={handleSubmit}>
                                        <div className="info">
                                            <h6 className>General Information</h6>
                                            <div className="row">
                                                <div className="col-lg-11 mx-auto">
                                                    <div className="row">
                                                        <div className="col-xl-2 col-lg-12 col-md-4">
                                                            <div className="upload mt-4 pr-md-4">
                                                                <input onChange={handleFileSelect} type="file" id="input-file-max-fs" className="dropify" data-default-file={selectedFile} data-max-file-size="2M" />
                                                                <p className="mt-2"><i className="flaticon-cloud-upload mr-1" /> Upload Picture</p>
                                                            </div>
                                                        </div>
                                                        <div className="col-xl-10 col-lg-12 col-md-8 mt-md-0 mt-4">
                                                            <div className="form">
                                                                <div className="row">
                                                                    <div className="col-sm-6">
                                                                        <div className="form-group">
                                                                            <label htmlFor="fullName">Full Name</label>
                                                                            <input type="text" onChange={(e) => setname(e.target.value)} className="form-control mb-4" id="fullName" placeholder="Full Name" name='name' value={name} />
                                                                        </div>
                                                                    </div>
                                                                    <div className="col-sm-6">
                                                                        <div className="form-group">
                                                                            <label htmlFor="email">Email</label>
                                                                            <input readOnly type="email" className="form-control mb-4" id="email" placeholder="Email" name='email' value={email} />
                                                                        </div>
                                                                    </div>
                                                                    <div className="col-sm-6">
                                                                        <div className="form-group">
                                                                            <label htmlFor="password">Password</label>
                                                                            <input onChange={(e) => setPassword(e.target.value)} type="password" className="form-control mb-4" id="password" name='password' placeholder="Password" value={password} />
                                                                        </div>
                                                                    </div>
                                                                    <div className="col-sm-6">
                                                                        <div className="form-group">
                                                                            <label htmlFor="phone">Phone</label>
                                                                            <input type="number" name='phone' className="form-control mb-4" id="phone" placeholder="Phone" onChange={(e) => setPhone(e.target.value)} value={phone} />
                                                                        </div>
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

                            </div>
                        </div>
                    </div>
                    <div className="account-settings-footer">
                        <div className="as-footer-container">
                            <button id="multiple-reset" className="btn btn-warning" onClick={resetAll}>Reset All</button>
                            <div className="blockui-growl-message">
                                <i className="flaticon-double-check" />&nbsp; Settings Saved Successfully
                            </div>
                            <button id="multiple-messages" onClick={handleSubmit} className="btn btn-primary">{loading ? <i className="fas fa-spinner  fa-spin"></i> : "Save Changes"}</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )

        ;
}

export default EditProfile;
