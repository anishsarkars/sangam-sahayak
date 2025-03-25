
import React, { useState, useEffect } from 'react';
import Header from '@/components/Layout/Header';
import Footer from '@/components/Layout/Footer';
import { motion } from 'framer-motion';
import { 
  Droplets, LocateFixed, PanelTopOpen, Stethoscope, 
  ShoppingBag, UserRoundCheck, Utensils, Wifi 
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { toast } from 'sonner';
import { Badge } from '@/components/ui/badge';
import Confetti from '@/components/ui/confetti';

const Services: React.FC = () => {
  const [isLocating, setIsLocating] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  
  const handleLocateNearby = () => {
    setIsLocating(true);
    
    setTimeout(() => {
      setIsLocating(false);
      toast.success('Found nearby facilities', {
        description: 'Showing the closest services to your location',
      });
      setShowConfetti(true);
      
      // Set a timeout to auto-select the first category to ensure services are shown
      setTimeout(() => {
        setActiveCategory('water');
      }, 500);
    }, 1500);
  };
  
  const serviceCategories = [
    { 
      id: 'water', 
      title: 'Water Points', 
      icon: Droplets, 
      color: 'bg-blue-500',
      description: 'Free drinking water stations',
      count: 12
    },
    { 
      id: 'toilets', 
      title: 'Toilets', 
      icon: PanelTopOpen, 
      color: 'bg-teal-500',
      description: 'Public toilets and washrooms',
      count: 8
    },
    { 
      id: 'medical', 
      title: 'Medical Aid', 
      icon: Stethoscope, 
      color: 'bg-red-500',
      description: 'First aid and medical assistance',
      count: 5
    },
    { 
      id: 'food', 
      title: 'Food Stalls', 
      icon: Utensils, 
      color: 'bg-orange-500',
      description: 'Affordable food services',
      count: 15
    },
    { 
      id: 'shops', 
      title: 'Convenience Stores', 
      icon: ShoppingBag, 
      color: 'bg-purple-500',
      description: 'Essential items and supplies',
      count: 7
    },
    { 
      id: 'volunteers', 
      title: 'Volunteer Stations', 
      icon: UserRoundCheck, 
      color: 'bg-green-500',
      description: 'Guidance and assistance',
      count: 10
    },
    { 
      id: 'wifi', 
      title: 'Free Wi-Fi Zones', 
      icon: Wifi, 
      color: 'bg-indigo-500',
      description: 'Internet connectivity points',
      count: 6
    }
  ];

  // Mock data for facilities
  const facilities = {
    water: [
      { id: 1, name: 'Central Water Station', distance: '0.3 km', status: 'Open' },
      { id: 2, name: 'River Bank Point', distance: '0.5 km', status: 'Open' },
      { id: 3, name: 'Temple Entrance', distance: '0.7 km', status: 'Open' },
      { id: 4, name: 'Eastern Gate Station', distance: '1.2 km', status: 'Open' },
    ],
    toilets: [
      { id: 1, name: 'Main Washroom Complex', distance: '0.2 km', status: 'Open' },
      { id: 2, name: 'Northern Toilets', distance: '0.6 km', status: 'Open' },
      { id: 3, name: 'Eastern Facilities', distance: '0.9 km', status: 'Maintenance' },
    ],
    medical: [
      { id: 1, name: 'Central Medical Tent', distance: '0.4 km', status: 'Open' },
      { id: 2, name: 'Emergency First Aid', distance: '0.8 km', status: 'Open' },
    ],
    food: [
      { id: 1, name: 'Main Food Court', distance: '0.3 km', status: 'Open' },
      { id: 2, name: 'Prasad Distribution', distance: '0.5 km', status: 'Open' },
      { id: 3, name: 'Vegetarian Canteen', distance: '0.7 km', status: 'Open' },
    ],
    shops: [
      { id: 1, name: 'General Store', distance: '0.4 km', status: 'Open' },
      { id: 2, name: 'Pooja Samagri Shop', distance: '0.6 km', status: 'Open' },
    ],
    volunteers: [
      { id: 1, name: 'Main Help Desk', distance: '0.2 km', status: 'Open' },
      { id: 2, name: 'Information Kiosk', distance: '0.5 km', status: 'Open' },
      { id: 3, name: 'Guide Station', distance: '0.8 km', status: 'Open' },
    ],
    wifi: [
      { id: 1, name: 'Central Wi-Fi Zone', distance: '0.3 km', status: 'Active' },
      { id: 2, name: 'Rest Area Connectivity', distance: '0.7 km', status: 'Active' },
    ]
  };
  
  return (
    <div className="app-container bg-gradient-to-br from-background to-secondary/30">
      <Header title="Pilgrim Services" showBackButton />
      
      <Confetti 
        trigger={showConfetti} 
        onComplete={() => setShowConfetti(false)}
        particleCount={150}
        spread={90}
      />
      
      <main className="flex-1 p-4">
        <div className="mb-6">
          <div className="glass rounded-xl p-4 mb-4 flex items-center justify-between">
            <div>
              <h3 className="font-medium mb-1">Find Nearby Facilities</h3>
              <p className="text-xs text-muted-foreground">Locate essential services around you</p>
            </div>
            <Button 
              variant="default" 
              size="sm"
              onClick={handleLocateNearby}
              disabled={isLocating}
              className="shrink-0"
            >
              {isLocating ? (
                <div className="w-4 h-4 border-2 border-t-transparent border-white rounded-full animate-rotate mr-2"></div>
              ) : (
                <LocateFixed className="w-4 h-4 mr-2" />
              )}
              {isLocating ? 'Locating...' : 'Locate Now'}
            </Button>
          </div>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {serviceCategories.map((category) => (
              <motion.div 
                key={category.id}
                whileHover={{ y: -3 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => setActiveCategory(category.id)}
              >
                <Card className={`overflow-hidden border-border/50 h-full transition-all ${activeCategory === category.id ? 'ring-2 ring-primary ring-offset-2' : ''}`}>
                  <CardContent className="p-3 flex flex-col items-center text-center">
                    <div className={`w-10 h-10 rounded-full ${category.color} flex items-center justify-center mb-2`}>
                      <category.icon className="w-5 h-5 text-white" />
                    </div>
                    <h4 className="text-sm font-medium mb-1">{category.title}</h4>
                    <p className="text-[10px] text-muted-foreground mb-1">{category.description}</p>
                    <div className="text-xs bg-secondary px-2 py-0.5 rounded-full">
                      {category.count} nearby
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
        
        {activeCategory && facilities[activeCategory as keyof typeof facilities] && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="mb-6"
          >
            <h3 className="font-medium mb-3">Nearby {serviceCategories.find(cat => cat.id === activeCategory)?.title}</h3>
            <div className="space-y-3">
              {facilities[activeCategory as keyof typeof facilities].map((facility) => (
                <Card key={facility.id} className="border-border/50">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium">{facility.name}</h4>
                        <p className="text-xs text-muted-foreground">{facility.distance} away</p>
                      </div>
                      <Badge variant={facility.status === 'Open' || facility.status === 'Active' ? 'default' : 'secondary'}>
                        {facility.status}
                      </Badge>
                    </div>
                    <div className="mt-3 flex justify-between">
                      <Button variant="outline" size="sm" className="text-xs">
                        <LocateFixed className="w-3.5 h-3.5 mr-1" />
                        Directions
                      </Button>
                      <Button variant="secondary" size="sm" className="text-xs">
                        <Stethoscope className="w-3.5 h-3.5 mr-1" />
                        Details
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </motion.div>
        )}
        
        <div className="mb-6">
          <h3 className="font-medium mb-3">Emergency Services</h3>
          <Card className="border-primary/20 bg-primary/5">
            <CardContent className="p-4">
              <div className="flex items-start">
                <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center mr-3 flex-shrink-0">
                  <Stethoscope className="w-4 h-4 text-primary" />
                </div>
                <div>
                  <h4 className="text-sm font-medium mb-1">24/7 Medical Assistance</h4>
                  <p className="text-xs text-muted-foreground mb-2">
                    Medical teams are available around the clock for any health emergencies
                  </p>
                  <Button variant="outline" size="sm" className="w-full">
                    View Medical Centers
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div className="text-center mb-6">
          <p className="text-xs text-muted-foreground">
            All services are available in offline mode for accessibility
          </p>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Services;
