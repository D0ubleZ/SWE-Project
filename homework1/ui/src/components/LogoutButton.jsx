import React from 'react';

const LogoutButton = () => {
  const handleClick = () => {
    // TODO: Perform logout action here, removing the username from local storage
    // Redirect the user to the login page
    localStorage.removeItem("username");
    window.location.href = '/';
  };

  return (
    <button onClick={handleClick}>Logout</button>
  );
};

export default LogoutButton;