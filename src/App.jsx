import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from 'react-router-dom';

import MainLayout from './layouts/MainLayout';
import HomePage from './pages/HomePage';
import JobsPage from './pages/JobsPage';
import NotFoundPage from './pages/NotFoundPage';
import JobPage, { jobLoader } from './pages/JobPage';
import AddJobPage from './pages/AddJobPage';
import EditJobPage from './pages/EditJobPage';
import UserProfile from './pages/UserProfile';
import ChatPage from './pages/ChatPage';
import BookingsPage from './pages/BookingsPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';

const App = () => {
  // Function to add a new job
  const addJob = async (newJob) => {
    try {
      const res = await fetch('/api/jobs', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newJob),
      });
      if (!res.ok) throw new Error('Failed to add job');
    } catch (error) {
      console.error(error);
    }
  };

  // Function to delete a job
  const deleteJob = async (id) => {
    try {
      const res = await fetch(`/api/jobs/${id}`, { // <-- FIXED TEMPLATE LITERAL
        method: 'DELETE',
      });
      if (!res.ok) throw new Error('Failed to delete job');
    } catch (error) {
      console.error(error);
    }
  };

  // Function to update a job
  const updateJob = async (job) => {
    try {
      const res = await fetch(`/api/jobs/${job.id}`, { // <-- FIXED TEMPLATE LITERAL
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(job),
      });
      if (!res.ok) throw new Error('Failed to update job');
    } catch (error) {
      console.error(error);
    }
  };

  // Set up routing
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<MainLayout />}>
        {/* Home Page */}
        <Route index element={<HomePage />} />

        {/* Jobs Routes */}
        <Route path="/jobs" element={<JobsPage />} />
        <Route path="/add-job" element={<AddJobPage addJobSubmit={addJob} />} />
        <Route
          path="/edit-job/:id"
          element={<EditJobPage updateJobSubmit={updateJob} />}
          loader={jobLoader}
        />
        <Route
          path="/jobs/:id"
          element={<JobPage deleteJob={deleteJob} />}
          loader={jobLoader}
        />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/register' element={<RegisterPage />} />

        {/* User Profile, Chat, and Bookings Pages */}
        <Route path="/profile" element={<UserProfile />} />
        <Route path="/chat" element={<ChatPage />} />
        <Route path="/bookings" element={<BookingsPage />} />

        {/* Catch-all route for undefined paths */}
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    )
  );

  return <RouterProvider router={router} />;
};

export default App;
