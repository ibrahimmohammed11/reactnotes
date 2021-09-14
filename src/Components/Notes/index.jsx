import React from 'react'
import { Fragment } from 'react'
import Styles from "./style.module.css";

export default function ListNotes(props) {

    return (
        <Fragment>
            <div className="container">
                <div className="row">
                    {props.notes?.map((note, key) => {
                        return <div key={key} className="col-md-4 my-4">
                            <div className={`${Styles.note} p-4`}>
                                <h3 className="float-left">{note.title} </h3>
                                {/* <i className={`${Styles.edit} fas fa-edit float-right`}></i> */}
                                {/* <i onClick={() => props.deleteNotes(note._id)} className={`${Styles.del} fas fa-trash-alt float-right px-3`}></i> */}
                                <span className="clearfix"></span>
                                <p> {note.desc} </p>
                            </div>
                        </div>
                    })}
                </div>
            </div>
        </Fragment>
    )
}
