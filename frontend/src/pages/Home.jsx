import React,{useContext} from 'react'
import { UserContext } from '../context/user.context'
const Home = () => {
  const { user } = useContext(UserContext);

  if (!user) {
    return <div>Please log in to see your profile information.</div>;
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Welcome, {user.username}!</h1>
      <p><strong>Email:</strong> {user.email}</p>

    </div>
  );
};

export default Home;

