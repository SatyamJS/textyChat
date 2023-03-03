import React from "react";
import { useEffect, useState } from "react";
import io from "socket.io-client"
import ScrollToBottom from "react-scroll-to-bottom"



let socket;


function Chat(props, location) {
    const name = props.data.name
    const roomId = props.data.roomId
    const avatar = props.data.avatar
    const ENDPOINT = "localhost:5000"
    const [message, setMessage] = useState("")
    const [messages, setMessages] = useState([])

    useEffect(() => {
        socket = io(ENDPOINT);
        socket.emit("join", props.data, () => {

        })

        return () => {
            socket.emit("disconnect")
            socket.off();
        }
    }, [ENDPOINT, location.search]);


   
     useEffect(() => {
        socket.on("message", (message) => {
            // setMessages([...messages, message]);
            const chatHeadImage =document.getElementsByClassName("chatHeader")[0].children[0]
            chatHeadImage.src=message.userInfo.avatar;
            const msgHead = document.createElement("div")
            msgHead.className="userMsgHeader"
            const senderName= document.getElementsByClassName("username")[0].innerHTML=`${message.userInfo.name}`
            const chatDiv = document.getElementsByClassName("chatBody")[0]
            const element = document.createElement("div")
            element.className = "left"
            const username = document.createTextNode(message.userInfo.name)
            const userNameSpan = document.createElement("span")
            userNameSpan.className="username"
            const timeSpan = document.createElement("span")
            timeSpan.className="timeSpan"


            const elementImage = document.createElement("img")
            elementImage.className = "recieverAvatar"
            elementImage.src = message.userInfo.avatar
            const text = document.createTextNode(message.text)


            // creating time stamp for reciever messages------->>>>. 
            let time = new Date()
            let chatTime = `${time.getHours()}:${time.getMinutes()}`
            chatTime = JSON.stringify(chatTime)
            chatTime = chatTime.split('"')[1]
            chatTime = chatTime.split(":")
            if (chatTime[1].length == 1) {
                chatTime = "  "+chatTime[0] + ":" + "0" + chatTime[1]
            }
            else {
                chatTime ="  " +chatTime[0] + ":" + chatTime[1]
            }
            const timeNode = document.createTextNode(chatTime)
            timeSpan.appendChild(timeNode)

            userNameSpan.appendChild(username)

            
            msgHead.appendChild(elementImage)
            msgHead.appendChild(userNameSpan)
            msgHead.appendChild(timeSpan)
    
            element.appendChild(msgHead)
            element.appendChild(text)
            chatDiv.appendChild(element)





        })
        scrollToBottom();
    }, [messages])





    const scrollToBottom = () => {
        const chatBody = document.querySelectorAll(".chatBody")
        chatBody[0].scrollTop = chatBody[0].scrollHeight

    }
    const changeBG = () => {
        const arr = ["#ffafbd", "#ffc3a0", "#2193b0", "#6dd5ed", "#cc2b5e", "#753a88", "#42275a", "#734b6d", "#de6262", "#ffb88c", "#eb3349", "#f45c43", "#56ab2f", "#a8e063", "#7b439", "7#dc2430"]
        const body = document.querySelector("body")
        let color1 = Math.floor(Math.random() * arr.length);
        let color2 = Math.floor(Math.random() * arr.length);
        body.style.backgroundImage = `linear-gradient(45deg,${arr[color1]} 30%,${arr[color2]})`;

    }
    const handleMessage = (event) => {
        setMessage(event.target.value)
    }
    const sendMessage = (event) => {
        event.preventDefault()
        if (message) {
            socket.emit("sendMessage", message, () => setMessage(""))
            
            let chatDiv = document.getElementsByClassName("chatBody")[0]
            const element = document.createElement("div")
            element.className = "right"
            const elementImage = document.createElement("img")
            elementImage.className = "recieverAvatar"
            elementImage.src = avatar
            const text = document.createTextNode(message)


            // creating time stamp for sender messages------->>>>. 
            let time = new Date()
            let chatTime = `${time.getHours()}:${time.getMinutes()}`
            chatTime = JSON.stringify(chatTime)
            chatTime = chatTime.split('"')[1]
            chatTime = chatTime.split(":")
            if (chatTime[1].length == 1) {
                chatTime = "  "+chatTime[0] + ":" + "0" + chatTime[1]
            }
            else {
                chatTime = "  "+chatTime[0] + ":" + chatTime[1]
            }
            const timeNode = document.createTextNode(chatTime)
            const wrapperDiv = document.createElement("div")
            const timeSpanRight = document.createElement("span")
            timeSpanRight.className="timeSpan"
            wrapperDiv.appendChild(text)
            wrapperDiv.appendChild(timeSpanRight)
            timeSpanRight.appendChild(timeNode)
            element.appendChild(elementImage)
            element.append(wrapperDiv)
            chatDiv.appendChild(element)

        }
        scrollToBottom();
        
    }

    return (
        <>
            <div className="logoDiv">
                <img className="logoImage" src="logo.png" alt="Texty" />
                <button className="modeBtn" onClick={changeBG}>Change Background</button>

            </div>


            <div className="chatDiv">

                <div className="chatHeader">
                    <img src={``} alt="" /> <span className="username"></span> <span className="online"></span> <span style={{ position: "relative", left: "10px", padding: "5px", backgroundColor: "black" }}>Room ID :{props.data.roomId}</span>
                </div>
                <div className="chatBody" >
                    {/* <div className="left">
                        <div className="userMsgHeader">

                            <img src="1.png" alt=""  className="recieverAvatar"/>
                            <span className="username">satyam</span>
                        </div>
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Laudantium dolore omnis sint necessitatibus odit molestiae tempora ipsam. Unde, molestiae dicta aperiam ab facere deserunt modi. Cum modi beatae odit magni ad illo?
                    </div> */}
                   
                </div>

                <div className="chatFooter">
                    <textarea className="chatInput" type="text" onChange={handleMessage} value={message} ></textarea>
                    <img className="sendBtn" src="send.png" alt="send" onClick={sendMessage} />
                </div>

            </div>


            <div className="footer">Made with &#10084;&#65039; by Satyam 2023 </div>
        </>
    )
}
export default Chat;