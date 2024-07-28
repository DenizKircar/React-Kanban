import { CiStickyNote } from "react-icons/ci";
import classes from "./Fallback.module.css";
import { motion } from "framer-motion";

const Fallback = ({xPosn}) => {
    
    return (
        <motion.div
            layout
            className={classes.fallback}
            style={{left: xPosn === 0 ? 'calc(20vw)' : '0'}} 
        >
            <span>
                <CiStickyNote />
            </span>
            <div className={classes.headerBox}>
                <h1>
                    You do not have any selected boards.
                </h1>
                <h2>
                    Select/create a new board by bringing your mouse over to the sidebar on the left!
                </h2>
            </div>
        </motion.div>
    )
}

export default Fallback;