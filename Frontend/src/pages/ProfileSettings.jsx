import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import { useContext } from 'react';
import PasswordChangePopup from '../components/PasswordChangePopup';
import { set } from 'mongoose';
import { useNavigate } from 'react-router-dom';

function ProfileSettings() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [photo, setPhoto] = useState('');
  const [isPasswordChangeOpen, setIsPasswordChangeOpen] = useState(false);
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [selectedPhoto, setSelectedPhoto] = useState(null);

  const { getUserInfo, user, logoutHandler, hasToken } = useContext(AuthContext);
  const backendApiUrl = import.meta.env.VITE_SERVER_URL;

  const navigate = useNavigate();


  useEffect(() => {
    if (hasToken) {
      getUserInfo();
    } else {
      navigate('/')
    }
  }, []);

  useEffect(() => {
    if (user) {
      setFirstName(user.firstName || '');
      setLastName(user.lastName || '');
      setEmail(user.email || '');
      setPhoto(user.photo || '');
    }
  }, [user]);

  const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    if (firstName.trim() || lastName.trim() || email.trim() || selectedPhoto) { // Verwende selectedPhoto statt photo
      if (selectedPhoto) {
        const formData = new FormData();
        formData.append('photo', selectedPhoto); // Füge das ausgewählte Bild zur FormData hinzu

        const response = await axios.post(`${backendApiUrl}/user/uploadPhoto/${user._id}`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });

        const photoUrl = response.data.photoUrl;
        setPhoto(photoUrl); // Aktualisiere das angezeigte Profilbild
        console.log(photo)
      }

      await axios.patch(`${backendApiUrl}/user/${user._id}`, {
        firstName,
        lastName,
        email,
        photo // Verwende selectedPhoto statt photo
      });
      
      alert('Profile successfully updated');
      navigate(`/user/${user._id}`);
    } else {
      alert('No changes made');
    }
  } catch (error) {
    console.error('Error updating profile:', error);
    alert('Error updating profile');
  }
};

  const handleOpenPasswordChange = () => {
    setIsPasswordChangeOpen(true);
  };

  const handleClosePasswordChange = () => {
    setIsPasswordChangeOpen(false);
  };

  const handlePasswordChange = async () => {
    try {
        const response = await axios.post(`${backendApiUrl}/user/changePassword/${user._id}`, {
            
            oldPassword,
            newPassword
        });

        if (response.data.success) {
            alert('Password successfully changed!');
            setIsPasswordChangeOpen(false);
        } else {
            alert('Password change failed: ' + response.data.error);
        }
    } catch (error) {
        console.error('Error changing password:', error);
        alert('Error changing password');
    }
};

const handlePhotoChange = async (e) => {
  setSelectedPhoto(e.target.files[0]);
};

const handleDeleteAccount = async () => {
  if (window.confirm('Are you sure you want to delete your account?')) {
    try {
      await logoutHandler();
      await axios.delete(`${backendApiUrl}/user/${user._id}`);
      alert('Your account has been successfully deleted');
      navigate('/');
    } catch (error) {
      console.error('Error deleting the account:', error);
      alert('Error deleting the account');
    }
  }
};



  return (
    <div className="max-w-lg mx-auto mt-8 p-6 bg-white rounded shadow-lg">
      <div>
      <div className='border-[1px] border-black'>
      image
      </div>
      <div>input</div>
      </div>
    </div>
    
//     <div className="max-w-lg mx-auto mt-8 p-6 bg-white rounded shadow-lg">
//       {hasToken && (
//       <div>
//       <h2 className="text-xl font-semibold mb-4">Profile update</h2>
//       <form onSubmit={handleSubmit}>
//         <div className="mb-4">
//           <label className="block text-sm font-semibold mb-2" htmlFor="firstName">First name:</label>
//           <input type="text" id="firstName" value={firstName} onChange={(e) => setFirstName(e.target.value)} className="w-full border-gray-300 rounded-md px-4 py-2" />
//         </div>
//         <div className="mb-4">
//           <label className="block text-sm font-semibold mb-2" htmlFor="lastName">Last name:</label>
//           <input type="text" id="lastName" value={lastName} onChange={(e) => setLastName(e.target.value)} className="w-full border-gray-300 rounded-md px-4 py-2" />
//         </div>
//         <div className="mb-4">
//           <label className="block text-sm font-semibold mb-2" htmlFor="email">E-Mail:</label>
//           <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full border-gray-300 rounded-md px-4 py-2" />
//         </div>
        
//         <div className="mb-4">
//   <label className="block text-sm font-semibold mb-2" htmlFor="photo">Photo:</label>
//   <input type="file" id="photo" onChange={(e) => handlePhotoChange(e)} className="w-full border-gray-300 rounded-md px-4 py-2" accept="image/*" />
// </div>

//         <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">Profil updaten</button>
//       </form>
//       <div className="mb-4 mt-4 ">
//           <label className="block text-sm font-semibold mb-2" htmlFor="password">Password:</label>
//           <button className={isPasswordChangeOpen ? 'hidden' :'bg-blue-500 text-white px-2 py-1 rounded-md hover:bg-blue-600'}  onClick={handleOpenPasswordChange}>Change Passwort</button>
//           {isPasswordChangeOpen && (
//             <PasswordChangePopup
//               onClose={handleClosePasswordChange}
//               onPasswordChange={handlePasswordChange}
//               oldPassword={oldPassword}
//               setOldPassword={setOldPassword}
//               newPassword={newPassword}
//               setNewPassword={setNewPassword}
//             />
//           )}
//         </div>
//         <button onClick={handleDeleteAccount} className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 mt-4">
//         Delete Account
//       </button>
//     </div>
//       )}
//     </div>
  );
}

export default ProfileSettings;
