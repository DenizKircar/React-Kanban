import { useState } from "react";
import classes from './List.module.css';
import { FaPen, FaCheck, FaRegTrashAlt } from "react-icons/fa";
import { motion } from 'framer-motion';

const ColumnHeader = ({ handleChangeColumnName, removeColumn, column, onDragStartFr, onDragEndFr }) => {
    const [ isEditingColumn, setIsEditingColumn ] = useState(false);
    const [ columnName, setColumnName ] = useState(column.label);

    return (
        <motion.span
            layout 
            className={classes.headerSpan} 
            draggable 
            onDragStart={onDragStartFr} 
            onDragEnd={onDragEndFr}
        >
            {isEditingColumn ?
                <input 
                    type="text" 
                    autoFocus 
                    className={classes.columnNameInput} 
                    value={columnName} 
                    onChange={e => setColumnName(e.target.value)}
                    onBlur={() => handleChangeColumnName(columnName)}
                    onKeyDown={e => {
                        if(e.key === 'Enter') {
                            handleChangeColumnName(columnName);
                            setIsEditingColumn(false);
                        }
                    }}
                /> : 
                column.label
            }
            <div className={classes.buttonContainer}>
                {isEditingColumn ?
                    <i 
                        onClick={() => {
                            handleChangeColumnName(columnName);
                            setIsEditingColumn(false);
                        }}
                    >
                        <FaCheck/>
                    </i> 
                    :
                    <i 
                        onClick={() => setIsEditingColumn(true)}
                    >
                        <FaPen/>
                    </i>
                }
                <i 
                    onClick={() => removeColumn(column.identifier)}
                >
                    <FaRegTrashAlt/>
                </i>
            </div>
            </motion.span>
    )
}

export default ColumnHeader;