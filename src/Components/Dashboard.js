import React, { useState, useEffect } from 'react';
import '../Style/Dashbaord.css';
import { collection, getDocs, addDoc, deleteDoc, doc } from 'firebase/firestore';
import { db, auth } from '../firebase';

const Dashboard = ({ addTask }) => {

    const [tasklist, setTaskList] = useState([]);
    const [taskTitle, setTaskTitle] = useState('');
    const [taskDescription, setTaskDescription] = useState('');
    const [dueDate, setDueDate] = useState('');
    const taskRef = collection(db, "Tasks");
   
        const getTaskList = async () => {
            try {
                const data = await getDocs(taskRef);
                const firestoreData = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
                console.log(firestoreData);
                setTaskList(firestoreData);
            } catch (err) {
                console.error(err);
            }
        }
        useEffect(() => {
             getTaskList();
        }, []);

    const submitTask = async () => {
        try {
            await addDoc(taskRef, {
                title: taskTitle,
                description: taskDescription,
                dueDate: dueDate,
                userId :auth?.currentUser?.uid,
            })
            getTaskList();
        } catch (err) {
            console.error(err);
        }
    }

    const deleteTask = async(id) =>{
        try{
            const taskdoc = doc(db, "Tasks", id);
            await deleteDoc(taskdoc);
            getTaskList();
        }catch(err){
            console.error(err);
        }
    }

    const update = async(id) =>{
        try{
            const taskdoc = doc(db, "Tasks", id);
            await deleteDoc(taskdoc);
            getTaskList();
        }catch(err){
            console.error(err);
        }
    }

    
    return (
        <>
            <div className="dash">
                <div className="task-input-container">
                    <h2>Add New Task</h2>
                    <label htmlFor="taskTitle">Task Title:</label>
                    <input
                        type="text"
                        id="taskTitle"
                        value={taskTitle}
                        onChange={(e) => setTaskTitle(e.target.value)}
                        required
                    />

                    <label htmlFor="taskDescription">Task Description:</label>
                    <textarea
                        id="taskDescription"
                        value={taskDescription}
                        onChange={(e) => setTaskDescription(e.target.value)}
                        required
                    ></textarea>

                    <label htmlFor="dueDate">Due Date:</label>
                    <input
                        type="date"
                        id="dueDate"
                        value={dueDate}
                        onChange={(e) => setDueDate(e.target.value)}
                        required
                    />

                    <button type="button" id="btn" onClick={submitTask}>
                        Add Task
                    </button>
                    
                </div>
            </div>
            {tasklist.map((task) => (
                <div key={task.id}>
                    <h1>{task.title}</h1>
                    <h2>{task.description}</h2>
                    <h2>{task.dueDate}</h2>
                    <button id="btn1" onClick={()=> deleteTask(task.id)}> Delete Task</button>
                </div>
            ))}
        </>
    )
}

export default Dashboard