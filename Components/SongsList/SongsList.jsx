import React,{useEffect,useState} from 'react'
import "./SongList.css"
import EachSong from './EachSong/EachSong'
import {useSelector} from "react-redux"
import axios from 'axios'

const SongsList = () => {
    const [songs,setSongs]=useState([])
    const emotion=useSelector((state)=>state.SetMessageReducer)
    console.log(emotion)
    const fetchSongsForEmotions=async(emotion)=>{
        let {data}=await axios.post("https://chatbotsong.onrender.com/emotionsongs/getSongs",{
                "emotion":emotion
        })
        setSongs([])
        setSongs((previous)=>([...previous,data.emotionbasedSong]))
    }
    useEffect(()=>{
        
        fetchSongsForEmotions(emotion)
    },[emotion])
    return (
        
        <div className='songList'>
            {songs.length!==0?(
                songs[0].map((son)=>(
                    <EachSong name={son.name} uri={son.uri} artist={son.artist} imgUri={son.imgUri}/>
                ))
            ):null}
            {console.log(songs)}
        </div>
    )
}

export default SongsList
