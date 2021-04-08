import "./App.css";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useParams,
} from "react-router-dom";

import NavBar from "./Components/NavigationBar";
import WebcamCapture from "./Components/WebcamCapture";
import HowYouDid from "./ Pages/HowYouDidPage";
import SignIn from "./ Pages/SignIn";
import TeacherPage from "./ Pages/TeacherPage";

function App() {
  return (
    <Router>
      <div>
        <NavBar />
        <Switch>
          <Route path="/monitor/:userId/:lectureId">
            <WebcamCapture />
          </Route>
          <Route path="/teacherPage">
            <TeacherPage />
          </Route>
          <Route path="/graph">
            <HowYouDid />
          </Route>
          <Route path="/signIn">
            <SignIn />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
