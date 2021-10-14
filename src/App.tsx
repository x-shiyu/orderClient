import React, { useState } from 'react'
import Register from './pages/register';
import BaseLayout from './layout/BaseLayout';
import { RecoilRoot, useRecoilState } from 'recoil';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import './App.css'
function AppChild() {
  return (
    <div className='app'>
      <Router>
        <Switch>
          <Route path=''>
            <BaseLayout />
          </Route>
          <Route path='/register' exact>
            <Register />
          </Route>
          <Route path='/login' exact>
            <Register />
          </Route>
        </Switch>
      </Router>

    </div>
  )
}

export default function App() {
  return <RecoilRoot>
    <AppChild />
  </RecoilRoot>
}
