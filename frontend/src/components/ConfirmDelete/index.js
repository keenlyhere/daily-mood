import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router";
import { useModal } from "../../context/Modal";

import "./ConfirmDelete.css";

export default function ConfirmDelete({ currentImage, onDelete }) {
    const dispatch = useDispatch();
    const history = useHistory()
    const { closeModal } = useModal();

    const handleDelete = async () => {
        await onDelete().then(() => closeModal())
    }

    return (
        <div className="ConfirmDelete-container">
            <div className="ConfirmDelete-top">
                <button
                    className="ConfirmDelete-close"
                    onClick={closeModal}
                >
                    <i className="fa-sharp fa-solid fa-xmark"></i>
                </button>
                <h2 className="ConfirmDelete-top-header">Are you sure?</h2>
            </div>
            <p className="ConfirmDelete-message">
                Do you really want to delete this? <br /> This process cannot be undone.
            </p>

            <div className="ConfirmDelete-button-container">
                <button
                    onClick={closeModal}
                    className="ConfirmDelete-cancel-button"
                >
                    Cancel
                </button>
                <button
                    onClick={handleDelete}
                    className="ConfirmDelete-delete-button"
                >
                    Delete
                </button>
            </div>
        </div>
    )
}
