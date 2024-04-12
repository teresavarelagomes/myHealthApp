import { jwtDecode } from 'jwt-decode';
import { decode as atob } from 'base-64';

export const validateToken = (token) => {
  try {
    // Split the token into its parts
    const parts = token.split('.');

    // Extract the payload part
    const payload = parts[1];

    // Decode the payload from Base64
    const decodedPayload = atob(payload);

    // Parse the JSON payload
    const payloadObj = JSON.parse(decodedPayload);

    // Extract the 'exp' claim
    const exp = payloadObj.sub;

    // Check the expiration time
    const currentTime = Date.now() / 1000; // Convert milliseconds to seconds
    if (exp < currentTime) {
      // Token has expired
      return false;
    }
    
    return true;
  
  } catch (error) {
    // An error occurred while decoding the token or performing validation
    console.error('Error validating token:', error);
    return false;
  }
};

export const extractSubFromToken = (token) => {
  if (!token) {
    return null;
  }

  try {
    // Split the token into its parts
    const parts = token.split('.');

    // Extract the payload part
    const payload = parts[1];

    // Decode the payload from Base64
    const decodedPayload = atob(payload);

    // Parse the JSON payload
    const payloadObj = JSON.parse(decodedPayload);

    // Extract the 'sub' claim
    const sub = payloadObj.sub;

    return sub;
  } catch (error) {
    console.error("Error decoding JWT token:", error);
    return null;
  }
};

