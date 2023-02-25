import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { changeCatName, deleteTaskCategory, editTask, loadCurrentDayTasks } from "../../store/userTaskReducer";
import OpenModalButton from "../OpenModalButton";
import CreateTaskModal from "./CreateTaskModal";
import EditCategory from "./EditCategory";

export default function CategoryTasksMapper({ allTasks, categoryTasks, taskType, date, user }) {
    const dispatch = useDispatch();
    const [showMenu, setShowMenu] = useState(false);
    const [tasksActive, setTasksActive] = useState([]);
    const [ editTasks, setEditTasks ] = useState(false);
    const [ catName, setCatName ] = useState(null);
    const closeMenu = () => setShowMenu(false);

    /* CREATE HABIT */
    /* CREATE TO-DO */

    /* EDIT HABIT */
    /* EDIT TO-DO */
    const handleCheck = async (task) => {
        console.log("CHECKED", task)
        const editedTask = {
            categoryName: task.categoryName,
            taskName: task.taskName,
            taskType: task.taskType,
            taskIcon: task.taskIcon,
            isCompleted: !task.isCompleted
        }

        console.log("CHECKED *", editedTask);
        const completedTask = await dispatch(editTask(task.id, editedTask));
    }

    const handleCatNameChange = async (oldCatName, newCatName) => {
        const editCatName = await dispatch(changeCatName(oldCatName, catName))
            .then(endEditTasks)
    }

    const startEditTasks = (e) => {
        setEditTasks(true);
    }

    const endEditTasks = (e) => {
        setEditTasks(false)
    }

    /* DELETE HABIT */
    /* DELETE TO-DO */
    const handleCategoryDelete = async (category, taskType, date) => {
        const deletedCategory = await dispatch(deleteTaskCategory(taskType, category, date)).then(() =>
            dispatch(loadCurrentDayTasks(user.id))
        );
    };

    return allTasks && Object.keys(allTasks).length ? (
        Object.keys(categoryTasks).map((category, idx) => (
            <div key={idx}>
                { editTasks ? (
                    <EditCategory
                        allTasks={allTasks}
                        categoryTasks={categoryTasks}
                        category={category}
                        taskType={taskType}
                        date={date}
                        user={user}
                        endEditTasks={endEditTasks}
                    />

                ) : (
                    <div key={category} className={`UserTasks-category-container`}>
                        <div className="UserTasks-header">
                            <div className="UserTasks-category-name">
                                    <p className="UserTasks-header-text no-hover">{category}</p>
                            </div>
                            <div className="UserTasks-actions-container">

                                    <i
                                        className="fa-solid fa-pen clickable"
                                        onClick={startEditTasks}
                                    ></i>

                                <i
                                    className="fa-solid fa-trash-can clickable"
                                    onClick={() => handleCategoryDelete(category, taskType, date)}
                                ></i>
                            </div>
                        </div>
                        <div className="UserTasks-icons-container">
                            {categoryTasks[category].map((task, idx) => (
                                <div key={idx} className="UserTasks-icon-container">
                                    <div
                                        className="UserTasks-icon-div"
                                        onClick={() => handleCheck(task)}
                                    >
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
                            <div className="UserTasks-icon-container">
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
                            </div>
                        </div>
                    </div>
                )}
            </div>
        ))
    ) : (
        ""
        // <div className="UserTasks-category-container">
        //     Oh moo! You don't have any {taskType.toLowerCase()}s yet. Why don't you create one?
        //     <div className="UserTasks-icon-container">
        //         <OpenModalButton
        //             buttonText={
        //                 <div className="UserTasks-create-task-button clickable">
        //                     <i className="fa-solid fa-plus"></i>
        //                 </div>
        //             }
        //             onButtonClick={closeMenu}
        //             modalComponent={<CreateTaskModal taskType={taskType} user={user} />}
        //             buttonClass="Category-edit"
        //         />
        //         <p className="UserTasks-taskName">New {taskType}</p>
        //     </div>
        // </div>
    );
}
