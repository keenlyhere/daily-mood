import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import gachapon from "../../assets/gachapon.png";
import { editActivePet, loadAllUserItems, loadUserActives } from "../../store/petBgReducer";
import OpenModalButton from "../OpenModalButton";
import PetGachapon from "./PetGachapon";
import { petImages } from "../../utils/petImageParser";
import "./Store.css";

export default function Store({ user }) {
    const dispatch = useDispatch();
    const [ showMenu, setShowMenu ] = useState(false);
    const [ isLoaded, setIsLoaded ] = useState(false);
    const closeMenu = () => setShowMenu(false);
    const activePet = useSelector(state => state.items.activePet);
    const userPets = useSelector(state => state.items.pets);
    // console.log("userPets ===>", userPets)
    const userFlavors = [];

    const cows = petImages();
    console.log("petImages", cows);

    useEffect(() => {
        dispatch(loadAllUserItems()).then(() => setIsLoaded(true));
    }, [dispatch])

    if (isLoaded) {
        Object.values(userPets).forEach(pet => userFlavors.push(pet.flavor));
        const wantedPet = (desiredFlavor) => {
            const foundPet = Object.values(userPets).filter(pet => pet.flavor === desiredFlavor);
            console.log("foundPet ===>", foundPet[0]);
            return foundPet[0];
        }
        // console.log("userPets flavors ===>", wantedPet)
        // console.log("userPets flavors ===>", cows.cowFlavors[8])
        // console.log("userPets includes ===>", userFlavors.includes(cows.cowFlavors[8]))

        const changeActivePet = async (flavor) => {
            const desiredActive = wantedPet(flavor);
            console.log("desiredActive ===>", desiredActive)

            const setActivePet = await dispatch(editActivePet(user.id, desiredActive.id))
                .then(dispatch(loadUserActives()));

            return setActivePet;
        }


        return (
            <div className="Store-container">
                <h1>Store stuff here</h1>
                <ul>
                    <li>Pets</li>
                    <li>Backgrounds</li>
                    <li>One-use pet items (ie toys, food)</li>
                </ul>
                <div className="Store-pet-gachapon">
                    <h2>Pet Gachapon</h2>
                    <OpenModalButton
                        buttonText={<img src={gachapon} alt="Pet gachapon" />}
                        onButtonClick={closeMenu}
                        modalComponent={<PetGachapon userFlavors={userFlavors} user={user} />}
                        buttonClass="Gachapon"
                    />
                    <div className="Pet-gachapon-prizes">
                        { cows.cowImages.map((pet, idx) => (
                            <div key={idx} className="Pet-gachapon-card">
                                <div className="Pet-gachapon-card-image">
                                    <img src={pet} className={`${userFlavors.includes(cows.cowFlavors[idx]) ? "" : "notOwned"}`} alt="Gachapon pet prize" />
                                </div>
                                <div className="Pet-gachapon-description">
                                    <h2 className="Pet-gachapon-flavor">
                                        {cows.cowFlavors[idx]}
                                    </h2>
                                    {
                                        userFlavors.includes(cows.cowFlavors[idx]) ? (
                                            <>
                                                { activePet.flavor === cows.cowFlavors[idx] ? (
                                                    <h3 className="Pet-gachapon-want">
                                                        You own this cow!
                                                    </h3>
                                                ) : (
                                                    <>
                                                        <h3 className="Pet-gachapon-want">
                                                            You own this cow!
                                                        </h3>
                                                        <button
                                                            className="Pet-gachapon-play"
                                                            onClick={() => changeActivePet(cows.cowFlavors[idx])}
                                                        >
                                                            Set active
                                                        </button>
                                                    </>
                                                )}

                                            </>

                                        ) : (
                                            <>
                                                <h3 className="Pet-gachapon-want">
                                                    Want this cow?
                                                </h3>
                                                <OpenModalButton
                                                    buttonText="Play now"
                                                    onButtonClick={closeMenu}
                                                    modalComponent={<PetGachapon userFlavors={userFlavors} user={user} />}
                                                    buttonClass="Pet-gachapon-play"
                                                />
                                            </>
                                        )
                                    }
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        )
    } else {
        return (
            <div className="Store-container">
                Loading...
            </div>
        )
    }

}
