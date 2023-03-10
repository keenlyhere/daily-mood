import { useState } from "react";
import { useDispatch } from "react-redux";
import { addDayEntry, addPastDayEntry, deleteDayEntry, editDayEntry, loadCurrentDay } from "../../../store/dayentries";
import { addPoints } from "../../../store/session";
import ConfirmDelete from "../../ConfirmDelete";
import OpenModalButton from "../../OpenModalButton";

export default function DailyJournal({ currentJournal, date }) {
    const dispatch = useDispatch();
    const [dailyJournal, setDailyJournal] = useState(currentJournal ? currentJournal.entryData : "");
    const [ editJournal, setEditJournal ] = useState(false);
    // console.log("editJournalEntry", currentJournal);
    const [ errors, setErrors ] = useState({});
    const [ showMenu, setShowMenu ] = useState(false);
    const closeMenu = () => setShowMenu(false);

    const startEditJournal = (e) => {
        setEditJournal(true);
    }

    const endEditJournal = (e) => {
        setEditJournal(false)
    }

    const handleJournalSave = async (action, val) => {
        setErrors({});

        const error = {}
        if (val.length < 5) {
            error.journalLength = "Please enter a minimum of 5 characters.";
        }

        if (val.length > 200) {
            error.journalLength = "Please enter a maximum of 200 characters.";
        }

        if (Object.keys(error).length > 0) {
            return setErrors(error);
        }

        if (date) {
            const addJournal = await dispatch(addPastDayEntry({ entryType: "dayJournal", entryData: val }, date))
            // .then(() => dispatch(loadCurrentDay()))
            .catch(async (res) => {
                const data = await res.json();
                if (data && data.errors) setErrors(data.errors);
            })
        } else {
            const addJournal = await dispatch(addDayEntry({ entryType: "dayJournal", entryData: val }))
                .then(() => dispatch(addPoints({ "pointsEarned": 5 })))
                .then(() => dispatch(loadCurrentDay()))
                .catch(async (res) => {
                    const data = await res.json();
                    if (data && data.errors) setErrors(data.errors);
                })
        }



    }

    const handleJournalEdit = async (e) => {
        e.preventDefault();

        setErrors({});

        const error = {}
        if (dailyJournal.length < 5) {
            error.journalLength = "Please enter a minimum of 5 characters.";
        }

        if (dailyJournal.length > 200) {
            error.journalLength = "Please enter a maximum of 200 characters.";
        }

        if (Object.keys(error).length > 0) {
            return setErrors(error);
        }

        const currentJournalId = currentJournal.id;
        // console.log("e.target.value >>>>>> \n", e.target.value);
        const editJournal = await dispatch(editDayEntry(currentJournalId, { entryType: "dayJournal", entryData: dailyJournal}))
            .then(endEditJournal)
            .catch(async (res) => {
                    const data = await res.json();
                    if (data && data.errors) setErrors(data.errors);
                })
    }

    const handleDeleteEntry = async (type, entryId) => {
        const deletedEntry = await dispatch(deleteDayEntry(entryId))
            .then(() => dispatch(addPoints({ "pointsEarned": -5 })))
            .then(() => {
                setDailyJournal("");
            })
    }

    if (editJournal) {
        return (
            <div className="Daily-journal-container">
                    <div className="Daily-header">
                        <p className="Daily-text">Today's journal</p>
                        {dailyJournal.length > 200 && (
                            <p className="CreateTaskModal-error-text">
                                Please enter a maximum of 200 characters.
                            </p>
                        )}

                    </div>
                    <form className="Daily-journal-form">
                            <textarea
                                className="Daily-journal-input"
                                value={dailyJournal}
                                onChange={(e) => setDailyJournal(e.target.value)}
                                placeholder="Describe your day!"
                            />
                    </form>
                    <div className="Daily-footer">
                        <div className="Daily-journal-char-count-container">
                            Character count: {dailyJournal.length}
                        </div>

                        <div className="Daily-action-buttons-container">
                            <button
                                className={ `Daily-journal-save clickable ${dailyJournal.length < 5 || dailyJournal.length > 200 ? "isDisabled" : ""}`}
                                onClick={handleJournalEdit}
                                disabled={dailyJournal.length < 5 || dailyJournal.length > 200 ? true : false}
                            >
                                Save
                            </button>
                            <i className="fa-solid fa-trash clickable" onClick={() => handleDeleteEntry("dayJournal", currentJournal.id)}></i>
                        </div>

                    </div>
                </div>
        )
    }

    return (
        <>
            { currentJournal === undefined ? (
                <div className="Daily-journal-container">
                    <div className="Daily-header">
                        <p className="Daily-text">Today's journal</p>
                            {dailyJournal.length > 200 && (
                                <p className="CreateTaskModal-error-text">
                                    Please enter a maximum of 200 characters.
                                </p>
                            )}
                    </div>
                    <form className="Daily-journal-form">
                        <textarea
                            className="Daily-journal-input"
                            value={dailyJournal}
                            onChange={(e) => setDailyJournal(e.target.value)}
                            placeholder="Describe your day!"
                        />
                    </form>
                    <div className="Daily-footer">
                        <div className="Daily-journal-char-count-container">
                            Character count: {dailyJournal.length}
                        </div>
                        <div className="Daily-action-buttons-container">

                            <button
                                className={ `Daily-journal-save ${dailyJournal.length < 5 || dailyJournal.length > 200 ? "isDisabled" : ""}`}
                                onClick={() => handleJournalSave("create", dailyJournal)}
                                disabled={dailyJournal.length < 5 || dailyJournal.length > 200 ? true : false}
                            >
                                Save
                            </button>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="Daily-journal-container">
                        <div className="Daily-header">
                        <p className="Daily-text">Today's journal</p>
                        { errors && errors.journalLength ? (
                            <p className="CreateTaskModal-error-text">
                                    {errors.journalLength}
                                </p>
                        ) : ("")}

                    </div>
                    <form className="Daily-journal-form">
                        { editJournal ? (

                            <textarea
                                className="Daily-journal-input"
                                value={dailyJournal}
                                onChange={(e) => setDailyJournal(e.target.value)}
                                placeholder="Describe your day!"
                            />
                        ) : (
                            <textarea
                                className="Daily-journal-input-disabled"
                                value={dailyJournal}
                                onChange={(e) => setDailyJournal(e.target.value)}
                                placeholder="Describe your day!"
                                disabled={true}
                            />
                        )}
                    </form>
                    <div className="Daily-footer">
                        <div className="Daily-journal-char-count-container">
                            Character count: {dailyJournal.length}
                        </div>
                        <div className="Daily-action-buttons-container">
                            <button
                                className="Daily-journal-save clickable"
                                onClick={startEditJournal}
                            >
                                Edit
                            </button>
                            <OpenModalButton
                                buttonText={<i className="fa-solid fa-trash"></i>}
                                onButtonClick={closeMenu}
                                modalComponent={<ConfirmDelete currentJournal={currentJournal} onDelete={() => handleDeleteEntry("dayJournal", currentJournal.id)}/>
                            }   icon="delete"
                            />
                            {/* <i className="fa-solid fa-trash clickable" onClick={() => handleDeleteEntry("dayJournal", currentJournal.id)}></i> */}
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}
