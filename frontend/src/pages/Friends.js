import React, { useEffect, useState } from 'react';
import { getFriends, getPendingRequests, acceptFriendRequest, declineFriendRequest } from '../services/friendService';

const Friends = ({ token }) => {
  const [friends, setFriends] = useState([]);
  const [pending, setPending] = useState([]);

  useEffect(() => {
    fetchFriends();
    fetchPending();
  }, []);

  const fetchFriends = async () => {
    const res = await getFriends(token);
    setFriends(res.data);
  };

  const fetchPending = async () => {
    const res = await getPendingRequests(token);
    setPending(res.data);
  };

  const handleAccept = async (id) => {
    await acceptFriendRequest(id, token);
    fetchPending();
    fetchFriends();
  };

  const handleDecline = async (id) => {
    await declineFriendRequest(id, token);
    fetchPending();
  };

  return (
    <div>
      <h2>Your Friends</h2>
      <ul>
        {friends.map(f => (
          <li key={f.id}>{f.username}</li>
        ))}
      </ul>

      <h2>Pending Requests</h2>
      <ul>
        {pending.map(p => (
          <li key={p.requester_id}>
            {p.username}
            <button onClick={() => handleAccept(p.requester_id)}>Accept</button>
            <button onClick={() => handleDecline(p.requester_id)}>Decline</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Friends;
