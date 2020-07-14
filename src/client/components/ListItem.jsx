import React from "react";
import { hot } from "react-hot-loader";
import moment from "moment";
import Fade from "react-reveal/Fade";

function ListItem(props) {
        return (
          <Fade left>
            <li className="media list-item my-4" key={props.id}>
              <i
                className="delete-btn mr-3"
                id={`deleteId${props.item.id}`}
                onClick={props.deleteFunction}
              >√</i>
              <div className="media-body">
                <h5 className="mt-0 mb-1">{props.item.text}</h5>
                <div className="timestamp">
        Added {moment(props.item.date).format("dddd, MMM Do YYYY, h:mm:ss a")} | 
         <a className="edit-btn ml-1 text-secondary" id={props.item.id} onClick={props.editFunction}>Edit</a>
                </div>
              </div>
            </li>
          </Fade>
        );
  };

export default hot(module)(ListItem);
