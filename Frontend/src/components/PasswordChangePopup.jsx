import React from 'react';

function PasswordChangePopup({ onClose, onPasswordChange, oldPassword, setOldPassword, newPassword, setNewPassword }) {
  return (
    <div className=" password-change-popup border-black border-2">
      {/* <h2>Passwort ändern</h2> */}
      <input type="password" placeholder="Altes Passwort" value={oldPassword} onChange={(e) => setOldPassword(e.target.value)} className='border-2' />
      <input type="password" placeholder="Neues Passwort" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} className='border-2'/>
      <button onClick={onPasswordChange}className="flex mb-1 mt-1 bg-blue-500 text-white px-2 py-1 rounded-md hover:bg-blue-600">Passwort ändern</button>
      <button onClick={onClose}className="  bg-blue-500 text-white px-2 py-1 rounded-md hover:bg-blue-600">Abbrechen</button>
    </div>
  );
}

export default PasswordChangePopup;
