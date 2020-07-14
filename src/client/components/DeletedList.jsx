import React, { useState } from "react";
import { hot } from "react-hot-loader";
import "../app.css";
import moment from "moment";
import Fade from "react-reveal/Fade";

function DeletedList(props) {

    let listElements = props.items.map(item => {
        return (
          <Fade bottom>
          <li key={item.id} id={item.id}>
              {item.text} | under: {item.group} | {moment(item.date).format("dddd, MMM Do YYYY, h:mm:ss a")}
            </li>

          </Fade>

        );
    })


  return (
    <div className="mt-5">
      <hr></hr>
<h4 className="text-success mt-4">Completed</h4>
{listElements.length!==0 ? <ul>{listElements}</ul> : <p>There are no deleted items yet.</p>}

    </div>
  )
}

export default hot(module)(DeletedList);
