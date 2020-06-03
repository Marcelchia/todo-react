import React from 'react';
import { hot } from 'react-hot-loader';

class App extends React.Component {
    constructor() {
        super();
        this.state = {
            currentTask: "",
            taskId: 0,
            tasks: [],
            checked: false
        }
    }

    changeHandler(event) {
        if (event.target.type === 'text') {
            let newTask = event.target.value;

            this.setState({
                currentTask: newTask
            })
            console.log(this.state.currentTask)
        } else if (event.target.type === 'checkbox') {
            if (this.state.checked === false) {
                this.setState({
                    checked: true
                })
            } else {
                this.setState({
                    checked: false
                })
            }
        }

    }

    clickHandler(event){
        let addTask = this.state.tasks;
        addTask.push(this.state.currentTask);

        this.setState({
            tasks: addTask
        })
    }

  render() {

    const taskList = this.state.tasks.map(task => {
        return (
            <label>
                <input
                    type='checkbox'
                    className='check-box'
                    checked={this.state.checked}
                    onChange={(event) => {this.changeHandler(event)}}/>
                {task}
            </label>
        )
    })

    return (
      <div className='container'>
        <h1>To do List</h1>

        <h2>
            <input
                type='text'
                className='input'
                onChange={(event) => {this.changeHandler(event)}}
                placeholder='Type tasks here..'
            />
        </h2>
        <button
            className='submit'
            onClick={()=>{this.clickHandler()}}>
            Submit
            </button>
        <br/>
        <div className='task-box'>
            {taskList}
        </div>
      </div>
    );
  }
}



export default hot(module)(App);