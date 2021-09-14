import React from 'react'
import { Fragment } from 'react'
import axios from "axios";
import * as yup from 'yup';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Styles from "./style.module.css";

export default function Register(props) {
    return (
        <Fragment>
            <ToastContainer />

            <div className="container my-5 py-5">
                <div className="col-md-5 m-auto ">
                    <h1 className="text-center text-white">Sign up</h1>
                    <Formik
                        initialValues={{
                            first_name: "",
                            last_name: "",
                            email: "",
                            password: "",
                            age: ""
                        }}
                        validationSchema={yup.object().shape({
                            first_name: yup.string().required(),
                            last_name: yup.string().required(),
                            email: yup.string().required().email(),
                            password: yup
                                .string()
                                .required('Please Enter your password')
                                .matches(
                                    /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
                                    "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character"
                                ),
                            age: yup.number().required().positive().integer(),
                        })}
                        onSubmit={(values, { setSubmitting, resetForm }) => {
                            setTimeout(async () => {
                                // alert(JSON.stringify(values, null, 2));
                                let { data } = await axios.post("https://route-egypt-api.herokuapp.com/signup", values);
                                if (data.message === "success") {
                                    props.history.push("/login")
                                } else {
                                    toast.error("Email is already exist")
                                }
                                // console.log(data.message);
                                setSubmitting(false);
                                // resetForm();
                            }, 400);
                        }}
                    >
                        {({ isSubmitting }) => (
                            <Form>
                                <div >
                                    <label ><i className="fas fa-user"></i></label>
                                    <Field type="text" name="first_name" placeholder="First Name" className={Styles.inputSt} />
                                    <ErrorMessage name="first_name" component="div" className="alert-danger p-2 mt-1" />
                                </div>
                                <div >
                                    <label ><i className="fas fa-user"></i></label>
                                    <Field type="text" name="last_name" placeholder="Last Name" />
                                    <ErrorMessage name="last_name" component="div" className="alert-danger p-2 mt-1" />
                                </div>
                                <div >
                                    <label ><i className="fas fa-envelope"></i></label>
                                    <Field type="email" name="email" placeholder="Your Email" />
                                    <ErrorMessage name="email" component="div" className="alert-danger p-2 mt-1" />
                                </div>
                                <div>
                                    <label ><i className="fas fa-sort-numeric-up-alt"></i></label>
                                    <Field type="number" name="age" placeholder="Your Age" />
                                    <ErrorMessage name="age" component="div" className="alert-danger p-2 mt-1" />
                                </div>
                                <div>
                                    <label ><i className="fas fa-lock"></i></label>
                                    <Field type="password" name="password" placeholder="Password" />
                                    <ErrorMessage name="password" component="div" className="alert-danger p-2 mt-1" />
                                </div>


                                <div className="mt-3">
                                    <button type="submit" disabled={isSubmitting} className="btn bgColor w-100" >
                                        Sign up
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