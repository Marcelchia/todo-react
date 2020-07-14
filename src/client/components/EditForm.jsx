import React, { useState } from "react";
import { hot } from "react-hot-loader";
import "../app.css";
import Fade from "react-reveal/Fade";

function EditForm(props) {

  return (
    <Fade top>
    <input onChange={props.tracker} value={props.text} className={`mb-3 edit-input ${props.errMsg ? "input-err" : ""}`} id="edit-input"/>
    <p><button
      className="btn btn-dark btn-sm mx-auto btn-block"
      onClick={props.save}
    >
      Save
    </button>
        </p>
    <p className="mb-3 text-danger error-msg">{props.errMsg}</p>
  </Fade>
  )
}

export default hot(module)(EditForm);
