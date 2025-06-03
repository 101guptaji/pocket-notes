import React, {useEffect} from 'react'
import { useNavigate } from 'react-router-dom';

const NavigateMain = ({width}) => {
    const navigate = useNavigate();

    useEffect(() => {
        if (width >= 768) {
            navigate('/');
        }
    }, [width, navigate]);

    return (
        <div>Navigating to Home</div>
    )
}

export default NavigateMain