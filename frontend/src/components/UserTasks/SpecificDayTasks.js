import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import { useHistory, useParams } from "react-router-dom";
import { loadCurrentDayTasks, loadSpecificDayTasks } from "../../store/userTaskReducer";
import categoryTasksMapper from "../../utils/categoryMapper";

import "./UserTasks.css";

export default function SpecificDayTasks() {
    const dispatch = useDispatch();
    const { date } = useParams();
    const history = useHistory();

    const user = useSelector((state) => state.session.user);
    const dayTasks = useSelector((state) => state.tasks.userTasks);

    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        dispatch(loadSpecificDayTasks(user.id, date)).then(() => setIsLoaded(true))
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

        const allHabits = dayTasks.habitsToday;
        // all habits in their respective categories
        const categoryHabits = categoryTasksHelper(allHabits)
        console.log("*** CATEGORY HABITS ***", categoryHabits);

        const allToDoToday = dayTasks.toDoToday;
        const categoryToDoToday = categoryTasksHelper(allToDoToday);
        console.log("*** CATEGORY TODAY'S TO-DO ***", categoryToDoToday);

        return (
            <div className="UserTasks-container">

                <h3 className="UserTasks-headers">
                    Habits
                </h3>

                { categoryTasksMapper(allHabits, categoryHabits)}

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
