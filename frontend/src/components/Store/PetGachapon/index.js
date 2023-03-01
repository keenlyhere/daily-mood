import { useModal } from "../../../context/Modal";
import gachapon from "../../../assets/gachapon.png";
import "./PetGachapon.css";
import { useDispatch, useSelector } from "react-redux";
import { addPet, loadAllUserItems } from "../../../store/petBgReducer";
import { useState } from "react";
import { petImageParser } from "../../../utils/petImageParser";
import { spendPoints } from "../../../store/session";

import bg from "../../../assets/gacha/bg.gif";
import fg from "../../../assets/gacha/fg.gif";
import fg_static from "../../../assets/gacha/fg_static.gif";
import mg from "../../../assets/gacha/mg.gif";
import prize from "../../../assets/gacha/prize.png";
import dial from "../../../assets/gacha/dial.png";

export default function PetGachapon({ userFlavors, user }) {
    const { closeModal } = useModal();
    const dispatch = useDispatch();
    const [ step, setStep ] = useState(0);
    const [ obtainedPet, setObtainedPet ] = useState(null);
    const [ petName, setPetName ] = useState("");
    const [ active, setActive ] = useState(false);
    const [ errors, setErrors ] = useState({});

    const [ shuffleActive, setShuffleActive ] = useState(false);
    const [ prizeActive, setPrizeActive ] = useState(false);
    // const [ startGacha, setStartGacha ] = useState(false);

    const prizeCapsule = document.querySelector(".Gachapon-prize");
    console.log("prizeCapsule:", prizeCapsule);

    const startGacha = (e) => {
        const error = {};

        if (user.moolah < 50) {
            error.moolah = "You do not have enough moolah to play.";
        }

        if (Object.keys(error).length > 0) {
            return setErrors(error);
        }

        setPrizeActive(false);
        setShuffleActive(true);
        setTimeout(() => {
            setPrizeActive(true);
            setShuffleActive(false);
            console.log("shuffleActive after true ? :", shuffleActive);
        }, 3000);
        setTimeout(() => {
            setPrizeActive(true);
        }, 2000);
    }

    const handlePrizeClick = (e) => {
        playGachapon();
        setPrizeActive(false);
    }

    const petFlavors = [
        {
            "flavor": "Sesame",
            "rarity": 3
        },
        {
            "flavor": "Taro",
            "rarity": 2
        },
        {
            "flavor": "Blueberry",
            "rarity": 2
        },
        {
            "flavor": "Mango",
            "rarity": 2
        },
        {
            "flavor": "Strawberry",
            "rarity": 1
        },
        {
            "flavor": "MilkTea",
            "rarity": 1
        },
        {
            "flavor": "Chocolate",
            "rarity": 1
        },
        {
            "flavor": "Matcha",
            "rarity": 1
        },
        {
            "flavor": "Moohouse",
            "rarity": 0.3
        }
    ]

    const playGachapon = async () => {
        const error = {};

        if (user.moolah < 50) {
            error.moolah = "You do not have enough moolah to play.";
        }

        if (Object.keys(error).length > 0) {
            return setErrors(error);
        }

        let randomNum = Math.random();
        const totalRarity = petFlavors.reduce((sum, add) => sum + add.rarity, 0);

        // console.log("TOTAL RARITY =>", totalRarity);
        // user should only be able to get a flavor that they do not already own
        // get all flavors that the user owns

        let wonPet = null;
        for (let i = 0; i < petFlavors.length; i++) {
            const flavor = petFlavors[i];
            const odds = flavor.rarity / totalRarity;
            // console.log("FLAVORRRR", flavor);
            // console.log("RANDOM", randomNum);
            // console.log("ODDS", odds);

            if (randomNum < odds) {
                wonPet = flavor;
                break;
            }

            randomNum -= odds;
        }


        // console.log("OBTAINED PET", wonPet);
        if (wonPet !== null && userFlavors.includes(wonPet.flavor)) {
            playGachapon();
        } else {
            const usePoints = await dispatch(spendPoints({ "pointsSpent": 50 }));
            setObtainedPet(wonPet)
            setStep(1)
        }

    }

    const addToCollection = async (e) => {
        e.preventDefault();
        setErrors({});

        const error = {};
        if (petName.length < 3) {
            error.petName = "Pet name should be min. 3 characters long."
        }

        if (petName.length > 12) {
            error.petName = "Pet name should be max. 12 characters long."
        }

        if (Object.keys(error).length > 0) {
            return setErrors(error);
        }

        const newMoo = {
            "name": petName,
            "flavor": obtainedPet.flavor,
            "setActive": active
        };

        const createPet = await dispatch(addPet(newMoo))
            .then(() => dispatch(loadAllUserItems()))
            .then(closeModal);

    }

    console.log("shuffleActive ? :", shuffleActive)

    return (
        <div className="PetGachapon-container">
            <div className="LoginFormModal-top">
                <button
                    className="LoginFormModal-close"
                    onClick={closeModal}
                >
                    <i className="fa-sharp fa-solid fa-xmark"></i>
                </button>
                <h2 className="LoginFormModal-Login">Pet Gachapon</h2>
            </div>
            { step === 0 && (
                <div className="PetGachapon-main-container">
                    <div className="Gachapon-container">
                        <img
                            src={bg}
                            alt="Pet gachapon"
                            className="Gachapon-bg"
                        />
                        <img
                            src={mg}
                            alt="Pet gachapon"
                            className="Gachapon-mg"
                        />
                        <img
                            src={prize}
                            alt="Pet gachapon"
                            className={`Gachapon-prize ${prizeActive ? "active clickable" : ""}`}
                            onClick={(e) => handlePrizeClick(e)}
                        />
                        {
                            shuffleActive === false ? (
                                <img
                                    src={fg_static}
                                    alt="Pet gachapon"
                                    className="Gachapon-fg"
                                />
                            ) : (
                                <img
                                    src={fg}
                                    alt="Pet gachapon"
                                    className="Gachapon-fg"
                                />
                            )
                        }
                        <img
                            src={dial}
                            alt="Pet gachapon"
                            className="Gachapon-dial clickable"
                            onClick={() => startGacha(true)}
                        />
                    </div>
                    <div className="PetGachapon-text-container">
                        <p>
                            Each play costs 50 moolah
                        </p>
                            <p className="CreateTaskModal-error-text">
                                { errors && errors.moolah && (
                                        errors.moolah
                                )}
                            </p>
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
                            <p className="CreateTaskModal-error-text">
                                {
                                    petName.length > 12 ? (
                                        "Pet name should be max. 12 characters long."
                                    ) : ("")
                                }
                            </p>
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
                                className={`PetGachapon-submit ${petName.length < 3 || petName.length > 12 ? "isDisabled" : ""}`}
                                disabled={petName.length < 3 || petName.length > 12 ? true : false}
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
