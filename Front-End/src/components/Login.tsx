import React from "react";

const Login: React.FC = () => {
  const style = {
    container: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      height: '100vh',
      fontFamily: 'Arial, sans-serif',
      border: '2px solid #007BFF',
      borderRadius: '10px',
      padding: '20px',
      maxWidth: '400px',
      margin: 'auto',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    },
    input: {
      padding: '10px',
      marginBottom: '20px',
      width: '80%',
      border: '2px solid #007BFF',
      borderRadius: '5px',
    },
    button: {
      padding: '10px 20px',
      border: '2px solid #007BFF',
      borderRadius: '5px',
      background: '#007BFF',
      color: 'white',
      fontSize: '16px',
      cursor: 'pointer',
      width: '85%',
      marginBottom: '10px',
    }
  } as const;

  return (
    <div style={style.container}>
      <h1>Login</h1>
      <input style={style.input} type="text" placeholder="Username" />
      <input style={style.input} type="password" placeholder="Password" />
      <button style={style.button}>Login</button>
    </div>
  );
};

export default Login;
