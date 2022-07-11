import { Provider } from "react-redux";
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";

import Login from './Components/Login'
import SignUp from './Components/SignUp'
import Home from "./Components/Home";
import Store from "./store/index";

function App() {
  
  return (
    <>
        <Provider store = {Store}>
          <Router>
              <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/signup" element={<SignUp />} />
              </Routes>
          </Router>
        </Provider>
    </>
  );
}




export default App;

