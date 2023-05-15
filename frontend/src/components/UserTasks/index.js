import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { actionCatNameOrder, editCatOrder, loadCurrentDayTasks } from "../../store/userTaskReducer";
import CategoryTasksMapper from "./CategoryMapper";
import { formatDate } from "../../utils/dateFormating";

import "./UserTasks.css";
import OpenModalButton from "../OpenModalButton";
import CreateTaskModal from "./CreateTaskModal";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import UnfinishedCategoryMapper from "./UnfinishedCategoryMapper";
import TodaysCategoryMapper from "./TodaysCategoryMapper";

export default function UserTasks() {
    const dispatch = useDispatch();
    const history = useHistory();

    const user = useSelector((state) => state.session.user);
    const allTasks = useSelector((state) => state.tasks.userTasks);
    const [showMenu, setShowMenu] = useState(false);
    const closeMenu = () => setShowMenu(false);

    const [ allHabitState, setAllHabitState ] = useState(allTasks.habitsToday ? allTasks.habitsToday : []);

    const [isLoaded, setIsLoaded] = useState(false);
    const [isEnabled, setIsEnabled] = useState(false);

    const now = formatDate(new Date());

    useEffect(() => {
        const animation = requestAnimationFrame(() => setIsEnabled(true));

        return () => {
            cancelAnimationFrame(animation);
            setIsEnabled(false);
        };
    }, []);

    useEffect(() => {
        dispatch(loadCurrentDayTasks(user.id))
            .then(() => setIsLoaded(true))
            // .catch((error) => console.log("errors", error));
    }, [dispatch]);

    // console.log("*** allTasks *** \n", allTasks)

    const categoryTasksHelper = (tasks) => {
        const categoryTasks = {};
        // if (tasks[0] && tasks[0].taskType === "Habit") {
        // console.log("TASKS ===> ===> \n", tasks);
        // console.log("allHAbits ===> ===> \n", allTasks.habitsToday);
        //     // tasks.sort((a, b) => a.habitCategoryOrder - b.habitCategoryOrder);
        // console.log("TASKS after ===> ===> \n", tasks);
        // }

        for (const key in tasks) {
            let task = tasks[key];
            let category = tasks[key].categoryName;

            if (!categoryTasks[category]) {
                categoryTasks[category] = [task];
            } else {
                categoryTasks[category].push(task);
            }
        }

        return categoryTasks;
    };

    if (!isEnabled) return null;

    if (isLoaded) {
        const allHabits = allTasks.habitsToday;
        // all habits in their respective categories
        const categoryHabits = categoryTasksHelper(allHabits);
        // setAllHabitState(allHabits);
        // console.log("*** ALL HABITS ***", allHabits);
        // console.log("*** CATEGORY HABITS ***", categoryHabits, Object.keys(categoryHabits));

        const allToDoToday = allTasks.toDoToday;
        const categoryToDoToday = categoryTasksHelper(allToDoToday);
        // console.log("*** CATEGORY TODAY'S TO-DO ***", categoryToDoToday, "\n", allToDoToday);

        const allUnfinishedTodo = allTasks.unfinishedToDo;
        const categoryUnfinishedToDo = categoryTasksHelper(allUnfinishedTodo);
        // console.log("*** CATEGORY PAST UNFINISHED TO-DO'S ***", categoryUnfinishedToDo, "\n", allUnfinishedTodo);

        const onDragEnd = async (result) => {
            const { destination, source, draggableId } = result;
            // console.log("destination | source | draggable", source.index);
            // console.table(draggableId);
            let type;
            let isUnfinished = false;
            let newTaskOrder;
            const newOrderObj = {};
            let newCatOrder;

            if (!destination) {
                return;
            }

            if (destination.droppableId === source.droppableId && destination.index === source.index) {
                return;
            }

            let column;
            // console.log("droppableId ===>", source.droppableId);

            if (source.droppableId === "habitsToday") {
                column = categoryHabits;
                type = "Habit";
                newTaskOrder = Object.values(allHabits);
                // console.log("allHabits ==>", allHabits)
                // console.log("newTaskOrder ==>", newTaskOrder)

            } else if (source.droppableId === "toDoToday") {
                column = categoryToDoToday;
                type = "To-Do";
                newTaskOrder = allToDoToday;
                // console.log("column!!!", column)
            } else if (source.droppableId === "unfinishedToDo") {
                column = categoryUnfinishedToDo;
                // console.log("column ==>", column);
                type = "To-Do";
                isUnfinished = true;
                newTaskOrder = allUnfinishedTodo;
            }

            if (source.droppableId !== destination.droppableId) {
                // console.log("source", source.draggableId);
                // console.log("dest", destination.draggableId);
                return;
            }

            // const column = allTasks[source.droppableId];
            const newOrder = Object.keys(column);
            newOrder.splice(source.index, 1);
            newOrder.splice(destination.index, 0, draggableId);

            // console.log("newOrder", newOrder);

            for (let i = 0; i < newOrder.length; i++) {
                newOrderObj[newOrder[i]] = i + 1;
            }

            // console.log("source.droppableId", source.droppableId);

            if (source.droppableId === "habitsToday") {
                allHabits.forEach((task) => {
                    const newTaskCatOrder = newOrderObj[task.categoryName];
                    task.habitCategoryOrder = newTaskCatOrder;
                })

                allHabits.sort((a, b) => a.habitCategoryOrder - b.habitCategoryOrder);

                const allHabitsCatSet = {};
                allHabits.forEach((task) => {
                    if (!allHabitsCatSet[task.categoryName]) {
                        allHabitsCatSet[task.categoryName] = 1;
                    } else {
                        allHabitsCatSet[task.categoryName] += 1;
                    }
                })

                newCatOrder = allHabits;
            } else if (source.droppableId === "toDoToday") {
                allToDoToday.forEach((task) => {
                    const newTaskCatOrder = newOrderObj[task.categoryName];
                    task.toDoCategoryOrder = newTaskCatOrder;
                })

                allToDoToday.sort((a, b) => a.toDoCategoryOrder - b.toDoCategoryOrder);

                const allToDoTodayCatSet = {};
                allToDoToday.forEach((task) => {
                    if (!allToDoTodayCatSet[task.categoryName]) {
                        allToDoTodayCatSet[task.categoryName] = 1;
                    } else {
                        allToDoTodayCatSet[task.categoryName] += 1;
                    }
                })

                newCatOrder = allToDoToday;
            } else {
                allUnfinishedTodo.forEach((task) => {
                    const newTaskCatOrder = newOrderObj[task.categoryName];
                    task.toDoCategoryOrder = newTaskCatOrder;
                })

                allUnfinishedTodo.sort((a, b) => a.toDoCategoryOrder - b.toDoCategoryOrder);

                const allUnfinishedTodoCatSet = {};
                allUnfinishedTodo.forEach((task) => {
                    if (!allUnfinishedTodoCatSet[task.categoryName]) {
                        allUnfinishedTodoCatSet[task.categoryName] = 1;
                    } else {
                        allUnfinishedTodoCatSet[task.categoryName] += 1;
                    }
                })

                newCatOrder = allUnfinishedTodo;
            }



            await dispatch(editCatOrder(newOrder, newCatOrder, type, isUnfinished))
            // setAllHabitState(data.habitsToday);
            // console.log("setAllHabitsState", allHabitState);

            // await dispatch(actionCatNameOrder(newOrder, newCatOrder, type, isUnfinished));
            // await dispatch(loadCurrentDayTasks(user.id));
        };

        const categoryHabitsMapper = Object.keys(categoryHabits).map((category) => (
            // console.log("category", category)
            <div key={category} className="UserTasks-habits-container">
                <div className="UserTasks-habits-header">
                    <p className="UserTasks-header-text">{category}</p>
                </div>
                <div className="UserTasks-habits-icons-container">
                    {categoryHabits[category].map((habit, idx) => (
                        <div key={idx} className="UserTasks-habits-icon-container">
                            <img src={habit.taskIcon} className="UserTasks-icon" alt="Habit icon" />
                        </div>
                    ))}
                </div>
            </div>
        ));

        return (
            <DragDropContext onDragEnd={onDragEnd}>
                <div className="UserTasks-container">
                    <>
                        <div className="UserTasks-header-container">
                            <h3 className="UserTasks-main-headers" data-content="Habits">
                                Habits
                            </h3>
                        </div>

                        <CategoryTasksMapper
                            allTasks={allHabits}
                            allHabitState={allHabitState}
                            categoryTasks={categoryHabits}
                            taskType={"Habit"}
                            date={now}
                            user={user}
                        />
                        <div className="UserTasks-category-container">
                            {allHabits === undefined || Object.keys(categoryHabits).length === 0 ? (
                                <p className="UserTasks-create-new">
                                    Oh moo! You don't have any habits! Why don't you create one?
                                </p>
                            ) : (
                                <p className="UserTasks-create-new">Create new habit block</p>
                            )}
                            <div className="UserTasks-icon-container">
                                <OpenModalButton
                                    buttonText={
                                        <div className="UserTasks-create-task-button clickable">
                                            <i className="fa-solid fa-plus"></i>
                                        </div>
                                    }
                                    onButtonClick={closeMenu}
                                    modalComponent={<CreateTaskModal taskType={"Habit"} user={user} />}
                                    buttonClass="Category-edit"
                                />
                                <p className="UserTasks-taskName">New block</p>
                            </div>
                        </div>

                        {allUnfinishedTodo !== undefined && Object.keys(allUnfinishedTodo).length ? (
                            <>
                                <div className="UserTasks-header-container">
                                    <h3 className="UserTasks-main-headers" data-content="Unfinished To-Do's">
                                        Unfinished To-Do's
                                    </h3>
                                </div>

                                <div className="UserTasks-cat-container">
                                    <UnfinishedCategoryMapper
                                        allTasks={allUnfinishedTodo}
                                        categoryTasks={categoryUnfinishedToDo}
                                        taskType={"To-Do"}
                                        date={now}
                                        user={user}
                                        isUnfinished={true}
                                    />
                                </div>
                            </>
                        ) : (
                            ""
                        )}

                        <div className="UserTasks-header-container">
                            <h3 className="UserTasks-main-headers" data-content="Today's To-Do's">
                                Today's To-Do's
                            </h3>
                        </div>

                        <div className="UserTasks-cat-container">
                            <TodaysCategoryMapper
                                allTasks={allToDoToday}
                                categoryTasks={categoryToDoToday}
                                taskType={"To-Do"}
                                date={now}
                                user={user}
                            />
                        </div>

                        <div className="UserTasks-category-container">
                            {allToDoToday === undefined || Object.keys(categoryToDoToday).length === 0 ? (
                                <p className="UserTasks-create-new">
                                    Oh moo! You don't have any to-do's! Why don't you create one?
                                </p>
                            ) : (
                                <p className="UserTasks-create-new">Create new habit block</p>
                            )}
                            <div className="UserTasks-icon-container">
                                <OpenModalButton
                                    buttonText={
                                        <div className="UserTasks-create-task-button clickable">
                                            <i className="fa-solid fa-plus"></i>
                                        </div>
                                    }
                                    onButtonClick={closeMenu}
                                    modalComponent={<CreateTaskModal taskType={"To-Do"} user={user} />}
                                    buttonClass="Category-edit"
                                />
                                <p className="UserTasks-taskName">New block</p>
                            </div>
                        </div>
                    </>
                </div>
            </DragDropContext>
        );
    } else {
        return (
            <div className="App-container">
                <div className="loading">
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                </div>
                We're not fowl, we're just cow-nting down the loading time!
            </div>
        );
    }
}

/*












 */
