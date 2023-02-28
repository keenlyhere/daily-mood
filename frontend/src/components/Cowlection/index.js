import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { editActivePet, loadAllUserItems, loadUserActives } from "../../store/petBgReducer";
import { userPetImages } from "../../utils/petImageParser";

import "./Cowlection.css";

export default function Cowlection({ user }) {
    const dispatch = useDispatch();
    const [ isLoaded, setIsLoaded ] = useState(false);
    const activePet = useSelector(state => state.items.activePet);
    const userPets = useSelector(state => state.items.pets);
    // console.log("userPets ===>", userPets)
    const userFlavors = [];


    useEffect(() => {
        dispatch(loadAllUserItems()).then(() => setIsLoaded(true));
    }, [dispatch])

    if (isLoaded) {

        Object.values(userPets).forEach(pet => userFlavors.push(pet.flavor));
        console.log("userFlavors", userFlavors);
        const cows = userPetImages(userFlavors);
        console.log("petImages", cows);
        const wantedPet = (desiredFlavor) => {
            const foundPet = Object.values(userPets).filter(pet => pet.flavor === desiredFlavor);
            console.log("foundPet ===>", foundPet[0]);
            return foundPet[0];
        }

        const changeActivePet = async (flavor) => {
            const desiredActive = wantedPet(flavor);
            console.log("desiredActive ===>", desiredActive)

            const setActivePet = await dispatch(editActivePet(user.id, desiredActive.id))
                .then(dispatch(loadUserActives()));

            return setActivePet;
        }

        return (
            <div className="Cowlection-container">
                <h1>Your udderly adorable herd</h1>
                <div className="Cowlection-cows">
                        { cows.userCowImages.map((pet, idx) => (
                            <div key={idx} className="Pet-gachapon-card">
                                <div className="Pet-gachapon-card-image">
                                    <img src={pet} className={`${userFlavors.includes(cows.userCowFlavors[idx]) ? "" : "notOwned"}`} alt="Gachapon pet prize" />
                                </div>
                                <div className="Pet-gachapon-description">
                                    <h2 className="Pet-gachapon-flavor">
                                        {cows.userCowFlavors[idx]}
                                    </h2>

                                    {
                                        activePet.flavor === cows.userCowFlavors[idx] ? (
                                            <button
                                                className="Pet-gachapon-play disabled"
                                                disabled={true}
                                            >
                                                Active
                                            </button>
                                        ) : (
                                            <button
                                                className="Pet-gachapon-play"
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
            </div>
        )
    } else {
        return (
            "Loading..."
        )
    }

}
