import { useState } from "react"
import { useDispatch } from "react-redux";
import { changeCatName, loadCurrentDayTasks } from "../../store/userTaskReducer";
import OpenModalButton from "../OpenModalButton";
import EditTask from "./EditTask";

export default function EditCategory( { allTasks, categoryTasks, category, taskType, date, user, endEditTasks } ) {
    const dispatch = useDispatch();
    const [ showMenu, setShowMenu ] = useState(false);
    const closeMenu = () => setShowMenu(false);
    const [ catName, setCatName ] = useState(category);
    const [ activeInput, setActiveInput ] = useState(false);
    const [ errors, setErrors ] = useState([]);


    const inputWidth = {
        width: `${category.length + 1}ch`
    }
    const handleCatNameChange = (e) => {
        e.preventDefault();
        dispatch(changeCatName(category, catName, taskType))
            .catch(async (res) => {
                const data = await res.json();
                if (data && data.errors) setErrors(data.errors);
            })
        dispatch(loadCurrentDayTasks(user.id))
        endActiveInput();
    }

    const onKeyDown = (e) => {
        console.log("e.key", e.key)
        if (e.key === "Enter") {
            if (e.target.value.trim() === "") {
                setCatName(category);
            } else {
                setCatName(e.target.value);
            }

            dispatch(changeCatName(category, catName, taskType))
                .catch(async (res) => {
                    const data = await res.json();
                    if (data && data.errors) setErrors(data.errors);
                })
            dispatch(loadCurrentDayTasks(user.id));
            endActiveInput();
        }
    }

    const startActiveInput = (e) => {
        setActiveInput(true);
    }

    const endActiveInput = (e) => {
        setActiveInput(false)
    }
    return(
        <div className="EditCategory-container">
            <div className={`UserTasks-category-container`}>
                        <div className="UserTasks-header">
                            { activeInput ? (
                                <div className="UserTasks-category-name">
                                    <input
                                        className="UserTasks-header-text edit-input"
                                        value={catName}
                                        onChange={(e) => setCatName(e.target.value)}
                                        onKeyDown={onKeyDown}
                                    />
                                    <button
                                        className="UserTasks-category-save"
                                        onClick={handleCatNameChange}
                                        disabled={catName.length > 12 || catName.length < 1 ? true : false}
                                    >
                                        Save
                                    </button>
                                    <div className="EditCategory-error-text">
                                        {catName.length > 12 ? "Max. 12 characters" : ""}
                                    </div>
                                </div>
                            ) : (
                                <div className="UserTasks-category-name">
                                    <input
                                        className="UserTasks-header-text no-hover"
                                        value={catName}
                                        onChange={(e) => setCatName(e.target.value)}
                                        disabled={true}
                                        style={inputWidth}
                                    />
                                    <i
                                        className="fa-solid fa-pen clickable"
                                        onClick={startActiveInput}
                                    ></i>
                                </div>
                            )}


                                <div className="UserTasks-actions-container">
                                    <button
                                        className="UserTasks-save"
                                        onClick={endEditTasks}
                                    >
                                        Done editing
                                    </button>
                                </div>
                        </div>
                        <div className="UserTasks-icons-container">
                            {categoryTasks[category].map((task, idx) => (
                                <div key={idx} className="UserTasks-icon-container">
                                    <div
                                        className="UserTasks-icon-div"
                                        // onClick={() => handleCheck(task)}
                                    >
                                        <OpenModalButton
                                            buttonText={
                                                <img
                                                    src={task.taskIcon}
                                                    className={`UserTasks-icon clickable`}
                                                    alt="Task icon"
                                                />
                                            }
                                            onButtonClick={closeMenu}
                                            modalComponent={<EditTask taskId={task.id} category={category} taskName={task.taskName} taskType={taskType} icon={task.taskIcon} user={user} />}
                                            buttonClass="Task-edit"
                                        />
                                    </div>
                                    <p className="UserTasks-taskName">{task.taskName}</p>
                                </div>
                            ))}
                        </div>
                    </div>
        </div>
    )
}
