import { useDispatch } from "react-redux"
import { deleteTaskCategory } from "../store/userTaskReducer";

export default function CategoryTasksMapper({allTasks, categoryTasks, taskType, date}) {
    // console.log(Object.values(categoryTasks), categoryTasks)
    console.log( "DATE", date)

    return (
        allTasks && Object.keys(allTasks).length ? (
            Object.keys(categoryTasks).map((category) => (
                <div key={category} className={`UserTasks-category-container`}>
                    <div className="UserTasks-header">
                        <p className="UserTasks-header-text">{category}</p>
                        <div className="UserTasks-actions-container">
                            <i className="fa-solid fa-pen clickable"></i>
                            {/* <i className="fa-solid fa-trash-can clickable" onClick={() => handleCategoryDelete(category, taskType, date)}></i> */}
                        </div>
                    </div>
                    <div className="UserTasks-icons-container">
                        {
                            categoryTasks[category].map((task ,idx) => (
                                <div key={idx} className="UserTasks-icon-container">
                                    <div key={idx} className="UserTasks-icon-div">
                                        <img src={task.taskIcon} className={`UserTasks-icon clickable ${task.isComplete ? "" : "UserTasks-incomplete"}`} alt="Task icon" />
                                    </div>
                                    <p className="UserTasks-taskName">{task.taskName}</p>
                                </div>
                            ))
                        }
                        <div className="UserTasks-icon-container">
                            <div className="UserTasks-create-task-button clickable">
                                <i className="fa-solid fa-plus"></i>
                            </div>
                                <p className="UserTasks-taskName">New {category}</p>
                        </div>
                    </div>
                </div>
            ))
        ) : (
            <div className="UserTasks-category-container">
                Oh moo! You don't have any task yet. Why don't you create one?
                <div className="UserTasks-icon-container">
                    <div className="UserTasks-create-task-button clickable">
                        <i className="fa-solid fa-plus"></i>
                    </div>
                        <p className="UserTasks-taskName">New</p>
                </div>
            </div>
        )

    )
}
