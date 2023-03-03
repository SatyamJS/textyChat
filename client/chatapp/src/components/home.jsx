import React from "react";
import { Link } from "react-router-dom";
import { useState } from "react";

function Home(props) {
    const [input, setInput] = useState({})

    const changeBG = () => {
        const arr = ["#ffafbd", "#ffc3a0", "#2193b0", "#6dd5ed", "#cc2b5e", "#753a88", "#42275a", "#734b6d", "#de6262", "#ffb88c", "#eb3349", "#f45c43", "#56ab2f", "#a8e063", "#7b439", "7#dc2430"]
        const body = document.querySelector("body")
        let color1 = Math.floor(Math.random() * arr.length);
        let color2 = Math.floor(Math.random() * arr.length);
        body.style.backgroundImage = `linear-gradient(45deg,${arr[color1]} 30%,${arr[color2]})`;

    }

    const handleChange = (event) => {
        setInput(prev => {
            return { ...prev, [event.target.name]: event.target.value }
        })
    }
    const getAvatar = (event) => {
        setInput((prev) => {
            return {
                ...prev, avatar: event.target.nextSibling.alt
            }

        })
    }
    return (
        <>
            <div className="logoDiv">
                <img className="logoImage" src="logo.png" alt="Texty" />
                <button className="modeBtn" onClick={changeBG}>Change Background</button>
            </div>
            <div className="avatarDiv">
                <h4>Choose your avatar</h4>
                <div className="avatars">
                    {/* using radio button with overlapped image to select one out of many avatars */}
                    <div onClick={getAvatar}>
                        <input type="radio" name="avatar" />
                        <img src="1.png" alt="1.png"  />
                    </div>
                    <div  onClick={getAvatar} >
                        <input type="radio" name="avatar" />
                        <img src="2.png" alt="2.png"/>
                    </div>
                    <div onClick={getAvatar}>
                        <input type="radio" name="avatar" />
                        <img src="3.png" alt="3.png"  />
                    </div>
                    <div onClick={getAvatar}>
                        <input type="radio" name="avatar" />
                        <img src="4.png" alt="4.png"  />
                    </div>
                    <div onClick={getAvatar}>
                        <input type="radio" name="avatar" />
                        <img src="5.png" alt="5.png"  />
                    </div>
                    <div onClick={getAvatar}>
                        <input type="radio" name="avatar" />
                        <img src="6.png" alt="6.png"  />
                    </div>
                    <div onClick={getAvatar}>
                        <input type="radio" name="avatar" />
                        <img src="7.png" alt="7.png"  />
                    </div>
                    <div onClick={getAvatar}>
                        <input type="radio" name="avatar" />
                        <img src="8.png" alt="8.png"  />
                    </div>
                    <div onClick={getAvatar}>
                        <input type="radio" name="avatar" />
                        <img src="9.png" alt="9.png"  />
                    </div>
                    <div onClick={getAvatar} >
                        <input type="radio" name="avatar" />
                        <img src="10.png" alt="10.png" />

                    </div>
                </div>
            </div>
            <div className="inputBox">
                <input type="text" name="name" placeholder="Username" value={input.name || ""} onChange={handleChange} />
                <input type="text" name="roomId" placeholder="Room Id" value={input.roomId || ""} onChange={handleChange} />
                {(input.roomId && input.name && input.avatar)?
                <Link to="/chat"> <button className="buttonHome" onClick={(e)=>props.handleSubmit(e,input)}>Enter</button></Link>
                :
                <>
                <Link to="/"> <button className="buttonHome" onClick={(e)=>props.handleSubmit(e,input)}>Enter</button></Link>
                <span style={{color:"white"}}>Enter Room ID to join Room</span>
                </>

                }         
            </div>
            <div className="footer">Made with &#10084;&#65039; by Satyam 2023 </div>
        </>
    )
}
export default Home;