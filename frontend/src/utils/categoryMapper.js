// export default function categoryTasksMapper(categoryTasks) {
//     return (
//         Object.keys(categoryTasks).map((category) => (
//             // console.log("category", category)
//             <div key={category} className={`UserTasks-category-container`}>
//                 <div className="UserTasks-header">
//                     <p className="UserTasks-header-text">{category}</p>
//                 </div>
//                 <div className="UserTasks-icons-container">
//                     {
//                         categoryTasks[category].map((task ,idx) => (
//                             <div key={idx} className="UserTasks-icon-container">
//                                 <img src={task.taskIcon} className="UserTasks-icon" alt="Task icon" />
//                             </div>
//                         ))
//                     }
//                 </div>
//             </div>
//         ))
//     )
// }

export default function categoryTasksMapper(allTasks, categoryTasks) {
    return (
        Object.keys(allTasks).length ? (
            Object.keys(categoryTasks).map((category) => (
                // console.log("category", category)
                <div key={category} className={`UserTasks-category-container`}>
                    <div className="UserTasks-header">
                        <p className="UserTasks-header-text">{category}</p>
                    </div>
                    <div className="UserTasks-icons-container">
                        {
                            categoryTasks[category].map((task ,idx) => (
                                <div key={idx} className="UserTasks-icon-container">
                                    <img src={task.taskIcon} className="UserTasks-icon" alt="Task icon" />
                                </div>
                            ))
                        }
                    </div>
                </div>
            ))
        ) : (
            <div className="UserTasks-category-container">
                No habits T_T prompt user to create a habit in this case!
            </div>
        )


    )
}
