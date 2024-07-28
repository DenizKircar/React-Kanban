import { useState } from "react"
import classes from './List.module.css'

import AddComponent from './AddComponent'
import Trash from "./Trash.jsx"
import List from "./List.jsx"

const getColumnData = (id) => {
    const columnData = localStorage.getItem(`columnData-${id}`);
    const updatedColumnData = columnData ? JSON.parse(columnData) : [];
    
    return updatedColumnData;
}

const getTaskData = (id) => {
    const taskData = localStorage.getItem(`taskData-${id}`);
    const updatedTaskData = taskData ? JSON.parse(taskData) : [];
    
    return updatedTaskData;
}

const ListDisplay = ({ idNum, xPosn }) => {
    const [ taskData, setTaskData ] = useState(getTaskData(idNum));
    const [ columnData, setColumnData ] = useState(getColumnData(idNum));
    const [ dragged, setDragged ] = useState(null);
    
    const [ draggingCol, setDraggingCol ] = useState(false);
    const [ draggedCol, setDraggedCol ] = useState(null);

    const [ dragging, setDragging ] = useState(false);

    const handleDeleteTask = () => {
        const updatedTaskList = [...taskData].filter(e => e.id !== dragged);
        setTaskData(updatedTaskList);
        localStorage.setItem(`taskData-${idNum}`, JSON.stringify(updatedTaskList));
        setDragged(null);
    }

    const moveTask = (id, column, cTask) => {
        const task = taskData.find(e => e.id === id);
        setDragging(false);

        // bro please for the love of god i need to comment on my code in the future, what the fuck is cTask
        if(cTask === false) {
            const removedList = [...taskData].filter(e => e.id !== id);
            const updatedTaskList = [{...task, column: column}, ...removedList];
            setTaskData(updatedTaskList);
            localStorage.setItem(`taskData-${idNum}`, JSON.stringify(updatedTaskList));
            setDragged(null);
            return;
        } else {
            const placeIndex = taskData.findIndex(e => {return e.column === cTask.column && e.id === cTask.id});
            var situational = (taskData.findIndex(e => e.id === id) > placeIndex) ? 1 : 0;

            const removedList = [...taskData].filter(e => e.id !== id);
            const updatedTaskList = [...removedList.slice(0, placeIndex + situational), {...task, column: column}, ...removedList.slice(placeIndex + situational)];
            setTaskData(updatedTaskList);
            localStorage.setItem(`taskData-${idNum}`, JSON.stringify(updatedTaskList));
            setDragged(null);
        }
    }

    const handleAddColumn = (name) => {
        const exists = columnData.find(e => e.identifier === name.replace(/\s/g, '').toLowerCase());
        if(exists === undefined && name.trim() !== '') {
            const updatedColumnData = [...columnData, {label: name, identifier: name.replace(/\s/g, '').toLowerCase()}];
            setColumnData(updatedColumnData);
            localStorage.setItem(`columnData-${idNum}`, JSON.stringify(updatedColumnData));
        } else {
            alert('please input a valid/unique column name')
        }
    }

    const handleRemoveColumn = (identifier) => {
        const updatedColumnData = [...columnData].filter(e => e.identifier !== identifier);
        const updatedTaskData = [...taskData].filter(e => e.column !== identifier);
        setColumnData(updatedColumnData);
        localStorage.setItem(`columnData-${idNum}`, JSON.stringify(updatedColumnData));
        setTaskData(updatedTaskData);
        localStorage.setItem(`taskData-${idNum}`, JSON.stringify(updatedTaskData));
    }

    const handleUpdateColumnName = (oldIdentifier, newName) => {
        const newIdentifier = newName.replace(/\s/g, '').toLowerCase();
        const exists = columnData.find(e => e.identifier === newIdentifier);

        if(oldIdentifier === newIdentifier) {
            return;
        } else if(exists === undefined && newIdentifier !== '') {
            const updatedColumnData = [...columnData].map(e => {
                if(e.identifier === oldIdentifier) {
                    return {label: newName, identifier: newIdentifier};
                } else {
                    return {...e};
                }
            });
            const updatedTaskData = [...taskData].map(e => {
                if(e.column === oldIdentifier) {
                    return {...e, column: newIdentifier};
                } else {
                    return {...e};
                }
            });
            setColumnData(updatedColumnData);
            localStorage.setItem(`columnData-${idNum}`, JSON.stringify(updatedColumnData));
            setTaskData(updatedTaskData);
            localStorage.setItem(`taskData-${idNum}`, JSON.stringify(updatedTaskData));
            return;
        } else {
            alert('enter unique/valid column name')
        }
    }

    const moveCol = (identifier, cCol) => {
        const col = columnData.find(e => e.identifier === identifier);
        const removedList = [...columnData].filter(e => e.identifier !== identifier);

        if(cCol === false) {
            const updatedColList = [col, ...removedList]
            setColumnData(updatedColList);
            localStorage.setItem(`columnData-${idNum}`, JSON.stringify(updatedColList));
            setDraggedCol(null);
        } else {
            const placeIndex = columnData.findIndex(e => {return e.identifier === cCol.identifier});
            var situational = (columnData.findIndex(e => e.identifier === identifier) > placeIndex) ? 1 : 0;

            const updatedColumnList = [...removedList.slice(0, placeIndex + situational), col, ...removedList.slice(placeIndex + situational)];

            setColumnData(updatedColumnList);
            localStorage.setItem(`columnData-${idNum}`, JSON.stringify(updatedColumnList));
            setDraggedCol(null);
        }
    }

    const storeDragData = (id) => {
        setDraggedCol(id);
    }

    const getNearestIndicator = (e, indicators) => {
        const DISTANCE_OFFSET = 100;
    
        const el = indicators.reduce(
          (closest, child) => {
            const box = child.getBoundingClientRect();
    
            const offset = e.clientX - (box.left + DISTANCE_OFFSET);
    
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
        return Array.from(document.querySelectorAll(`[id^="3${idNum}"]`));
    };

    const highlightColIndicator = (e) => {
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

    return (
        <>
            <ul
                style={{left: xPosn === 0 ? 'calc(20vw)' : '0'}} 
                className={classes.displaySection}
                onDragOver={e => {
                    if(draggingCol) {
                        e.preventDefault();
                        highlightColIndicator(e);
                    }
                }}
                onDrop={(e) => {
                    if(draggingCol) {
                        clearHighlights();
                        const indicators = getIndicators();
                        const { element } = getNearestIndicator(e, indicators);
                        if(element.id === `3${idNum}-P`) {
                            moveCol(draggedCol, false);
                            return;
                        }
                        const cTask = columnData.find(e => element.id.includes(e.identifier));
                        moveCol(draggedCol, cTask); 
                    }
                }}
                onDragLeave={() => {
                    if(draggingCol) {
                        clearHighlights(); 
                    }
                }}
            >
                <div style={{
                    height: 'calc(100vh - 40px)',
                    width: '2px',
                    background: 'pink',
                    opacity: 0
                }} id={`3${idNum}-P`}></div>
                {columnData.map(column => {
                    return (
                        <List 
                            key={column.identifier} 
                            moveTask={moveTask} 
                            dragged={dragged} 
                            setDragged={setDragged} 
                            tasks={taskData} 
                            setTasks={setTaskData} 
                            column={column}
                            removeColumn={handleRemoveColumn}
                            updateColumnName={handleUpdateColumnName}
                            idNum={idNum}

                            storeColDragData={storeDragData}
                            setDraggingCol={setDraggingCol}
                            draggingCol={draggingCol}
                            
                            setDragging={setDragging}
                            dragging={dragging}
                        />
                    )
                })}
                <AddComponent handleAddComponent={handleAddColumn} componentName='Column'/>
                <Trash deleteTask={handleDeleteTask} dragging={dragging} setDragging={setDragging}/>
            </ul>
        </>
    )
}

export default ListDisplay;