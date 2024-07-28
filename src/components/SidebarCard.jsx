import { useState } from 'react';
import classes from './Sidebar.module.css';
import { FaPen, FaCheck, FaRegTrashAlt } from "react-icons/fa";

const SidebarCard = ({ boardId, onClick, activeBoard, handleChangeName, handleDeleteTable }) => {
    const [ isEditing, setIsEditing ] = useState(false);
    const [ boardName, setBoardName ] = useState(boardId.name);

    const boardIdNum = boardId.id;

    return (
        <div 
            className={`${classes.SidebarCard} ${activeBoard === boardIdNum ? classes.active : undefined}`} 
        >
            {!isEditing ?
                <div className={classes.header} onClick={onClick} >
                    {boardName}
                </div>
                :
                <div>
                    <textarea
                        className=''
                        style={{
                            width: '100%',
                            resize: 'vertical'
                        }}
                        value={boardName}
                        onChange={e => setBoardName(e.target.value)}
                        onKeyDown={e => {
                            if(e.key === "Enter" && boardName.trim() !== '') {
                                handleChangeName(boardIdNum, boardName);
                                setIsEditing(false);
                            }
                        }}
                    />
                </div>
            }
            <div className={classes.buttonContainer}>
                {!isEditing ?
                    <span
                        onClick={() => {
                            setIsEditing(true);
                        }}
                    >
                        <FaPen />
                    </span>
                    :
                    <span
                        onClick={() => {
                            if(boardName.trim() !== '') {
                                handleChangeName(boardIdNum, boardName);
                                setIsEditing(false);
                            }
                        }}
                    >
                        <FaCheck />
                    </span>
                }
                <span
                    onClick={() => handleDeleteTable(boardIdNum)}
                >
                    <FaRegTrashAlt />
                </span>
            </div>
        </div>
    )
}

export default SidebarCard;


