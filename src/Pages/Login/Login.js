import axios from 'axios';
import Joi from 'joi';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

function Login() {
    const [isVisible, setIsVisible] = useState(false);

    const handleVisible = () => {
        setIsVisible(!isVisible);
    }

    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [errorList, setErrorList] = useState([]);
    let navigate = useNavigate();

    let [user, setUser] = useState({ email: '', password: '' });

    function getUser(e) {
        let myUser = { ...user };
        myUser[e.target.name] = e.target.value;
        setUser(myUser);
    }

    // const logd = async () => {
    //     let sd = { email: 'admin@admin.com', password: '123456789' };
    //     let { data } = await axios.post(`http://saheembackend.augresearch.com/apiAdmin/Auth_general/login`, sd);
    //     console.log(data)
    // }
    // useEffect(() => {
    //     logd()
    // }, []);


    async function formSubmit(e) {
        e.preventDefault();
        setLoading(true);
        let validationResponse = validateRegisterationForm();


        if (validationResponse.error) {

            setErrorList(validationResponse.error.details);
            setLoading(false);
        }
        else {

            let { data } = await axios.post(`http://saheembackend.augresearch.com/apiAdmin/Auth_general/login`, user);

            console.log(data);
            if (data.message === "login success") {

                localStorage.setItem("userToken", `Bearer ${data.data.token}`);
                // props.getUserInfo();
                navigate('/');
                // window.location.reload();
                setLoading(false);
            }
            else {
                setLoading(false);
                setError(data.message);
            }

        }

    }

    function validateRegisterationForm() {
        let schema = Joi.object(
            {
                email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),
                password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
            }
        );

        return schema.validate(user, { abortEarly: false });
    }
    return (
        <div className="form-container">
            <div className="form-form">
                <div className="form-form-wrap">
                    <div className="form-container">
                        <div className="form-content">
                            <h1 className>Log In to <a href="index.html"><span className="brand-name">CORK</span></a></h1>

                            <form className="text-left" onSubmit={formSubmit}>
                                {error && <div className="alert alert-danger"> {error} </div>}

                                {errorList.map((errors, idx) => idx === 1 ? <div key={idx} className="alert alert-danger p-2"> wrong password</div> :
                                    <div key={idx} className="alert alert-danger p-2"> {errors.message} </div>)}
                                <div className="form">
                                    <div id="username-field" className="field-wrapper input">
                                        <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="feather feather-user"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx={12} cy={7} r={4} /></svg>
                                        <input id="email" name="email" type="email" className="form-control" placeholder="Email" onChange={getUser} />
                                    </div>
                                    <div id="password-field" className="field-wrapper input mb-2">
                                        <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="feather feather-lock"><rect x={3} y={11} width={18} height={11} rx={2} ry={2} /><path d="M7 11V7a5 5 0 0 1 10 0v4" /></svg>
                                        <input id="password" name="password" type={isVisible ? "text" : "password"} className="form-control" placeholder="Password" onChange={getUser} />
                                    </div>
                                    <div className="d-sm-flex justify-content-between">
                                        <div className="field-wrapper toggle-pass">
                                            <p className="d-inline-block">Show Password</p>
                                            <label className="switch s-primary">
                                                <input type="checkbox" id="toggle-password" className="d-none" onClick={handleVisible} />
                                                <span className="slider round" />
                                            </label>
                                        </div>
                                        <div className="field-wrapper">
                                            <button type="submit" className="btn btn-primary" value>{loading ? <i className="fas fa-spinner  fa-spin"></i> : "Log In"}</button>
                                        </div>
                                    </div>


                                </div>
                            </form>

                        </div>
                    </div>
                </div>
            </div>
            <div className="form-image">
                <div className="l-image">
                </div>
            </div>
        </div>

    )
}

export default Login
