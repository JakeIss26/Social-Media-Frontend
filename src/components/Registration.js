import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { registerUser, clearError, clearLoading, clearRegistrationStatus } from '../redux/RegistrationSlice';
import '../css/registration.css';

function Registration() {
  const dispatch = useDispatch();
  const { loading, error, success } = useSelector((state) => state.registration); // Получение состояния из Redux store
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [photo, setPhoto] = useState(null);

  // useEffect(() => {
  //   if (success) {
  //     const timer = setTimeout(() => {
  //       dispatch(clearError());
  //     }, 3000);

  //     return () => clearTimeout(timer);
  //   }
  // }, [success, dispatch]);

  const handlePhotoChange = (event) => {
    const fileName = event.target.files[0].name;
    localStorage.setItem('file_name', fileName);
    setPhoto(event.target.files[0]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    dispatch(clearRegistrationStatus());
    dispatch(registerUser({ login, password, birthDate, name, email, photo }));
  };

  return (
    <div className="main">
      <div className="registration-form">
        <h2>Registration Form</h2>
        {loading && <div>Loading...</div>}
        {error && <div>Error: {error}</div>}
        {success && <div>Registration successful!</div>}
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
