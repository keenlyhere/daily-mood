import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { editActiveBg, editActivePet, loadAllUserItems, loadUserActives } from "../../store/petBgReducer";
import { userBgImages } from "../../utils/bgImageParser";
import { userPetImages } from "../../utils/petImageParser";

import "./Cowlection.css";

export default function Cowlection({ user }) {
    const dispatch = useDispatch();
    const [ isLoaded, setIsLoaded ] = useState(false);
    const [ page, setPage ] = useState("cows");
    const activePet = useSelector(state => state.items.activePet);
    const activeBg = useSelector(state => state.items.activeBg);
    const userPets = useSelector(state => state.items.pets);
    const userBgs = useSelector(state => state.items.backgrounds);
    const userFlavors = [];
    const userBgNames = [];


    useEffect(() => {
        dispatch(loadAllUserItems()).then(() => setIsLoaded(true));
    }, [dispatch])

    const healthBarWidth = (pet) => {
        let backgroundColor;

        if (pet.health > 80) {
            backgroundColor = "#5AA13E";
        } else if (pet.health > 60) {
            backgroundColor = "#FDFD96";
        } else if (pet.health > 35) {
            backgroundColor = "#F9AD8E";
        } else {
            backgroundColor = "#FF7276";
        }

        // console.log("backgroundColor", pet, backgroundColor);

        return {
            "width": `${pet.health}%`,
            "backgroundColor": backgroundColor
        };
    }

    const friendlinessBarWidth = (pet) => {
        let backgroundColor;

        if (pet.friendliness > 80) {
            backgroundColor = "#5AA13E";
        } else if (pet.friendliness > 60) {
            backgroundColor = "#FDFD96";
        } else if (pet.friendliness > 35) {
            backgroundColor = "#F9AD8E";
        } else {
            backgroundColor = "#FF7276";
        }

        // console.log("backgroundColor", pet, backgroundColor);

        return {
            "width": `${pet.friendliness}%`,
            "backgroundColor": backgroundColor
        };
    }

    if (isLoaded) {


        const allUserPets = Object.values(userPets);
        // console.log("userPets ===>", allUserPets)
        Object.values(userPets).forEach(pet => userFlavors.push(pet.flavor));
        // console.log("userFlavors", userFlavors);
        const cows = userPetImages(userFlavors);
        // console.log("petImages", cows);
        const wantedPet = (desiredFlavor) => {
            const foundPet = Object.values(userPets).filter(pet => pet.flavor === desiredFlavor);
            // console.log("foundPet ===>", foundPet[0]);
            return foundPet[0];
        }

        Object.values(userBgs).forEach(bg => userBgNames.push(bg.bgName));
        // console.log("userBgNames", userBgNames);
        const bgs = userBgImages(userBgNames);
        const wantedBg = (desiredBg) => {
            const foundBg = Object.values(userBgs).filter(bg => bg.bgName === desiredBg);
            // console.log("foundBg ===>", foundBg[0]);
            return foundBg[0];
        }

        const changeActivePet = async (flavor) => {
            const desiredActive = wantedPet(flavor);
            // console.log("desiredActive ===>", desiredActive)

            const setActivePet = await dispatch(editActivePet(user.id, desiredActive.id))
                .then(dispatch(loadUserActives()));

            return setActivePet;
        }

        const changeActiveBg = async (bg) => {
            const desiredActive = wantedBg(bg);
            // console.log("desiredActive ===>", desiredActive)

            const setActiveBg = await dispatch(editActiveBg(user.id, desiredActive.id))
                .then(dispatch(loadUserActives()));

            return setActiveBg;
        }

        return (
            <div className="Cowlection-container">
                <div className="Cowlection-tabs">
                    <input
                        type="radio"
                        value="cows"
                        id="cows"
                        name="tabs"
                        checked={page === "cows"}
                        onChange={() => setPage("cows")}
                    />
                    <label
                        htmlFor="cows"
                        className="Cowlection-tab clickable"
                    >
                        Cows
                    </label>
                    <input
                        type="radio"
                        value="backgrounds"
                        id="backgrounds"
                        name="tabs"
                        checked={page === "backgrounds"}
                        onChange={() => setPage("backgrounds")}
                    />
                    <label
                        htmlFor="backgrounds"
                        className="Cowlection-tab clickable"
                    >
                        Backgrounds
                    </label>
                    <span className="slider"></span>
                </div>
                { page === "cows" && (
                    <>
                        <h1 className="Page-headers">Your udderly adorable herd</h1>
                        <div className="Cowlection-cows">
                            { allUserPets.map((pet, idx) => (
                                <div key={idx} className="Pet-gachapon-card">
                                    <div className="Pet-gachapon-card-image">
                                        <img src={pet.petImageUrl} alt="User pet" />
                                    </div>
                                    <div className="Pet-gachapon-description">
                                        <h2 className="Pet-gachapon-flavor">
                                            {pet.name}
                                        </h2>

                                        <div className="Pet-stats">
                                            <div className="stats-hp">
                                                <p className="stats-hp-header">
                                                    HP:
                                                </p>
                                                <div className="SideBar-pet-stats-hp-bar-container inCowlection">
                                                    <div className="SideBar-pet-stats-hp-bar-filled inCowlection" style={healthBarWidth(pet)}></div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="Pet-stats">
                                            <div className="stats-hp">
                                                <p className="stats-hp-header">
                                                    Friendliness:
                                                </p>
                                                <div className="SideBar-pet-stats-hp-bar-container inCowlection">
                                                    <div className="SideBar-pet-stats-hp-bar-filled inCowlection" style={friendlinessBarWidth(pet)}></div>
                                                </div>
                                            </div>
                                        </div>

                                        {
                                            activePet.id !== pet.id && (
                                                <button
                                                    className="Pet-gachapon-play setActive"
                                                    onClick={() => changeActivePet(cows.userCowFlavors[idx])}
                                                >
                                                    Set active
                                                </button>
                                            )
                                        }

                                    </div>
                                </div>
                            ))}
                        </div>
                    </>
                )}
                {
                    page === "backgrounds" && (
                        <>
                            <h1 className="Page-headers">Your bovine backdrops</h1>
                            <div className="Cowlection-cows">
                            { bgs.userBgImages.map((pet, idx) => (
                                <div key={idx} className="Pet-gachapon-card">
                                    <div className="Bg-gachapon-card-image">
                                        <img src={pet} className={`Bg-gachapon-bg ${userFlavors.includes(cows.userCowFlavors[idx]) ? "" : "notOwned"}`} alt="Gachapon pet prize" />
                                    </div>
                                    <div className="Pet-gachapon-description">
                                        <h2 className="Pet-gachapon-flavor">
                                            {bgs.userBgNames[idx]}
                                        </h2>

                                        {
                                            activeBg.bgName === bgs.userBgNames[idx] ? (
                                                <button
                                                    className="Pet-gachapon-play disabled"
                                                    disabled={true}
                                                >
                                                    Active
                                                </button>
                                            ) : (
                                                <button
                                                    className="Pet-gachapon-play setActive"
                                                    onClick={() => changeActivePet(bgs.userBgImages[idx])}
                                                >
                                                    Set active
                                                </button>
                                            )
                                        }

                                    </div>
                                </div>
                            ))}
                        </div>
                        </>
                    )
                }
            </div>
        )
    } else {
        return (
            "Loading..."
        )
    }

}
