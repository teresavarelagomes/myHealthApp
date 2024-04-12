import React, { createContext, useState, useEffect, useContext } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { extractSubFromToken, validateToken } from '../utils/auth';
import { getRequest, postRequest } from '../api/api';

// Create a context for authentication
const AuthContext = createContext();

// Create an authentication provider component
const AuthProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isVerified, setIsVerified] = useState(false);
    const [isComplete, setIsComplete] = useState(false);
    const [userId, setUserId] = useState('');
    const [user, setUser] = useState(userInitialState);
    const [statusStep, setStatusStep] = useState();

    // Effect to check for cached tokens on mount
    useEffect(() => {
        fetchTokensFromCache().then((cachedTokens) => {
            if (cachedTokens) {
                getUserWithCachedId();
                setIsLoggedIn(true);
            }
        });
    }, []);

    const fetchTokensFromCache = async () => {
        try {
            const accessToken = await AsyncStorage.getItem('accessToken');
            const refreshToken = await AsyncStorage.getItem('refreshToken');

            if (accessToken && refreshToken) {
                // Validate the access token
                const accessTokenValid = validateToken(accessToken);

                if (!accessTokenValid) {
                    const newAccessToken = getAccessTokenFromRefreshToken(refreshToken);

                    if (newAccessToken) {
                        await AsyncStorage.setItem('accessToken', newAccessToken);
                        return { newAccessToken, refreshToken };
                    } else {
                        await AsyncStorage.removeItem('accessToken');
                        await AsyncStorage.removeItem('refreshToken');
                        return;
                    }
                }
                return { accessToken, refreshToken };
            }
        } catch (error) {
            console.error('Error fetching tokens from AsyncStorage:', error);
        }
    };

    const getAccessTokenFromRefreshToken = async (refreshToken) => {
        try {
            const response = await postRequest(`/user/refresh`, { refreshToken });
            if (response.status === 200) {
              return response.data.accessToken;
            }
          } catch(error) {
            console.log("Error refreshing token: ");
            console.log(error.response);
          };
    };

    const getUserWithCachedId = async () => {
        const userId = await AsyncStorage.getItem('userId');
        setUserId(userId);
        getUserById(userId);
        getUserProfileStatus(userId);
    };

    const getUserById = async (userId) => {
        try {
            const response = await getRequest(`/user/${userId}`);
            if (response.data && !response.data.personalAddress) {
                response.data.personalAddress = {
                    id: "",
                    streetName: "",
                    postalCode: "",
                    portNumber: "",
                    county: ""
                };
            }
            setUser(response.data);
            setIsVerified(response.data.verified);
        } catch (error) {
            console.log("Error get user by id: ");
            console.log(error.response);
        }
    };

    const getUserProfileStatus = async (userId) => {
        try {
            const response = await getRequest(`/user/${userId}/profileStatus`);
            setIsComplete(response.data.profileComplete);
            setStatusStep(response.data.profileStep);
        } catch (error) {
            console.log("Error getting profile status: ");
            console.log(error.response);
        }
    };

    // Function to handle login
    const login = async ({ accessToken, refreshToken }) => {
        
        //cache tokens
        await AsyncStorage.setItem('accessToken', accessToken);
        await AsyncStorage.setItem('refreshToken', refreshToken);
        const userId = extractSubFromToken(accessToken);
        await AsyncStorage.setItem('userId', userId);

        setUserId(userId);
        getUserById(userId);
        getUserProfileStatus(userId);
        setIsLoggedIn(true);
    };
    
    // Function to handle logout
    const logout = async () => {
        // Once logged out, remove user data
        await AsyncStorage.removeItem('accessToken');
        await AsyncStorage.removeItem('refreshToken');
        await AsyncStorage.removeItem('userId');
        setIsLoggedIn(false);
        setUser(userInitialState);
        setUserId('');
        setIsVerified(false);
        setIsComplete(false);
    };

    return (
        <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn, user, setUser, isVerified, setIsVerified, userId, login, logout, isComplete, setIsComplete, statusStep }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);

export default AuthProvider;

const userInitialState = {
    id: "",
    accountStatus: "",
    username: "",
    verified: true,
    name: "",
    dob: "",
    personalAddress: {
        id: "",
        streetName: "",
        postalCode: "",
        portNumber: "",
        county: ""
    },
    citizenNumber: "",
    snsNumber: "",
    nif: "",
    cellphoneNumber: "",
    timeZone: ""
};