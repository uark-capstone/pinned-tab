import React from "react";
import {useEffect, useState} from "react"
import WebcamCapture from '../Components/WebcamCapture';
import "../Components/App.css";

const CapturePage=()=>{
    return (
        <div class = "video">
           <WebcamCapture/>
        </div>
    )
}

export default CapturePage; 