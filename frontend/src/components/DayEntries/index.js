import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { actionAddDayEntry, addDayEntry, deleteDayEntry, editDayEntry, loadCurrentDay } from "../../store/dayentries";
import "./DayEntries.css";

export default function Daily() {
    const dispatch = useDispatch();
    const history = useHistory();
    const user = useSelector((state) => state.session.user);
    const currentDay = useSelector((state) => state.day.dayEntries);
    // console.log("DAILY USER >>>>>:", currentDay);
    let currentMood;
    let currentImage;
    let currentJournal;

    if (currentDay) {
        currentMood = Object.values(currentDay).filter((entry) => entry.entryType === "dayMood")[0];
        currentImage = Object.values(currentDay).filter((entry) => entry.entryType === "dayImage")[0];
        currentJournal = Object.values(currentDay).filter((entry) => entry.entryType === "dayJournal")[0];
    }

    // console.log("CURRENTS >>>>> \n currentMood", currentMood, "\n currentImage", currentImage, "\n currentJournal", currentJournal);

    const [mood, setMood] = useState(currentMood ? currentMood : "");
    const [dailyImage, setDailyImage] = useState(null);
    const [dailyImageUrl, setDailyImageUrl] = useState(currentImage ? currentImage.entryData : "");
    const [ errors, setErrors ] = useState([]);
    const [imageChanged, setImageChanged] = useState(false);
    const [dailyJournal, setDailyJournal] = useState(null);

    useEffect(() => {
        dispatch(loadCurrentDay(user.id))
    }, [])

    // useEffect(() => {
    //     if (currentImage === undefined) {
    //         dispatch(addDayEntry({ entryType: "dayImage", entryData: dailyImage }))
    //             .catch(async (res) => {
    //                 const data = await res.json();
    //                 if (data && data.errors) setErrors(data.errors);
    //             })
    //     } else {
    //         console.log("hit edit statement")
    //         dispatch(editDayEntry(currentImage.id, { entryType: "dayImage", entryData: dailyImage }))
    //             .catch(async (res) => {
    //                     const data = await res.json();
    //                     if (data && data.errors) setErrors(data.errors);
    //                 })
    //     }
    // }, [dailyImage, currentImage]);

    const handleMoodChange = async (action, val) => {
        setMood(val);

        console.log("************action", action)
        console.log("************val", val)

        if (action === "create") {
            const addMood = await dispatch(addDayEntry({ entryType: "dayMood", entryData: val }))
                // .then(() => history.push("/daily"))
                .catch(async (res) => {
                    const data = await res.json();
                    if (data && data.errors) setErrors(data.errors);
                })
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

    // const imageChangeHandler = async () => {
    //     setErrors([]);

    //     console.log("hit imageChangeHandler");
    //     console.log("dailyImage", dailyImage);

    //     return dispatch(addDayEntry({ entryType: "dayImage", entryData: dailyImage }))
    //         .then(setImageChanged(false))
    //         .catch(async (res) => {
    //             const data = await res.json();
    //             if (data && data.errors) setErrors(data.errors);
    //         })
    // }

    // const editImageChangeHandler = async () => {
    //     setErrors([])

    //     console.log("currentImageId", currentImage.id)

    //     return dispatch(editDayEntry(currentImage.id, { entryType: "dayImage", entryData: dailyImage }))
    //         .then(setImageChanged(false))
    //         .catch(async (res) => {
    //             const data = await res.json();
    //             if (data && data.errors) setErrors(data.errors);
    //         })
    // }

    const updateFile = async (e, action) => {
        const file = e.target.files[0];

        console.log("action", action);

        if (file) {
            setImageChanged(true);
            const url = URL.createObjectURL(file);
            setDailyImageUrl(url)
            setDailyImage(file);
        }

        if (action === "edit") {
            return dispatch(editDayEntry(currentImage.id, { entryType: "dayImage", entryData: file }))
            .then(setImageChanged(false))
            .catch(async (res) => {
                const data = await res.json();
                if (data && data.errors) setErrors(data.errors);
            })
        } else {

            console.log("hit add pls dispatch")
            return dispatch(addDayEntry({ entryType: "dayImage", entryData: file }))
            .then(dispatch(loadCurrentDay(user.id)))
            .catch(async (res) => {
                const data = await res.json();
                if (data && data.errors) setErrors(data.errors);
            })
        }

    }

    const handleDeleteEntry = async (type, entryId) => {

        if (type === "dayImage") {
            const deletedEntry = await dispatch(deleteDayEntry(entryId))
                .then(() => {
                    setDailyImageUrl("https://cdn.icon-icons.com/icons2/1863/PNG/512/add-photo-alternate_119464.png")
                    // dispatch(loadCurrentDay(user.id))
                    // history.push("/daily");
                })
        } else if (type === "dayJournal") {
            const deletedEntry = await dispatch(deleteDayEntry(entryId))
                .then(() => {
                    setDailyJournal("");
                })
        } else {
            const deletedEntry = await dispatch(deleteDayEntry(entryId))
                .then(() => {
                    setMood("");
                })
        }
    }

    const handleJournalSave = async (action, val) => {

        console.log("************action", action)
        console.log("************val", val)

        if (action === "create") {
            const addJournal = await dispatch(addDayEntry({ entryType: "dayJournal", entryData: val }))
                // .then(() => history.push("/daily"))
                .catch(async (res) => {
                    const data = await res.json();
                    if (data && data.errors) setErrors(data.errors);
                })
        } else {
            const currentJournalId = currentJournal.id;
            // console.log("currentMoodId >>>>>> \n", currentMoodId);
            const editJournal = await dispatch(editDayEntry(currentJournalId, { entryType: "dayJournal", entryData: val}))
                .catch(async (res) => {
                        const data = await res.json();
                        if (data && data.errors) setErrors(data.errors);
                    })
        }

    }

    console.log("dailyJournal", dailyJournal)


    return (
        <div className="Daily-container">
            { currentMood === undefined ? (
                <div className="Daily-mood-container">
                    <div className="Daily-header">
                        <p className="Daily-text">How was your day?</p>
                    </div>
                    <div className="Daily-mood-icon-container">
                        <img
                            src="https://cdn.icon-icons.com/icons2/2000/PNG/512/crying_emoji_sad_icon_123390.png"
                            alt="Sad mood"
                            className={`Dailies-mood-image clickable ${mood === "Sad" ? "active-mood" : ""}`}
                            onClick={() => handleMoodChange("create", "Sad")}
                        />
                        <img
                            src="https://cdn.icon-icons.com/icons2/1465/PNG/512/023neutralface_100669.png"
                            alt="Meh mood"
                            className={`Dailies-mood-image clickable ${mood === "Meh" ? "active-mood" : ""}`}
                            onClick={() => handleMoodChange("create", "Meh")}
                        />
                        <img
                            src="https://cdn.icon-icons.com/icons2/1808/PNG/512/emoji-smile_115244.png"
                            alt="Content mood"
                            className={`Dailies-mood-image clickable ${mood === "Content" ? "active-mood" : ""}`}
                            onClick={() => handleMoodChange("create", "Content")}
                        />
                        <img
                            src="https://cdn.icon-icons.com/icons2/1277/PNG/512/1497560833-smiley-18_85059.png"
                            alt="Happy mood"
                            className={`Dailies-mood-image clickable ${mood === "Happy" ? "active-mood" : ""}`}
                            onClick={() => handleMoodChange("create", "Happy")}
                        />
                        <img
                            src="https://cdn.icon-icons.com/icons2/860/PNG/512/happy_icon-icons.com_67810.png"
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
                            <i className="fa-solid fa-trash clickable" onClick={() => handleDeleteEntry("dayMood", currentMood.id)}></i>
                        </div>
                    </div>
                    <div className="Daily-moods-container">
                        <div className="Daily-mood-icon-container">
                            <img
                                src="https://cdn.icon-icons.com/icons2/2000/PNG/512/crying_emoji_sad_icon_123390.png"
                                alt="Sad mood"
                                className={`Dailies-mood-image clickable ${currentMood.entryData === "Sad" ? "active-mood" : ""}`}
                                onClick={() => handleMoodChange("edit", "Sad")}
                            />
                            <img
                                src="https://cdn.icon-icons.com/icons2/1465/PNG/512/023neutralface_100669.png"
                                alt="Meh mood"
                                className={`Dailies-mood-image clickable ${currentMood.entryData === "Meh" ? "active-mood" : ""}`}
                                onClick={() => handleMoodChange("edit", "Meh")}
                            />
                            <img
                                src="https://cdn.icon-icons.com/icons2/1808/PNG/512/emoji-smile_115244.png"
                                alt="Content mood"
                                className={`Dailies-mood-image clickable ${currentMood.entryData === "Content" ? "active-mood" : ""}`}
                                onClick={() => handleMoodChange("edit", "Content")}
                            />
                            <img
                                src="https://cdn.icon-icons.com/icons2/1277/PNG/512/1497560833-smiley-18_85059.png"
                                alt="Happy mood"
                                className={`Dailies-mood-image clickable ${currentMood.entryData === "Happy" ? "active-mood" : ""}`}
                                onClick={() => handleMoodChange("edit", "Happy")}
                            />
                            <img
                                src="https://cdn.icon-icons.com/icons2/860/PNG/512/happy_icon-icons.com_67810.png"
                                alt="Ecstatic mood"
                                className={`Dailies-mood-image clickable ${currentMood.entryData === "Ecstatic" ? "active-mood" : ""}`}
                                onClick={() => handleMoodChange("edit", "Ecstatic")}
                            />
                        </div>
                    </div>
                </div>
            )}

            { currentImage === undefined ? (
                <div className="Daily-image-container">
                    <p className="Daily-text">Today's photo</p>
                    <div className="Daily-image-input-container">
                        <label htmlFor="Daily-image-upload" className="Daily-image-upload clickable">
                            <img
                                src={ dailyImageUrl ? dailyImageUrl : "https://cdn.icon-icons.com/icons2/1863/PNG/512/add-photo-alternate_119464.png"}
                                alt="Add photo"
                                className="Daily-image-upload-icon"
                            />
                        </label>
                        <input id="Daily-image-upload" type="file" onChange={(e) => updateFile(e, "add")} />

                            <p className="Daily-text">
                                Upload a photo that represents your day
                            </p>
                    </div>
                </div>
            ) : (
                <div className="Daily-image-container">
                    <div className="Daily-header">
                        <p className="Daily-text">Today's photo</p>
                        <div className="Daily-action-buttons-container">
                            <i className="fa-solid fa-trash clickable" onClick={() => handleDeleteEntry("dayImage", currentImage.id)}></i>
                        </div>
                    </div>
                    <div className="Daily-image-input-container">
                        <label htmlFor="Daily-image-upload" className="Daily-image-upload clickable">
                            <img
                                src={ dailyImageUrl ? dailyImageUrl : currentImage.entryData }
                                alt="Add photo"
                                className="Daily-image-upload-icon"
                            />
                            <div className="Daily-image-text-container">
                                <p className="Daily-image-text">
                                    Click to update photo
                                </p>
                            </div>
                        </label>
                        <input id="Daily-image-upload" type="file" onChange={(e) => updateFile(e, "edit")} />
                    </div>
                </div>

            )}

            { currentJournal === undefined ? (
                <div className="Daily-journal-container">
                    <div className="Daily-header">
                        <p className="Daily-text">Today's journal</p>
                        <button
                            className="Daily-journal-save clickable"
                            onClick={() => handleJournalSave("create", dailyJournal)}
                        >
                            Save
                        </button>

                    </div>
                    <form className="Daily-journal-form">
                        <textarea
                            className="Daily-journal-input"
                            value={dailyJournal}
                            onChange={(e) => setDailyJournal(e.target.value)}
                            placeholder="Describe your day!"
                        />
                    </form>
                </div>
            ) : (
                <div className="Daily-journal-container">
                        <div className="Daily-header">
                        <p className="Daily-text">Today's journal</p>
                        <div className="Daily-action-buttons-container">
                            <button
                                className="Daily-journal-save clickable"
                                onClick={() => handleJournalSave("edit", dailyJournal)}
                            >
                                Save
                            </button>
                            <i className="fa-solid fa-trash clickable" onClick={() => handleDeleteEntry("dayJournal", currentJournal.id)}></i>
                        </div>
                    </div>
                    <form className="Daily-journal-form">
                        <textarea
                            className="Daily-journal-input"
                            value={currentJournal.entryData}
                            onChange={(e) => setDailyJournal(e.target.value)}
                            placeholder="Describe your day!"
                        />
                    </form>
                </div>
            )}
        </div>
    );
}
