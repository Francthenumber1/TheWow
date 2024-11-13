import { useState } from 'react';

const RegisterForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [userType, setUserType] = useState('Client'); // Default to Client
  const [companyName, setCompanyName] = useState('');
  const [companyDescription, setCompanyDescription] = useState('');

  const handleRegister = (e) => {
    e.preventDefault();

    const newUser = {
      email,
      password,
      userType,
      ...(userType === 'Service Provider' && { companyName, companyDescription }),
    };

    // Logic for registration based on `newUser` object
    console.log('Registering user:', newUser);
  };

  return (
    <form onSubmit={handleRegister} className='bg-white p-6 rounded-lg shadow-md'>
      <h2 className='text-2xl font-bold mb-4'>Register</h2>

      <div className='mb-4'>
        <label className='block text-gray-700'>User Type</label>
        <select
          value={userType}
          onChange={(e) => setUserType(e.target.value)}
          className='border rounded w-full py-2 px-3'
          required
        >
          <option value='Client'>Client</option>
          <option value='Service Provider'>Service Provider</option>
        </select>
      </div>

      <div className='mb-4'>
        <label className='block text-gray-700'>Email</label>
        <input
          type='email'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className='border rounded w-full py-2 px-3'
          required
        />
      </div>

      <div className='mb-4'>
        <label className='block text-gray-700'>Password</label>
        <input
          type='password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className='border rounded w-full py-2 px-3'
          required
        />
      </div>

      <div className='mb-4'>
        <label className='block text-gray-700'>Confirm Password</label>
        <input
          type='password'
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          className='border rounded w-full py-2 px-3'
          required
        />
      </div>

      {userType === 'Service Provider' && (
        <>
          <div className='mb-4'>
            <label className='block text-gray-700'>Company Name</label>
            <input
              type='text'
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
              className='border rounded w-full py-2 px-3'
              required
            />
          </div>

          <div className='mb-4'>
            <label className='block text-gray-700'>Company Description</label>
            <textarea
              value={companyDescription}
              onChange={(e) => setCompanyDescription(e.target.value)}
              className='border rounded w-full py-2 px-3'
              rows='4'
              required
            ></textarea>
          </div>
        </>
      )}

      <button type='submit' className='bg-indigo-500 hover:bg-indigo-600 text-white px-4 py-2 rounded-lg'>
        Register
      </button>
    </form>
  );
};

export default RegisterForm;
