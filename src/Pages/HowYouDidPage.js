import React from "react";
import { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import "../reportingpage.css";
import { Dropdown } from "react-bootstrap";
import useEmotionsByLecture from "../Hooks/useEmotionsByLecture";
import useGetAllLectures from "../Hooks/useGetAllLectures";
import Chart from 'chart.js'

/**
 * Refer here for the library https://www.npmjs.com/package/react-chartjs-2 and you can see all the props you can
 * pass it!!
 */

 const gatherData = (input_data) => {
  let emotion_values = [
    'Not listening',
    'Neutral',
    'Actively Listening'
  ]

  let hacked_users = [
    'Allison',
    'Caleb',
    'Cassidy',
    'Gage',
    'Ryan'
  ]

  // sort into dict for each user
  let data_dict = {}
  let labels = []

  input_data.forEach(element => {
    let timestamp = new Date(element.timestamp)
    timestamp = timestamp.valueOf()
    // timestamp = timestamp.toLocaleTimeString([], {year: 'numeric', month: 'numeric', day: 'numeric', hour: '2-digit', minute: '2-digit'})

    let value = emotion_values.findIndex(x => x == element.emotions)

    let data_entry = {
      x: timestamp,
      y: value
    }

    if (element.user_id in data_dict){
      data_dict[element.user_id].data.push(data_entry)
    }else {
      data_dict[element.user_id] = {
        user_id: element.user_id,
        name: (element.user_id <= hacked_users.length)? hacked_users[element.user_id - 1] : element.user_id,
        data: []
      }
      data_dict[element.user_id].data.push(data_entry)
    }

    if (!labels.includes(timestamp)){
      labels.push(timestamp)
    }

  });

  let data_sets = []

  let minDate = null;
  let maxDate = null;

  for(var key in data_dict) {
    // let localMin = data_dict[key].data.reduce((min, p) => new Date(p.x) < new Date(min) ? p.x : min, new Date(data_dict[key].data.x));
    // let localMax = data_dict[key].data.reduce((max, p) => p.x > max ? p.x : max, data_dict[key].data.y);

    // localMin = new Date(localMin)
    // localMax = new Date(localMax)

    // if (minDate == null || localMin < minDate ){
    //   minDate = localMin
    // }

    // if (maxDate == null || localMax > maxDate ){
    //   maxDate = localMax
    // }

    let r = getRandomIntInclusive(0, 255).toString()
    let g = getRandomIntInclusive(0, 255).toString()
    let b = getRandomIntInclusive(0, 255).toString()

    data_sets.push({
      label: data_dict[key].name,
      fill: false,
      borderColor: 'rgb(' + r + ',' + g + ',' + b + ')',
      data: data_dict[key].data
    })

  }

  // let labels = generateLabels(minDate, maxDate, 5);

  return {
    labels: labels,
    datasets: data_sets
  }

}

const generateLabels = (start, end, binning) => {
  console.log(start)
  console.log(end)

  let labels = []
  while (start < end) {
    labels.push(start.toLocaleString())
    start = new Date(start.getTime() + binning*60000);
  }

  return labels;
}

const getRandomIntInclusive = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min); //The maximum is inclusive and the minimum is inclusive
}

const HowYouDidPage = () => {
  const [lectureID, setLectureID] = useState(105);

  //CALLING HOOKS
  let emotions = useEmotionsByLecture(lectureID);
  const {
    lectures,
    isAllLecturesError,
    isAllLecturesLoaded,
  } = useGetAllLectures();

  let chart = null;

  useEffect(() =>{
    let emotion_values = [
      'Not listening',
      'Neutral',
      'Actively Listening'
    ]

    var ctx = document.getElementById('myChart').getContext('2d');
    if (window.MyChart != undefined)
      window.MyChart.destroy();

    window.MyChart = new Chart(ctx, {
      type: 'line',
      data: gatherData(emotions),
      options: {
        responsive:true,
        maintainAspectRatio: false,
        scales: {
          yAxes: [{
            ticks: {
              min: 0,
              max: 2,
              stepSize: 1,
              callback: function(value, index, values) {
                return emotion_values[value];
              }
            }
          }],
          xAxes: [{
            ticks: {
              min: 0,
              max: 50,
              stepSize: 1,
              callback: function(value, index, values) {
                let d = new Date(value);
                return d.toLocaleString()
              }
            }
          }]
        }
      }
    });
    
    console.log('data', window.MyChart.data)

  }, [emotions])


  return (
    <div>
      <div className="d-flex justify-content-center">
        <div
          className="shadow p-3 mb-5 bg-white rounded w-50 "
          id="shadow"
          align="center"
        >
          <canvas id="myChart" width="1" height="1"></canvas>
          <Dropdown>
            <Dropdown.Toggle variant="success" id="dropdownMenu">
              Session
            </Dropdown.Toggle>
            <Dropdown.Menu className="dropdown-menu">
              {lectures.map((eachLecture, idx) => (
                <Dropdown.Item 
                  key={idx}
                  onClick={(e) => setLectureID(eachLecture.id)}>
                  {eachLecture.lectureName}
                </Dropdown.Item>
              ))}
            </Dropdown.Menu>
          </Dropdown>
        </div>
      </div>
    </div>
  );
};

export default HowYouDidPage;
