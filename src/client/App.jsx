import React, {useState} from 'react';
import { hot } from 'react-hot-loader';
import './app.css'
import TodoList from './components/TodoList'
import Form from './components/Form'
import DeletedList from './components/DeletedList'
import GroupsForm from './components/GroupsForm'
import EditForm from './components/EditForm'

function App () {

  //To track all list items.
  const [items, setItems] = useState([])

  //Error message for adding items.
  const [addErrMsg, setError] = useState(null)
  //Error message for editing items.
  const [editErrMsg, setEditError] = useState(null)
  //Error message for group names
  const [groupErrMsg, setGroupError] = useState(null)

  //Track the deleted (completed) items
  const [deletedItems, setDeletedItems] = useState([])

  //To get the current list group selected, and use it in the createGroup function
  const [selectedGroup, setSelectedGroup] = useState('General')

  //To ensure every added item has a unique id
  const [newId, setId] = useState(0)

  //Groups = all the list groups
  const [groups, setGroups] = useState(['General'])

  //To toggle the edit form.
  const [editMode, toggleEditMode] = useState(false)

  //To insert original item text for user to edit from, and tracks all changes made in the edit input.
  const [editText, setEditText] = useState("")

  //To track what the current item being edited is.
  const [editId, setEditId] = useState(null)

  const removeItem = (targetId) => {

    //Find the item from the items array using its ID (without removing it)
    const targetItem = items.find(item => item.id==targetId )

    //Add the item to deletedItems
    setDeletedItems([...deletedItems, targetItem])

    //Make a new array from the current items, filtering out the deleted item.
    const newList = items.filter((item) => {
      return item.id !== targetId;
    });

    //Replace items with the new filtered array.
    return setItems(newList);
  }

  //Updates the selectedGroup state with the value of the select element within Form.
  const getSelectedGroup = (e)=> {
    setSelectedGroup(e.target.value)
  }

  // Triggered on clicking the "Create Group" button in GroupsForm
  const createGroup = ()=> {
    //USING DOM TO GET VALUE of user input (not recommended)
    const input = document.getElementById('group-input')

    // VALIDATION HERE
    if (input.value.length < 3 || input.value.length > 15) {
      return setGroupError(`Sorry, group names must be at least 3 characters and less than 15. You currently have ${input.value.length} character(s).`)
    }
    // Make the input capitalized (first letter uppercase, rest lowercase).
    const newGroup = input.value
    //Add the new name onto the existing array of groups.
    setGroups([...groups, newGroup]);
    //Clear the input.
    input.value = ""

    //If there was an error message, remove it
    groupErrMsg && setGroupError(null);
  }

  // Triggered whenever the "Edit" button within a ListItem is clicked
  const editItem = (e) => {
    //Gets the id of the edit btn, which corresponds to the item ID.
    const targetId = parseInt(e.target.id)

    //Find the target item.
    const item = items.find(item => {
      return item.id == targetId
    })

    //Set editText to the item's text.
    //editText is then passed into & rendered within the EditForm component
    setEditText(item.text)

    //Set edit ID so we know which item we're editing now.
    setEditId(item.id)

    //Makes the EditForm component appear
    toggleEditMode(true);
  }

  // Updates the editText state whenever a change is made in the edit input.
  // Attached to the input in the EditForm component
  const trackEdit = (e) => {
    setEditText(e.target.value)
  }

  // Triggered whenever the "Save" button within EditForm is clicked
  const saveEdits = (e) => {
    if (editText.length < 3 || editText.length > 60) {
      return setEditError(`Sorry, items must be more than 3 characters & shorter than 60. You have ${editText.length} character(s).`)
    }
    //Creates a new array.
    let newItems = items.map(item => {

      if (item.id==editId){
        //If it is the targeted edit item, update the item's text with whatever is in the edit-input (whose value is held in editText and return the item after the change)
        item.text = editText;
        return item;
      }
      //If item is not the edited item, just return the original item.
      return item;
    })

    //Update the items with the mapped array
    setItems(newItems)

    //Hide the edit component
    toggleEditMode(false)
    //If there was an error message, remove it
    return editErrMsg && setEditError(null)
  }

  // Triggered whenever the "Add Item button in Form component is clicked.
  const addItemBtnHandler = ()=>{

    setError(null);

    //Get hold of the input via DOM. (Not the recommended way)
    const input = document.getElementById('input')

    //Validation check.
    if (input.value.length < 3 || input.value.length > 60) {
      return setError(`Sorry, items must be more than 3 characters & shorter than 60. You have ${input.value.length} character(s).`)
    }

    //Create new item.
    const newItem = {id: newId, text: input.value, time: Date.now(), group: selectedGroup}
    setItems((prevItems) => [...prevItems, newItem]);
    setId(newId+1);

    //Clear input.
    input.value = "";

    //If there was an error message before, clear it.
    return addErrMsg && setError(null)
  }

  // ATTACHED TO THE TICKS BESIDE THE LIST ITEMS.
  let deleteBtn = (e) => {
    //get item id from the delete button id.
    const targetId = parseInt(e.target.id.slice(8));
    removeItem(targetId);
  }


  //For every group, make a new TodoList component
  let groupLists = groups.map((group,index) => {

    // Get items whose group value matches the current group
    let groupItems = items.filter(item => item.group==group);

    // Pass the filtered items into the new TodoList component
    return <TodoList key={index} name={group} items={groupItems} editFunction={editItem} deleteFunction={deleteBtn}/>
  })

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col form-col text-center">

          <h2>What are your goals today?</h2>

          <Form select={getSelectedGroup} groups={groups} onClick={addItemBtnHandler} errMsg={addErrMsg}/>
          <GroupsForm errMsg={groupErrMsg} btnClick={createGroup}/>
        </div>

        <div className="col todo-col">

           {/*This means if editMode is true, then execute whatever is after the && */}
          {editMode && <EditForm errMsg={editErrMsg} save={saveEdits} tracker={trackEdit} text={editText}/>}

          {groupLists}

          <DeletedList items={deletedItems}/>
        </div>
      </div>
    </div>
  );
  }




export default hot(module)(App);