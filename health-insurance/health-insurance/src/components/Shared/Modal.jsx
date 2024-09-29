import React from 'react';

function Modal({ title, children, onClose }) {
    return (
        <div className="modal">
            <div className="modal-content">
                <h2>{title}</h2>
                {children}
                <button onClick={onClose}>Close</button>
            </div>
        </div>
    );
}

export default Modal;
