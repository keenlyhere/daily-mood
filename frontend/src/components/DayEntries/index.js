import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { actionAddDayEntry, addDayEntry, deleteDayEntry, editDayEntry, loadCurrentDay } from "../../store/dayentries";
import "./DayEntries.css";

import cow_ecstatic from "../../assets/cow_ecstatic.png";
import cow_happy from "../../assets/cow_happy.png";
import cow_content from "../../assets/cow_content.png";
import cow_meh from "../../assets/cow_meh.png";
import cow_sad from "../../assets/cow_sad.png";
import add_photo from "../../assets/add_photo.png"
import { addPoints } from "../../store/session";
import { formatDateHeader } from "../../utils/dateFormating";
import DailyMood from "./DailyMood";
import DailyImage from "./DailyImage";
import DailyJournal from "./DailyJournal";

export default function Daily() {
    const dispatch = useDispatch();
    const history = useHistory();
    const user = useSelector((state) => state.session.user);
    const currentDay = useSelector((state) => state.day.dayEntries);
    // console.log("DAILY USER >>>>>:", currentDay);
    let currentMood;
    let currentImage;
    let currentJournal;


    const [ editJournal, setEditJournal ] = useState(false);

    const startEditJournal = (e) => {
        setEditJournal(true);
    }

    const endEditJournal = (e) => {
        setEditJournal(false)
    }

    const today = new Date();
    const dateObj = formatDateHeader(today);

    const [mood, setMood] = useState(currentMood ? currentMood : "");
    const [dailyImage, setDailyImage] = useState(null);
    const [dailyImageUrl, setDailyImageUrl] = useState(currentImage ? currentImage.entryData : "");
    const [ errors, setErrors ] = useState({});
    const [imageChanged, setImageChanged] = useState(false);
    const [ isLoaded, setIsLoaded ] = useState(false);
    const [dailyJournal, setDailyJournal] = useState(currentJournal ? currentJournal.entryData : "");

    if (currentDay) {
        currentMood = Object.values(currentDay).filter((entry) => entry.entryType === "dayMood")[0];
        currentImage = Object.values(currentDay).filter((entry) => entry.entryType === "dayImage")[0];
        currentJournal = Object.values(currentDay).filter((entry) => entry.entryType === "dayJournal")[0];
    }

    // console.log("CURRENTS >>>>x> \n currentMood", currentMood, "\n currentImage", currentImage, "\n currentJournal", currentJournal);


    useEffect(() => {
        dispatch(loadCurrentDay(user.id)).then(() => setIsLoaded(true))
    }, [dispatch])

    if (isLoaded) {

        // console.log("===> currentJournal ==>", currentJournal.entryData);
        // console.log("===> dailyJournal ==>", dailyJournal);
        const handleMoodChange = async (action, val) => {
            setMood(val);

            if (action === "create") {
                const addMood = await dispatch(addDayEntry({ entryType: "dayMood", entryData: val }))
                    .then(() => dispatch(addPoints({ "pointsEarned": 5 })))
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

        const updateFile = async (e, action) => {
            const file = e.target.files[0];

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
                return dispatch(addDayEntry({ entryType: "dayImage", entryData: file }))
                    .then(() => dispatch(addPoints({ "pointsEarned": 5 })))
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
                    .then(() => dispatch(addPoints({ "pointsEarned": -5 })))
                    .then(() => {
                        setDailyImageUrl({add_photo})
                    })
            } else if (type === "dayJournal") {
                const deletedEntry = await dispatch(deleteDayEntry(entryId))
                    .then(() => dispatch(addPoints({ "pointsEarned": -5 })))
                    .then(() => {
                        setDailyJournal("");
                    })
            } else {
                const deletedEntry = await dispatch(deleteDayEntry(entryId))
                    .then(() => dispatch(addPoints({ "pointsEarned": -5 })))
                    .then(() => {
                        setMood("");
                    })
            }
        }

        const handleJournalSave = async (action, val) => {
            setErrors({});

            if (action === "create") {
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

                const addJournal = await dispatch(addDayEntry({ entryType: "dayJournal", entryData: val }))
                    .then(() => dispatch(addPoints({ "pointsEarned": 5 })))
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

        return (
            <div className="Daily-container">
                <div className="Daily-header-date">
                    <h1 className="Daily-header-text"><span className="highlighted">{dateObj.month} {dateObj.date}</span></h1>
                </div>

                <DailyMood currentMood={currentMood} />

                <DailyImage currentImage={currentImage} />

                <DailyJournal currentJournal={currentJournal} />


            </div>
        );
    } else {
        <p>Loading...</p>
    }

}
