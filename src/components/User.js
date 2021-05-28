import React from 'react'


const User = (props) => {
    const user = props.user
    return (
        <div>
            {user.name} ({user.email})
        </div>
    )
}


export default User;