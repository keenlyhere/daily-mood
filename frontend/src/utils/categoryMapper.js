// import { useDispatch } from "react-redux"
// import { deleteTaskCategory, loadCurrentDayTasks } from "../store/userTaskReducer";

// export default function CategoryTasksMapper({allTasks, categoryTasks, taskType, date, user}) {
//     const dispatch = useDispatch();


//     /* CREATE HABIT */
//     /* CREATE TO-DO */



//     /* EDIT HABIT */
//     /* EDIT TO-DO */

//     /* DELETE HABIT */
//     /* DELETE TO-DO */
//     const handleCategoryDelete = async (category, taskType, date) => {
//         const deletedCategory = await dispatch(deleteTaskCategory(taskType, category, date))
//             .then(() => dispatch(loadCurrentDayTasks(user.id)))
//     }

//     return (
//         allTasks && Object.keys(allTasks).length ? (
//             Object.keys(categoryTasks).map((category) => (
//                 <div key={category} className={`UserTasks-category-container`}>
//                     <div className="UserTasks-header">
//                         <p className="UserTasks-header-text">{category}</p>
//                         <div className="UserTasks-actions-container">
//                             <OpenModalButton
//                                 buttonText="Log In"
//                                 onButtonClick={closeMenu}
//                                 modalComponent={<LoginFormModal />}
//                             />
//                             <i className="fa-solid fa-pen clickable" onClick={() => handleCategoryEdit()}></i>
//                             <i className="fa-solid fa-trash-can clickable" onClick={() => handleCategoryDelete(category, taskType, date)}></i>
//                         </div>
//                     </div>
//                     <div className="UserTasks-icons-container">
//                         {
//                             categoryTasks[category].map((task ,idx) => (
//                                 <div key={idx} className="UserTasks-icon-container">
//                                     <div key={idx} className="UserTasks-icon-div">
//                                         <img src={task.taskIcon} className={`UserTasks-icon clickable ${task.isComplete ? "" : "UserTasks-incomplete"}`} alt="Task icon" />
//                                     </div>
//                                     <p className="UserTasks-taskName">{task.taskName}</p>
//                                 </div>
//                             ))
//                         }
//                         <div className="UserTasks-icon-container">
//                             <div className="UserTasks-create-task-button clickable">
//                                 <i className="fa-solid fa-plus"></i>
//                             </div>
//                                 <p className="UserTasks-taskName">New {category}</p>
//                         </div>
//                     </div>
//                 </div>
//             ))
//         ) : (
//             <div className="UserTasks-category-container">
//                 Oh moo! You don't have any task yet. Why don't you create one?
//                 <div className="UserTasks-icon-container">
//                     <div className="UserTasks-create-task-button clickable">
//                         <i className="fa-solid fa-plus"></i>
//                     </div>
//                         <p className="UserTasks-taskName">New</p>
//                 </div>
//             </div>
//         )

//     )
// }
