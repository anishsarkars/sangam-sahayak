
import React from 'react';
import { motion } from 'framer-motion';
import { Badge } from '@/components/ui/badge';

interface WelcomeCardProps {
  userName?: string;
}

const WelcomeCard: React.FC<WelcomeCardProps> = ({ userName }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="premium-card mb-8"
    >
      <div className="flex items-start gap-5">
        <div className="flex-1">
          <Badge variant="outline" className="bg-sangam-50 dark:bg-sangam-900/30 text-sangam-700 dark:text-sangam-300 border-sangam-200 dark:border-sangam-800 px-3 py-1 mb-3">
            Ujjain Maha Kumbh 2028
          </Badge>
          
          <h2 className="text-2xl md:text-3xl font-bold text-sangam-900 dark:text-sangam-100 mb-2">
            {userName ? `नमस्ते, ${userName}` : 'नमस्ते, यात्री'}
          </h2>
          
          <p className="text-muted-foreground">
            Welcome to Sangam Sahayak, your companion for a safe and smooth pilgrimage experience at the Maha Kumbh.
          </p>
          
          <div className="flex flex-wrap gap-4 mt-5">
            <div className="flex items-center space-x-2">
              <div className="h-1.5 w-1.5 rounded-full bg-green-500"></div>
              <span className="text-xs text-muted-foreground">Services operational</span>
            </div>
            
            <div className="flex items-center space-x-2">
              <div className="h-1.5 w-1.5 rounded-full bg-yellow-500"></div>
              <span className="text-xs text-muted-foreground">Moderate crowd levels</span>
            </div>
            
            <div className="flex items-center space-x-2">
              <div className="h-1.5 w-1.5 rounded-full bg-sangam-500"></div>
              <span className="text-xs text-muted-foreground">Train tickets available</span>
            </div>
          </div>
        </div>
        
        <div className="ml-4 hidden md:block">
          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="relative"
          >
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ repeat: Infinity, duration: 3 }}
              className="w-24 h-24 rounded-2xl flex items-center justify-center bg-white dark:bg-black/40 shadow-lg border border-white/50 dark:border-white/10"
            >
              <img 
                src="/lovable-uploads/87426195-50c3-4941-a99e-fd22bb0635b7.png" 
                alt="Sangam Sahayak Logo" 
                className="w-20 h-20 object-contain"
              />
            </motion.div>
            <div className="absolute -bottom-2 -right-2 text-[8px] text-sangam-500 dark:text-sangam-400 font-medium">
              Designed by @Anish
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default WelcomeCard;
