import React from 'react'
import welcomeImg from "../assets/welcomeImg.png"
import lockIcon from "../assets/lock.png"

const WelcomePage = ({isModal, closePopUp}) => {
    return (
        <div className="welcome" style={{ opacity: `${isModal ? '50%' : '100%'}` }} onClick={closePopUp}>
            <img src={welcomeImg} alt="" />
            <h2>Pocket Notes</h2>
            <p>Send and receive messages without keeping your phone online.</p>
            <p>Use Pocket Notes on up to 4 linked devices and 1 mobile phone</p>

            <p className="encryption">
                <img src={lockIcon} alt="" />
                <span>end-to-end encrypted</span>
            </p>
        </div>
    )
}

export default WelcomePage