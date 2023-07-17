import React from 'react'
import logo from "./logo.svg"
import "./Header.css"
import {useSelector} from "react-redux"
const Header = () => {
    const emotion=useSelector((state)=>state.SetMessageReducer)
    return (
        <header>
            <div className='header__content'>
                <div className='logo'>
                    <img src={logo} alt="logo"/>
                </div>
                <div className='mood__Container'>
                    <div className='header_mood'>
                       {emotion?emotion: 'Mood'}
                    </div>
                </div>
            </div>
        </header>
    )
}

export default Header
