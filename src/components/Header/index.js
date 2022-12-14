import React from "react";
import config from "../../../config.json";
import {StyledHeader} from "./styles";


function Header() {
    return (
        <StyledHeader>
            <img className="banner" src={config.banner}/>
            <section className="user-info">
                <img className ="profile-photo" src={`https://github.com/${config.github}.png`} />
                <div>
                    <h2>{config.name}</h2>
                    <p>{config.subtext}</p>
                </div>

            </section>
        </StyledHeader>
    )
}

export default Header;