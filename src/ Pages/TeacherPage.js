import React from "react";
import { useEffect, useState } from "react";
import Fab from "@material-ui/core/Fab";
import Button from "@material-ui/core/Button";
import AddIcon from "@material-ui/icons/Add";
const TeacherPage = () => {

  useEffect(()=>{

  })
  const importStudentsClicked = (e) => {};

  return (
    <div>
      <div>
        Students
        <div>
          <Button
            variant="contained"
            onClicke={importStudentsClicked}
            color="primary"
          >
            Import Students
          </Button>
        </div>
      </div>

      <div>
        Lecture
        <div>
          <Button variant="contained" color="primary">
            CSCE 1234
          </Button>
          <Button variant="contained" color="primary">
            CSCE 12345
          </Button>
          <Fab color="primary" aria-label="add">
            <AddIcon />
          </Fab>
        </div>
      </div>
      <div>
        Capstone thing
        <div>
          <Button variant="contained" color="primary">
            Import Roster for (some class name)
          </Button>
          <Button variant="contained" color="primary">
            Create Lecture
          </Button>
          <Button variant="contained" color="primary">
            View a lecture
          </Button>
        </div>
      </div>
    </div>
  );
};

export default TeacherPage;
//https://stackoverflow.com/questions/43604167/retrieve-which-button-was-clicked-react-material
