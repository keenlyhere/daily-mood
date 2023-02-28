import { useState } from "react";
import { useDispatch } from "react-redux";
import { addDayEntry, deleteDayEntry, editDayEntry, loadCurrentDay } from "../../../store/dayentries";
import { addPoints } from "../../../store/session";
import add_photo from "../../../assets/add_photo.png"

export default function DailyImage({ currentImage }) {
    const dispatch = useDispatch();
    const [dailyImage, setDailyImage] = useState(null);
    const [dailyImageUrl, setDailyImageUrl] = useState(currentImage ? currentImage.entryData : "");
    const [imageChanged, setImageChanged] = useState(false);
    const [ errors, setErrors ] = useState({});

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
                .then(dispatch(loadCurrentDay()))
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
                setDailyImageUrl(add_photo)
            })
    }

    return (
        <>
            { currentImage === undefined ? (
                <div className="Daily-image-container">
                    <p className="Daily-text">Today's photo</p>
                    <div className="Daily-image-input-container">
                        <label htmlFor="Daily-image-upload" className="Daily-image-upload clickable">
                            <img
                                src={ dailyImageUrl ? dailyImageUrl : `${add_photo}`}
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
        </>
    )
}
