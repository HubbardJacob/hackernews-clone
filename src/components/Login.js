import React, { useState } from 'react'
import { useMutation, gql } from '@apollo/client'
//import { Link } from 'react-router-dom'
import { useHistory } from 'react-router'



const SIGNUP_MUTATION = gql`
  mutation SignupMutation(
    $email: String!
    $password: String!
    $name: String!
  ) {
    signup(email: $email, password: $password, name: $name) {
      token
      user {
        name
        email
      }
    }
  }
`

const LOGIN_MUTATION = gql`
  mutation LoginMutation(
    $email: String!
    $password: String!
  ) {
    login(email: $email, password: $password) {
      token
    }
  }
`

const ALL_USER_QUERY = gql`
    {
        users{
            id
            name
            email
        }
    }
`




const Login = () => {
    const history = useHistory();
    const [formState, setFormState] = useState({
      login: true,
      email: '',
      password: '',
      name: ''
    });

    const [signup] = useMutation(SIGNUP_MUTATION, {
      variables :{
        email: formState.email,
        password: formState.password,
        name: formState.name
      },

      update: (cache, { data: { signup }}) => {
        const data = cache.readQuery({
          query: ALL_USER_QUERY
        })

        cache.writeQuery({
          query: ALL_USER_QUERY,
          data: {
            users: [...data.users, signup.user]
          }
        })
      },

      onCompleted: () => history.push("/"),
      onError: (err) => console.log(err.message) 
    })

    const [login] = useMutation(LOGIN_MUTATION, {
      variables :{
        email: formState.email,
        password: formState.password,
      },
      onCompleted: ({ login }) => {
        console.log(login.token)
        history.push("/")
      }
    })
  
    return (
      <div>
        <h4 className="mv3">
          {formState.login ? 'Login' : 'Sign Up'}
        </h4>
        <div className="flex flex-column">
          {!formState.login && (
            <input
              value={formState.name}
              onChange={(e) =>
                setFormState({
                  ...formState,
                  name: e.target.value
                })
              }
              type="text"
              placeholder="Your name"
            />
          )}
          <input
            value={formState.email}
            onChange={(e) =>
              setFormState({
                ...formState,
                email: e.target.value
              })
            }
            type="text"
            placeholder="Your email address"
          />
          <input
            value={formState.password}
            onChange={(e) =>
              setFormState({
                ...formState,
                password: e.target.value
              })
            }
            type="password"
            placeholder="Choose a safe password"
          />
        </div>
        <div className="flex mt3">
          <button
            className="pointer mr2 button"
            onClick={() => {formState.login ? login() : signup()}}
          >
            {formState.login ? 'login' : 'create account'}
          </button>
          <button
            className="pointer button"
            onClick={(e) =>
              setFormState({
                ...formState,
                login: !formState.login
              })
            }
          >
            {formState.login
              ? 'need to create an account?'
              : 'already have an account?'}
          </button>
        </div>
      </div>
    );
  };
  
  export default Login;