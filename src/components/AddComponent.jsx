import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import classes from './List.module.css';

const AddComponent = ({ handleAddComponent, componentName, style }) => {
    const [ isAdding, setIsAdding ] = useState(false);
    const [ name, setName ] = useState('');
    
    const ref = useRef(null);

    useEffect(() => {
        if(ref.current) {
            ref.current.style.height = 'auto';
            ref.current.style.height = ref.current.scrollHeight + 'px';
        }
    }, [name]);


    return (
        <div
            className={classes.taskListDisplay}
            layout
            style={style}
        >
            {
                isAdding 
                ? 
                <div layout className={classes.textareaContainer}>
                    <textarea
                        rows={1}
                        autoFocus
                        ref={ref}
                        className={classes.textareaaDos}
                        placeholder={`Add new ${componentName.toLowerCase()}...`}
                        onKeyDown={(e) => {
                            if (e.key === "Enter" && name.trim() !== '') {
                                handleAddComponent(name);
                                setName('');
                                setIsAdding(false);
                            } else if(e.key === "Enter") {
                                alert('enter valid shit');
                            } else if(e.key === "Escape") {
                                setName('');
                                setIsAdding(false);
                            }
                        }}
                        onBlur={() => {
                            if (name.trim() !== '') {
                                handleAddComponent(name);
                                setName('');
                                setIsAdding(false);
                            } else {
                                setName('');
                                setIsAdding(false);
                            }
                        }}
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    ></textarea>
                    <div className={classes.buttonContainer__textarea}>
                        <button
                            className={classes.cancel}
                            onClick={() => {
                                setName('');
                                setIsAdding(false);
                            }}
                        >
                            Cancel
                        </button>
                        <button
                            className={classes.add}
                            onClick={() => {
                                if(name.trim() !== '') {
                                    handleAddComponent(name);
                                    setName('');
                                    setIsAdding(false);
                                } else {
                                    alert('enter valid shit');
                                }
                            }}
                        >
                            + Add
                        </button>
                    </div>
                </div>
                :
                <motion.button 
                    layout
                    type='button'
                    className={`${classes.toggleButton}`}
                    onClick={() => setIsAdding(true)}
                >
                    + Add {componentName}
                </motion.button>   
            }
        </div>
    )
}

export default AddComponent;