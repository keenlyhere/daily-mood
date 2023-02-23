import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import { useHistory } from "react-router-dom";
import { loadCurrentDayTasks } from "../../store/userTaskReducer";
import categoryTasksMapper from "../../utils/categoryMapper";

import "./UserTasks.css";

export default function UserTasks() {
    const dispatch = useDispatch();
    const history = useHistory();

    const user = useSelector((state) => state.session.user);
    const allTasks = useSelector((state) => state.tasks.userTasks);

    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        dispatch(loadCurrentDayTasks(user.id)).then(() => setIsLoaded(true))
    }, [])

    const categoryTasksHelper = (tasks) => {
        const categoryTasks = {};

        for (const key in tasks) {
            let task = tasks[key];
            let category = tasks[key].categoryName;

            if (!categoryTasks[category]) {
                categoryTasks[category] = [task]
            } else {
                categoryTasks[category].push(task);
            }
        }

        return categoryTasks;
    }

    if (isLoaded) {

        const allHabits = allTasks.habitsToday;
        // all habits in their respective categories
        const categoryHabits = categoryTasksHelper(allHabits)
        console.log("*** CATEGORY HABITS ***", categoryHabits);

        const allToDoToday = allTasks.toDoToday;
        const categoryToDoToday = categoryTasksHelper(allToDoToday);
        console.log("*** CATEGORY TODAY'S TO-DO ***", categoryToDoToday);

        const allUnfinishedTodo = allTasks.unfinishedToDo;
        const categoryUnfinishedToDo = categoryTasksHelper(allUnfinishedTodo);
        console.log("*** CATEGORY PAST UNFINISHED TO-DO'S ***", categoryUnfinishedToDo);


        const categoryHabitsMapper = Object.keys(categoryHabits).map((category) => (
            // console.log("category", category)
            <div key={category} className="UserTasks-habits-container">
                <div className="UserTasks-habits-header">
                    <p className="UserTasks-header-text">{category}</p>
                </div>
                <div className="UserTasks-habits-icons-container">
                    {
                        categoryHabits[category].map((habit ,idx) => (
                            <div key={idx} className="UserTasks-habits-icon-container">
                                <img src={habit.taskIcon} className="UserTasks-icon" alt="Habit icon" />
                            </div>
                        ))
                    }
                </div>
            </div>
        ))

        return (
            <div className="UserTasks-container">

                <h3 className="UserTasks-headers">
                    Habits
                </h3>

                { categoryTasksMapper(allHabits, categoryHabits)}

                <h3 className="UserTasks-headers">
                    Unfinished To-Do's
                </h3>

                { categoryTasksMapper(allUnfinishedTodo, categoryUnfinishedToDo) }

                <h3 className="UserTasks-headers">
                    Today's To-Do's
                </h3>

                { categoryTasksMapper(allToDoToday, categoryToDoToday) }

            </div>
        )
    } else {
        return (
            <div className="UserTasks-container">
                <h1>Loading T_T</h1>
            </div>
        )
    }
}
