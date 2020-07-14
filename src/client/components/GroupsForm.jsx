import React, { useState } from "react";
import { hot } from "react-hot-loader";
import "../app.css";

function GroupsForm(props) {

  return (
    <div className="mt-5">
      <h3>Want a new list group? Add it here.</h3>
    <input className={`my-4 item-input ${props.errMsg && "input-err"}`} id="group-input"></input>
    <p><button
      className="btn btn-light mx-auto"
      onClick={props.btnClick}
    >
      Create Group
    </button>
        </p>
    <p className="my-3 text-danger error-msg">{props.errMsg}</p>
  </div>
  )
}

export default hot(module)(GroupsForm);
