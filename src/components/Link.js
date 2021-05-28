import React from 'react'


const Link = (props) => {
    const { link } = props

    return (
        <div>
            <div style={{marginLeft: 20}}>
                
                {link.description} ({link.url}) &nbsp;
                <b>{new Date(parseInt(link.createdAt)).toLocaleString()}</b>
            </div>
        </div>
    )
}

export default Link;