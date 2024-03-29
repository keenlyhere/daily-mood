import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addPoints } from "../../store/session";
import { changeCatName, deleteTaskCategory, editTask, loadCurrentDayTasks } from "../../store/userTaskReducer";
import OpenModalButton from "../OpenModalButton";
import CreateTaskModal from "./CreateTaskModal";
import EditCategory from "./EditCategory";
import ConfirmDelete from "../ConfirmDelete";
import { Draggable, Droppable } from "react-beautiful-dnd";

export default function TodaysCategoryMapper({ allTasks, categoryTasks, taskType, date, user, isUnfinished }) {
    const dispatch = useDispatch();
    const [showMenu, setShowMenu] = useState(false);
    const [tasksActive, setTasksActive] = useState([]);
    const [ editTasks, setEditTasks ] = useState(false);
    const [ isDraggingDisabled, setIsDraggingDisabled ] = useState(false);
    const [ catName, setCatName ] = useState(null);
    const [ categoryToEdit, setCategoryToEdit ] = useState(null);
    const categoryList = useSelector((state) => state.tasks.userTasks.toDoTodayCategories);
    const closeMenu = () => setShowMenu(false);

    /* CREATE HABIT */
    /* CREATE TO-DO */

    /* EDIT HABIT */
    /* EDIT TO-DO */
    const handleCheck = async (task) => {
        // console.log("CHECKED", task)
        const editedTask = {
            categoryName: task.categoryName,
            taskName: task.taskName,
            taskType: task.taskType,
            taskIcon: task.taskIcon,
            isCompleted: !task.isCompleted
        }

        // console.log("CHECKED *", editedTask);
        const completedTask = await dispatch(editTask(task.id, editedTask));

        if (editedTask.isCompleted === true) {
            const addMoolah = await dispatch(addPoints({ "pointsEarned": 1 }));
        } else {
            const minusMoolah = await dispatch(addPoints({ "pointsEarned": -1 }));
        }
    }

    const handleCatNameChange = async (oldCatName, newCatName) => {
        const editCatName = await dispatch(changeCatName(oldCatName, catName))
            .then(endEditTasks)
    }

    const startEditTasks = (category) => {
        setEditTasks(true);
        setIsDraggingDisabled(true);
        // console.log("isDraggingEnables", isDraggingDisabled);
        setCategoryToEdit(category);
    }

    const endEditTasks = (e) => {
        setEditTasks(false)
        setIsDraggingDisabled(false);
        dispatch(loadCurrentDayTasks());
    }

    /* DELETE HABIT */
    /* DELETE TO-DO */
    const handleCategoryDelete = async (category, taskType, date) => {
        const deletedCategory = await dispatch(deleteTaskCategory(taskType, category, date)).then(() =>
            dispatch(loadCurrentDayTasks(user.id))
        );
    };

    // console.log("OBJECT KEYS CATEGORY TASKS ===>", categoryTasks)

    return allTasks && Object.keys(allTasks).length ? (
        <Droppable droppableId="toDoToday">
            {(provided, snapshot) => (
                <div
                    className="UserTasks-cat-container"
                    { ...provided.droppableProps }
                    ref={provided.innerRef}
                >
                    {Object.keys(categoryTasks).map((category, idx) => (
                        <Draggable
                            key={categoryList[idx]}
                            draggableId={categoryList[idx]}
                            index={idx}
                            isDragDisabled={Object.keys(categoryTasks).length < 2 || isDraggingDisabled}
                        >
                            {
                                (provided) => (
                                    <div
                                        className="UserTasks-Containers"
                                        key={idx}
                                        { ...provided.draggableProps }
                                        { ...provided.dragHandleProps}
                                        ref={provided.innerRef}
                                    >
                                        { editTasks && idx === categoryToEdit ? (
                                            <EditCategory
                                                allTasks={allTasks}
                                                categoryTasks={categoryTasks}
                                                category={category}
                                                taskType={taskType}
                                                date={date}
                                                user={user}
                                                categoryToEdit={categoryToEdit}
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
                                                                onClick={() => startEditTasks(idx)}
                                                            ></i>
                                                            <OpenModalButton
                                                                buttonText={<i className="fa-solid fa-trash"></i>}
                                                                onButtonClick={closeMenu}
                                                                modalComponent={<ConfirmDelete onDelete={() => handleCategoryDelete(category, taskType, date)}/>
                                                            }   icon="delete"
                                                            />
                                                        {/* <i
                                                            className="fa-solid fa-trash-can clickable"
                                                            onClick={() => handleCategoryDelete(category, taskType, date)}
                                                        ></i> */}
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
                                                        { isUnfinished ? (
                                                            ""
                                                        ) : (
                                                            <>
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
                                                            </>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                )
                            }
                        </Draggable>
                    ))}
                    {snapshot.isDraggingOver ? (
                        provided.placeholder
                    ) : ""}
                </div>
            )}
        </Droppable>
    ) : (
        ""
    );
}
