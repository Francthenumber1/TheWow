import { useState, useEffect } from 'react';

const BookingsPage = () => {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const res = await fetch('/api/bookings'); // Adjust API endpoint as needed
        const data = await res.json();
        setBookings(data);
      } catch (error) {
        console.error('Error fetching bookings:', error);
      }
    };

    fetchBookings();
  }, []);

  const cancelBooking = async (bookingId) => {
    try {
      await fetch(`/api/bookings/${bookingId}`, {
        method: 'DELETE',
      });
      setBookings((prev) => prev.filter((booking) => booking.id !== bookingId));
      alert('Booking canceled');
    } catch (error) {
      console.error('Error canceling booking:', error);
    }
  };

  return (
    <section className="container mx-auto py-6 px-4">
      <h1 className="text-3xl font-bold mb-6">My Bookings</h1>
      
      {bookings.length > 0 ? (
        bookings.map((booking) => (
          <div key={booking.id} className="bg-white p-6 rounded-lg shadow-md mb-4">
            <h2 className="text-2xl font-bold">{booking.serviceName}</h2>
            <p>Date: {booking.date}</p>
            <p>Status: {booking.status}</p>
            <button
              onClick={() => cancelBooking(booking.id)}
              className="mt-4 bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded"
            >
              Cancel Booking
            </button>
          </div>
        ))
      ) : (
        <p>No bookings found.</p>
      )}
    </section>
  );
};

export default BookingsPage;

