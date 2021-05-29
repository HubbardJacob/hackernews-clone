import React from 'react'
//import { useHistory } from 'react-router';
import { Link } from 'react-router-dom';

const Header = () => {

    //const history = useHistory()
    return (
        <div className="flex pa1 justify-between nowrap blue">
            <div className="flex flex-fixed black">
                <div className="fw7 mr1">Test App</div>
                <Link to="/" className="ml1 no-underline black">
                Users
                </Link>
                <div className="ml1">|</div>
                <Link to="/login" className="ml1 no-underline black">
                Login
                </Link>
            </div>
        </div>
    )
}

export default Header