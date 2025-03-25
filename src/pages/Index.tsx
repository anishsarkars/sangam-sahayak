
import React, { useEffect } from 'react';
import Header from '@/components/Layout/Header';
import Footer from '@/components/Layout/Footer';
import WelcomeCard from '@/components/Home/WelcomeCard';
import FeatureButton from '@/components/Home/FeatureButton';
import { Train, Map, Search, Phone, Droplets } from 'lucide-react';

const Index: React.FC = () => {
  return (
    <div className="app-container bg-gradient-to-br from-background to-secondary/30">
      <Header />
      
      <main className="flex-1 p-4 pt-6">
        <WelcomeCard />
        
        <div className="grid grid-cols-2 gap-4">
          <FeatureButton 
            icon={Train}
            title="Train Booking"
            description="Batch-wise train ticket allocation"
            to="/train-booking"
            color="bg-sangam-600"
            delay={1}
            status="green"
          />
          
          <FeatureButton 
            icon={Map}
            title="Crowd Map"
            description="Real-time crowd density visualization"
            to="/crowd-map"
            color="bg-sangam-500"
            delay={2}
            status="yellow"
          />
          
          <FeatureButton 
            icon={Search}
            title="Lost & Found"
            description="Find missing persons and belongings"
            to="/lost-found"
            color="bg-sangam-700"
            delay={3}
          />
          
          <FeatureButton 
            icon={Phone}
            title="Emergency"
            description="SOS assistance and emergency contacts"
            to="/emergency"
            color="bg-red-500"
            delay={4}
          />
          
          <FeatureButton 
            icon={Droplets}
            title="Services"
            description="Water, toilets, medical aid & more"
            to="/services"
            color="bg-blue-500"
            delay={5}
          />
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
