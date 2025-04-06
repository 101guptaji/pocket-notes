import React, { useEffect } from 'react'
import plusIcon from "../assets/plusIcon.png"
import { useNavigate } from 'react-router-dom'

const SideMenu = ({ width, isModal, setIsModal, closePopUp, data, selectedGrp, setSelectedGrp }) => {
    const navigate = useNavigate();

    useEffect(() => {
        if (width < 768 && selectedGrp) {
            navigate('/main')
        }
    }, [selectedGrp, width])


    return (
        <div className="sidemenu" style={{ opacity: `${isModal ? '50%' : '100%'}` }} onClick={closePopUp}>
            <h1 className='heading'>Pocket Notes</h1>
            {
                data &&
                <ul className='grp-list'>
                    {
                        data.map((item) => {
                            return (
                                <li key={item?.id}
                                    onClick={() => setSelectedGrp(item)}
                                    style={{ backgroundColor: `${selectedGrp && item?.id === selectedGrp?.id ? '#e0dcdc' : 'white'}` }}>
                                    <span style={{ backgroundColor: item?.color, borderRadius: '100%' }}>{item?.logo}</span>
                                    {item?.title}
                                </li>
                            )
                        })
                    }
                </ul>
            }

            <button className='newgroup-btn'>
                <img src={plusIcon} alt="create new group" onClick={() => setIsModal(true)} />
            </button>
        </div>
    )
}

export default SideMenu