import React, { useState } from "react";
import { hot } from "react-hot-loader";
import "../app.css";
import ListItem from './ListItem'

function TodoList(props) {

    let listElements = props.items.map(item => {
        return (
          <ListItem key={item.id} item={item} deleteFunction={props.deleteFunction}/>
        );
    })


  return <ul className="list-unstyled">{listElements}</ul>;
}

export default hot(module)(TodoList);