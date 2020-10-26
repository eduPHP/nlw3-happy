import React, {useContext} from 'react';
import '../styles/components/toast.css'
import {AppContext} from "../contexts/app";

const Toasts = () => {
    const { toasts, removeToast } = useContext(AppContext);

    return (
        <div className="notification-container">
            {toasts.map((toast, i) =>
                <div key={i} className="notification">
                    <button onClick={() => removeToast(i)}>
                        x
                    </button>
                    <div className="notification-image">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 477.867 477.867"><path d="M238.933 0C106.974 0 0 106.974 0 238.933s106.974 238.933 238.933 238.933 238.933-106.974 238.933-238.933C477.726 107.033 370.834.141 238.933 0zm0 443.733c-113.108 0-204.8-91.692-204.8-204.8s91.692-204.8 204.8-204.8 204.8 91.692 204.8 204.8c-.122 113.058-91.742 204.678-204.8 204.8z"/><path d="M370.046 141.534c-6.614-6.388-17.099-6.388-23.712 0l-158.601 158.6-56.201-56.201c-6.548-6.78-17.353-6.967-24.132-.419-6.78 6.548-6.967 17.353-.419 24.132.137.142.277.282.419.419l68.267 68.267c6.664 6.663 17.468 6.663 24.132 0l170.667-170.667c6.548-6.779 6.36-17.583-.42-24.131z"/></svg>
                    </div>
                    <div>
                        <p className="notification-title">{toast.title}</p>
                        <p className="notification-message">
                            {toast.message}
                        </p>
                    </div>
                </div>
            )}
        </div>
    )
}

export default Toasts;
