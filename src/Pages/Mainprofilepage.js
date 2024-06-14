import React from "react";
import Profile from "../Components/Profile";
import ProfileCard from "../Components/profileCard";
import "../Stylesheets/Profilestyles.css"
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
export default function Mainprofilepage(){
    return(
        <div>
            <Navbar/>
        <div className="mainprofilepagecontainer">
            <Profile/>
            <ProfileCard/>
        </div>
        <Footer/>
        </div>
    )
}