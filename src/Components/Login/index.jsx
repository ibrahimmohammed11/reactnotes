import React from 'react'
import { Fragment } from 'react'
import axios from "axios";

import * as yup from 'yup';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Login(props) {
    return (
        <Fragment>
            <ToastContainer />

            <div className="container my-5 py-5">
                <div className="col-md-5 m-auto">
                    <h1 className="text-center text-white">Log in</h1>
                    <Formik
                        initialValues={{
                            email: "",
                            password: ""
                        }}
                        validationSchema={yup.object().shape({
                            email: yup.string().required().email(),
                            password: yup
                                .string()
                                .required('Please Enter your password')
                                .matches(
                                    /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
                                    "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character"
                                ),
                        })}
                        onSubmit={(values, { setSubmitting, resetForm }) => {
                            setTimeout(async () => {
                                // alert(JSON.stringify(values, null, 2));
                                let { data } = await axios.post("https://route-egypt-api.herokuapp.com/signin", values);
                                if (data.message === "success") {
                                    localStorage.setItem("token", data.token)
                                    props.history.replace("/home")
                                } else {
                                    toast.error(data.message)
                                    localStorage.clear();
                                }
                                // console.log(data);
                                setSubmitting(false);
                                // resetForm();
                            }, 400);
                        }}
                    >
                        {({ isSubmitting }) => (
                            <Form>
                                <div >
                                    <label ><i className="fas fa-envelope"></i></label>
                                    <Field type="email" name="email" placeholder="Your Email" />
                                    <ErrorMessage name="email" component="div" className="alert-danger p-2 mt-1" />
                                </div>
                                <div>
                                    <label ><i className="fas fa-lock"></i></label>
                                    <Field type="password" name="password" placeholder="Password" />
                                    <ErrorMessage name="password" component="div" className="alert-danger p-2 mt-1" />
                                </div>
                                <div className="mt-3">
                                    <button type="submit" disabled={isSubmitting} className="btn bgColor w-100" >
                                        Log In
                                    </button>
                                </div>
                            </Form>
                        )}
                    </Formik>
                </div>
            </div>
        </Fragment>
    )
}