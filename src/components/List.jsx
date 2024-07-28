import { useState } from "react";
import classes from './List.module.css';
import ColumnHeader from "./ColumnHeader";

import Task from "./Task.jsx";
import AddComponent from "./AddComponent";


const List = ({ 
        moveTask, 
        tasks, 
        setTasks,
        dragged,
        setDragged,
        column,
        removeColumn,
        updateColumnName,
        idNum,
        storeColDragData,
        setDraggingCol,
        draggingCol,
        dragging,
        setDragging
    }) => {
    const [ active, setActive ] = useState(false);
    const [ colActive, setColActive ] = useState(false);
    
    
    const generateID = (id = Math.random()) => {
        const existingId = tasks.find(e => e.id === id);
        if(existingId === undefined) {
            return id;
        } else {
            const newId = Math.random();
            return generateID(newId);
        }
    }

    const addNewTask = (label) => {
        if(label.trim() !== '') {
            const id = generateID();
            const newTaskList = [...tasks, {label: label, id: id, column: column.identifier}];
            setTasks(newTaskList);
            localStorage.setItem(`taskData-${idNum}`, JSON.stringify(newTaskList));
        } else {
            console.log('nigga enter valid shit')
        }
    }

    const handleChangeTaskName = (newLabel, task) => {
        if(newLabel.trim() !== '') {
            const updatedTask = {...task, label: newLabel};
            const taskIndex = tasks.findIndex(e => e.id === task.id);
            const updatedTasks = [...tasks].filter(e => e.id !== task.id);
            
            const newTaskList = [...updatedTasks.slice(0, taskIndex), updatedTask, ...updatedTasks.slice(taskIndex)]
            
            setTasks(newTaskList);
            localStorage.setItem(`taskData-${idNum}`, JSON.stringify(newTaskList));
        } else {
            const newTaskList = [...tasks].filter(e => e.id !== task.id);
            setTasks(newTaskList);
            localStorage.setItem(`taskData-${idNum}`, JSON.stringify(newTaskList));
        }
    }



    const storeDragData = (id) => {
        setDragged(id);
    }

    const getNearestIndicator = (e, indicators) => {
        const DISTANCE_OFFSET = 40;
    
        const el = indicators.reduce(
          (closest, child) => {
            const box = child.getBoundingClientRect();
    
            const offset = e.clientY - (box.top + DISTANCE_OFFSET);
    
            if (offset < 0 && offset > closest.offset) {
              return { offset: offset, element: child };
            } else {
              return closest;
            }
          },
          {
            offset: Number.NEGATIVE_INFINITY,
            element: indicators[indicators.length - 1],
          }
        );
    
        return el;
    };
    
    const getIndicators = () => {
        return Array.from(document.querySelectorAll(`[id^="${column.identifier}"]`));
    };

    const highlightIndicator = (e) => {
        const indicators = getIndicators();
    
        clearHighlights(indicators);
    
        const el = getNearestIndicator(e, indicators);
    
        el.element.style.opacity = "1";
    };
      
    const clearHighlights = (els) => {
        const indicators = els || getIndicators();
    
        indicators.forEach((i) => {
          i.style.opacity = "0";
        });
    };
    

    const handleChangeColumnName = (label) => {
        updateColumnName(column.identifier, label);
    }

    const filteredTasks = tasks.filter(task => task.column === column.identifier);
    
    return (
        <>
            <div
                style={{background: colActive && '#333'}}
                draggable={false}
                className={`${classes.taskListDisplay} ${active ? classes.highlight : undefined}`}
                onDragOver={e => {
                    if(dragging) {
                        e.preventDefault();
                        highlightIndicator(e);
                        setActive(true);
                    }
                }}
                onDrop={(e) => {
                    if(dragging) {
                        clearHighlights();
                        setActive(false);
                        const indicators = getIndicators();
                        const { element } = getNearestIndicator(e, indicators);
                        if(element.id === `${column.identifier}-P`) {
                            moveTask(dragged, column.identifier, false);
                            return;
                        }
                        const cTask = tasks.find(e => element.id.includes(e.id));
                        moveTask(dragged, column.identifier, cTask);
                    }
                    setDragging(false);
                }}
                onDragLeave={() => {
                    if(dragging) {
                        clearHighlights(); 
                        setActive(false);
                    }
                }}
            >
                <ColumnHeader
                    handleChangeColumnName={handleChangeColumnName}
                    removeColumn={removeColumn} 
                    column={column}
                    onDragStartFr={() => {
                        setColActive(true);
                        storeColDragData(column.identifier);
                        setDraggingCol(true);
                    }}
                    onDragEndFr={() => {
                        setDraggingCol(false);
                        setColActive(false);
                    }}
                />
                <ul className={`${classes.ul}`}>
                    <section 
                        className={classes.gap}
                        id={`${column.identifier}-P`}
                    />
                    {filteredTasks.map(task => {
                        return (
                            <Task
                                key={task.id} 
                                taskInfo={task}
                                editTask={handleChangeTaskName}
                                onDragStartFr={() => {
                                    storeDragData(task.id);
                                    setDragging(true);
                                }}
                                onDragEndFr={() => setDragging(false)}
                            />
                        )
                    })}
                </ul>
                
                <AddComponent
                    handleAddComponent={addNewTask}
                    componentName='Task' 
                />
            </div>
            <div style={{
                height: 'calc(100vh - 40px)',
                width: '2px',
                background: 'pink',
                opacity: 0
            }} id={`3${idNum}-${column.identifier}`}></div>
        </>
    )
}

export default List;