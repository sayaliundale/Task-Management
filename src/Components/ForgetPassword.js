// import React, { useState, useEffect } from 'react';
// import { getAuth, onAuthStateChanged, reauthenticateWithCredential, updatePassword, EmailAuthProvider } from 'firebase/auth';
// import { getApp } from 'firebase/app';

// const ForgetPassword = () => {
//   const [newPassword, setNewPassword] = useState('');
//   const [resetStatus, setResetStatus] = useState(null);

//   // Get Firebase Auth instance directly
//   const auth = getAuth(getApp());

//   useEffect(() => {
//     // Check authentication state on component mount
//     const unsubscribe = onAuthStateChanged(auth, (user) => {
//       if (!user) {
//         // Redirect to login if not signed in
//         setResetStatus('Please log in to reset your password.');
//         // Implement redirection logic here (e.g., using react-router-dom)
//       } else {
//         // Proceed with password reset if signed in
//         setResetStatus(null);
//       }
//     });

//     return () => unsubscribe();
//   }, []);

//   const handleResetPassword = async () => {
//     try {
//       const user = auth.currentUser;

//       if (!user) {
//         // Should not reach this point due to useEffect, but handle for safety
//         setResetStatus('User not found. Please log in.');
//         return;
//       }

//       // Reauthenticate with the existing password
//       await reauthenticateWithCredential(user, EmailAuthProvider.credential(user.email, newPassword));

//       // Update the password
//       await updatePassword(user.email, newPassword);

//       setResetStatus('Password reset successfully.');
//     } catch (error) {
//       console.error('Error resetting password:', error);
//       setResetStatus(`Error resetting password: ${error.message}`);
//     }
//   };
//   return (
//     <div>
//       <h2>Reset Password</h2>
//       {resetStatus && <p>{resetStatus}</p>}
//       {/* Only display password input and button if the user is authenticated */}
//       {auth.currentUser && (
//         <div>
//           <label htmlFor="newPassword">New Password:</label>
//           <input
//             type="password"
//             id="newPassword"
//             value={newPassword}
//             onChange={(e) => setNewPassword(e.target.value)}
//             required
//           />
//           <button onClick={handleResetPassword}>Reset Password</button>
//         </div>
//       )}
//     </div>
//   );
// };

// export default ForgetPassword;
