import React from 'react';
import ReactDOM from 'react-dom';
import { RecoilRoot } from "recoil";
import './index.css';

import Dashboard from "./pages/Dashboard";

ReactDOM.render(
  <RecoilRoot>
    <div className="App">
      <header/>
      <Dashboard />
    </div>
  </RecoilRoot>,
  document.getElementById('root')
);
