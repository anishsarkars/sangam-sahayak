
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from '@/components/Layout/Header';
import Footer from '@/components/Layout/Footer';
import WelcomeCard from '@/components/Home/WelcomeCard';
import FeatureButton from '@/components/Home/FeatureButton';
import VolunteerCard from '@/components/Volunteer/VolunteerCard';
import { useLanguage } from '@/components/ui/LanguageToggle';
import { motion } from 'framer-motion';
import { Train, Map, Search, Phone, Droplets, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';

const translations = {
  en: {
    trainBooking: {
      title: 'Train Booking',
      description: 'Batch-wise train ticket allocation'
    },
    crowdMap: {
      title: 'Crowd Map',
      description: 'Real-time crowd density visualization'
    },
    lostFound: {
      title: 'Lost & Found',
      description: 'Find missing persons and belongings'
    },
    emergency: {
      title: 'Emergency',
      description: 'SOS assistance and emergency contacts'
    },
    services: {
      title: 'Services',
      description: 'Water, toilets, medical aid & more'
    },
    volunteer: {
      title: 'Volunteer',
      description: 'Join our community response team'
    }
  },
  hi: {
    trainBooking: {
      title: 'ट्रेन बुकिंग',
      description: 'बैच-वार ट्रेन टिकट आवंटन'
    },
    crowdMap: {
      title: 'भीड़ मानचित्र',
      description: 'वास्तविक समय की भीड़ घनत्व विज़ुअलाइज़ेशन'
    },
    lostFound: {
      title: 'खोया-पाया',
      description: 'लापता व्यक्तियों और सामानों को खोजें'
    },
    emergency: {
      title: 'आपातकाल',
      description: 'SOS सहायता और आपातकालीन संपर्क'
    },
    services: {
      title: 'सेवाएं',
      description: 'पानी, शौचालय, चिकित्सा सहायता और अधिक'
    },
    volunteer: {
      title: 'स्वयंसेवक',
      description: 'हमारी सामुदायिक प्रतिक्रिया टीम में शामिल हों'
    }
  }
};

const Index: React.FC = () => {
  const { language } = useLanguage();
  const t = translations[language];

  // Responsive container classes based on screen size
  const containerClass = "max-w-7xl mx-auto min-h-[100dvh] flex flex-col";
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-secondary/20">
      <div className={containerClass}>
        <Header />
        
        <main className="flex-1 p-4 pt-6 md:px-6 lg:px-8">
          <div className="md:max-w-3xl lg:max-w-4xl mx-auto">
            <WelcomeCard />
            
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-6">
              <motion.div 
                className="md:col-span-1"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
              >
                <FeatureButton 
                  icon={Train}
                  title={t.trainBooking.title}
                  description={t.trainBooking.description}
                  to="/train-booking"
                  color="bg-sangam-500"
                  delay={1}
                  status="green"
                />
              </motion.div>
              
              <motion.div 
                className="md:col-span-1"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <FeatureButton 
                  icon={Map}
                  title={t.crowdMap.title}
                  description={t.crowdMap.description}
                  to="/crowd-map"
                  color="bg-sangam-600"
                  delay={2}
                  status="yellow"
                />
              </motion.div>
              
              <motion.div 
                className="md:col-span-1"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <FeatureButton 
                  icon={Search}
                  title={t.lostFound.title}
                  description={t.lostFound.description}
                  to="/lost-found"
                  color="bg-sangam-700"
                  delay={3}
                />
              </motion.div>
              
              <motion.div 
                className="md:col-span-1"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                <FeatureButton 
                  icon={Phone}
                  title={t.emergency.title}
                  description={t.emergency.description}
                  to="/emergency"
                  color="bg-red-500"
                  delay={4}
                />
              </motion.div>
              
              <motion.div 
                className="md:col-span-1"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                <FeatureButton 
                  icon={Droplets}
                  title={t.services.title}
                  description={t.services.description}
                  to="/services"
                  color="bg-blue-500"
                  delay={5}
                />
              </motion.div>
              
              <motion.div 
                className="md:col-span-1"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
              >
                <FeatureButton 
                  icon={Users}
                  title={t.volunteer.title}
                  description={t.volunteer.description}
                  to="/volunteer"
                  color="bg-amber-600"
                  delay={6}
                />
              </motion.div>
            </div>

            <Link to="/volunteer">
              <VolunteerCard onJoinClick={() => {}} />
            </Link>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="mt-6 mb-10 text-center"
            >
              <p className="text-xs text-muted-foreground italic">
                "Transforming Kumbh Mela into the Most Safely Managed Mass Gathering in the World!"
              </p>
            </motion.div>
          </div>
        </main>
        
        <Footer />
      </div>
    </div>
  );
};

export default Index;
