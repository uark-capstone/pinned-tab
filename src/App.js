import "./App.css";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useParams,
} from "react-router-dom";

import NavBar from "./Components/NavigationBar";
import CapturePage from "./Pages/CapturePage";
import SignIn from "./Pages/SignIn";
import PredictionTraining from "./Pages/PredictionTraining"
import WebcamCapture from "./Components/WebcamCapture";
import HowYouDid from "./Pages/HowYouDidPage";
import TeacherPage from "./Pages/TeacherPage";

function App() {
  return (
    <Router>
      <div>
        <NavBar />
        <Switch>
          <Route path="/monitor/:userId/:lectureId">
            <CapturePage />
          </Route>
          <Route path="/predict/training">
            <PredictionTraining />
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
          <Route path="/">
            <SignIn />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
