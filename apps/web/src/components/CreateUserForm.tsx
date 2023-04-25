import React from 'react';
import { useForm } from 'react-hook-form';
import { useMutation } from 'react-query';
import { createUser } from '../utils/api';

interface CreateUserFormData {
  first_name: string;
  last_name: string;
  email: string;
}

const CreateUserForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateUserFormData>();

  const createUserMutation = useMutation(
    async (formData: CreateUserFormData) => {
      const response = createUser(formData);

      if (!response) {
        throw new Error('Failed to create user');
      }
    }
  );

  const onSubmit = async (data: CreateUserFormData) => {
    try {
      await createUserMutation.mutateAsync(data);
      console.log('User created successfully!');
    } catch (error) {
      console.error('Failed to create user:', error);
    }
  };

  return (
    <div className="flex">
      <div className="bg-white w-96 h-96 p-8 rounded-md shadow-md">
        <h1 className="text-2xl font-bold mb-4">Create User</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Render form fields here */}
          <div className="mb-4">
            <label
              htmlFor="first_name"
              className="block text-sm font-medium text-gray-700"
            >
              First Name
            </label>
            <input
              type="text"
              id="first_name"
              {...register('first_name', {
                required: 'First Name is required',
              })}
              className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
            />
            {errors.first_name && (
              <p className="mt-2 text-sm text-red-500">
                {errors.first_name.message}
              </p>
            )}
          </div>
          <div className="mb-4">
            <label
              htmlFor="last_name"
              className="block text-sm font-medium text-gray-700"
            >
              Last Name
            </label>
            <input
              type="text"
              id="last_name"
              {...register('last_name', { required: 'Last Name is required' })}
              className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
            />
            {errors.last_name && (
              <p className="mt-2 text-sm text-red-500">
                {errors.last_name.message}
              </p>
            )}
          </div>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              {...register('email', {
                required: 'Email is required',
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                  message: 'Invalid email address',
                },
              })}
              className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
            />
            {errors.email && (
              <p className="mt-2 text-sm text-red-500">
                {errors.email.message}
              </p>
            )}
          </div>
          <div></div>
          <div>
            <button
              type="submit"
              disabled={createUserMutation.isLoading} // Disable button during mutation
              className="w-full bg-indigo-600 py-2 px-4 border border-transparent rounded-md text-white font-medium hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              {createUserMutation.isLoading
                ? 'Creating User...'
                : 'Create User'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateUserForm;
