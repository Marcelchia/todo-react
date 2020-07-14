import React, { useState } from "react";
import { hot } from "react-hot-loader";
import "../app.css";
import ListItem from './ListItem'
import Fade from "react-reveal/Fade";

function TodoList(props) {

    let listElements = props.items.map(item => {
        return (
          <ListItem key={item.id} editFunction={props.editFunction} item={item} deleteFunction={props.deleteFunction}/>
        );
    })


  return (
    <Fade>
    <div className="mb-5">
      <h3 className="group-header text-secondary">{props.name}</h3>
    {listElements.length!==0 ? <ul className="list-unstyled">{listElements}</ul> : <p>There are no items here.</p>}
    </div>
    </Fade>
  );
}

export default hot(module)(TodoList);