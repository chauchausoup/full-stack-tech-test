import { useForm } from 'react-hook-form';
import { createUser } from '../utils/api'; // import your createUser API function

type CreateUserFormData = {
  firstName: string;
  lastName: string;
  email: string;
};

function CreateUserForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateUserFormData>();

  const onSubmit = async (formData: CreateUserFormData) => {
    try {
      await createUser(formData); // call your API function to create user
      alert('User created successfully!');
    } catch (error) {
      alert(`Error creating user: ${error.message}`);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label htmlFor="firstName">First Name:</label>
        <input type="text" {...register('firstName', { required: true })} />
        {errors.firstName && <span>This field is required</span>}
      </div>
      <div>
        <label htmlFor="lastName">Last Name:</label>
        <input type="text" {...register('lastName', { required: true })} />
        {errors.lastName && <span>This field is required</span>}
      </div>
      <div>
        <label htmlFor="email">Email:</label>
        <input type="email" {...register('email', { required: true })} />
        {errors.email && <span>This field is required</span>}
      </div>
      <button type="submit">Create User</button>
    </form>
  );
}

export default CreateUserForm;
