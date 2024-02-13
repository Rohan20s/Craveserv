import { lazy, Suspense, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { GoogleSuccessUserAPI } from "./Api/AuthServices";
import axios from "axios";
import { API } from "./Api/API";
import { Route, Routes } from "react-router-dom";
const Home = lazy(() => import("./Pages/Home/Home"));

function App() {
  useSelector(user => console.log(user))
  const [userdata, setUserdata] = useState({});
  console.log("response", userdata)

  const getUser = async () => {
    try {
      const response = await axios.get("http://localhost:8000/auth/login/success", { withCredentials: true });
      console.log(response)
      setUserdata(response.data.user)
    } catch (error) {
      console.log("error", error)
    }
  }

  // logoout
  const logout = () => {
    window.open("http://localhost:6005/logout", "_self")
  }

  useEffect(() => {
    getUser()
  }, [])
  return (
    <div className="App">
      <Suspense fallback={<div>loading ....</div>}>
        <Routes>
           <Route element={ <Home />} path="/"/>
        </Routes>
      </Suspense>
    </div>
  );
}

export default App;
