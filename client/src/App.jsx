import { useEffect, useState } from "react";
import AudioUpload from "./components/AudioUpload";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import TextInput from "./components/TextInput";
import VoiceInput from "./components/VoiceInput";
import Result from "./components/Result";
import Dashboard from "./components/Dashboard";
import Backend from "./components/Backend";
import Navbar from "./components/Navbar";
import Login from "./components/Login";

function App() {
  const [log, setLog] = useState(false);
  const [state, setState] = useState(false);
  useEffect(() => {
    setState(!state);
    getData();
  }, []);
  const getData = async () => {
    const data = await fetch(`${Backend}`);
  };
  const [text, setText] = useState("");
  return (
    <>
      <BrowserRouter>
        <Navbar  log={log} setLog={setLog} />
        <Routes>
          <Route
            path="/"
            element={<Home log={log} setLog={setLog} />}
          />
          <Route path="/textinput" element={<TextInput setText={setText} />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route
            path="/voiceinput"
            element={<VoiceInput setText={setText} />}
          />
          <Route path="/result" element={<Result text={text} />} />
          <Route path="/login" element={<Login setLog={setLog} />} />
          <Route path="/*" element={<h1>error 404 : page not found</h1>} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
