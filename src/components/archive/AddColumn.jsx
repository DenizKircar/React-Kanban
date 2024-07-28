import { useState } from 'react';
import { motion } from 'framer-motion';
import classes from './List.module.css';

const AddColumn = ({ handleAddColumn }) => {
    const [ isAddingColumn, setIsAddingColumn ] = useState(false);
    const [ columnName, setColumnName ] = useState('');

    return (
        <li
            className={classes.taskListDisplay}
            layout
        >
            {
                isAddingColumn 
                ? 
                <motion.div layout className={classes.textareaContainer}>
                    <textarea
                        style={
                            {
                                resize: 'none',
                            }
                        }
                        autoFocus
                        name="" 
                        id="" 
                        className={classes.textareaaDos}
                        placeholder="Add new column..."
                        onKeyDown={(e) => {
                            if (e.key === "Enter" && columnName.trim() !== '') {
                                handleAddColumn(columnName);
                                setColumnName('');
                                setIsAddingColumn(false);
                            }
                        }}
                        value={columnName}
                        onChange={(e) => setColumnName(e.target.value)}
                    ></textarea>
                    <div className={classes.buttonContainer__textarea}>
                        <button
                            className={classes.cancel}
                            onClick={() => {
                                setColumnName('');
                                setIsAddingColumn(false);
                            }}
                        >
                            Cancel
                        </button>
                        <button
                            className={classes.add}
                            onClick={() => {
                                if(columnName.trim() !== '') {
                                    handleAddColumn(columnName);
                                    setColumnName('');
                                    setIsAddingColumn(false);
                                }
                            }}
                        >
                            + Add
                        </button>
                    </div>
                </motion.div>
                :
                <motion.span layout
                    className={`${classes.headerSpan} ${classes.newColumnButton}`}
                    onClick={() => setIsAddingColumn(true)}
                >
                    + Add New Column
                </motion.span>    
            }
        </li>
    )
}

export default AddColumn;