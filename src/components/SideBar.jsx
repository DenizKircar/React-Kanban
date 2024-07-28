import { useState } from "react";
import SidebarCard from "./SidebarCard";
import classes from './Sidebar.module.css';
import AddComponent from "./AddComponent";
import { motion } from 'framer-motion';

const getBoardData = () => {
    const boardData = localStorage.getItem(`board-data`);
    const updatedBoardData = boardData ? JSON.parse(boardData) : [];
    
    return updatedBoardData;
}

const getRandomId = (id, array) => {
    if(array.findIndex(e => e.id === id) === -1) {
        return id;
    } else {
        return getRandomId(Math.random(), array);
    }
}

const Sidebar = ({ activeBoard, setActiveBoard, xPosn, setXPosn }) => {
    
    const [ ids, setIds ] = useState(getBoardData);

    const addNewBoard = (boardName) => {
        const listOfId = ids.map(e => e.id);
        const newId = getRandomId(Math.random(), listOfId);

        const newList = [...ids, {name: boardName, id: newId}];
        localStorage.setItem(`board-data`, JSON.stringify(newList));
        setIds(newList);
        
        setActiveBoard(newId);
    }

    const handleChangeName = (id, newName) => {
        const index = ids.findIndex(e => e.id === id);
        const filteredList = [...ids].filter(e => e.id !== id);

        const updatedIdsList = [...filteredList.slice(0, index), {name: newName, id: id}, ...filteredList.slice(index)];
        setIds(updatedIdsList);
        localStorage.setItem(`board-data`, JSON.stringify(updatedIdsList));
    }

    const handleDeleteTable = (tableId) => {
        const filteredList = [...ids].filter(e => e.id !== tableId);
        setIds(filteredList);
        localStorage.setItem(`board-data`, JSON.stringify(filteredList));

        localStorage.removeItem(`columnData-${tableId}`);
        localStorage.removeItem(`taskData-${tableId}`);

        if(tableId === activeBoard) {setActiveBoard(null);}
    }
    

    return (
        <motion.div 
            layout
            className={classes.sidebar}
            onMouseEnter={() => {
                setXPosn(0);
            }}
            onMouseLeave={() => setXPosn('calc(10px - 20vw)')}
            style={{left: `${xPosn}`}}
        >

            {
                ids.map(bId => {
                    return (
                        <SidebarCard 
                            activeBoard={activeBoard} 
                            key={bId.id} 
                            boardId={bId} 
                            onClick={() => setActiveBoard(bId.id)}
                            handleChangeName={handleChangeName}
                            handleDeleteTable={handleDeleteTable}
                        />
                    )
                })
            }

            <AddComponent handleAddComponent={addNewBoard} componentName='Board'/>
        </motion.div>
    )
}

export default Sidebar;