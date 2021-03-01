import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useParams
} from "react-router-dom";

import WebcamCapture from './Components/WebcamCapture';
import HowYouDid from './ Pages/HowYouDidPage';

function App() {
  return (
    <Router>
      <div>
        <ul>  
          <li>
            <Link to="/monitor/1/1">Webcam for user 1, lecture 1</Link>
          </li>
          <li>
            <Link to="/graph">How you did page</Link>
          </li>
        </ul>

        <Switch>
          <Route path="/monitor/:userId/:lectureId">
            <WebcamCapture/>
          </Route>
          <Route path="/graph">
            <HowYouDid/>
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
