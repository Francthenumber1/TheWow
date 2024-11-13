import { useState, useEffect } from 'react';

const UserProfile = () => {
  const [userData, setUserData] = useState(null);
  const [bookings, setBookings] = useState([]);

  // Fetch user data and bookings on mount
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const res = await fetch('/api/user'); // Adjust endpoint as necessary
        const data = await res.json();
        setUserData(data);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    const fetchBookings = async () => {
      try {
        const res = await fetch('/api/bookings'); // Adjust endpoint as necessary
        const data = await res.json();
        setBookings(data);
      } catch (error) {
        console.error('Error fetching bookings:', error);
      }
    };

    fetchUserData();
    fetchBookings();
  }, []);

  return (
    <section className="container mx-auto py-6 px-4">
      <h1 className="text-3xl font-bold mb-6">User Profile</h1>
      
      {userData ? (
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl mb-4">{userData.name}</h2>
          <p>Email: {userData.email}</p>
          <p>Phone: {userData.phone}</p>
          <p>Address: {userData.address}</p>
        </div>
      ) : (
        <p>Loading user data...</p>
      )}

      <h2 className="text-2xl font-bold mt-6 mb-4">My Bookings</h2>
      <ul>
        {bookings.length > 0 ? (
          bookings.map((booking) => (
            <li key={booking.id} className="mb-4 p-4 border rounded-lg shadow-sm">
              <h3 className="text-xl font-bold">{booking.serviceName}</h3>
              <p>Date: {booking.date}</p>
              <p>Status: {booking.status}</p>
            </li>
          ))
        ) : (
          <p>No bookings found.</p>
        )}
      </ul>
    </section>
  );
};

export default UserProfile;
