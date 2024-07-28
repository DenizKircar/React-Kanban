import { useState } from "react";
import { FaRegTrashAlt, FaFireAlt } from "react-icons/fa";
import classes from './List.module.css';

const Trash = ({ deleteTask, dragging, setDragging }) => {
    const [ isHovered, setIsHovered ] = useState(false);

    return (
        <div
            layout
            className={`${classes.trash} ${isHovered ? classes.active : undefined}`}
            onDragOver={e => {
                if(dragging) {
                    e.preventDefault();
                    setIsHovered(true);
                }
            }} 
            onDragLeave={() => {
                if(dragging) {
                    setIsHovered(false)
                }
            }} 
            onDrop={() => {
                if(dragging) {
                    setDragging(false);
                    deleteTask();
                    setIsHovered(false);
                }
            }}
        >
            <i>
                {isHovered ? <FaFireAlt/> : <FaRegTrashAlt/>}
            </i>
        </div>
    )
}

export default Trash;