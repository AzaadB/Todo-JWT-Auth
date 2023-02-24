import React from "react";
import "./App.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useAuthContext } from "./hooks/useAuthContext";
//importing {useAuthContext} hook from the hooks folder (line 4)//

//import pages and components
import Home from "./pages/Home";
import Signup from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import Navbar from "./components/Navbar";

function App() {
  const { user } = useAuthContext();
  //Getting the user from the useAuthContext hook//

  /*now that we have access to the value on (line 14),
  which will either be null if they are logged out or a value which is the object if they are logged in*/
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <div className="pages">
          <Routes>
            <Route
              path="/"
              element={user ? <Home /> : <Navigate to="/signin"/>}
            />
            {/*In the element prop on (line 26 ) we say do we have a user and,
            we are using a ternary operator, 
            so when a ternary operator something is evaluated and two things can be returned based on,
            the evaluation the first thing is if the user value is true,
            which will be the home component that would load now we use a colon after the home component,
            which will be the second thing if the user value is false,
            in which we will use navigate component and set it equal to "/login",
            which will redirect the user to the login page*/}
          </Routes>

          <Routes>
            <Route
              path="/signin"
              element={!user ? <SignIn /> : <Navigate to="/" />}
            />
            {/*In the element prop on (line 37),
            if we do have a user then the login page shouldn't be loaded,
            they should be directed to the homepage, 
            so if we don't have a user then it's ok to show the login page,
            but if we do have a user then we navigate to "/", which is the homepage*/}
          </Routes>

          <Routes>
            <Route path="/signup" element={!user ?<Signup />: <Navigate to="/"/>} />
            {/*In the element prop on (line 52),
            if we do have a user then the signup page shouldn't be loaded,
            they should be directed to the homepage, 
            so if we don't have a user then it's ok to show the signup page,
            but if we do have a user then we navigate to "/", which is the homepage*/}
          </Routes>
          {/*So we are basically redirecting a user based on what their authentication status is,
          i.e if they are logged in they can only see the homepage and not the signin and signup pages,
          but if they are logged out they can only see the signin and signup pages and not the homepage*/}
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
