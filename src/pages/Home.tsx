import { IonContent, IonHeader, IonPage, IonTitle, IonTextarea, IonButton, IonGrid, IonRow, IonItem, IonList, IonInput } from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';
import './Home.css';
import { useState } from 'react'
import { createTask, getTasks, Task, updateTask, sortTasks } from '../utility/manageTasks'
import ListItem from '../components/ListItem'

const Home: React.FC = () => {
  const [input, setInput] = useState<string | null | undefined>('')
  const [isEmpty, setisEmpty] = useState<boolean>(false)
  //Array that contains up-to-date tasks
  const [tasks, setTasks] = useState<Array<Task>>(getTasks())
  const [isEditing, setisEditing] = useState<null | Task>(null)
  const [textArea, settextArea] = useState<string | null | undefined>(isEditing? isEditing.text : '')
  const [validEdit, setvalidEdit] = useState<boolean>(true)
  const handleSubmit = () => {
    if (input == null || input == undefined || input == '') {
      //open error message if invalid submission attempt
      setisEmpty(true)
    }
    else {
      //send input string to helper function
      createTask(input)
      //close error message if open
      setisEmpty(false)
      //render updated tasks
      setTasks(getTasks())
      //clear input field
      setInput('')
    }
  }
  const handleEdit = () => {
    if (textArea == null || textArea == undefined || textArea == '' || isEditing == null) {
      //open error message for invalid edit attempt
      setvalidEdit(false)
    }
    else {
      //send textarea and task id to helper function
      updateTask(textArea, isEditing.id)
      //close error message if open
      setvalidEdit(true)
      //render updated tasks
      setTasks(getTasks())
      //closes modal
      setisEditing(null)
      //clears the text area
      settextArea('')
    }
  }
  return (
    <IonPage>
      <IonHeader class="header">
        <IonTitle>
          My To Do List
        </IonTitle>
      </IonHeader>
      <IonContent fullscreen>
        <IonGrid class="inputContainer">
          <IonRow class="inputRow">
            <IonInput
              class="input"
              value={input}
              onIonChange={(event) => (setInput(event.detail.value))}
              type={'text'} />
            <IonButton
              color={'dark'}
              onClick={() => handleSubmit()}
              class="inputButton" >Add To List
            </IonButton>
          </IonRow>
          <IonRow>
            {isEmpty ? <span className="inputError">Error: Input value can not be empty</span> : ''}
          </IonRow>

        </IonGrid>
        <IonList class="list" >
          {
            tasks.map((task: Task) => (
              <IonRow key={task.id} class="taskRow">
                <ListItem edit={setisEditing} textarea={settextArea} update={setTasks} task={task} />
              </IonRow>
            ))
          }


        </IonList>

      </IonContent>
      {
        isEditing ?
          <div className="modalBackground">
            <div className="modal">
              <h1 className="heading">Edit Task</h1>
              <div >
                <IonTextarea inputmode="text" auto-grow={true} className="editInput" value={textArea} onIonChange={(event) => (settextArea(event.detail.value))} >
                </IonTextarea>
              </div>
              <div className="edit-error">
                {!validEdit ? <span className="inputError">Error: Input value can not be empty</span> : ''}
              </div>

              <div className="editButtons">
                <IonButton onClick={() => handleEdit()} color={'success'} class="editButton save">
                  Save
                </IonButton>
                <IonButton fill={'outline'}onClick={() => {
                  setisEditing(null)
                  setvalidEdit(true)
                  }} color={'white'} class="editButton">
                  cancel
                </IonButton>
              </div>
            </div>
          </div>
          :
          ''
      }
    </IonPage>
  );
};

export default Home;
