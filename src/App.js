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
import HowYouDid from "./Pages/HowYouDidPage";
import SignIn from "./Pages/SignIn";
import PredictionTraining from "./Pages/PredictionTraining"

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
