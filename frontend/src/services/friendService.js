import axios from "axios";

// Base API URL
const API = "https://yappers-yevm.onrender.com/api/friends";

const axiosInstance = axios.create({
  baseURL: API,
  headers: { "Content-Type": "application/json" },
});

// Attach token
const authHeader = (token) => ({
  headers: { Authorization: `Bearer ${token}` },
});

// Send friend request
export const sendFriendRequest = async (userId, token) => {
  try {
    const res = await axiosInstance.post(`/request/${userId}`, {}, authHeader(token));
    return res.data;
  } catch (err) {
    throw err.response?.data || { message: "Error sending request" };
  }
};

// Accept friend request
export const acceptFriendRequest = async (requesterId, token) => {
  try {
    const res = await axiosInstance.post(`/accept/${requesterId}`, {}, authHeader(token));
    return res.data;
  } catch (err) {
    throw err.response?.data || { message: "Error accepting request" };
  }
};

// Decline friend request
export const declineFriendRequest = async (requesterId, token) => {
  try {
    const res = await axiosInstance.post(`/decline/${requesterId}`, {}, authHeader(token));
    return res.data;
  } catch (err) {
    throw err.response?.data || { message: "Error declining request" };
  }
};

// Get all friends
export const getFriends = async (token) => {
  try {
    const res = await axiosInstance.get("/", authHeader(token));
    return res.data;
  } catch (err) {
    throw err.response?.data || { message: "Error fetching friends" };
  }
};

// Get pending friend requests
export const getPendingRequests = async (token) => {
  try {
    const res = await axiosInstance.get("/pending", authHeader(token));
    return res.data;
  } catch (err) {
    throw err.response?.data || { message: "Error fetching pending requests" };
  }
};

// Get all users (for "Add Friend" feature)
export const getAllUsers = async (token) => {
  try {
    const res = await axiosInstance.get("/all", authHeader(token));
    return res.data;
  } catch (err) {
    throw err.response?.data || { message: "Error fetching all users" };
  }
};
