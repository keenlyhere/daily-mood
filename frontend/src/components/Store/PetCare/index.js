import { useDispatch } from "react-redux"
import { editPetInfo, loadUserActives } from "../../../store/petBgReducer";
import { spendPoints } from "../../../store/session";
import { petFood, petToys } from "../../../utils/petCare"
import "./PetCare.css"

export default function PetCare({ activePet, user }) {
    const dispatch = useDispatch();

    const buyFoodHandler = async (price) => {
        let newHealth = activePet.health + 5;

        if (newHealth > 100) {
            newHealth = 100;
        }

        const newPetDetails = {
            "name": activePet.name,
            "health": newHealth,
            "friendliness": activePet.friendliness
        };

        const usePoints = await dispatch(spendPoints({ "pointsSpent": price }))
            .then(dispatch(editPetInfo(activePet.id, newPetDetails)))
            .then(dispatch(loadUserActives()))

        return newPetDetails;
    }

    const buyToyHandler = async (price) => {
        let newFriendliness = activePet.friendliness + 5;

        if (newFriendliness > 100) {
            newFriendliness = 100;
        }

        const newPetDetails = {
            "name": activePet.name,
            "health": activePet.health,
            "friendliness": newFriendliness
        };

        const usePoints = await dispatch(spendPoints({ "pointsSpent": price }))
            .then(dispatch(editPetInfo(activePet.id, newPetDetails)))
            .then(dispatch(loadUserActives()))

        return newPetDetails;
    }

    return (
        <div className="PetCare-container">
            <h2 className="PetCare-header">Pet Food</h2>
            <p className="PetCare-text">Each food item is a single use item. When you purchase it, it will be automatically fed to your active pet and increase its health.</p>
            <p className="PetCare-text">Note: Pet health cannot go over 100.</p>
            <div className="Pet-gachapon-prizes">
                { petFood.map((food, idx) => (
                    <div key={idx} className="Pet-gachapon-card">
                        <div className="Bg-gachapon-card-image">
                            <img src={food.imageUrl} className={`Bg-gachapon-bg`} alt="Gachapon background prize" />
                        </div>
                        <div className="Pet-gachapon-description">
                            <h2 className="Pet-gachapon-flavor">
                                {food.name}
                            </h2>

                            <p className="Pet-gachapon-want PetCare-description">
                                {food.description}
                            </p>
                            <h3 className="Pet-gachapon-want">
                                Cost: {food.price} moolah
                            </h3>
                            { user.moolah < food.price ? (
                                <button
                                    className="Pet-gachapon-play disabled"
                                    disabled={true}
                                >
                                    Not enough moolah
                                </button>
                            ) : (
                                <>
                                {
                                    activePet.health >= 100 ? (
                                        <button
                                            className="Pet-gachapon-play disabled"
                                            disabled={true}
                                        >
                                            Pet is full
                                        </button>
                                    ) : (
                                        <button
                                            className="Pet-gachapon-play"
                                            onClick={() => buyFoodHandler(food.price)}
                                        >
                                            Feed Pet
                                        </button>
                                    )
                                }
                                </>
                            )}

                        </div>
                    </div>
                ))}
            </div>
            <h2 className="PetCare-header">Pet Toys</h2>
            <p className="PetCare-text">Rent a toy to play with your moo once! It will boost your active pet's friendliness toward you!</p>
            <p className="PetCare-text">Note: Pet friendliness cannot go over 100.</p>
            <div className="Pet-gachapon-prizes">
                { petToys.map((toy, idx) => (
                    <div key={idx} className="Pet-gachapon-card">
                        <div className="Bg-gachapon-card-image">
                            <img src={toy.imageUrl} className="Toy-image" alt="Gachapon background prize" />
                        </div>
                        <div className="Pet-gachapon-description">
                            <h2 className="Pet-gachapon-flavor">
                                {toy.name}
                            </h2>

                            <p className="Pet-gachapon-want PetCare-description">
                                {toy.description}
                            </p>
                            <h3 className="Pet-gachapon-want">
                                Cost: {toy.price} moolah
                            </h3>
                            {
                                activePet.friendliness >= 100 ? (
                                    <button
                                        className="Pet-gachapon-play disabled"
                                        disabled={true}
                                    >
                                        Pet is full
                                    </button>
                                ) : (
                                    <button
                                        className="Pet-gachapon-play"
                                        onClick={() => buyToyHandler(toy.price)}
                                    >
                                        Buy
                                    </button>
                                )
                            }

                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
