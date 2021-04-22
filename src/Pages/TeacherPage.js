import React from "react";
import { useEffect, useState } from "react";
import Fab from "@material-ui/core/Fab";
import Button from "@material-ui/core/Button";
import { Form } from "react-bootstrap";
import AddIcon from "@material-ui/icons/Add";
import TextField from "@material-ui/core/TextField";

import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { useHistory } from "react-router-dom";


import useGetAllClasses from "../Hooks/useGetAllClasses";
import useExcelSheetReadFile from "../Hooks/useExcelSheetReadFile";
import useGetAllLecturesById from "../Hooks/useGetAllLecturesById";
import "../reportingpage.css";
const TeacherPage = () => {
  let history = useHistory();

  //STATE MANAGEMENT
  const LIVE_URL = process.env.REACT_APP_BACKEND_URL;
  const [isSelected, setIsSelected] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [selectedCourseById, setSelectedCourseById] = useState(1)
  const [formDataFinal, setFormDataFinal] = useState(null);
  //const [lectureByClassID, setLectureByClassID] = useState(null);
  const axios = require('axios')
  //REACT HOOKS
  const { classes, isClassesError, isClassesLoaded } = useGetAllClasses(126);
  const {
    isAllLecturesByIdError,
    isAllLecturesByIdLoaded,
    lecturesById,
  } = useGetAllLecturesById(selectedCourseById);
  const { result, error } = useExcelSheetReadFile(
    formDataFinal,
    "classRoster/uploadClassRoster"
  );

  //ONCHANGE FUNCTIONS
  const importStudentsClicked = (e) => {};
  const selectingCourse = (e) => {};
  const changeHandler = (event) => {
    setSelectedFile(event.target.files[0]);
    setIsSelected(true);
  };

  const [open, setOpen] = useState(false);
  const [lectureSelected, setLectureSelected] = useState(null)
  const handleChange = (event) => {
    setLectureSelected(event.target.value);

    let lecture = lecturesById.find(lecture => lecture.lectureName == event.target.value)
    if(lecture){
      history.push('/graph/' + lecture.id)
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleSubmission = () => {
    const formData = new FormData();
    formData.append("file", selectedFile);
    console.log(formData);
    setFormDataFinal(formData);
  };

  //REUSABLE COMPONENTS
  const ROSTER_UPLOAD = (
    <div>
      <input id= "file" type="file" name="file" onChange={changeHandler} />
      <div>
        <button  style={{ width: '5%' }}  id="submit-button" onClick={handleSubmission}>Submit</button>
      </div>
    </div>
  );
  const [lectureName, setLectureName]= useState(null)
  const onChangeLectureName=(event)=>{
    setLectureName(event.target.value);
  }

  const [lectureDate, setLectureDate]= useState(null)
  const onChangeLectureDate=(event)=>{
    setLectureDate(event.target.value);
  }

  const [lectureStartTime, setLectureStartTime]= useState(null)
  const onChangeLectureStart=(event)=>{
    setLectureStartTime(event.target.value);
  }

  const [lectureEndTime, setLectureEndTime]= useState(null)
  const onChangeLectureEnd=(event)=>{
    setLectureEndTime(event.target.value);
  }

  const addLecture =()=>{
   console.log("CLICKEDDDDD WTF")
    const URL= `${LIVE_URL}/lecture/addLecture`

  
      const tempStart= lectureDate+" "+lectureStartTime+":00.000";
      const tempEnd= lectureDate+" "+lectureEndTime+":00.000"
      const lectureToBeAdded = {
        class_id: `${selectedCourseById}`,
        lectureName:`${lectureName}`,
        lectureStartTime: `${tempStart}`,
        lectureEndTime: `${tempEnd}`
    }
    console.log("lecture to be added", lectureToBeAdded)
      axios.post(URL, lectureToBeAdded)
          .then(response =>console.log("DID IT WORK", response))
          .catch(err => {
            // what now?
            console.log(err);
        });

  }

  const CREATE_LECTURE = (
    <div>
      <form className={classes.container} noValidate>
      <TextField
      value={lectureName}
      onChange={onChangeLectureName}
          label="Lecture Name"
          type="text"
          defaultValue="Lecture Name"
          className={classes.textField}
          InputLabelProps={{
            shrink: true,
          }}
        />
        <TextField
         value={lectureDate}
         onChange={onChangeLectureDate}
          id="datetime-local"
          label="Date"
          type="date"
          defaultValue="Date"
          className={classes.textField}
          InputLabelProps={{
            shrink: true,
          }}
        />
        <TextField
        value={lectureStartTime}
        onChange={onChangeLectureStart}
          label="Start time"
          type="time"
          defaultValue="2017-05-24T10:30"
          InputLabelProps={{
            shrink: true,
          }}
        />
        <TextField
        value={lectureEndTime}
        onChange={onChangeLectureEnd}
          label="End time"
          type="time"
          defaultValue="2017-05-24T10:30"
          className={classes.textField}
          InputLabelProps={{
            shrink: true,
          }}
        />
       <div id = "slight-space">
        <input onClick={addLecture} id="submit-button" type="submit" value="Submit"></input>
       
        </div>
      </form>
    </div>
  );

  const LECTURE_SELECTOR = (
    <div>
        <FormControl  style={{ width: '50%' }} className={classes.formControl}>
        <InputLabel id="demo-controlled-open-select-label">Select a Lecture</InputLabel>
        <Select
          labelId="demo-controlled-open-select-label"
          id="demo-controlled-open-select"
          open={open}
          onClose={handleClose}
          onOpen={handleOpen}
          value={lectureSelected}
          onChange={handleChange}
        >
          {lecturesById.map((eachLecture, idx) => (
            <MenuItem value= {eachLecture.lectureName}> {eachLecture.lectureName} </MenuItem>
          ))}
       
        </Select>
      </FormControl>
    </div>
  );
  return (
    <div>
      <div id = "spaced" >
        Students
        <div >
          <Button
          id = "import"
            variant="contained"
            onClicked={importStudentsClicked}
            color="primary"
          >
            Import Students
          </Button >
          <Fab id = "plus" color="primary" aria-label="add">
            <AddIcon />
          </Fab>
        </div>
      </div>

      <div  style={{ width: '100%' }}  id = "spaced">
        Lecture
        <div>
          {classes.map((eachClass, idx) => (
            <Button 
            style={{ width: '25%' , margin: '3%' }} 
              id = "import"
              variant="contained"
              onClick={() => {
                console.log(eachClass)
                setSelectedCourseId(eachClass.id)
                setSelectedCourse(eachClass.courseName);
                setSelectedCourseById(eachClass.id)
              }}
              color="primary"
            >
              {eachClass.courseName}
              
            </Button>
          ))}

          <Fab id = "plus" color="primary" aria-label="add">
            <AddIcon />
          </Fab>
        </div>
      </div>
      
        <div id = "class-header">
          <div> </div>
      {selectedCourse === null ? (
        "\n"

      ) : (
        
        <div id = "details">
          {selectedCourse}
          <div>
          <div id = "sections2">
            <h1 id = "sect"> roster upload</h1>
            {ROSTER_UPLOAD}
          </div>
          <div id = "sections1">
            <h1 id = "sect"> view a lecture </h1>
            {LECTURE_SELECTOR}
            </div>
            <div id = "sections">
            <h1 id = "sect"> create lecture </h1>
            {CREATE_LECTURE}
          </div>
          </div>
        </div>
      )}
      </div>
    </div>
  );
};

export default TeacherPage;
//https://stackoverflow.com/questions/43604167/retrieve-which-button-was-clicked-react-material
