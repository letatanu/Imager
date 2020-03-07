import {
    useGoogleReCaptcha
  } from 'react-google-recaptcha-v3';
import React from 'react';

  // Remember that the hook can only be used within a React functional component
  const ReCaptchaComponent = (children) => {
 
    const { executeRecaptcha } = useGoogleReCaptcha();
    const [token, setToken] = React.useState("");
    const clickHandler = async () => {
        if (!executeRecaptcha) {
          return;
        }
    
        const result = await executeRecaptcha("root");
    
        setToken(result);
      };
    
      return (
        <div>
          <button onClick={clickHandler}>Test Recaptcha</button>
          {token && <p>Token: {token}</p>}
        </div>
      );
    };

export default ReCaptchaComponent;