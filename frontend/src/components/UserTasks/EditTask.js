import { useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { deleteTask, editTask, loadCurrentDayTasks } from "../../store/userTaskReducer";
import ConfirmDelete from "../ConfirmDelete";
import OpenModalButton from "../OpenModalButton";

export default function EditTask({ taskId, category, taskName, taskType, icon, user }) {
    const { closeModal } = useModal();
    const dispatch = useDispatch();

    const [ newTaskName, setNewTaskName ] = useState(taskName)
    const [ iconSelected, setIconSelected ] = useState(icon);
    const [ categoryName, setCategoryName ] = useState(category);
    const [ disabled, setIsDisabled ] = useState(true);
    const [ step, setStep ] = useState(category ? 1 : 0);
    const [ errors, setErrors ] = useState({});
    const [showMenu, setShowMenu] = useState(false);
    const closeMenu = () => setShowMenu(false);

    // console.log("iconSelected ===>", iconSelected);
    // console.log("categoryName ===>", categoryName);
    // console.log("newTaskName ===>", newTaskName);

    const iconsArray = [
        "https://keenlychung.com/dailymood/01.png",
        "https://keenlychung.com/dailymood/02.png",
        "https://keenlychung.com/dailymood/03.png",
        "https://keenlychung.com/dailymood/04.png",
        "https://keenlychung.com/dailymood/05.png",
        "https://keenlychung.com/dailymood/06.png",
        "https://keenlychung.com/dailymood/07.png",
        "https://keenlychung.com/dailymood/08.png",
        "https://keenlychung.com/dailymood/09.png",
        "https://keenlychung.com/dailymood/10.png",
        "https://keenlychung.com/dailymood/11.png",
        "https://keenlychung.com/dailymood/12.png",
        "https://keenlychung.com/dailymood/13.png",
        "https://keenlychung.com/dailymood/14.png",
        "https://keenlychung.com/dailymood/15.png",
        "https://keenlychung.com/dailymood/16.png",
        "https://keenlychung.com/dailymood/17.png",
        "https://keenlychung.com/dailymood/18.png",
        "https://keenlychung.com/dailymood/19.png",
        "https://keenlychung.com/dailymood/20.png",
        "https://keenlychung.com/dailymood/21.png",
        "https://keenlychung.com/dailymood/22.png",
        "https://keenlychung.com/dailymood/23.png",
        "https://keenlychung.com/dailymood/24.png",
        "https://keenlychung.com/dailymood/25.png",
        "https://keenlychung.com/dailymood/26.png",
        "https://keenlychung.com/dailymood/27.png",
        "https://keenlychung.com/dailymood/28.png",
        "https://keenlychung.com/dailymood/29.png",
        "https://keenlychung.com/dailymood/30.png",
    ];

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors({});
        const err = {};


        if (newTaskName.length > 12) {
            err.nameLength = "Max. 12 characters";
        }

        if (newTaskName.length === 0) {
            err.nameLength2 = "Please enter a task name";
        }

        if (!iconSelected) {
            err.taskIcon = "Please select an icon";
        }

        if (!categoryName) {
            // console.log("categoryName", newTaskName.categoryName);
            err.categoryName = "Please enter a category name";
        }

        if (!taskType) {
            err.categoryName = "Please specify a task type";
        }

        // console.log("errors", err)

        if (Object.keys(err).length > 0) {
            return setErrors(err);
        }

        const newTask = {
            taskIcon: iconSelected,
            taskName: newTaskName,
            categoryName,
            taskType
        };

        // console.log("NEW TASK >>>", newTask);

        const editedTask = await dispatch(editTask(taskId, newTask))
            .then(() => dispatch(loadCurrentDayTasks(user.id)))
            .then(closeModal)
            .catch(async (res) => {
                // console.log("HIT ERRORS IN EDIT TASK\n", res);
                if (res && res.errors) setErrors(res.errors);
            })

        return;
    }

    const handleDelete = async () => {
        const deletedTask = await dispatch(deleteTask(taskId))
            .then(() => dispatch(loadCurrentDayTasks(user.id)))
            .then(closeModal)
            .catch(async (res) => {
                // console.log("HIT ERRORS IN DELETE INDIVIDUAL TASK\n", res);
                if (res && res.errors) setErrors(res.errors);

            })
    }

    // console.log("ICON SELECTED", iconSelected);
    // console.log("NEW TASK NAME ===>", newTaskName);

    return (
        <div className="CreateTaskModal-container">
            <div className="CreateTaskModal-top">
                <button className="CreateTaskModal-close" onClick={closeModal}>
                    <i className="fa-sharp fa-solid fa-xmark"></i>
                </button>
                <h2 className="EditTask-create">Select an icon</h2>
                <OpenModalButton
                    buttonText={"Delete"}
                    onButtonClick={closeMenu}
                    modalComponent={<ConfirmDelete onDelete={() => handleDelete(taskId)}/>}
                    buttonClass="CreateTaskModal-delete"
                />

            </div>
            <form className="CreateTaskModal-form" onSubmit={handleSubmit}>
                {
                    step === 1 && (
                        <div className="CreateTaskModal-step-container">
                            <div className="CreateTaskModal-icons-container">
                                {
                                    iconsArray.map((icon, idx) => (
                                        <div key={idx} className={`CreateTaskModal-icon-container clickable ${iconSelected === icon ? "selected" : "" }`} onClick={() => {
                                            setIconSelected(iconsArray[idx])
                                            setIsDisabled(false)
                                        }}>
                                            <img src={icon} alt="Task icon" />
                                        </div>
                                    ))
                                }
                            </div>
                            {/* <div className="CreateTaskModal-error-container">
                                { errors && errors.taskIcon && (
                                    <p className="CreateTaskModal-error-text">
                                        {errors.taskIcon}
                                    </p>
                                ) }
                            </div> */}
                            <button className={`CreateTaskModal-next ${iconSelected ? "" : "disabled"}`} disabled={iconSelected ? false : true} onClick={() => setStep(2) }>Next</button>
                        </div>
                    )
                }

            {
                step === 2 && (
                    <div className="CreateTaskModal-step-container">
                        <div className={`CreateTaskModal-icon-container selected`}>
                            <img src={iconSelected} alt="Task icon" />
                        </div>
                        <input className="CreateTaskModal-taskName-input" value={newTaskName} onChange={(e) => setNewTaskName(e.target.value)} placeholder="Enter a task name" />
                        <div className="CreateTaskModal-error-container">
                            { taskName.length > 12 && (
                                <p className="CreateTaskModal-error-text">
                                    Max. 12 characters
                                </p>
                            ) }
                        </div>
                        <div className="CreateTaskModal-button-container">
                            <button className="CreateTaskModal-next" onClick={() => setStep(1) }>Back</button>
                            <button className={`CreateTaskModal-next ${newTaskName.length === 0 || newTaskName.length > 12 ? "disabled" : ""}`} disabled={newTaskName.length > 12 ? true : false} onClick={handleSubmit}>Submit</button>
                        </div>
                    </div>
                )
            }
            </form>
        </div>
    )
}
