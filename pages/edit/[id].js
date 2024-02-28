import { useEffect, useState } from 'react';
import { useSession  } from 'next-auth/react';
import { useRouter } from 'next/router';

const EditPage = () => {
  const [session, loading] = useSession();
  const router = useRouter();
  const [formData, setFormData] = useState({ username: '',password:'',tel:'', email: ''});

  useEffect(() => {
    // Redirect to login if not authenticated
    if (!session && !loading) router.push('/login');

    // Fetch user information
    const fetchData = async () => {
      const response = await fetch(`/api/bio?id=${router.query.id}`);
      const data = await response.json();
      setFormData(data);
    };

    if (session) fetchData();
  }, [session, loading, router]);

  const handleInputChange = (e) => {
    setFormData((prevData) => ({ ...prevData, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Update user information
    await fetch(`/api/bio?id=${router.query.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    // Redirect to home page
    router.push('/');
  };

  if (loading) return null;

  return (
    <div>
      <h1>Edit Personal Information</h1>
      <form onSubmit={handleSubmit}>
        <label>Username:</label>
        <input type="text" name="username" value={formData.username} onChange={handleInputChange} />
        <label>Password:</label>
        <input type="text" name="password" value={formData.password} onChange={handleInputChange} />

        <label>Tel:</label>
        <input type="tel" name="tel" value={formData.tel} onChange={handleInputChange} />

        <label>Email:</label>
        <textarea type="email" name="email" value={formData.email} onChange={handleInputChange}></textarea>

        <button type="submit">Save</button>
      </form>
    </div>
  );
};

export default EditPage;
