import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import { useHistory, useParams } from "react-router-dom";
import { loadSpecificDayTasks } from "../../store/userTaskReducer";
import CategoryTasksMapper from "./CategoryMapper";
import { formatDate } from "../../utils/dateFormating";

import "./UserTasks.css";

export default function SpecificDayTasks() {
    const dispatch = useDispatch();
    const { date } = useParams();
    const history = useHistory();
    const now = formatDate(new Date());

    if (date > now) {
        history.push("/tasks/future")
    }

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
        // console.log("*** ALL HABITS ***", allHabits);
        // console.log("*** CATEGORY HABITS ***", categoryHabits);

        const allToDoToday = dayTasks.toDoToday;
        const categoryToDoToday = categoryTasksHelper(allToDoToday);
        // console.log("*** CATEGORY TODAY'S TO-DO ***", categoryToDoToday);

        return (
            <div className="UserTasks-container">

                <h3 className="UserTasks-headers">
                    Habits
                </h3>

                <CategoryTasksMapper allTasks={allHabits} categoryTasks={categoryHabits} taskType={"Habit"} date={now} user={user} />

                <h3 className="UserTasks-headers">
                    Today's To-Do's
                </h3>

                <CategoryTasksMapper allTasks={allToDoToday} categoryTasks={categoryToDoToday} taskType={"To-Do"} date={now} user={user} />

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
