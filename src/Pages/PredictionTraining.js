import React from "react";
import {useState} from "react"
import GenericCapture from '../Components/GenericCapture';

var PredictionTraining = () => {
  const axios = require('axios');
  let [userId, setUserId] = useState('0');
  let [outValue, setOutValue] = useState('0');
  let [isTraining, setTraining] = useState(true);


  function updateUserId(e){
    setUserId(e.target.value);
  }

  function updateOutValue(e) {
    setOutValue(e.target.value);
  }

  function updateIsTraining(e){
    setTraining(!isTraining);
  }

  function addToTrainingData(pictureString) {
    // KEEP FOR SWITCHING BETWEEN LIVE AND LOCAL BACKEND URL
    const LIVE_URL = process.env.REACT_APP_ML_URL;
    let ML_URL = (LIVE_URL) ? LIVE_URL : 'http://0.0.0.0:5000/';
    
    try {
      let data = {
        userId: userId,
        outputValue: parseInt(outValue),
        base64String: pictureString
      }
  
      axios
        .post(ML_URL + 'predict/training', data)
        .then(response => {
          console.log('Data added to Prediction Training Data');
        })
        .catch(error => {
          console.error(error);
        });
    } catch (e) {
      console.warn(e)
    }
  }

  function getPrediction(pictureString) {
    // KEEP FOR SWITCHING BETWEEN LIVE AND LOCAL BACKEND URL
    const LIVE_URL = process.env.REACT_APP_ML_URL;
    let ML_URL = (LIVE_URL) ? LIVE_URL : 'http://0.0.0.0:5000/';
    
    try {
      let data = {
        userId: userId,
        base64String: pictureString
      }
  
      axios
        .post(ML_URL + 'predict', data)
        .then(response => {
          console.log('Predicted Response: ', response.data);

          let p = [
            'Not listening',
            'Neutral',
            'Actively Listening'
          ]

          window.alert('The predicted response was: ' + 
            p[parseInt(response.data.result)] + 
            ' (' + response.data.result + ')'
          )
        })
        .catch(error => {
          console.error(error);
        });
    } catch (e) {
      console.warn(e)
    }
  }


  function onImageCapture(base64String){
    if(isTraining){
      if (window.confirm('Are you sure you want to add this picture as training Data?')) 
        addToTrainingData(base64String) 
    }else {
      getPrediction(base64String)
    }
  }

  return (
    <div>
      <div
        style={{
          width:"750px",
          display:"block", 
          marginLeft:"auto", 
          marginRight:"auto"
        }}
      >
        <label>
          UserId for data to be trained for: 
          <input type="text" value={userId} onChange={updateUserId} />
        </label>

        <label>
          Choose expected output:
          <select value={outValue} onChange={updateOutValue}>
            <option value='0'>Not listening</option>
            <option value='1'>Neutral</option>
            <option value='2'>Actively Listening</option>
          </select>
        </label>
        <label>
          Toggle Training
          <input type="checkbox" checked={isTraining} onChange={updateIsTraining}/>
        </label>
            
      </div>
      
      <div
        style={{
          marginTop:"-100px", 
        }}
      >
        <GenericCapture 
          showDev={'true'} 
          onCapture={onImageCapture}
        />
      </div>
    </div>
  )
}

export default PredictionTraining; 