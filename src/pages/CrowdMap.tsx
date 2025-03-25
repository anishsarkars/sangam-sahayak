
import React, { useState } from 'react';
import Header from '@/components/Layout/Header';
import Footer from '@/components/Layout/Footer';
import { motion } from 'framer-motion';
import { Map, Navigation, AlertTriangle, Volume2 } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

const CrowdMap: React.FC = () => {
  const [selectedLocation, setSelectedLocation] = useState<string | null>(null);
  
  const handleEnableAudio = () => {
    toast.success('Audio alerts enabled', {
      description: 'You will now receive voice guidance for crowd movement',
    });
  };
  
  const handleSelectLocation = (id: string) => {
    setSelectedLocation(id);
  };
  
  const handleGetDirections = () => {
    toast.success('Directions generated', {
      description: 'Follow the optimal route to avoid crowded areas',
    });
  };
  
  const locations = [
    { id: 'ram-ghat', name: 'Ram Ghat', status: 'green', density: 'Low' },
    { id: 'triveni-ghat', name: 'Triveni Ghat', status: 'yellow', density: 'Medium' },
    { id: 'mahakal-temple', name: 'Mahakal Temple', status: 'red', density: 'High' },
    { id: 'harsiddhi-temple', name: 'Harsiddhi Temple', status: 'yellow', density: 'Medium' },
    { id: 'gadh-kalika', name: 'Gadh Kalika', status: 'green', density: 'Low' },
  ];
  
  return (
    <div className="app-container bg-gradient-to-br from-background to-secondary/30">
      <Header title="Live Crowd Map" showBackButton />
      
      <main className="flex-1 p-4">
        <div className="mb-6">
          <div className="p-3 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg flex items-center mb-4">
            <AlertTriangle className="w-5 h-5 text-yellow-500 mr-3 flex-shrink-0" />
            <p className="text-sm text-yellow-700 dark:text-yellow-300">
              Mahakal Temple area is experiencing high crowd density. Consider visiting during off-peak hours.
            </p>
          </div>
          
          <div className="relative">
            <div className="aspect-video rounded-xl overflow-hidden bg-sangam-100 dark:bg-sangam-900 mb-3 flex items-center justify-center">
              <div className="absolute inset-0 bg-gradient-to-b from-transparent to-sangam-900/20 pointer-events-none"></div>
              <div className="relative text-center">
                <Map className="w-8 h-8 text-sangam-600 mx-auto mb-2" />
                <p className="text-sm text-sangam-700 dark:text-sangam-200">Interactive map with live crowd data</p>
              </div>
              
              {/* Crowd Hotspots (would be dynamic in a real app) */}
              <div className="absolute top-[20%] left-[30%] w-8 h-8 rounded-full bg-green-500/20 animate-pulse-slow flex items-center justify-center">
                <div className="w-4 h-4 rounded-full bg-green-500"></div>
              </div>
              
              <div className="absolute top-[40%] left-[60%] w-12 h-12 rounded-full bg-yellow-500/20 animate-pulse-slow flex items-center justify-center">
                <div className="w-6 h-6 rounded-full bg-yellow-500"></div>
              </div>
              
              <div className="absolute top-[60%] left-[40%] w-16 h-16 rounded-full bg-red-500/20 animate-pulse-slow flex items-center justify-center">
                <div className="w-8 h-8 rounded-full bg-red-500"></div>
              </div>
            </div>
            
            <Button 
              variant="outline" 
              size="sm" 
              className="absolute bottom-6 right-4"
              onClick={handleEnableAudio}
            >
              <Volume2 className="w-4 h-4 mr-2" />
              Enable Audio
            </Button>
          </div>
          
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-medium">Crowd Density Legend</h3>
            <Button 
              variant="outline" 
              size="sm"
              onClick={handleGetDirections}
              disabled={!selectedLocation}
            >
              <Navigation className="w-4 h-4 mr-2" />
              Get Directions
            </Button>
          </div>
          
          <div className="flex items-center justify-between mb-6 px-2">
            <div className="flex items-center">
              <div className="w-3 h-3 rounded-full bg-green-500 mr-2"></div>
              <span className="text-xs">Low</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 rounded-full bg-yellow-500 mr-2"></div>
              <span className="text-xs">Medium</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 rounded-full bg-red-500 mr-2"></div>
              <span className="text-xs">High</span>
            </div>
          </div>
        </div>
        
        <h3 className="font-medium mb-3">Popular Locations</h3>
        <div className="space-y-3">
          {locations.map((location) => (
            <motion.div key={location.id} whileTap={{ scale: 0.98 }}>
              <Card 
                className={`overflow-hidden cursor-pointer hover:shadow-md transition-all border-border/50 ${
                  selectedLocation === location.id ? 'ring-2 ring-primary' : ''
                }`}
                onClick={() => handleSelectLocation(location.id)}
              >
                <CardContent className="p-0">
                  <div className="flex items-center">
                    <div className={`w-1 self-stretch ${
                      location.status === 'green' ? 'bg-green-500' :
                      location.status === 'yellow' ? 'bg-yellow-500' : 'bg-red-500'
                    }`}></div>
                    <div className="p-4 flex-1">
                      <p className="font-medium">{location.name}</p>
                      <div className="flex items-center mt-1">
                        <p className="text-xs text-muted-foreground">
                          {location.density} crowd density
                        </p>
                      </div>
                    </div>
                    <div className="p-4">
                      <Navigation className="w-4 h-4 text-muted-foreground" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default CrowdMap;
