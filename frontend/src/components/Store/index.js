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
import gachaponbanner from "../../assets/gachaponbanner.jpg";

export default function Store({ user }) {
    const dispatch = useDispatch();
    const [ showMenu, setShowMenu ] = useState(false);
    const [ isLoaded, setIsLoaded ] = useState(false);
    const [ page, setPage ] = useState("cows")
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
                    <input
                        type="radio"
                        value="petcare"
                        id="petcare"
                        name="tabs"
                        checked={page === "petcare"}
                        onChange={() => setPage("petcare")}
                    />
                    <label
                        htmlFor="petcare"
                        className="Cowlection-tab clickable"
                    >
                        Pet Care
                    </label>
                    <span className="slider"></span>
                </div>
                {
                    page === "cows" && (
                        <div className="Store-pet-gachapon">
                            <div className="Gachapon-header-container">
                                <h1 className="Gachapon-header" data-content={"Pet Gachapon"}>Pet Gachapon</h1>
                            </div>
                            { userFlavors.length >= 9 ? (
                                "You've collected all the cows!"
                            ) : (
                                <OpenModalButton
                                    buttonText={(
                                        <>
                                            <div className="Gachapon">Play the pet gachapon today!</div>
                                            <p className="Gachapon-text">Adopt a cute new moo to join your family! You won't regret it!</p>
                                        </>
                                    )}
                                    onButtonClick={closeMenu}
                                    modalComponent={<PetGachapon userFlavors={userFlavors} user={user} />}
                                    buttonClass="Gachapon"
                                />
                            )}
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
                                                            <h3 className="Pet-gachapon-want PetCare-description">
                                                                You own this cow!
                                                            </h3>
                                                        ) : (
                                                            <>
                                                                <h3 className="Pet-gachapon-want PetCare-description">
                                                                    You own this cow!
                                                                </h3>
                                                                <button
                                                                    className="Pet-gachapon-play setActive"
                                                                    onClick={() => changeActivePet(cows.cowFlavors[idx])}
                                                                >
                                                                    Set active
                                                                </button>
                                                            </>
                                                        )}

                                                    </>

                                                ) : (
                                                    <>
                                                        <h3 className="Pet-gachapon-want PetCare-description">
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
                    )
                }

                {
                    page === "backgrounds" && (
                        <div className="Store-bg-gachapon">
                            <div className="Gachapon-header-container">
                                <h1 className="Gachapon-header" data-content={"Background Gachapon"}>Background Gachapon</h1>
                            </div>
                            {
                                userBgNames.length >= 4 ? (
                                    "You've collected all the backgrounds!"
                                ) : (
                                    <OpenModalButton
                                        buttonText={(
                                        <>
                                            <div className="Gachapon">Play the background gachapon today!</div>
                                            <p className="Gachapon-text">Get a brand spankin` new background for your cute moo.</p>
                                        </>
                                    )}
                                        onButtonClick={closeMenu}
                                        modalComponent={<BgGachapon userBgNames={userBgNames} user={user} />}
                                        buttonClass="Gachapon"
                                    />
                                )
                            }
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
                                                            <h3 className="Pet-gachapon-want PetCare-description">
                                                                You own this background!
                                                            </h3>
                                                        ) : (
                                                            <>
                                                                <h3 className="Pet-gachapon-want PetCare-description">
                                                                    You own this background!
                                                                </h3>
                                                                <button
                                                                    className="Pet-gachapon-play setActive"
                                                                    onClick={() => changeActiveBg(bgs.bgNames[idx])}
                                                                >
                                                                    Set active
                                                                </button>
                                                            </>
                                                        )}

                                                    </>

                                                ) : (
                                                    <>
                                                        <h3 className="Pet-gachapon-want PetCare-description">
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
                    )
                }

                {
                    page === "petcare" && (
                        <PetCare activePet={activePet} user={user} />
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
                    Cow-abunga! We're loading your mood data!
            </div>
        )
    }

}
