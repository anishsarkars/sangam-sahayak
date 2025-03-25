
import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface FeatureButtonProps {
  icon: LucideIcon;
  title: string;
  description: string;
  to: string;
  color: string;
  delay?: number;
  status?: 'green' | 'yellow' | 'red' | 'none';
  badge?: string;
}

const FeatureButton: React.FC<FeatureButtonProps> = ({
  icon: Icon,
  title,
  description,
  to,
  color,
  delay = 0,
  status = 'none',
  badge
}) => {
  const statusColors = {
    green: 'bg-green-500',
    yellow: 'bg-yellow-500',
    red: 'bg-red-500',
    none: 'hidden'
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: delay * 0.1 }}
      whileHover={{ 
        y: -5, 
        transition: { duration: 0.2 } 
      }}
      className="h-full"
    >
      <Link to={to} className="premium-card flex flex-col items-center justify-center p-4 gap-3 h-full relative overflow-hidden">
        {/* Animated gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-70 z-0"></div>
        
        {/* Floating particles effect */}
        <motion.div
          animate={{
            y: [0, -10, 0],
            opacity: [0.2, 0.5, 0.2]
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute right-3 top-6 w-1.5 h-1.5 rounded-full bg-primary/30"
        />
        <motion.div
          animate={{
            y: [0, -15, 0],
            opacity: [0.1, 0.3, 0.1]
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 0.5
          }}
          className="absolute left-4 bottom-4 w-1 h-1 rounded-full bg-primary/20"
        />
        
        {status !== 'none' && (
          <motion.span 
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: delay * 0.1 + 0.3, duration: 0.3 }}
            className={`absolute top-3 right-3 w-2 h-2 rounded-full ${statusColors[status]}`}
          />
        )}
        
        {badge && (
          <Badge 
            variant="secondary" 
            className="absolute top-2 left-2 text-[9px] font-medium px-1.5 py-0 h-4"
          >
            {badge}
          </Badge>
        )}
        
        <motion.div 
          whileHover={{ rotate: 5, scale: 1.05 }}
          transition={{ duration: 0.2 }}
          className={`w-14 h-14 rounded-full flex items-center justify-center ${color} shadow-md glow-effect z-10`}
        >
          <Icon className="w-7 h-7 text-white" />
        </motion.div>
        <div className="text-center z-10">
          <h3 className="font-semibold text-sangam-900 dark:text-sangam-100 mb-1">{title}</h3>
          <p className="text-xs text-muted-foreground line-clamp-2">{description}</p>
        </div>
      </Link>
    </motion.div>
  );
};

export default FeatureButton;
