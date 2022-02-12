import React from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Backdrop from "./components/backdrop/Backdrop";
import LoadingPage from "./components/loadingpage/LoadingPage";
import { UidContext } from "./components/myContext/UidContext";
import SignIn from "./components/signin/SignIn";
import Register from "./components/signup/Register";
import Topbar from "./components/topbar/Topbar";
import Home from "./pages/home/Home";
import Write from "./pages/write/Write";
import axios from "axios";
import { useEffect } from "react";
import Writepost from "./pages/witepost/Writepost";
import LoadingComment from "./components/loadingComment/LoadingComment";
import Setting from "./pages/setting/Setting";
import Footer from "./components/footer/Footer";

const App = () => {
  const [uid, setUid] = useState(null);
  const { toggle } = useSelector((state) => state.toolReducer);
  const { loading } = useSelector((state) => state.toolReducer);
  const { signloading } = useSelector((state) => state.toolReducer);
  const [footerToggle, setFooterToggle] = useState(false);
  const { logout } = useSelector((state) => state.toolReducer);
  const { myloading } = useSelector((state) => state.userReducer);
  const { affiche } = useSelector((state) => state.toolReducer);

  useEffect(() => {
    const fetchUid = async () => {
      await axios({
        method: "get",
        url: "http://localhost:5000/jwtid",
        withCredentials: true,
      })
        .then((res) => setUid(res.data))
        .catch((err) => console.log("No Token ", err));
    };
    fetchUid();
  }, [uid]);

  useEffect(() => {
    setTimeout(() => {
      setFooterToggle(true);
    }, 10000);
  }, []);

  return (
    <UidContext.Provider value={uid}>
      <Router>
        {affiche && <LoadingComment />}
        {myloading && <LoadingPage />}
        {logout && <LoadingPage />}
        {signloading && <LoadingPage />}
        {loading && <LoadingPage />}
        {toggle && <Backdrop />}
        <Write />
        <Topbar />
        <Routes>
          <Route path="/" element={uid ? <Home /> : <SignIn />} />
          <Route path="/setting" element={uid ? <Setting /> : <SignIn />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<SignIn />} />
          <Route path="/writePost" element={uid ? <Writepost /> : <SignIn />} />
        </Routes>
        {footerToggle || <Footer />}
      </Router>
    </UidContext.Provider>
  );
};

export default App;
