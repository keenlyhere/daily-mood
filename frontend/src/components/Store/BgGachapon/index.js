import { useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../../context/Modal";
import { addBg, loadAllUserItems } from "../../../store/petBgReducer";
import { spendPoints } from "../../../store/session";
import gachapon from "../../../assets/gacha2.png";
import { bgImageParser } from "../../../utils/bgImageParser";

import "./BgGachapon.css";

export default function BgGachapon({ userBgNames, user }) {
    const dispatch = useDispatch();
    const { closeModal } = useModal();
    const [ step, setStep ] = useState(0);
    const [ obtainedBg, setObtainedBg ] = useState(null);
    const [ active, setActive ] = useState(false);
    const [ errors, setErrors ] = useState({});

    const backgrounds = [
        {
            "bgName": "Farm",
            "rarity": 7
        },
        {
            "bgName": "FlowerFields",
            "rarity": 2.5
        },
        {
            "bgName": "Castle",
            "rarity": 0.5
        }
    ]

    const playGachapon = async () => {
        const error = {};

        if (user.moolah < 30) {
            error.moolah = "You do not have enough moolah to play.";
        }

        if (Object.keys(error).length > 0) {
            return setErrors(error);
        }

        let randomNum = Math.random();
        const totalRarity = backgrounds.reduce((sum, add) => sum + add.rarity, 0);

        let wonBg = null;
        for (let i = 0; i < backgrounds.length; i++) {
            const bg = backgrounds[i];
            const odds = bg.rarity / totalRarity;

            if (randomNum < odds) {
                wonBg = bg;
                break;
            }

            randomNum -= odds;
        }

        console.log("userBgNames", userBgNames);
        console.log("wonBgName", wonBg.bgName);
        if (wonBg !== null && userBgNames.includes(wonBg.bgName)) {
            playGachapon();
        } else {
            const usePoints = await dispatch(spendPoints({ "pointsSpent": 30 }));
            setObtainedBg(wonBg);
            setStep(1);
        }

    }

    const addToCollection = async (e) => {
        e.preventDefault();

        const newBg = {
            "bgName": obtainedBg.bgName,
            "setActive": active
        };

        const createBg = await dispatch(addBg(newBg))
            .then(() => dispatch(loadAllUserItems()))
            .then(closeModal);
    }

    return (
        <div className="PetGachapon-container">
            <div className="LoginFormModal-top">
                <button
                    className="LoginFormModal-close"
                    onClick={closeModal}
                >
                    <i className="fa-sharp fa-solid fa-xmark"></i>
                </button>
                <h2 className="BgGachapon-header">Background Gachapon</h2>
            </div>
            { step === 0 && (
                <div className="PetGachapon-main-container">
                    <img
                        src={gachapon}
                        alt="Bg gachapon"
                        className="BgGachapon-gachapon clickable"
                        onClick={playGachapon}
                    />
                    <div className="PetGachapon-text-container">
                        <p>
                            Each play costs 30 moolah
                        </p>
                        { errors && errors.moolah && (
                            <p className="CreateTaskModal-error-text">
                                {errors.moolah}
                            </p>
                        )}
                    </div>
                </div>
            )}

            { step === 1 && (
                <div className="PetGachapon-main-container">
                    <div className="PetGachapon-new-pet-header">
                        { ["a", "e", "i", "o", "u"].includes(obtainedBg.bgName.charAt(0).toLowerCase()) ? (
                            `You got an ${obtainedBg.bgName} background!`
                        ) : (
                            `You got a ${obtainedBg.bgName} background!`
                        )}
                    </div>
                    <img src={bgImageParser(obtainedBg.bgName)} alt="New background image" />
                    <form className="PetGachapon-new-pet-form">

                        <div className="PetGachapon-group">
                            <p className="PetGachapon-pet-name-label">Set as your active background?</p>
                            <div className="PetGachapon-active-switch">
                                <label
                                    htmlFor="pet-active"
                                    className="PetGachapon-active-label"
                                >
                                    <input
                                        id="pet-active"
                                        type="checkbox"
                                        className="PetGachapon-active-input"
                                        checked={active}
                                        onChange={() => setActive(!active)}
                                    />
                                    <div className="PetGachapon-slider">
                                        <div className="PetGachapon-knob"></div>
                                    </div>
                                </label>
                            </div>
                        </div>
                        <div className="PetGachapon-group">
                            <button
                                className={`PetGachapon-submit`}
                                onClick={addToCollection}
                            >
                                Adopt this moo into your herd
                            </button>
                        </div>
                    </form>
                </div>
            )}
        </div>
    )

}
