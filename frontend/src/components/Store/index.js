import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import gachapon from "../../assets/gachapon.png";
import { loadAllUserItems } from "../../store/petBgReducer";
import OpenModalButton from "../OpenModalButton";
import PetGachapon from "./PetGachapon";
export default function Store({ user }) {
    const dispatch = useDispatch();
    const [ showMenu, setShowMenu ] = useState(false);
    const [ isLoaded, setIsLoaded ] = useState(false);
    const closeMenu = () => setShowMenu(false);
    const userPets = useSelector(state => state.items.pets);
    console.log("userPets ===>", userPets)
    const userFlavors = [];

    useEffect(() => {
        dispatch(loadAllUserItems()).then(() => setIsLoaded(true));
    }, [dispatch])

    if (isLoaded) {
        Object.values(userPets).forEach(pet => userFlavors.push(pet.flavor));
        // console.log("userPets ===>", userFlavors)

        return (
            <div className="Store-container">
                <h1>Store stuff here</h1>
                <ul>
                    <li>Pets</li>
                    <li>Backgrounds</li>
                    <li>One-use pet items (ie toys, food)</li>
                </ul>
                <div className="Store-pet-gachapon">
                    <p>*** Pet gachapon here</p>
                    <OpenModalButton
                        buttonText={<img src={gachapon} alt="Pet gachapon" />}
                        onButtonClick={closeMenu}
                        modalComponent={<PetGachapon userFlavors={userFlavors} user={user} />}
                        buttonClass="Gachapon"
                    />
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
