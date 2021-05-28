import React, { useState } from 'react'
import { useMutation, gql } from '@apollo/client'



const SIGNUP_MUTATION = gql`
  mutation SignupMutation(
    $email: String!
    $password: String!
    $name: String!
  ) {
    signup(email: $email, password: $password, name: $name) {
      token
      user {
          id
          name
      }
    }
  }
`


const Signup = () => {

    const [signupState, setSignupState] = useState({
        email: '',
        password: '',
        name: '',
        authPayload:{
            token: '',
            userName: '' 
        }
    })

    const [sendSignup] = useMutation(SIGNUP_MUTATION, {
        variables: {
            ...signupState
        },
        onError: (err) => console.log(err.message),
        onCompleted: ({signup}) => {
            const user = signup.user
            setSignupState({
                ...signupState,
                authPayload: {
                    token: signup.token,
                    userName: user.name
                }
            })
            console.log(signupState.authPayload)
        }
    }) 


    return (
        <div>
            <h1>Signup</h1>
            <div>
                Token: <b>{signupState.authPayload.token}</b> <br/>
                Name: <b>{signupState.authPayload.userName}</b>
            </div>
            <form onSubmit={(e) => {
                e.preventDefault()
                sendSignup()
            }}
            >
                <div className="flex flex-column mt3">
                    <input 
                        className="mb2"
                        value={signupState.name}
                        onChange={(e) => 
                            setSignupState({
                                ...signupState,
                                name: e.target.value
                            })
                        }
                        type="text"
                        placeholder="Username"
                    />
                    <input 
                        className="mb2"
                        value={signupState.email}
                        onChange={(e) => 
                            setSignupState({
                                ...signupState,
                                email: e.target.value
                            })
                        }
                        type="text"
                        placeholder="Email"
                    />

                    <input 
                        className="mb2"
                        value={signupState.password}
                        onChange={(e) => 
                            setSignupState({
                                ...signupState,
                                password: e.target.value
                            })
                        }
                        type="password"
                        placeholder="Password"
                    />
                </div>

                <button type="submit">Create Account</button>
            </form>


        </div>
    )




}

export default Signup