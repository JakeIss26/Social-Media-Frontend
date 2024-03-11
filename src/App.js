import React from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Registration from './components/Registration';
import Header from './components/Header';
import './css/App.css';
import Authorization from './components/Authorization';
import PostFeed from './components/PostFeed';
import Profile from './components/Profile';
import Post from './components/Post';
import Group from './components/Group';
import GroupList from './components/GroupList';

function App() {
  return (
    <Router>
      <div>
        <Header />
        <Routes>
          <Route path="/registration" element={<Registration />} />
          <Route path="/authorization" element={<Authorization />} />
          <Route path="/main" element={<PostFeed />} />
          <Route path="/groups" element={<Group />}/>
          <Route path="/groupList" element={<GroupList />}/>
          <Route path="/posts" element={<Post />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;