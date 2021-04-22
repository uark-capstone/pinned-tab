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
    <div class = "signin" >
      <Form >
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Email</Form.Label>
          <Form.Control type="email" placeholder="teacher@email.com" />
          <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text>
        </Form.Group>

        <Form.Group controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="12345" />
        </Form.Group>
        <Form.Group controlId="formBasicCheckbox">
          <Form.Check type="checkbox" label="Keep me logged in" />
        </Form.Group>
        <Button id = "login-button" variant="primary" type="submit" onClick={onSubmit}>
          Submit
        </Button>
      </Form>

      {isLoggedIn?
      <Switch>
<Redirect exact from="/" to="/teacherPage" />
          <Route component={TeacherPage} exact path="/teacherPage" />
      </Switch>
       :(<div></div>)}
    </div>
  );
};

export default SignIn;
