import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Header from './Header'; // Путь к вашему компоненту Header
import '../css/profile.css';
import { useNavigate } from 'react-router-dom';

function Profile() {
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate();

  const handleClick = () => {
    // Перенаправляем пользователя на маршрут с вашим React компонентом
    navigate('/posts');
  };

  const redirectToRegistration = () => {
    // Перенаправляем пользователя на страницу регистрации
    navigate('/registration');
  };

  const redirectToGroupLists = () => {
    navigate('/groupList');
  }

  useEffect(() => {
    const fetchData = async () => {
      const apiEndpoint = "http://127.0.0.1:8000/api/data";
      const token = localStorage.getItem('Token');
      try {
        const response = await axios.get(apiEndpoint, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        setUserData(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

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