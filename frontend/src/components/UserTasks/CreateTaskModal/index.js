import { useState } from "react";
import { useModal } from "../../../context/Modal";
import "./CreateTaskModal.css"

import { useDispatch } from "react-redux";
import { addTask, loadCurrentDayTasks } from "../../../store/userTaskReducer";
import { useHistory } from "react-router-dom";

export default function CreateTaskModal({ category, taskType, user }) {
    const { closeModal } = useModal();
    const dispatch = useDispatch();

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
        "https://keenlychung.com/dailymood/10.png",
    ]

    const categoryProp = category ? category : "";
    const initialFormData = {
        taskIcon: "",
        taskName: "",
        categoryName: categoryProp,
        taskType
    }

    const [ formData, setFormData ] = useState(initialFormData)
    const [ iconSelected, setIconSelected ] = useState(null);
    const [ taskName, setTaskName ] = useState("");
    const [ categoryName, setCategoryName ] = useState(category ? category : "");
    // console.log("categoryName", categoryName)
    const [ disabled, setIsDisabled ] = useState(true);
    const [ errors, setErrors ] = useState({});

    const [ step, setStep ] = useState(category ? 1 : 0);

    const handleFormChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const err = {};

        if (taskName.length > 12) {
            err.nameLength = "Max. 12 characters";
        }

        if (Object.keys(err).length > 0) {
            return setErrors(err);
        }

        const newTask = {
            taskIcon: iconSelected,
            taskName,
            categoryName,
            taskType
        };

        // console.log("NEW TASK >>>", newTask);

        const createTask = await dispatch(addTask(newTask))
            .then(() => dispatch(loadCurrentDayTasks(user.id)))
            .then(closeModal)
            .catch(async (res) => {
                // console.log("RESSSSS>>>>>>", res)
                const error = {};
                if (res) error.taskName = "Habits of the same category can't share the same task name."
                setErrors(error);
            })

    }
                // console.log("ERRORS", errors);

    const onKeyDownCatName = (e) => {
        // console.log("e.key", e.key)
        if (e.key === "Enter") {
            if (e.target.value.length > 0 && e.target.value <= 12) {
                setStep(1);
            }
        }
    }

    const onKeyDownTaskName = (e) => {
        if (e.key === "Enter") {
            // console.log("HIT ON KEY DOWN TASK NAME ENTER")
            if (taskName.length > 0 && taskName.length <= 12) {
                handleSubmit(e);
            }
        }
    }

    return (
        <div className="CreateTaskModal-container">
            <div className="CreateTaskModal-top">
                <button className="CreateTaskModal-close" onClick={closeModal}>
                    <i className="fa-sharp fa-solid fa-xmark"></i>
                </button>
                <h2 className="CreateTaskModal-create">Select an icon</h2>
            </div>
            <form className="CreateTaskModal-form" onSubmit={handleSubmit} >
                { step === 0 && (
                    <div className="CreateTaskModal-step-container">
                        <label className="CreateTaskModal-categoryName">
                            Category name
                        </label>
                        <input
                            className="CreateTaskModal-taskName-input"
                            value={categoryName}
                            onChange={(e) => setCategoryName(e.target.value)}
                            placeholder="Ex: School work"
                            onKeyDown={onKeyDownCatName}
                        />
                        <div className="CreateTaskModal-error-container">
                            { categoryName.length > 12 && (
                                <p className="CreateTaskModal-error-text">
                                    Max. 12 characters
                                </p>
                            ) }
                        </div>
                        <div className="CreateTaskModal-button-container">
                            <button className={`CreateTaskModal-next ${categoryName.length === 0 || categoryName.length > 12 ? "disabled" : ""}`} disabled={categoryName.length > 12 ? true : false} onClick={() => setStep(1)}>Next</button>
                        </div>
                    </div>
                )}
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
                            <input
                                className="CreateTaskModal-taskName-input"
                                value={taskName}
                                onChange={(e) => setTaskName(e.target.value)}
                                placeholder="Enter a task name"
                                onKeyDown={onKeyDownTaskName}
                            />
                            <div className="CreateTaskModal-error-container">
                                { taskName.length > 12 && (
                                    <p className="CreateTaskModal-error-text">
                                        Max. 12 characters
                                    </p>
                                ) }
                                { errors && errors.taskName ? (
                                <p className="CreateTaskModal-error-text">
                                    {errors.taskName}
                                </p>
                            ) : ("")}
                            </div>
                            <div className="CreateTaskModal-button-container">
                                <button className="CreateTaskModal-next" onClick={() => setStep(1) }>Back</button>
                                <button className={`CreateTaskModal-next ${taskName.length === 0 || taskName.length > 12 ? "disabled" : ""}`} disabled={taskName.length > 12 ? true : false} onClick={handleSubmit}>Submit</button>
                            </div>
                        </div>
                    )
                }
            </form>
        </div>
    );
}
