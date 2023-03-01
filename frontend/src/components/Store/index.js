import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import gachapon from "../../assets/gachapon.png";
import gachapon2 from "../../assets/gacha2.png";
import { editActiveBg, editActivePet, loadAllUserItems, loadUserActives } from "../../store/petBgReducer";
import OpenModalButton from "../OpenModalButton";
import PetGachapon from "./PetGachapon/index.js";
import { petImages } from "../../utils/petImageParser";
import "./Store.css";
import BgGachapon from "./BgGachapon";
import { bgImages } from "../../utils/bgImageParser";
import PetCare from "./PetCare";

// test starts here
import gachaBase from "../../assets/gacha/gachaBase.png";

export default function Store({ user }) {
    const dispatch = useDispatch();
    const [ showMenu, setShowMenu ] = useState(false);
    const [ isLoaded, setIsLoaded ] = useState(false);
    const closeMenu = () => setShowMenu(false);
    const activePet = useSelector(state => state.items.activePet);
    const activeBg = useSelector(state => state.items.activeBg);
    const userPets = useSelector(state => state.items.pets);
    const userBgs = useSelector(state => state.items.backgrounds);
    const userFlavors = [];
    const userBgNames = [];

    const cows = petImages();
    const bgs = bgImages();
    // console.log("bgImages", bgs);

    useEffect(() => {
        dispatch(loadAllUserItems()).then(() => setIsLoaded(true));
    }, [dispatch])

    if (isLoaded) {
        Object.values(userPets).forEach(pet => userFlavors.push(pet.flavor));
        const wantedPet = (desiredFlavor) => {
            const foundPet = Object.values(userPets).filter(pet => pet.flavor === desiredFlavor);
            // console.log("foundPet ===>", foundPet[0]);
            return foundPet[0];
        }


        Object.values(userBgs).forEach(bg => userBgNames.push(bg.bgName));
        const wantedBg = (desiredBg) => {
            const foundBg = Object.values(userBgs).filter(bg => bg.bgName === desiredBg);
            // console.log("foundBg ===>", foundBg[0]);
            return foundBg[0];
        }
        // console.log("userPets flavors ===>", wantedPet)
        // console.log("userPets flavors ===>", cows.cowFlavors[8])
        // console.log("userPets includes ===>", userFlavors.includes(cows.cowFlavors[8]))

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
            <div className="Store-container">
                <div className="Store-pet-gachapon">
                    <h2>Pet Gachapon</h2>
                    <OpenModalButton
                        buttonText={<img src={gachaBase} alt="Pet gachapon" />}
                        onButtonClick={closeMenu}
                        modalComponent={<PetGachapon userFlavors={userFlavors} user={user} />}
                        buttonClass="Gachapon"
                    />
                    {/* <OpenModalButton
                        buttonText={<img src={gachapon} alt="Pet gachapon" />}
                        onButtonClick={closeMenu}
                        modalComponent={<PetGachapon userFlavors={userFlavors} user={user} />}
                        buttonClass="Gachapon"
                    /> */}
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
                <div className="Store-bg-gachapon">
                    <h2>Background gachapon</h2>
                    <OpenModalButton
                        buttonText={<img src={gachapon2} alt="Pet gachapon" />}
                        onButtonClick={closeMenu}
                        modalComponent={<BgGachapon userBgNames={userBgNames} user={user} />}
                        buttonClass="Gachapon"
                    />
                    <div className="Pet-gachapon-prizes">
                        { bgs.bgImages.map((bg, idx) => (
                            <div key={idx} className="Pet-gachapon-card">
                                <div className="Bg-gachapon-card-image">
                                    <img src={bg} className={`Bg-gachapon-bg ${userBgNames.includes(bgs.bgNames[idx]) ? "" : "notOwned"}`} alt="Gachapon background prize" />
                                </div>
                                <div className="Pet-gachapon-description">
                                    <h2 className="Pet-gachapon-flavor">
                                        {bgs.bgNames[idx]}
                                    </h2>
                                    {
                                        userBgNames.includes(bgs.bgNames[idx]) ? (
                                            <>
                                                { activeBg.bgName === bgs.bgNames[idx] ? (
                                                    <h3 className="Pet-gachapon-want">
                                                        You own this background!
                                                    </h3>
                                                ) : (
                                                    <>
                                                        <h3 className="Pet-gachapon-want">
                                                            You own this background!
                                                        </h3>
                                                        <button
                                                            className="Pet-gachapon-play"
                                                            onClick={() => changeActiveBg(bgs.bgNames[idx])}
                                                        >
                                                            Set active
                                                        </button>
                                                    </>
                                                )}

                                            </>

                                        ) : (
                                            <>
                                                <h3 className="Pet-gachapon-want">
                                                    Want this background?
                                                </h3>
                                                <OpenModalButton
                                                    buttonText="Play now"
                                                    onButtonClick={closeMenu}
                                                    modalComponent={<BgGachapon userBgNames={userBgNames} user={user} />}
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

                <PetCare activePet={activePet} user={user} />
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
