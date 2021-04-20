import React from "react";
import { useEffect, useState } from "react";
import { Form, Button } from "react-bootstrap";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect
} from "react-router-dom";
import TeacherPage from "./TeacherPage";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const onSubmit = (e)=>{
    e.preventDefault();
    setIsLoggedIn(true)
    
    localStorage.setItem('user', 126); //126 for teachers
  }

  
  return (
    <div style={{ width: "50%" }}>
      <Form>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control type="email" placeholder="Enter email" />
          <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text>
        </Form.Group>

        <Form.Group controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Password" />
        </Form.Group>
        <Form.Group controlId="formBasicCheckbox">
          <Form.Check type="checkbox" label="Check me out" />
        </Form.Group>
        <Button variant="primary" type="submit" onClick={onSubmit}>
          Submit
        </Button>
      </Form>

      {isLoggedIn?
      <Switch>
<Redirect exact from="/" to="/teacherPage" />
          <Route component={TeacherPage} exact path="/teacherPage" />
      </Switch>
       :(<div>idk</div>)}
    </div>
  );
};

export default SignIn;
