// import React from 'react';

// const Reset = () => {
//     return (
//         <div>
//              <div className="body">
//       <div className="container d-flex align-items-center justify-content-center">
//         <div className="card">
//           <div className="card-body">
//             <form>
//             <div className="mb-3 mt-3">
//                 <input
//                   type="email"
//                   className="form-control"
//                   placeholder="Email"
//                 />
//               </div>
//             {/* <div className="mb-3 mt-3">
//                 <input
//                   type="password"
//                   className="form-control"
//                   placeholder="New Password"
//                   required
//                 />
//               </div>
//               <div className="mb-3 mt-3">
//                 <input
//                   type="password"
//                   className="form-control"
//                   placeholder="Re-type Password"
//                   required
//                 />
//               </div> */}
//               <div className="mb-3 ">
//                 <button type="submit" className="button">
//                   Submit
//                 </button>
//               </div>
//             </form>
//           </div>
//         </div>
//       </div>
//     </div>
//         </div>
//     );
// };

// export default Reset;
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import API_URL from '../config/global';

const Reset = () => {
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(`${API_URL}/reset-password`, { email });

      if (response.status === 201) {
        alert("Reset email sent successfully");
        navigate(`/new-password/${response.data.token}`);
      } else {
        alert(`Failed to send reset email: ${response.data.message}`);
      }
    } catch (error) {
      console.error("Error sending reset email:", error.message);

      if (error.response) {
        alert(`Server error: ${error.response.data.message}`);
      } else if (error.request) {
        alert("Network error. Please try again.");
      } else {
        alert("Unexpected error. Please try again.");
      }
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
                    type="email"
                    className="form-control"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
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

export default Reset;


