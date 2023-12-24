import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import API_URL from '../config/global';

const NewPassword = () => {
  const [password, setPassword] = useState('');
  const { uniqueString } = useParams();
  const history = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(`${API_URL}/reset-password/${uniqueString}`, { password });

      if (response.data.message === 'Password reset successfully') {
        alert('Password reset successfully');
        history.push('/login'); // Redirect to the login page or any other page
      } else {
        alert('Failed to reset password. Please try again.');
      }
    } catch (error) {
      console.error('Error resetting password:', error.message);
    }
  };

  return (
    <div>
      <div className="body">
        <div className="container d-flex align-items-center justify-content-center">
          <div className="card">
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                <div className="mb-3 mt-3">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter the string"
                    value={uniqueString}
                    disabled
                  />
                </div>
                <div className="mb-3 mt-3">
                  <input
                    type="password"
                    className="form-control"
                    placeholder="Type Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
                <div className="mb-3 ">
                  <button type="submit" className="button">
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewPassword;
