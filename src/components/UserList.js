import React, { useState } from 'react'
import User from './User'
import { useQuery, gql } from '@apollo/client'

const ALL_USER_QUERY = gql`
    {
        users{
            id
            name
            email
        }
    }
`

const USER_BY_ID_QUERY = gql`
    query User($id: ID!){
        user(id: $id){
            id
            name
            email
        }
    }
`
const UserList = () => {
    const { data } = useQuery(ALL_USER_QUERY)

    return (
        <div>
            <h1>All Users</h1>
            {data && (
                <>
                    {data.users.map((user) => 
                        <User key={user.id} user={user}/>
                    )}
                </>
            )}

        </div>
    )
}

const UserByID = ({ id }) => {
    const { data, error } = useQuery(USER_BY_ID_QUERY, {
        variables: { id }
    })

    if(error){
        console.log(error.message)
    }
    return (
        <div>
            {data && data.user && (
                <>
                    <h1>User {data.user.id}</h1>
                    <User user={data.user}/>
                </>
            )}
            
        </div>
    )
}
const SelectUserID = () => {

    const [userIdState, setUserIdState] = useState( {id: -1} )

    return (
        <>
        <div>
            <input 
                type="text" 
                onChange={(e) => 
                    setUserIdState({id: e.target.value})
                }
                placeholder="enter a userId"
            />
        </div>
        <div>
            <UserByID id={userIdState.id}/>
        </div>

        </>
    )
    
}

export { UserList, SelectUserID }


