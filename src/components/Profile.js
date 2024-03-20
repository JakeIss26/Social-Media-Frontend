// Profile.js
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Header from './Header';
import '../css/profile.css';
import { useNavigate } from 'react-router-dom';
import { fetchUserData } from '../redux/ProfileSlice';

function Profile() {
  const dispatch = useDispatch();
  const userData = useSelector(state => state.profile.userData);
  const loading = useSelector(state => state.profile.loading);
  const error = useSelector(state => state.profile.error);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchUserData());
  }, [dispatch]);

  const handleClick = () => {
    navigate('/posts');
  };

  const redirectToRegistration = () => {
    navigate('/registration');
  };

  const redirectToGroupLists = () => {
    navigate('/groupList');
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="profile-info">
      <Header />
      <div className="user-info">
        <div className="avatar-container">
          <img className="avatar" src={userData ? userData.avatar_path : ''} alt="" />
        </div>
        <div className="name">
          <span id="postsCount">Posts: {userData ? userData.posts : ''}</span>
        </div>
        <div className="name">
          <span id="followersCount">Followers: {userData ? userData.followers : ''}</span>
        </div>
        <div className="name">
          <span id="subscriptionsCount">Subscriptions: {userData ? userData.subscriptions : ''}</span>
        </div>
        <div className="quit">
          <button onClick={redirectToRegistration}>Quit</button>
        </div>
      </div>
      <div className="box">
        <div className="main-info">
          <div className="name">
            <span id="login">Login: {userData ? userData.login : ''}</span>
          </div>
          <div className="name">
            <span id="name">Name: {userData ? userData.name : ''}</span>
          </div>
          <div className="name">
            <span id="email">Email: {userData ? userData.email : ''}</span>
          </div>
        </div>
        <div className="actions">
          <div>
            <button onClick={handleClick}>Add Post</button>
          </div>
          <div>
            <button>Delete Post</button>
          </div>
          <div>
            <button onClick={redirectToGroupLists}>Enter in Group</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
