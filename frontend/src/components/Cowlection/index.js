import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { editActiveBg, editActivePet, loadAllUserItems, loadUserActives } from "../../store/petBgReducer";
import { userBgImages } from "../../utils/bgImageParser";
import { userPetImages } from "../../utils/petImageParser";

import "./Cowlection.css";
import EditPet from "./EditPet";

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

    const [ editPetName, setEditPetName ] = useState(false);
    const [ petName, setPetName ] = useState(null);
    const [ petToEdit, setPetToEdit ] = useState(null);

    const startEditPet = (category) => {
        setEditPetName(true);
        setPetToEdit(category);
    }

    const endEditPet = (e) => {
        setEditPetName(false)
        // dispatch(loadCurrentDayTasks());
    }

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
            // console.log("flavor", flavor)
            // console.log("allpets", allUserPets)
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
                        <div className="Cowlection-header">
                            <h1 className="Cowlection-header-text">Your udderly adorable herd</h1>
                        </div>
                        <div className="Cowlection-cows">
                            { allUserPets.map((pet, idx) => (
                                <div key={idx} className="Pet-gachapon-card">
                                    {
                                        activePet.id !== pet.id && (
                                            <button
                                                // className="Pet-gachapon-play setActive cowlectionPage"
                                                className="Pet-set-active"
                                                onClick={() => changeActivePet(pet.flavor)}
                                            >
                                                Set active
                                            </button>
                                        )
                                    }
                                    <div className="Pet-gachapon-card-image">
                                        <img
                                            src={pet.petImageUrl}
                                            className="Cowlection-hover-set-active"
                                            alt="User pet"
                                        />
                                    </div>
                                    <div className="Pet-gachapon-description cowlectionPage">
                                        {
                                            editPetName && idx === petToEdit ? (
                                                <EditPet
                                                    user={user}
                                                    pet={pet}
                                                    petToEdit={petToEdit}
                                                    endEditPet={endEditPet}
                                                />
                                            ) : (
                                                <div className="PetName-header">
                                                    <div className="PetName-container">
                                                        <h2 className="Pet-gachapon-flavor">
                                                            {pet.name}
                                                        </h2>
                                                        <i
                                                            className="fa-solid fa-pen Pet-edit clickable"
                                                            onClick={() => startEditPet(idx)}
                                                        ></i>
                                                    </div>
                                                    <div className="Pet-edit-error-text">
                                                    </div>

                                                </div>

                                            )
                                        }

                                        <div className="Pet-stats">
                                            <div className="stats-hp">
                                                <p className="stats-hp-header">
                                                    HP:
                                                </p>
                                                <div className="SideBar-pet-stats-hp-bar-container cowlectionPage">
                                                    <div className="SideBar-pet-stats-hp-bar-filled cowlectionPage" style={healthBarWidth(pet)}></div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="Pet-stats">
                                            <div className="stats-hp">
                                                <p className="stats-hp-header">
                                                    Friendliness:
                                                </p>
                                                <div className="SideBar-pet-stats-hp-bar-container cowlectionPage">
                                                    <div className="SideBar-pet-stats-hp-bar-filled cowlectionPage" style={friendlinessBarWidth(pet)}></div>
                                                </div>
                                            </div>
                                        </div>

                                        {
                                            activePet.id !== pet.id && (
                                                <button
                                                    className="Pet-gachapon-play setActive cowlectionPage"
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
                            <div className="Cowlection-header-background">
                                <h1 className="Cowlection-header-text-background">Your bovine backdrops</h1>
                            </div>
                            <div className="Cowlection-cows">
                            { bgs.userBgImages.map((bg, idx) => (
                                <div key={idx} className="Pet-gachapon-card">
                                    <div className="Bg-gachapon-card-image">
                                        <img src={bg} className={`Bg-gachapon-bg`} alt="Gachapon pet prize" />
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
                                                    onClick={() => changeActiveBg(bgs.userBgNames[idx])}
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
            <div className="App-container">
                <div className="loading">
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                </div>
                Don't have a cow, we're just loading your mood!
            </div>
        )
    }

}
