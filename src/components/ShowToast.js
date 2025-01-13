import React, { useEffect } from "react";

const ShowToast = ({ show, message, type, onClose }) => {
    useEffect(() => {
        if (show) {
            const timer = setTimeout(() => {
                onClose();
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [show, onClose]);


    if (!show) return null; // Don't render if not shown

    return (
        <div
            className={`toast show position-fixed bottom-0 end-0 m-3`}
            role="alert"
            aria-live="assertive"
            aria-atomic="true"
        >
            <div className={`toast-header ${type === "error" ? "bg-danger" : "bg-success"} text-white`}>
                <strong className="me-auto">{type === "error" ? "Error" : "Success"}</strong>
                <button type="button" className="btn-close" onClick={onClose}></button>
            </div>
            <div className="toast-body">{message}</div>
        </div>
    );
};

export default ShowToast;
