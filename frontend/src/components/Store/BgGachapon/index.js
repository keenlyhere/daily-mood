import { useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../../context/Modal";
import { addBg, loadAllUserItems } from "../../../store/petBgReducer";
import { spendPoints } from "../../../store/session";
import gachapon from "../../../assets/gacha2.png";

// https://keenlychung.com/dailymood/backgrounds/bg_default.PNG
// https://keenlychung.com/dailymood/backgrounds/bg_flower_fields.PNG
// https://keenlychung.com/dailymood/backgrounds/bg_castle.PNG

export default function BgGachapon({ userBgs, user }) {
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

        const wonBg = null;
        for (let i = 0; i < backgrounds.length; i++) {
            const bg = backgrounds[i];
            const odds = bg.rarity / totalRarity;

            if (randomNum < odds) {
                wonBg = bg;
                break;
            }

            randomNum -= odds;
        }

        if (wonBg !== null && userBgs.includes(wonBg.bgName)) {
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
            "bgName": wonBg.bgName,
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
                <h2 className="LoginFormModal-Login">Background Gachapon</h2>
            </div>
            { step === 0 && (
                <div className="PetGachapon-main-container">
                    <img
                        src={gachapon}
                        alt="Pet gachapon"
                        className="clickable"
                        onClick={playGachapon}
                    />
                    <div className="PetGachapon-text-container">
                        <p>
                            Each play costs 50 moolah
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
                        { ["a", "e", "i", "o", "u"].includes(obtainedPet.flavor.charAt(0).toLowerCase()) ? (
                            `You got an ${obtainedPet.flavor} cow!`
                        ) : (
                            `You got a ${obtainedPet.flavor} cow!`
                        )}
                    </div>
                    <img src={petImageParser(obtainedPet.flavor, "happy")} alt="New pet image" />
                    <form className="PetGachapon-new-pet-form">
                        <div className="PetGachapon-group">
                            <label htmlFor="pet-name" className="PetGachapon-pet-name-label">Name your new moo!</label>
                            <input
                                id="pet-name"
                                type="text"
                                value={petName}
                                onChange={(e) => setPetName(e.target.value)}
                                className="PetGachapon-pet-name"
                                required
                            />
                        </div>
                        <div className="PetGachapon-group">
                            <p className="PetGachapon-pet-name-label">Set as your active pet?</p>
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
                                className={`PetGachapon-submit ${petName.length < 3 ? "isDisabled" : ""}`}
                                disabled={petName.length < 3 ? true : false}
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
