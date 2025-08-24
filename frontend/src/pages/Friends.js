import React, { useEffect, useState } from "react";
import {
  getFriends,
  getPendingRequests,
  acceptFriendRequest,
  declineFriendRequest,
  getAllUsers,
  sendFriendRequest,
} from "../services/friendService";

const Friends = ({ token }) => {
  const [friends, setFriends] = useState([]);
  const [pending, setPending] = useState([]);
  const [allUsers, setAllUsers] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (token) {
      fetchFriends();
      fetchPending();
      fetchAllUsers();
    }
  }, [token]);

  const fetchFriends = async () => {
    try {
      const data = await getFriends(token);
      setFriends(data);
    } catch (err) {
      setError(err.message || "Failed to fetch friends");
    }
  };

  const fetchPending = async () => {
    try {
      const data = await getPendingRequests(token);
      setPending(data);
    } catch (err) {
      setError(err.message || "Failed to fetch pending requests");
    }
  };

  const fetchAllUsers = async () => {
    try {
      const data = await getAllUsers(token);
      setAllUsers(data);
    } catch (err) {
      setError(err.message || "Failed to fetch users");
    }
  };

  const handleAccept = async (id) => {
    try {
      await acceptFriendRequest(id, token);
      fetchPending();
      fetchFriends();
    } catch (err) {
      setError(err.message || "Failed to accept request");
    }
  };

  const handleDecline = async (id) => {
    try {
      await declineFriendRequest(id, token);
      fetchPending();
    } catch (err) {
      setError(err.message || "Failed to decline request");
    }
  };

  const handleAddFriend = async (id) => {
    try {
      await sendFriendRequest(id, token);
      alert("Friend request sent!");
      fetchAllUsers(); // optional: refresh user list
    } catch (err) {
      setError(err.message || "Failed to send friend request");
    }
  };

  if (!token) return <p>Please login to view your friends.</p>;

  return (
    <div style={{ padding: "20px" }}>
      {error && <p style={{ color: "red" }}>{error}</p>}

      <h2>Your Friends</h2>
      {friends.length ? (
        <ul>
          {friends.map((f) => (
            <li key={f.id}>{f.username}</li>
          ))}
        </ul>
      ) : (
        <p>No friends found.</p>
      )}

      <h2>Pending Requests</h2>
      {pending.length ? (
        <ul>
          {pending.map((p) => (
            <li key={p.requester_id}>
              {p.username}
              <button onClick={() => handleAccept(p.requester_id)}>Accept</button>
              <button onClick={() => handleDecline(p.requester_id)}>Decline</button>
            </li>
          ))}
        </ul>
      ) : (
        <p>No pending requests.</p>
      )}

      <h2>All Users</h2>
      {allUsers.length ? (
        <ul>
          {allUsers.map((u) => {
            const isFriend = friends.some((f) => f.id === u.id);
            const isPending = pending.some((p) => p.requester_id === u.id);
            return (
              <li key={u.id}>
                {u.username}{" "}
                {!isFriend && !isPending && (
                  <button onClick={() => handleAddFriend(u.id)}>Add Friend</button>
                )}
                {isFriend && <span> (Friend)</span>}
                {isPending && <span> (Pending)</span>}
              </li>
            );
          })}
        </ul>
      ) : (
        <p>No users found.</p>
      )}
    </div>
  );
};

export default Friends;
