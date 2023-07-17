import React from 'react'
import "./EachSong.css"
const EachSong = ({name,uri,artist,imgUri}) => {
    return (
        <a className='eachSong__Container' href={uri}>
            <div className='song__cover'>
            <img src={imgUri} alt={name}/>
            </div>
            <div className='song__info'>
                <p>{name.length>25?`${name.substring(0,25).replace("/n"," ")}...}`:name.replace("/n"," ")}</p>
                <p>{artist.length>25?`${artist.substring(0,25).replace("/n"," ")}...}`:artist.replace("/n"," ")}</p>
            </div>
        </a>
    )
}

export default EachSong
