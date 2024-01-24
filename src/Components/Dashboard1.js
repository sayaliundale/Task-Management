import React, { useState, useEffect } from 'react';
import { signOut } from 'firebase/auth';
import { auth, db } from '../firebase';
import { useNavigate } from 'react-router-dom';
import { collection, getDocs, addDoc, deleteDoc, doc } from 'firebase/firestore';
import '../Style/Dashbaord.css';

const Dashboard1 = () => {
    const navigate = useNavigate();
    const [tasklist, setTaskList] = useState([]);
    const [taskTitle, setTaskTitle] = useState('');
    const [taskDescription, setTaskDescription] = useState('');
    const [dueDate, setDueDate] = useState('');
    const [showAddTaskForm, setShowAddTaskForm] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
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
    });

    const addtask = () => {
        setShowAddTaskForm(true);
    }

    const submitTask = async () => {
        if (!taskTitle || !taskDescription || !dueDate) {
            setErrorMessage('Please fill in all required fields.');
            return;
        }

        try {
            await addDoc(taskRef, {
                title: taskTitle,
                description: taskDescription,
                dueDate: dueDate,
                userId: auth?.currentUser?.uid,
            })
            setTaskTitle('');
            setTaskDescription('');
            setDueDate('');

            getTaskList();
            setShowAddTaskForm(false);
        } catch (err) {
            console.error(err);
        }
    }

    const deleteTask = async (id) => {
        try {
            const taskdoc = doc(db, "Tasks", id);
            await deleteDoc(taskdoc);
            getTaskList();
        } catch (err) {
            console.error(err);
        }
    }

    const logout = async () => {
        try {
            await signOut(auth);
            navigate('/login');
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <>
            <div className="dashbaord">
                <div className="header">
                    <button className="logout" onClick={logout}>
                        Logout
                    </button>
                </div>
                <div className="title">
                    <div className="task-board">
                        Task Board
                    </div>
                    <button className="addtask" onClick={addtask}> + </button>
                </div>
                <div className="tasks">
                    {showAddTaskForm && (
                        <div className="task-form">
                            <p> Title : <input
                                type="text"
                                value={taskTitle}
                                onChange={(e) => setTaskTitle(e.target.value)} required
                            /></p>
                            <div style={{ display: "flex", paddingLeft: "1rem", gap: "0.5rem" }}
                            > <label style={{ color: "black", fontWeight: "500", fontSize: "1.1rem" }}>Description :</label>
                                <textarea className='descrp' rows={4} cols={26}
                                    value={taskDescription}
                                    onChange={(e) => setTaskDescription(e.target.value)} required />
                            </div>

                            <p>DueDate : <input
                                type="date"
                                value={dueDate}
                                onChange={(e) => setDueDate(e.target.value)}
                                required /></p>
                            {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
                            <button id="submit-btn" onClick={submitTask}>Submit Task</button>
                        </div>
                    )}
                    {tasklist.map((task) => (
                        <div className="task" key={task.id}>
                            <p><span>Title :</span>  {task.title}</p>
                            <p><span>Description :</span> {task.description}</p>
                            <p><span>DueDate : </span> {task.dueDate}</p>
                            <button id="btn1" onClick={() => deleteTask(task.id)}>Delete Task</button>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
};

export default Dashboard1;
