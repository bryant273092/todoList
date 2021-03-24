import React, { FC, useState } from 'react'
import type { Task } from '../../utility/manageTasks'
import { IonGrid, IonCol, IonIcon, IonRadio } from '@ionic/react'
import './ListItem.css'
import { getTasks, updateTaskStatus , deleteTask } from '../../utility/manageTasks'
interface ListItemProps {
    task: Task
    update: Function
    edit: Function
    textarea: Function
}

const ListItem: React.FC<ListItemProps> = ({ task, update, edit, textarea }) => {
    const [completed, setCompleted] = useState<boolean>(task.completed)
    const handleDelete = () => {
        deleteTask(task.id)
        update(getTasks())
    }
    //updates task to be marked as completed, or to be reversed and marked as uncompleted
    const handleStatusUpdate= () => {
        console.log('handeling')
        updateTaskStatus(task.id)
        setCompleted(!task.completed)
        update(getTasks())
    }
    return (
        <>
            <div className={"row" + (completed? ' completedRow' : '')}>
                <IonCol size={'1'} class="col" >
                    <button onClick={() => {
                        handleStatusUpdate()
                    }} className="radioBtn">
                        {completed ? <span className="checkMark">✓   </span> : ''}
                    </button>
                </IonCol>
                <IonCol size={'8'}>
                    <p className={completed ? 'strikethrough' : ''} >{task.text}</p>
                </IonCol>
                <IonCol>
                    <button onClick={() => {
                        textarea(task.text)
                        edit(task)
                    }} className="button">
                        <IonIcon class="icon" color={'black'} src="./assets/icon/pencil-alt-solid.svg"></IonIcon>
                    </button>
                </IonCol>
                <IonCol >
                    <button onClick={() => {
                        //after deleting selected task, update parent list of tasks
                        handleDelete()
                    }} className="button">
                        <IonIcon color={'black'} class="icon"  src="./assets/icon/trash-solid.svg"></IonIcon>
                    </button>

                </IonCol>

            </div>


        </>
    )
}
export default ListItem;