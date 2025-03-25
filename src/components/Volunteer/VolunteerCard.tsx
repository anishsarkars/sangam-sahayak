
import React from 'react';
import { motion } from 'framer-motion';
import { Award, CheckCircle, Users } from 'lucide-react';
import { Button } from '../ui/button';

const VolunteerCard: React.FC = () => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="premium-card my-6"
    >
      <div className="flex flex-col md:flex-row gap-6">
        <div className="flex-1">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.4 }}
            className="inline-block px-3 py-1 bg-sangam-100 dark:bg-sangam-900/40 text-sangam-800 dark:text-sangam-300 rounded-full text-xs font-medium mb-3"
          >
            Volunteer Program
          </motion.div>
          
          <h2 className="text-xl md:text-2xl font-bold text-sangam-900 dark:text-sangam-100 mb-3">
            <span className="wavy-text">Empowered Volunteer & Community Response System</span>
          </h2>
          
          <p className="text-muted-foreground mb-4">
            Join our volunteer network to help make Kumbh 2028 the most seamlessly managed event ever!
          </p>
          
          <div className="space-y-3 mb-5">
            <div className="flex items-start">
              <CheckCircle className="w-5 h-5 text-sangam-500 mt-0.5 mr-2 flex-shrink-0" />
              <span className="text-sm">Crowd guidance & navigation</span>
            </div>
            <div className="flex items-start">
              <CheckCircle className="w-5 h-5 text-sangam-500 mt-0.5 mr-2 flex-shrink-0" />
              <span className="text-sm">First aid & medical assistance</span>
            </div>
            <div className="flex items-start">
              <CheckCircle className="w-5 h-5 text-sangam-500 mt-0.5 mr-2 flex-shrink-0" />
              <span className="text-sm">Missing persons assistance</span>
            </div>
            <div className="flex items-start">
              <CheckCircle className="w-5 h-5 text-sangam-500 mt-0.5 mr-2 flex-shrink-0" />
              <span className="text-sm">Tech support for elderly pilgrims</span>
            </div>
          </div>
          
          <div className="flex flex-wrap gap-3">
            <Button className="premium-button">
              <Users className="w-4 h-4 mr-2" />
              Join As Volunteer
            </Button>
            <Button variant="outline" className="border-sangam-200 dark:border-sangam-800">
              Learn More
            </Button>
          </div>
        </div>
        
        <div className="md:w-[280px] flex-shrink-0">
          <div className="bg-gradient-to-br from-sangam-50 to-sangam-100 dark:from-sangam-900/30 dark:to-sangam-900/50 rounded-xl p-4 h-full">
            <h3 className="font-medium text-sangam-900 dark:text-sangam-100 mb-3 flex items-center">
              <Award className="w-4 h-4 mr-2 text-sangam-500" />
              Volunteer Benefits
            </h3>
            <ul className="space-y-2 text-sm">
              <motion.li 
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3, duration: 0.4 }}
                className="flex items-center"
              >
                <div className="w-2 h-2 rounded-full bg-sangam-500 mr-2"></div>
                <span>Government-endorsed certificates</span>
              </motion.li>
              <motion.li 
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4, duration: 0.4 }}
                className="flex items-center"
              >
                <div className="w-2 h-2 rounded-full bg-sangam-500 mr-2"></div>
                <span>Achievement badges & recognition</span>
              </motion.li>
              <motion.li 
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5, duration: 0.4 }}
                className="flex items-center"
              >
                <div className="w-2 h-2 rounded-full bg-sangam-500 mr-2"></div>
                <span>College credits for students</span>
              </motion.li>
              <motion.li 
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6, duration: 0.4 }}
                className="flex items-center"
              >
                <div className="w-2 h-2 rounded-full bg-sangam-500 mr-2"></div>
                <span>Leaderboard with rewards</span>
              </motion.li>
              <motion.li 
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.7, duration: 0.4 }}
                className="flex items-center"
              >
                <div className="w-2 h-2 rounded-full bg-sangam-500 mr-2"></div>
                <span>Real-time task assignments</span>
              </motion.li>
            </ul>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default VolunteerCard;
