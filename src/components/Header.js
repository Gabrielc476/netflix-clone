import React from "react";
import './Header.css'



export default ({black}) => {
    return(
        <header className={black ? 'black' : ''}>
            <div className="header--logo">
                <a href="/">
                    <img src="https://www.caviarcriativo.com/storage/2020/06/logotipo-da-netflix.jpg"></img>
                </a>
            </div>
            <div className="header--user">
                <a href="/">
                    <img src="https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png"></img>
                </a>
            </div>
        </header>
    )
}