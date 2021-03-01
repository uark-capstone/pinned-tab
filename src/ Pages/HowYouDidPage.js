import React from "react";
import { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import NavBar from "../Components/NavigationBar";
import "../reportingpage.css";
import { Dropdown } from "react-bootstrap";
import useEmotionsByLecture from "../Hooks/useEmotionsByLecture";
import useGetAllLectures from "../Hooks/useGetAllLectures";

/**
 * Refer here for the library https://www.npmjs.com/package/react-chartjs-2 and you can see all the props you can
 * pass it!!
 */

const HowYouDidPage = () => {
  const {
    emotions,
    isErrorAllEmotions,
    isLoadedAllEmotions,
  } = useEmotionsByLecture("1");
  const {
    lectures,
    isAllLecturesError,
    isAllLecturesLoaded,
  } = useGetAllLectures();

  console.log("lectures", lectures);
  var jsonData = null;

  jsonData = emotions.sort((x, y) => (x.timestamp > y.timestamp ? 1 : -1));

  var score = {
    HAPPY: 0,
    SAD: 0,
    CONFUSED: 0,
    DISGUSTED: 0,
    SURPRISED: 0,
    CALM: 0,
    UNKNOWN: 0,
    FEAR: 0,
  };

  var chartData = {
    HAPPY: {},
    SAD: {},
    CONFUSED: {},
    DISGUSTED: {},
    SURPRISED: {},
    CALM: {},
    UNKNOWN: {},
    FEAR: {},
  };

  var points = {
    HAPPY: [],
    SAD: [],
    CONFUSED: [],
    DISGUSTED: [],
    SURPRISED: [],
    CALM: [],
    UNKNOWN: [],
    FEAR: [],
  };

  // For timestamp, an ordered pair is assigned.//
  var dataPoints = {};

  var total = 0;
  var laughScore = 0;
  var surpriseScore = 0;
  var happyScore = 0;
  var comments = [
    "No news is better than good news!",
    "Quiet day today!",
    "Great job, as always!",
    "It looks like they really liked what you had to say!",
    "You made them laugh a lot today!",
    "Looks like they really learned a lot!",
    "Great job, you're really engaging your students!",
    "Looks like your students were a little sad today.",
    "Looks like some students were grossed out!",
    "Looks like a few students actually got scared! Yikes!",
  ];
  var chartComment = "";
  var seed = Math.floor(Math.random() * 100);
  var possibleComments = [];
  var chartTicks = [];

  for (var i = 0; i < jsonData.length; i++) {
    var time = new Date(jsonData[i].timestamp).toLocaleTimeString("GMT", {
      hour: "2-digit",
      minute: "2-digit",
    });
    if (time.charAt(0) === "0") {
      time = time.substring(1);
    }
    score[jsonData[i].emotions] += 1;
    if (chartTicks.includes(time) == false) {
      chartTicks.push(time);
    }

    if (chartData[jsonData[i].emotions][time]) {
      chartData[jsonData[i].emotions][time] += 1;
    } else {
      chartData[jsonData[i].emotions][time] = 1;
    }

    var keys = Object.keys(chartData);

    keys.splice(keys.indexOf(jsonData[i].emotions), 1);
    keys.forEach((item) => {
      if (chartData[item][time]) {
        chartData[item][time] += 0;
      } else {
        chartData[item][time] = 0;
      }
    });
  }

  for (const [key, value] of Object.entries(chartData)) {
    for (const [innerkey, innervalue] of Object.entries(chartData[key])) {
      points[key].push(value[innerkey]);
    }
  }

  //More random comment-picking code. Once again, it's mostly for fun.//

  if (score["CALM"] > 1) {
    possibleComments.push(comments[1]);
    possibleComments.push(comments[2]);
    possibleComments.push(comments[5]);
  }
  if (score["SAD"] > 1) {
    possibleComments.push(comments[7]);
  }
  if (score["HAPPY"] > 1) {
    possibleComments.push(comments[3], comments[4]);
  }
  if (score["DISGUSTED"] > 1) {
    possibleComments.push(comments[8]);
  }
  if (score["FEAR"] > 1) {
    possibleComments.push(comments[9]);
  }

  chartComment = possibleComments[seed % possibleComments.length];

  const state = {
    responsive: true,
    labels: chartTicks,
    datasets: [
      {
        data: points["CALM"],
        label: "Calm",
        backgroundColor: "#ff602a",
        borderColor: "#ff602a",
        fill: false,
        fontColor: "black",
      },
      {
        data: points["SURPRISED"],
        label: "Surprised",
        backgroundColor: "#2a48ff",
        borderColor: "#2a48ff",
        fill: false,
        fontColor: "black",
      },

      {
        data: points["HAPPY"],
        label: "Happy",
        backgroundColor: "#d518d5",
        borderColor: "#d518d5",
        fill: false,
        fontColor: "black",
      },

      {
        data: points["DISGUSTED"],
        label: "Disguested",
        backgroundColor: "purple",
        borderColor: "purple",
        fill: false,
        fontColor: "black",
      },
      {
        data: points["CONFUSED"],
        label: "Confused",
        backgroundColor: "grey",
        borderColor: "grey",
        fill: false,
        fontColor: "black",
      },

      {
        data: points["UNKNOWN"],
        label: "Other",
        backgroundColor: "orange",
        borderColor: "orange",
        fill: false,
        fontColor: "black",
      },
      {
        data: points["SAD"],
        label: "Sad",
        backgroundColor: "black",
        borderColor: "black",
        fill: false,
        fontColor: "black",
      },
    ],
  };

  return (
    <div>
      <NavBar />
      <div className="d-flex justify-content-center">
        <div
          className="shadow p-3 mb-5 bg-white rounded w-50 "
          id="shadow"
          align="center"
        >
          <div className="chart">
            <Line
              width="1"
              height="1"
              data={state}
              options={{
                title: {
                  display: true,
                  text: chartComment,
                  fontColor: "black",
                  defaultFontFamily: "Roboto",
                  defaultFontSize: 14,
                },
                legend: {
                  display: true,
                  labels: {
                    font: {
                      family: "Roboto",
                    },
                  },
                },
              }}
            />
          </div>
          <Dropdown>
            <Dropdown.Toggle variant="success" id="dropdownMenu">
              Session
            </Dropdown.Toggle>
            <Dropdown.Menu className="dropdown-menu">
              {lectures.map((eachLecture, idx) => (
                <Dropdown.Item key={idx}>
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
