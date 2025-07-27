import React,{useContext} from 'react'
import { UserContext } from '../context/user.context'
import HeroSection from '../components/HeroSection.jsx';
import FeaturesSection from '../components/FeatureSection';
import AISection from '../components/AiSection';
import WelcomeUser from '../components/WelcomeUser.jsx';
const Home = () => {
  const { user } = useContext(UserContext);

  // if (!user) {
  //   return <div>Please log in to see your profile information.</div>;
  // }

  return (

    < >
    <div>
{user ?(<>
 <h1 className="text-2xl font-bold mb-4">Welcome, {user?.username}!</h1>
      <p><strong>Email:</strong> {user?.email}</p>
</>):<div> Please log in to see your profile information.</div>}
    </div>
     <WelcomeUser/>
<HeroSection/>
<FeaturesSection/>
<AISection/>

    </>
  );
};

export default Home;

