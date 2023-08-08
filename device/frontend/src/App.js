import React from "react";
import "./App.css";

import GroupComponent from "./components/basicTimer/groupComponent";
import WifiPad from "./components/basicTimer/wifiPad";

function App() {
  return (
    <div className="App">
      <WifiPad/>
      <GroupComponent />
    </div>
  );
}

export default App;
