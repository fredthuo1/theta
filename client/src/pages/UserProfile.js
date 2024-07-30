import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UserProfile = ({ address }) => {
  const [profile, setProfile] = useState({ name: '', bio: '' });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/user/${address}`);
        setProfile(response.data.profile || { name: '', bio: '' });
        setLoading(false);
      } catch (error) {
        console.error("Error fetching profile:", error);
        setLoading(false);
      }
    };
    fetchProfile();
  }, [address]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile(prevProfile => ({ ...prevProfile, [name]: value }));
  };

  const handleSave = async () => {
    try {
      await axios.post(`http://localhost:5000/api/user/${address}`, profile);
      alert("Profile updated successfully");
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      <h2>User Profile</h2>
      <label>
        Name:
        <input type="text" name="name" value={profile.name} onChange={handleChange} />
      </label>
      <label>
        Bio:
        <textarea name="bio" value={profile.bio} onChange={handleChange} />
      </label>
      <button onClick={handleSave}>Save</button>
    </div>
  );
};

export default UserProfile;
