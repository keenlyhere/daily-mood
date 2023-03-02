import { useState } from "react";
import { useDispatch } from "react-redux";
import { editPetInfo, loadAllUserItems } from "../../../store/petBgReducer";

export default function EditPet({ user, pet, petToEdit, endEditPet }) {
    const dispatch = useDispatch();
    const [ petName, setPetName ] = useState(pet.name);
    const [ activeInput, setActiveInput ] = useState(false);
    const [ errors, setErrors ] = useState([]);

    const startActiveInput = (e) => {
        setActiveInput(true);
    }

    const endActiveInput = (e) => {
        setActiveInput(false)
    }

    const handlePetNameChange = (e) => {
        e.preventDefault();

        const newPetInfo = {
            "name": petName
        }

        dispatch(editPetInfo(pet.id, newPetInfo))
            .then(() => endActiveInput())
            // .then(() => dispatch(loadCurrentDayTasks(user.id)))
            .catch(async (res) => {
                const data = await res.json();
                if (data && data.errors) setErrors(data.errors);
            })

        endActiveInput();
        endEditPet();
    }

    const onKeyDown = (e) => {
        // console.log("e.key", e.key)
        if (e.key === "Enter") {
            if (e.target.value.trim() === "") {
                setPetName(pet.name);
            } else {
                setPetName(e.target.value);
            }

            const newPetInfo = {
                "name": petName,
                "setActive": false
            }

            dispatch(editPetInfo(pet.id, newPetInfo))
                .catch(async (res) => {
                    const data = await res.json();
                    if (data && data.errors) setErrors(data.errors);
                })
            dispatch(loadAllUserItems());
            endActiveInput();
            endEditPet();
        }
    }

    return (
        // <h2 className="Pet-gachapon-flavor">
        //     {pet.name}
        // </h2>
        <div className="Pet-gachapon-flavor PetName-header">
            <form className="Pet-edit-form">
                <input
                    className="Pet-edit-input Pet-edit"
                    value={petName}
                    onChange={(e) => setPetName(e.target.value)}
                    onKeyDown={onKeyDown}
                />
                <button
                    className={`UserTasks-category-save Pet-edit ${petName.length < 3 || petName.length > 12 ? "isDisabled" : ""}`}
                    onClick={handlePetNameChange}
                    disabled={petName.length > 12 || petName.length < 1 ? true : false}
                >
                    Save
                </button>
            </form>
            <div className="Pet-edit-error-text">
                {petName.length > 12 ? "Max. 12 characters" : ""}
                {petName.length < 3 ? "Min. 3 characters" : ""}
            </div>
        </div>
    )
}
