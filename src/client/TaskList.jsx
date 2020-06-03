import React from 'react';


class Task extends React.Component{
    render(){
        const task = this.props.task
        const taskID = this.props.taskID

        return(
            <div>
                <p>{task}</p>
                <button onClick={() => {this.props.completeTask(taskID)}}>Completed Task</button>
            </div>
        )
    }
}

export default Task;




class Tasklist extends React.Component{
    render(){
        const tasks = this.props.tasks.map((task, taskID) => {
        return (
            <Task task={task} taskID={taskID} completeTask={this.props.completeTask}/>
        )
    })
        return(
            <div>
                {tasks}
            </div>
        )
    }
}

export default Tasklist;