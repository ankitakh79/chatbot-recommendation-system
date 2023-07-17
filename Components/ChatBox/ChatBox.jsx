import React,{useEffect} from 'react'
import axios from "axios"
import "./ChatBox.css"
import sendChatBtn from "./sendChatBtn.svg"
import {useDispatch} from "react-redux"
import {emotionActions} from "./../../actions/index"



const ChatBox = () => {
    const dispatch=useDispatch()
    const [currentChat,setCurrentChat]=React.useState("")
    const [messeges,setMesseges]=React.useState([
        {
            type:"reciver",
            message:"What's on your mind?"
        }
    ])

    const recommend=async()=>{
        let lastmsgr;
        for(let i=messeges.length-1;i>=0;i--){
            if(messeges[i].type==="sender"){
                lastmsgr=messeges[i].message
                break;
            }
        }
        const emotion=await axios.post("https://chatbotsong.onrender.com/emotion/emotionAnalysis",{
            lastmsg:lastmsgr,
            
        })
        dispatch(emotionActions(emotion.data.emotion))
    }

    const handelMessegeToBeSent=async()=>{
        setCurrentChat("")
        setMesseges(oldArray => [...oldArray,{
            type:"sender",
            "message":currentChat
        }])
        const {data}= await axios.post('https://chatbotsong.onrender.com/chatBot/newMessegeToBot',{
            newmsg:currentChat,
            id:localStorage.getItem("id")
        })
        setMesseges(oldArray => [...oldArray,{
            type:"reciver",
            "message":data.message
        }])
    }

    const handelCurrentChat=(e)=>{
        setCurrentChat(e.target.value)
    }
    const chatbotin=React.useRef(null)
    const newIncommingChatDetected=React.useRef(null)
    const scrolltoBottom=()=>{
        newIncommingChatDetected.current.scrollTop=newIncommingChatDetected.current.scrollHeight
    }
    const handleEnterKey=(event)=>{
        console.log(event.keyCode)
        event.preventDefault();

        if (event.keyCode === 13) {
            chatbotin.current.click()
        }
    }
    useEffect(()=>{
        scrolltoBottom()
    },[currentChat,messeges])
    return (
        <div className='chatBox_container'>
            <div className='chatBox__display' ref={newIncommingChatDetected}>
                {messeges.map((mes,index)=>(
                    mes.type==="reciver"?
                    (
                        <div data-aos="fade-up" key={index} className='messege reciver'>
                            <p>{mes.message}</p>
                        </div>
                    ):
                    (
                        <div data-aos="fade-up" key={index} className='messege sender'>
                        <p>{mes.message}</p>
                        </div>
                    )
                ))}
                
                
                

                
            </div>
            <div className='chatBox_inputs'>
            <input type={"text"} onChange={handelCurrentChat} onKeyUp={handleEnterKey}  name="currentChat" value={currentChat} />
            <img src={sendChatBtn} onClick={handelMessegeToBeSent} ref={chatbotin} alt="sendBTN"/>
            </div>
            <div className='chatBox__Recommend_Button' onClick={recommend}>
            Recommend!
            </div>
        </div>
    )
}

export default ChatBox
