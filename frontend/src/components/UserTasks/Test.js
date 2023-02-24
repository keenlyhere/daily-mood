import { useDispatch, useSelector } from "react-redux"
import { addTask, loadCurrentDayTasks } from "../../store/userTaskReducer";
import one from "../../assets/icons/01.png"
import { useEffect, useState } from "react";

export default function Test() {
    const dispatch = useDispatch();
    // const user = useSelector(state => state.)
    const customEqual = (oldValue, newValue) => {
        console.log("oldVal >>>", oldValue);
        console.log("newVal >>>", newValue);
        console.log("result >>>", oldValue === newValue)
        return oldValue === newValue;
    }
    const allTasks = useSelector(state => state.tasks.userTasks, customEqual);
    console.log("allTasks", allTasks)

    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        dispatch(loadCurrentDayTasks(1)).then(()=> setIsLoaded(true))
    }, [dispatch])

    const createTask = (e) =>{
        e.preventDefault()
        dispatch(addTask({
            categoryName: new Date(),
            taskName: new Date(),
            taskType: "Habit",
            taskIcon: one
        }))

        }
    return Object.keys(allTasks).length && (
        <div>
            <h1>Test</h1>
            <button onClick={createTask}>Create task</button>
            <div>
                {
                    Object.values(allTasks.habitsToday).length
                }
            </div>
        </div>
    )
}
