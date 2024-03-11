import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import '../css/registration.css';
import { act } from 'react-dom/test-utils';

function Registration() {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [photo, setPhoto] = useState(null);

  const handlePhotoChange = (event) => {
    const fileName = event.target.files[0].name
    localStorage.setItem('file_name', fileName);
    setPhoto(event.target.files[0]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const apiEndpointRegister = "http://127.0.0.1:8000/api/user/register";
    const apiEndpointGet = "http://127.0.0.1:8000/api/image/getPhotoPath";
    const apiEndpointUpload = "http://127.0.0.1:8000/api/image/upload";

    try {
      const formData = new FormData();
      formData.append('photo_name', localStorage.getItem('file_name'));

      const getResponse = await axios.post(apiEndpointGet, formData);
      
      let resultObject = getResponse.data;
      let avatarPath = resultObject.photo_path;
      console.log(avatarPath);

      formData.append("photo", photo);

      // Регистрируем пользователя
      const formData2 = new FormData();
      console.log(login, password, birthDate, name, email, avatarPath);
      formData2.append('login', login);
      formData2.append('password', password);
      formData2.append('birth_date', birthDate);
      formData2.append('name', name);
      formData2.append('email', email);
      formData2.append('avatar_path', avatarPath);
      if (photo) {
        const registerResponse = await axios.post(apiEndpointRegister, formData2);
        console.log(registerResponse.data.user.id); // Результат второго запроса

        formData.append("user_id", registerResponse.data.user.id);

        const uploadResponse = await axios.post(apiEndpointUpload, formData);
        resultObject = uploadResponse.data;
        avatarPath = resultObject.photo_path;
        console.log(avatarPath);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="main">
      <div className="registration-form">
        <h2>Registration Form</h2>
        <form onSubmit={handleSubmit} encType="multipart/form-data">
          <input type="text" value={login} onChange={(e) => setLogin(e.target.value)} placeholder="Login" required />
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" required />
          <input type="date" value={birthDate} onChange={(e) => setBirthDate(e.target.value)} placeholder="Birth Date" required />
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" required />
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" required />
          <input type="file" onChange={handlePhotoChange} accept="image/*" placeholder="Profile Photo" />
          <div className="buttons">
            <button type="submit">Register</button>
            <Link to="/authorization">
              <button type="button" style={{ backgroundColor: "orangered" }}>Authorize</button>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Registration;
