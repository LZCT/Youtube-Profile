import React, { useEffect } from "react";
import Menu from "../src/components/Menu";
import Header from "../src/components/Header";
import Timeline from "../src/components/Timeline";


function HomePage() {
    // State with the value the user searched for
    const [searchValue, setSearchValue] = React.useState("");
    
    return (
        <>
        <div>
            <Menu searchValue={searchValue} setSearchValue={setSearchValue}/>
            <Header/>
            <Timeline searchValue={searchValue}/>
        </div>
        </>
    )
}

export default HomePage;








