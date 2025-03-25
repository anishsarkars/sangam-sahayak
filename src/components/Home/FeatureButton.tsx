
import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';

interface FeatureButtonProps {
  icon: LucideIcon;
  title: string;
  description: string;
  to: string;
  color: string;
  delay?: number;
  status?: 'green' | 'yellow' | 'red' | 'none';
}

const FeatureButton: React.FC<FeatureButtonProps> = ({
  icon: Icon,
  title,
  description,
  to,
  color,
  delay = 0,
  status = 'none'
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
    >
      <Link to={to} className="feature-button">
        {status !== 'none' && (
          <span className={`feature-button-indicator ${statusColors[status]}`}></span>
        )}
        <div 
          className={`w-12 h-12 rounded-full flex items-center justify-center ${color}`}
        >
          <Icon className="w-6 h-6 text-white" />
        </div>
        <div className="text-center">
          <h3 className="font-medium text-foreground mb-1">{title}</h3>
          <p className="text-xs text-muted-foreground line-clamp-2">{description}</p>
        </div>
      </Link>
    </motion.div>
  );
};

export default FeatureButton;
