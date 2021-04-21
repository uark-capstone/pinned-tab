import React from "react";
import { useEffect, useState } from "react";
import Fab from "@material-ui/core/Fab";
import Button from "@material-ui/core/Button";
import { Form } from "react-bootstrap";
import AddIcon from "@material-ui/icons/Add";
import TextField from "@material-ui/core/TextField";
import useGetAllClasses from "../Hooks/useGetAllClasses";
import useExcelSheetReadFile from "../Hooks/useExcelSheetReadFile";
import useGetAllLecturesById from "../Hooks/useGetAllLecturesById";
import "../reportingpage.css";
const TeacherPage = () => {
  //STATE MANAGEMENT
  const [isSelected, setIsSelected] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [formDataFinal, setFormDataFinal] = useState(null);
  const [lectureByClassID, setLectureByClassID] = useState(null);

  //REACT HOOKS
  const { classes, isClassesError, isClassesLoaded } = useGetAllClasses(126);
  const {
    isAllLecturesByIdError,
    isAllLecturesByIdLoaded,
    lecturesById,
  } = useGetAllLecturesById(6);
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

  const handleSubmission = () => {
    const formData = new FormData();
    formData.append("file", selectedFile);
    console.log(formData);
    setFormDataFinal(formData);
  };

  //REUSABLE COMPONENTS
  const ROSTER_UPLOAD = (
    <div>
      <input  type="file" name="file" onChange={changeHandler} />
      <div>
        <button id="submit-button" onClick={handleSubmission}>Submit</button>
      </div>
    </div>
  );

  const CREATE_LECTURE = (
    <div>
      <form className={classes.container} noValidate>
      <TextField
          label="Lecture Name"
          type="text"
          defaultValue="2017-05-24T10:30"
          className={classes.textField}
          InputLabelProps={{
            shrink: true,
          }}
        />
        <TextField
          id="datetime-local"
          label="Next appointment"
          type="date"
          defaultValue="2017-05-24T10:30"
          className={classes.textField}
          InputLabelProps={{
            shrink: true,
          }}
        />
        <TextField
          label="Start time"
          type="time"
          defaultValue="2017-05-24T10:30"
          InputLabelProps={{
            shrink: true,
          }}
        />
        <TextField
          label="End time"
          type="time"
          defaultValue="2017-05-24T10:30"
          className={classes.textField}
          InputLabelProps={{
            shrink: true,
          }}
        />
       
        <input type="submit" value="Submit"></input>
      </form>
    </div>
  );

  const LECTURE_SELECTOR = (
    <div>
      <Form.Group controlId="exampleForm.ControlSelect2">
        <Form.Label>Example multiple select</Form.Label>
        <Form.Control as="select" multiple>
          {lecturesById.map((eachLecture, idx) => (
            <option>{eachLecture.lectureName}</option>
          ))}
        </Form.Control>
      </Form.Group>
    </div>
  );
  return (
    <div>
      <div id = "spaced">
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

      <div id = "spaced">
        Lecture
        <div>
          {classes.map((eachClass, idx) => (
            <Button id = "import"
              variant="contained"
              onClick={() => {
                setSelectedCourse(eachClass.courseName);
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

      {selectedCourse === null ? (
        <div> </div>
      ) : (
        <div>
          {selectedCourse}
          <div>
            <h1> roster upload</h1>
            {ROSTER_UPLOAD}

            <h1> view a lecture </h1>
            {LECTURE_SELECTOR}
            
            <h1> create lecture </h1>
            {CREATE_LECTURE}
          </div>
        </div>
      )}
    </div>
  );
};

export default TeacherPage;
//https://stackoverflow.com/questions/43604167/retrieve-which-button-was-clicked-react-material
