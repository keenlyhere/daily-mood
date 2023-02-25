import { useState } from "react"
import { useDispatch } from "react-redux";
import { changeCatName, loadCurrentDayTasks } from "../../store/userTaskReducer";

export default function EditCategory( { allTasks, categoryTasks, category, taskType, date, user, endEditTasks } ) {
    const dispatch = useDispatch();
    const [ catName, setCatName ] = useState(category);
    const [ activeInput, setActiveInput ] = useState(false);
    const [ errors, setErrors ] = useState([]);


    const inputWidth = {
        width: `${category.length}ch`
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

    // const onBlur = (e) => {
    //     console.log("hitBlur")
    //     if (e.target.value.trim() === "") {
    //         setCatName(category);
    //     } else {
    //         setCatName(e.target.value);
    //     }

    //     dispatch(changeCatName(category, catName, taskType))
    //         .catch(async (res) => {
    //             const data = await res.json();
    //             if (data && data.errors) setErrors(data.errors);
    //         })

    //     dispatch(loadCurrentDayTasks(user.id))
    //     endActiveInput();
    // }

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
                                        // onBlur={onBlur}
                                    />
                                    <button
                                        className="UserTasks-category-save"
                                        onClick={handleCatNameChange}
                                    >Save</button>
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
                                <i
                                    className="fa-solid fa-trash-can clickable"
                                    // onClick={() => handleCategoryDelete(category, taskType, date)}
                                ></i>
                            </div>
                        </div>
                        <div className="UserTasks-icons-container">
                            {categoryTasks[category].map((task, idx) => (
                                <div key={idx} className="UserTasks-icon-container">
                                    <div
                                        className="UserTasks-icon-div"
                                        // onClick={() => handleCheck(task)}
                                    >
                                        {/* <input
                                        className="UserTasks-header-text no-hover"
                                        value={catName ? catName : category}
                                        onChange={(e) => setCatName(e.target.value)}
                                    /> */}


                                        {/* <button
                                            className="UserTasks-category-name-save"
                                            onClick={(e) => handleCatNameChange(category, catName)}
                                        >Save</button> */}
                                        <img
                                            src={task.taskIcon}
                                            className={`UserTasks-icon clickable ${
                                                task.isCompleted ? "" : "UserTasks-incomplete"
                                            }`}
                                            alt="Task icon"
                                        />
                                    </div>
                                    <p className="UserTasks-taskName">{task.taskName}</p>
                                </div>
                            ))}
                            {/* <div className="UserTasks-icon-container">
                                <OpenModalButton
                                    buttonText={
                                        <div className="UserTasks-create-task-button clickable">
                                            <i className="fa-solid fa-plus"></i>
                                        </div>
                                    }
                                    onButtonClick={closeMenu}
                                    modalComponent={<CreateTaskModal category={category} taskType={taskType} user={user} />}
                                    buttonClass="Category-edit"
                                />
                                <p className="UserTasks-taskName">New {category}</p>
                            </div> */}
                        </div>
                    </div>
        </div>
    )
}
