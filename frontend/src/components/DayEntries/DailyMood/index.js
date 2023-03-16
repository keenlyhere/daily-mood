import cow_ecstatic from "../../../assets/cow_ecstatic.png";
import cow_happy from "../../../assets/cow_happy.png";
import cow_content from "../../../assets/cow_content.png";
import cow_meh from "../../../assets/cow_meh.png";
import cow_sad from "../../../assets/cow_sad.png";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addDayEntry, addPastDayEntry, deleteDayEntry, editDayEntry } from "../../../store/dayentries";
import { addPoints } from "../../../store/session";
import ConfirmDelete from "../../ConfirmDelete";
import OpenModalButton from "../../OpenModalButton";

export default function DailyMood({ currentMood, date }) {
    const dispatch = useDispatch();
    const [mood, setMood] = useState(currentMood ? currentMood : "");
    const [ errors, setErrors ] = useState({});
    const [showMenu, setShowMenu] = useState(false);
    const closeMenu = () => setShowMenu(false);

    const handleMoodChange = async (action, val) => {
        setMood(val);

        if (action === "create") {
            if (date) {
                // console.log("date");
                const addMood = await dispatch(addPastDayEntry({ entryType: "dayMood", entryData: val }, date))
                .catch(async (res) => {
                    const data = await res.json();
                    if (data && data.errors) setErrors(data.errors);
                })
            } else {
                const addMood = await dispatch(addDayEntry({ entryType: "dayMood", entryData: val }))
                    .then(() => dispatch(addPoints({ "pointsEarned": 5 })))
                    .catch(async (res) => {
                        const data = await res.json();
                        if (data && data.errors) setErrors(data.errors);
                    })
            }

        } else {
            const currentMoodId = currentMood.id;
            // console.log("currentMoodId >>>>>> \n", currentMoodId);
            const editMood = await dispatch(editDayEntry(currentMoodId, { entryType: "dayMood", entryData: val}))
                .catch(async (res) => {
                        const data = await res.json();
                        if (data && data.errors) setErrors(data.errors);
                    })
        }

    }

    const handleDeleteEntry = async (type, entryId) => {
        const deletedEntry = await dispatch(deleteDayEntry(entryId))
            .then(() => dispatch(addPoints({ "pointsEarned": -5 })))
            .then(() => {
                setMood("");
            })
    }


    return (
        <>
            { currentMood === undefined ? (
                <div className="Daily-mood-container">
                    <div className="Daily-header">
                        <p className="Daily-text">How was your day?</p>
                    </div>
                    <div className="Daily-mood-icon-container">
                        <img
                            src={cow_sad}
                            alt="Sad mood"
                            className={`Dailies-mood-image clickable ${mood === "Sad" ? "active-mood" : ""} sad-icon`}
                            onClick={() => handleMoodChange("create", "Sad")}
                        />
                        <img
                            src={cow_meh}
                            alt="Meh mood"
                            className={`Dailies-mood-image clickable ${mood === "Meh" ? "active-mood" : ""}`}
                            onClick={() => handleMoodChange("create", "Meh")}
                        />
                        <img
                            src={cow_content}
                            alt="Content mood"
                            className={`Dailies-mood-image clickable ${mood === "Content" ? "active-mood" : ""}`}
                            onClick={() => handleMoodChange("create", "Content")}
                            id="Content"
                        />
                        <img
                            src={cow_happy}
                            alt="Happy mood"
                            className={`Dailies-mood-image clickable ${mood === "Happy" ? "active-mood" : ""}`}
                            onClick={() => handleMoodChange("create", "Happy")}
                        />
                        <img
                            src={cow_ecstatic}
                            alt="Ecstatic mood"
                            className={`Dailies-mood-image clickable ${mood === "Exstatic" ? "active-mood" : ""}`}
                            onClick={() => handleMoodChange("create", "Ecstatic")}
                        />
                    </div>
                </div>
            ) : (
                <div className="Daily-mood-container incomplete">
                    <div className="Daily-header">
                        <p className="Daily-text">How was your day?</p>
                        <div className="Daily-action-buttons-container">
                            <OpenModalButton
                                buttonText={<i className="fa-solid fa-trash"></i>}
                                onButtonClick={closeMenu}
                                modalComponent={<ConfirmDelete onDelete={() => handleDeleteEntry("dayMood", currentMood.id)}/>
                            }   icon="delete"
                            />
                            {/* <i className="fa-solid fa-trash clickable" onClick={() => handleDeleteEntry("dayMood", currentMood.id)}></i> */}
                        </div>
                    </div>
                    <div className="Daily-moods-container">
                        <div className="Daily-mood-icon-container">
                            <img
                                src={cow_sad}
                                alt="Sad mood"
                                className={`Dailies-mood-image clickable ${currentMood.entryData === "Sad" ? "active-mood" : ""} sad-icon`}
                                onClick={() => handleMoodChange("edit", "Sad")}
                            />
                            <img
                                src={cow_meh}
                                alt="Meh mood"
                                className={`Dailies-mood-image clickable ${currentMood.entryData === "Meh" ? "active-mood" : ""}`}
                                onClick={() => handleMoodChange("edit", "Meh")}
                            />
                            <img
                                src={cow_content}
                                alt="Content mood"
                                className={`Dailies-mood-image clickable ${currentMood.entryData === "Content" ? "active-mood" : ""}`}
                                onClick={() => handleMoodChange("edit", "Content")}
                                id="Content"
                            />
                            <img
                                src={cow_happy}
                                alt="Happy mood"
                                className={`Dailies-mood-image clickable ${currentMood.entryData === "Happy" ? "active-mood" : ""}`}
                                onClick={() => handleMoodChange("edit", "Happy")}
                            />
                            <img
                                src={cow_ecstatic}
                                alt="Ecstatic mood"
                                className={`Dailies-mood-image clickable ${currentMood.entryData === "Ecstatic" ? "active-mood" : ""}`}
                                onClick={() => handleMoodChange("edit", "Ecstatic")}
                            />
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}
