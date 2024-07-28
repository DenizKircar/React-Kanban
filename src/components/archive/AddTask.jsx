import { useState } from "react";
import { motion } from 'framer-motion';
import classes from './List.module.css';

const AddTask = ({ addNewTask }) => {
    const [ adding, setAdding ] = useState(false);
    const [ taskName, setTaskName ] = useState('');

    return (
        <footer layout className={classes.newTaskInputContainer}>
            {adding ?
            <motion.div layout className={classes.textareaContainer}>
                <textarea 
                    autoFocus
                    name="" 
                    id="" 
                    className={classes.textareaa}
                    placeholder="Add new task..."
                    onKeyDown={(e) => {
                        if (e.key === "Enter" && taskName.trim() !== '') {
                            addNewTask(taskName);
                            setTaskName('');
                            setAdding(false);
                        }
                    }}
                    value={taskName}
                    onChange={(e) => setTaskName(e.target.value)}
                ></textarea>
                <div className={classes.buttonContainer__textarea}>
                    <button
                        className={classes.cancel}
                        onClick={() => {
                            setTaskName('');
                            setAdding(false);
                        }}
                    >
                        Cancel
                    </button>
                    <button
                        className={classes.add}
                        onClick={() => {
                            if(taskName.trim() !== '') {
                                addNewTask(taskName);
                                setTaskName('');
                                setAdding(false);
                            }
                        }}
                    >
                        + Add
                    </button>
                </div>
            </motion.div>
            :
            <motion.button 
                layout
                type='button'
                className={classes.toggleButton}
                onClick={() => setAdding(true)}
            >
                + Add Task
            </motion.button>
            }
        </footer>
    )
}

export default AddTask;