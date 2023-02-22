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

    console.log("CURRENTS >>>>> \n currentMood", currentMood, "\n currentImage", currentImage, "\n currentJournal", currentJournal);

    const [mood, setMood] = useState(currentMood ? currentMood : "");
    const [dailyImage, setDailyImage] = useState(null);
    const [dailyImageUrl, setDailyImageUrl] = useState(currentImage ? currentImage.entryData : "");
    const [ errors, setErrors ] = useState([]);
    const [imageChanged, setImageChanged] = useState(false);

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

    const moodClickHandler = async (action, val) => {
        setMood(val);

        // console.log("************action", action)

        if (action === "create") {
            const addMood = await dispatch(addDayEntry({ entryType: "dayMood", entryData: val }))
                .then(() => history.push("/daily"))
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

    const handleDeleteEntry = async (entryId) => {
        const deletedEntry = await dispatch(deleteDayEntry(entryId))
            .then(() => {
                setDailyImageUrl("https://cdn.icon-icons.com/icons2/1863/PNG/512/add-photo-alternate_119464.png")
                // dispatch(loadCurrentDay(user.id))
                // history.push("/daily");
            })
    }

    console.log("mood changed:", imageChanged);

    return (
        <div className="Daily-container">
            { currentMood === undefined ? (
                <div className="Daily-mood-container">
                    <p className="Daily-text">How was your day?</p>
                    <img
                        src="https://cdn.icon-icons.com/icons2/2000/PNG/512/crying_emoji_sad_icon_123390.png"
                        alt="Sad mood"
                        className={`Dailies-mood-image clickable ${mood === "Sad" ? "active-mood" : ""}`}
                        onClick={() => moodClickHandler("create", "Sad")}
                    />
                    <img
                        src="https://cdn.icon-icons.com/icons2/1465/PNG/512/023neutralface_100669.png"
                        alt="Meh mood"
                        className={`Dailies-mood-image clickable ${mood === "Meh" ? "active-mood" : ""}`}
                        onClick={() => moodClickHandler("create", "Meh")}
                    />
                    <img
                        src="https://cdn.icon-icons.com/icons2/1808/PNG/512/emoji-smile_115244.png"
                        alt="Content mood"
                        className={`Dailies-mood-image clickable ${mood === "Content" ? "active-mood" : ""}`}
                        onClick={() => moodClickHandler("create", "Content")}
                    />
                    <img
                        src="https://cdn.icon-icons.com/icons2/1277/PNG/512/1497560833-smiley-18_85059.png"
                        alt="Happy mood"
                        className={`Dailies-mood-image clickable ${mood === "Happy" ? "active-mood" : ""}`}
                        onClick={() => moodClickHandler("create", "Happy")}
                    />
                    <img
                        src="https://cdn.icon-icons.com/icons2/860/PNG/512/happy_icon-icons.com_67810.png"
                        alt="Ecstatic mood"
                        className={`Dailies-mood-image clickable ${mood === "Exstatic" ? "active-mood" : ""}`}
                        onClick={() => moodClickHandler("create", "Ecstatic")}
                    />
                </div>
            ) : (
                <div className="Daily-mood-container incomplete">
                    <p className="Daily-text">How was your day?</p>
                    <div className="Daily-moods-container">
                        <img
                            src="https://cdn.icon-icons.com/icons2/2000/PNG/512/crying_emoji_sad_icon_123390.png"
                            alt="Sad mood"
                            className={`Dailies-mood-image clickable ${currentMood.entryData === "Sad" ? "active-mood" : ""}`}
                            onClick={() => moodClickHandler("edit", "Sad")}
                        />
                        <img
                            src="https://cdn.icon-icons.com/icons2/1465/PNG/512/023neutralface_100669.png"
                            alt="Meh mood"
                            className={`Dailies-mood-image clickable ${currentMood.entryData === "Meh" ? "active-mood" : ""}`}
                            onClick={() => moodClickHandler("edit", "Meh")}
                        />
                        <img
                            src="https://cdn.icon-icons.com/icons2/1808/PNG/512/emoji-smile_115244.png"
                            alt="Content mood"
                            className={`Dailies-mood-image clickable ${currentMood.entryData === "Content" ? "active-mood" : ""}`}
                            onClick={() => moodClickHandler("edit", "Content")}
                        />
                        <img
                            src="https://cdn.icon-icons.com/icons2/1277/PNG/512/1497560833-smiley-18_85059.png"
                            alt="Happy mood"
                            className={`Dailies-mood-image clickable ${currentMood.entryData === "Happy" ? "active-mood" : ""}`}
                            onClick={() => moodClickHandler("edit", "Happy")}
                        />
                        <img
                            src="https://cdn.icon-icons.com/icons2/860/PNG/512/happy_icon-icons.com_67810.png"
                            alt="Ecstatic mood"
                            className={`Dailies-mood-image clickable ${currentMood.entryData === "Ecstatic" ? "active-mood" : ""}`}
                            onClick={() => moodClickHandler("edit", "Ecstatic")}
                        />
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
                        <i className="fa-solid fa-trash clickable" onClick={() => handleDeleteEntry(currentImage.id)}></i>
                    </div>
                    <div className="Daily-image-input-container">
                        <label htmlFor="Daily-image-upload" className="Daily-image-upload clickable">
                            <img
                                src={ dailyImageUrl ? dailyImageUrl : currentImage.entryData }
                                alt="Add photo"
                                className="Daily-image-upload-icon"
                            />
                            Does a better image fit your day? You can still update it!
                        </label>
                        <input id="Daily-image-upload" type="file" onChange={(e) => updateFile(e, "edit")} />
                    </div>
                </div>

            )}
            <div className="Daily-journal-container">Journal entry here</div>
        </div>
    );
}
