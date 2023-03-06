import { useState } from "react";
import { useDispatch } from "react-redux";
import { addDayEntry, addPastDayEntry, deleteDayEntry, editDayEntry, loadCurrentDay } from "../../../store/dayentries";
import { addPoints } from "../../../store/session";
import add_photo from "../../../assets/add_photo.png"
import uploadImage from "../../../assets/cloud-arrow-up-solid.svg";
import ConfirmDelete from "../../ConfirmDelete";
import OpenModalButton from "../../OpenModalButton";

export default function DailyImage({ currentImage, date }) {
    const dispatch = useDispatch();
    const [dailyImage, setDailyImage] = useState(null);
    const [dailyImageUrl, setDailyImageUrl] = useState(currentImage ? currentImage.entryData : "");
    const [imageChanged, setImageChanged] = useState(false);
    const [ errors, setErrors ] = useState({});
    const [ showMenu, setShowMenu ] = useState(false);
    const closeMenu = () => setShowMenu(false);

    // console.log("date ===>", date)
    // console.log("current image ===>", currentImage)

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
            if (date) {
                console.log("dailyImage date")
                return dispatch(addPastDayEntry({ entryType: "dayImage", entryData: file }, date))
                // .then(dispatch(loadCurrentDay()))
                .catch(async (res) => {
                    const data = await res.json();
                    if (data && data.errors) setErrors(data.errors);
                })
            } else {
                console.log("not date")
                return dispatch(addDayEntry({ entryType: "dayImage", entryData: file }))
                    .then(() => dispatch(addPoints({ "pointsEarned": 5 })))
                    .then(dispatch(loadCurrentDay()))
                    .catch(async (res) => {
                        const data = await res.json();
                        if (data && data.errors) setErrors(data.errors);
                    })
            }

        }

    }

    const handleDeleteEntry = async (type, entryId) => {
        const deletedEntry = await dispatch(deleteDayEntry(entryId))
            .then(() => dispatch(addPoints({ "pointsEarned": -5 })))
            .then(() => {
                setDailyImageUrl(null)
            })
    }

    return (
        <>
            { currentImage === undefined ? (
                <div className="Daily-image-container">
                    <p className="Daily-text">Today's photo</p>
                    <div className="Daily-image-input-container">
                        <label htmlFor="Daily-image-upload" className="Daily-image-upload clickable">
                            { dailyImageUrl ? (
                                <img
                                    src={dailyImageUrl}
                                    alt="Add photo"
                                    className="Daily-image-upload-icon"
                                />
                            ) : (
                                <div className="Daily-image-upload-default-container">
                                    <img
                                        src={uploadImage}
                                        alt="Add photo"
                                        className="Daily-image-upload-default"
                                    />
                                    <p className="Daily-journal-char-count-container">
                                        Upload a photo that represents your day
                                    </p>
                                </div>
                            )}
                        </label>
                        <input id="Daily-image-upload" type="file" accept="image/*" onChange={(e) => updateFile(e, "add")} />
                    </div>
                </div>
            ) : (
                <div className="Daily-image-container">
                    <div className="Daily-header">
                        <p className="Daily-text">Today's photo</p>
                        <div className="Daily-action-buttons-container">
                            <OpenModalButton
                                buttonText={<i className="fa-solid fa-trash"></i>}
                                onButtonClick={closeMenu}
                                modalComponent={<ConfirmDelete currentImage={currentImage} onDelete={() => handleDeleteEntry("dayImage", currentImage.id)}/>
                            }   icon="delete"
                            />
                            {/* <i className="fa-solid fa-trash clickable" onClick={() => handleDeleteEntry("dayImage", currentImage.id)}></i> */}
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
