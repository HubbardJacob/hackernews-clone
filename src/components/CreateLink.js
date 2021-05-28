import React, { useState } from 'react'
import { useMutation, gql } from '@apollo/client';

const CREATE_LINK_MUTATION = gql`
  mutation PostMutation(
    $description: String!
    $url: String!
  ) {
    postLink(description: $description, url: $url) {
      id
      createdAt
      url
      description
    }
  }
`;

const CreateLink  = () => {
    const [formState, setFormState] = useState({
        description: '',
        url: ''
    })

    const [successState, setSuccessState] = useState("")

    const [createLink, { error }] = useMutation(CREATE_LINK_MUTATION, {
        variables: {
            description : formState.description,
            url: formState.url
        },
        onError: () => setSuccessState("Creation Failed"),
        onCompleted: () => setSuccessState("Creation Success")
    }, )

    if(error){
        console.log(error.message)
    }
    
    return (
        <div>
            <div>{successState}</div>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              createLink();
            }}
          >
            <div className="flex flex-column mt3">
              <input
                className="mb2"
                value={formState.description}
                onChange={(e) =>
                  setFormState({
                    ...formState,
                    description: e.target.value
                  })
                }
                type="text"
                placeholder="A description for the link"
              />
              <input
                className="mb2"
                value={formState.url}
                onChange={(e) =>
                  setFormState({
                    ...formState,
                    url: e.target.value
                  })
                }
                type="text"
                placeholder="The URL for the link"
              />
            </div>
            <button type="submit">Submit</button>
          </form>
        </div>
      )
}

export default CreateLink;