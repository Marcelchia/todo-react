import React from "react";
import { hot } from "react-hot-loader";

function Form(props) {

  const groupOptions = props.groups.map((group, index) =>{
    return <option key={index} value={group}>Under: {group}</option>
  })

  return (
    <div>
      <input className={`my-4 item-input ${props.errMsg && "input-err"}`} id="input"></input>
      <select className="form-control mb-4 w-50 mx-auto" onChange={props.select}>
        {groupOptions}
      </select>
      
      <button
        className="btn btn-secondary d-block w-25 mx-auto"
        onClick={props.onClick}
      >
        Add Item
      </button>
      <p className="my-3 text-danger error-msg">{props.errMsg}</p>
    </div>
  );
}

export default hot(module)(Form);
