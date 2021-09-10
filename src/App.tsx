import React, { useState } from 'react'
import Login from './pages/login';
import Register from './pages/register';
import User from './pages/user';
import Home from './pages/home';
import { TabBar } from 'antd-mobile';  // 加载 JS
import 'antd-mobile/dist/antd-mobile.css';
import Icon from './components/icon';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import './App.css'

function App() {
  const [tabActive, setTabActive] = useState<'home' | 'user'>('home')

  return (
    <Router>
      <div className="App">
        <Switch>
          <Route exact path="/">
            <TabBar>
              <TabBar.Item
                title="首页"
                key="home"
                icon={
                  <Icon name='home' />
                }
                selectedIcon={<Icon name='home-active' />}
                selected={tabActive === 'home'}
                onPress={() => {
                  setTabActive('home')
                }}
              >
                <Home />
              </TabBar.Item>
              <TabBar.Item
                title="我的"
                key="user"
                icon={
                  <Icon name='user' />
                }
                selectedIcon={<Icon name='user-active' />}
                selected={tabActive === 'user'}
                onPress={() => {
                  setTabActive('user')
                }}
              >
                <User />
              </TabBar.Item>
            </TabBar>
          </Route>
          <Route path="/register">
            <Register />
          </Route>
          <Route path="/login">
            <Login />
          </Route>
        </Switch>
      </div>
    </Router>
  )
}

export default App
