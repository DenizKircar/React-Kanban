import { motion } from 'framer-motion';
import { useEffect, useState, useRef } from 'react';
import classes from './List.module.css';

const Task = ({ taskInfo, editTask, onDragStartFr, onDragEndFr }) => {
    const [ isEditing, setIsEditing ] = useState(false);
    const [ taskLabel, setTaskLabel ] = useState(taskInfo.label);

    const ref = useRef(null);

    useEffect(() => {
        if(ref.current) {
            ref.current.style.height = 'auto';
            ref.current.style.height = ref.current.scrollHeight + 'px';
        }
    }, [taskLabel, isEditing]);

    return (
        <>
            {
                isEditing ? 
                <textarea
                    className={`${classes.taskInput}`}
                    ref={ref}
                    rows={1}
                    autoFocus
                    onFocus={(e) => e.target.select()}
                    onBlur={() => {
                        // editTask(taskLabel, taskInfo);
                        setTaskLabel(taskInfo.label);
                        setIsEditing(false);
                    }}
                    value={taskLabel}
                    onChange={e => setTaskLabel(e.target.value)}
                    onKeyDown={e => {
                        if(e.key === 'Enter') {
                            editTask(taskLabel, taskInfo);
                            setIsEditing(false);
                        } else if(e.key === 'Escape') {
                            setIsEditing(false);
                            setTaskLabel(taskInfo.label);
                        }
                    }}
                />
                :
                <motion.li
                    layoutId={taskInfo.id}
                    onDoubleClick={() => setIsEditing(true)}
                    onDragStart={onDragStartFr}
                    onDragEnd={onDragEndFr}
                    draggable
                    className={classes.task}
                    onClick={() => console.log(taskInfo.id)}
                >
                    {taskInfo.label}
                </motion.li>
            }
            <section 
                    className={classes.gap}
                    id={`${taskInfo.column}-${taskInfo.id}`}
            ></section>
        </>
    )
}

export default Task;