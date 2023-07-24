import React from 'react';
import logo from './logo.svg';
import { Counter } from './features/counter/Counter';
import './App.css';
import { Link,  Routes , Route } from 'react-router-dom';
import TimerCreatePage from './pages/timerCreatePage';
import BasicTimer from "./timerTestDir/basic_timer";

//라우팅 페이지 관련
import Page1 from './pages/page1';
import Page2 from './pages/page2';

function App() {
  const t1 = new BasicTimer();
  return (
    <div className="App">
      <TimerCreatePage timer={t1}/>
      <Link to="/page1">페이지1라우팅 |</Link>
      <Link to="/page2">페이지2라우팅</Link>
      
      <Routes>
        <Route path="/page1" element = {<Page1/>}> </Route>
        <Route path="/page2" element = {<Page2/>} ></Route>
      </Routes>

      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <Counter />
      </header>
    </div>
  );
}

export default App;
