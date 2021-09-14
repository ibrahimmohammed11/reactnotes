import React, { useEffect, useState } from 'react'
import { Fragment } from 'react'
import axios from "axios";
import jwt_decode from "jwt-decode";
import ListNotes from '../Notes';

import Styles from "./style.module.css";
import $ from 'jquery';

export default function Home() {
    const [notes, setNotes] = useState([])
    const [again, setAgain] = useState(0)

    let token = localStorage.getItem("token");
    let userID = '';
    try {
        let decoded = jwt_decode(token);
        userID = decoded._id
    } catch (error) {
        localStorage.clear();
    }

    /*------------------------get all notes------------------------- */

    useEffect(() => {
        async function fetchData() {
            let { data } = await axios.get(`https://route-egypt-api.herokuapp.com/getUserNotes`, {
                headers: {
                    token,
                    userID
                }
            });

            if (data.message === "success") {
                setNotes(data.Notes);
            } else {
                console.log(data.message);
            }
        }
        fetchData();
    }, [again])
    /*------------------------get all notes------------------------- */

    /*------------------------add new note and display it------------------------- */
    let notesData = {
        title: '',
        desc: '',
        userID,
        token
    }
    function getDataFromInputs({ target }) {
        notesData[target.name] = target.value;
    }
    async function sendFormData(e) {
        e.preventDefault();
        e.target.reset();
        let { data } = await axios.post(`https://route-egypt-api.herokuapp.com/addNote`, notesData);
        if (data.message === "success") {
            setAgain(Math.random())
            $('#exampleModal').modal('hide');

        }
    }
    /*------------------------add new note and display it------------------------- */
    /*------------------------delete note------------------------- */
    // let deletedNotee = {
    //     NoteID: '',
    //     token: token
    // }
    // async function deleteNotes(id) {
    //     deletedNotee.NoteID = id;
    //     console.log(deletedNotee);
    //     let { data } = await axios.delete(`https://route-egypt-api.herokuapp.com/deleteNote`, deletedNotee);
    //     console.log(data);
    // if (data.message === "success") {
    //     console.log(d);
    // }
    // }
    /*------------------------delete note------------------------- */

    return (
        <Fragment>
            <div className="container my-5">
                <div className="col-md-12 m-auto text-right">
                    <a href="true" className={`${Styles.addBtn} p-2 btn`} data-toggle="modal" data-target="#exampleModal">
                        <i className="fas fa-plus-circle text-white"></i> Add New
                    </a>
                </div>
            </div>
            {/*---------------------- Modal------------------ */}
            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <form onSubmit={sendFormData}>
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <button type="button" className="close text-danger" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <input onChange={getDataFromInputs} placeholder="Type Title" name="title" className="form-control" type="text" />
                                <textarea onChange={getDataFromInputs} className="form-control my-2" placeholder="Type your note" name="desc" id="" cols="30" rows="10"></textarea>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                                <button type="submit" className={`${Styles.btnSt} btn`}><i className="fas fa-plus-circle text-white"></i> Add Note</button>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
            {/*---------------------- Modal------------------ */}
            {notes?.length > 0
                ? <ListNotes notes={notes} />
                : <div className="py-4 text-center"><h2 className="text-white">You don't have notes to show</h2></div>}

        </Fragment>
    )
}
