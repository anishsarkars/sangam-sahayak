
import React, { useState, useEffect, useRef } from 'react';
import Header from '@/components/Layout/Header';
import Footer from '@/components/Layout/Footer';
import { motion } from 'framer-motion';
import { Map as MapIcon, Navigation, AlertTriangle, Volume2, Layers, LocateFixed } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { useLanguage } from '@/components/ui/LanguageToggle';

// Set Mapbox token
mapboxgl.accessToken = 'pk.eyJ1IjoiYW5pc2hzYXJrYXJzIiwiYSI6ImNtOG54YnJjZjA1a3Eya29zaGc3YWc2bXkifQ.qMgKYko3eUlWJGTx-fi5sQ';

const translations = {
  en: {
    pageTitle: 'Live Crowd Map',
    warning: 'Mahakal Temple area is experiencing high crowd density. Consider visiting during off-peak hours.',
    mapText: 'Interactive map with live crowd data',
    enableAudio: 'Enable Audio',
    crowdLegend: 'Crowd Density Legend',
    getDirections: 'Get Directions',
    low: 'Low',
    medium: 'Medium',
    high: 'High',
    popularLocations: 'Popular Locations',
    crowdDensity: 'crowd density',
    showSatellite: 'Show Satellite',
    showStreets: 'Show Streets',
  },
  hi: {
    pageTitle: 'लाइव भीड़ मानचित्र',
    warning: 'महाकाल मंदिर क्षेत्र में उच्च भीड़ घनत्व का अनुभव हो रहा है। गैर-पीक घंटों के दौरान जाने पर विचार करें।',
    mapText: 'लाइव भीड़ डेटा के साथ इंटरैक्टिव मानचित्र',
    enableAudio: 'ऑडियो सक्षम करें',
    crowdLegend: 'भीड़ घनत्व प्रतीक',
    getDirections: 'दिशा-निर्देश प्राप्त करें',
    low: 'कम',
    medium: 'मध्यम',
    high: 'उच्च',
    popularLocations: 'लोकप्रिय स्थान',
    crowdDensity: 'भीड़ घनत्व',
    showSatellite: 'उपग्रह दिखाएं',
    showStreets: 'सड़कें दिखाएं',
  }
};

const locations = [
  { id: 'ram-ghat', name: 'Ram Ghat', status: 'green', density: 'Low', coordinates: [75.7682, 23.1814] },
  { id: 'triveni-ghat', name: 'Triveni Ghat', status: 'yellow', density: 'Medium', coordinates: [75.7741, 23.1793] },
  { id: 'mahakal-temple', name: 'Mahakal Temple', status: 'red', density: 'High', coordinates: [75.7684, 23.1827] },
  { id: 'harsiddhi-temple', name: 'Harsiddhi Temple', status: 'yellow', density: 'Medium', coordinates: [75.7678, 23.1795] },
  { id: 'gadh-kalika', name: 'Gadh Kalika', status: 'green', density: 'Low', coordinates: [75.7658, 23.1805] },
];

const CrowdMap: React.FC = () => {
  const [selectedLocation, setSelectedLocation] = useState<string | null>(null);
  const [mapStyle, setMapStyle] = useState<'streets' | 'satellite'>('streets');
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const markers = useRef<mapboxgl.Marker[]>([]);
  const { language } = useLanguage();
  const t = translations[language];

  useEffect(() => {
    if (!mapContainer.current || map.current) return;

    // Initialize map
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [75.7682, 23.1814], // Center on Ujjain
      zoom: 14,
      attributionControl: false
    });

    // Add navigation controls
    map.current.addControl(
      new mapboxgl.NavigationControl(),
      'bottom-right'
    );

    // Add geolocate control
    map.current.addControl(
      new mapboxgl.GeolocateControl({
        positionOptions: {
          enableHighAccuracy: true
        },
        trackUserLocation: true
      }),
      'bottom-right'
    );

    map.current.on('load', () => {
      if (!map.current) return;

      // Add crowd density heat markers
      locations.forEach(location => {
        const el = document.createElement('div');
        el.className = 'crowd-marker';
        
        const size = location.status === 'red' ? 'large' : 
                     location.status === 'yellow' ? 'medium' : 'small';
        
        el.innerHTML = `
          <div class="crowd-pulse ${size} ${location.status}">
            <div class="inner-circle"></div>
          </div>
        `;
        
        const marker = new mapboxgl.Marker(el)
          .setLngLat(location.coordinates)
          .addTo(map.current!);
        
        markers.current.push(marker);
      });
    });

    return () => {
      if (map.current) {
        map.current.remove();
        map.current = null;
      }
    };
  }, []);

  useEffect(() => {
    if (!map.current) return;
    
    const style = mapStyle === 'streets' 
      ? 'mapbox://styles/mapbox/streets-v11' 
      : 'mapbox://styles/mapbox/satellite-streets-v11';
    
    map.current.setStyle(style);
  }, [mapStyle]);

  const handleEnableAudio = () => {
    toast.success('Audio alerts enabled', {
      description: 'You will now receive voice guidance for crowd movement',
    });
  };
  
  const handleSelectLocation = (id: string) => {
    setSelectedLocation(id);
    
    // Find the location
    const location = locations.find(loc => loc.id === id);
    if (location && map.current) {
      map.current.flyTo({
        center: location.coordinates,
        zoom: 16,
        duration: 1500
      });
    }
  };
  
  const handleGetDirections = () => {
    toast.success('Directions generated', {
      description: 'Follow the optimal route to avoid crowded areas',
    });
  };
  
  const toggleMapStyle = () => {
    setMapStyle(prev => prev === 'streets' ? 'satellite' : 'streets');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-secondary/30">
      <div className="max-w-7xl mx-auto min-h-[100dvh] flex flex-col">
        <Header title={t.pageTitle} showBackButton />
        
        <main className="flex-1 p-4 md:p-6 lg:p-8">
          <div className="lg:grid lg:grid-cols-3 lg:gap-6">
            <div className="lg:col-span-2 mb-6 lg:mb-0">
              <div className="p-3 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg flex items-center mb-4">
                <AlertTriangle className="w-5 h-5 text-yellow-500 mr-3 flex-shrink-0" />
                <p className="text-sm text-yellow-700 dark:text-yellow-300">
                  {t.warning}
                </p>
              </div>
              
              <div className="relative bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg">
                <style jsx="true">{`
                  .crowd-marker {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                  }
                  
                  .crowd-pulse {
                    border-radius: 50%;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    animation: pulse 2s infinite;
                  }
                  
                  .small {
                    width: 30px;
                    height: 30px;
                  }
                  
                  .medium {
                    width: 40px;
                    height: 40px;
                  }
                  
                  .large {
                    width: 50px;
                    height: 50px;
                  }
                  
                  .green {
                    background-color: rgba(34, 197, 94, 0.2);
                  }
                  
                  .yellow {
                    background-color: rgba(234, 179, 8, 0.2);
                  }
                  
                  .red {
                    background-color: rgba(239, 68, 68, 0.2);
                  }
                  
                  .inner-circle {
                    width: 30%;
                    height: 30%;
                    border-radius: 50%;
                  }
                  
                  .green .inner-circle {
                    background-color: rgb(34, 197, 94);
                  }
                  
                  .yellow .inner-circle {
                    background-color: rgb(234, 179, 8);
                  }
                  
                  .red .inner-circle {
                    background-color: rgb(239, 68, 68);
                  }
                  
                  @keyframes pulse {
                    0% {
                      transform: scale(0.8);
                      opacity: 0.8;
                    }
                    70% {
                      transform: scale(1);
                      opacity: 1;
                    }
                    100% {
                      transform: scale(0.8);
                      opacity: 0.8;
                    }
                  }
                `}</style>
                <div 
                  ref={mapContainer}
                  className="h-[400px] md:h-[500px] w-full"
                />
                
                <div className="absolute top-4 right-4 flex flex-col space-y-2">
                  <Button 
                    variant="secondary" 
                    size="sm"
                    onClick={toggleMapStyle}
                    className="shadow-md"
                  >
                    <Layers className="w-4 h-4 mr-2" />
                    {mapStyle === 'streets' ? t.showSatellite : t.showStreets}
                  </Button>
                  
                  <Button 
                    variant="secondary" 
                    size="sm" 
                    onClick={handleEnableAudio}
                    className="shadow-md"
                  >
                    <Volume2 className="w-4 h-4 mr-2" />
                    {t.enableAudio}
                  </Button>
                </div>
              </div>
              
              <div className="flex items-center justify-between mt-4 mb-2">
                <h3 className="font-medium">{t.crowdLegend}</h3>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={handleGetDirections}
                  disabled={!selectedLocation}
                >
                  <Navigation className="w-4 h-4 mr-2" />
                  {t.getDirections}
                </Button>
              </div>
              
              <div className="flex items-center justify-between mb-6 px-2">
                <div className="flex items-center">
                  <div className="w-3 h-3 rounded-full bg-green-500 mr-2"></div>
                  <span className="text-xs">{t.low}</span>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 rounded-full bg-yellow-500 mr-2"></div>
                  <span className="text-xs">{t.medium}</span>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 rounded-full bg-red-500 mr-2"></div>
                  <span className="text-xs">{t.high}</span>
                </div>
              </div>
            </div>
            
            <div className="lg:col-span-1">
              <h3 className="font-medium mb-3">{t.popularLocations}</h3>
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
                                {location.status === 'green' ? t.low :
                                 location.status === 'yellow' ? t.medium : t.high} {t.crowdDensity}
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
            </div>
          </div>
        </main>
        
        <Footer />
      </div>
    </div>
  );
};

export default CrowdMap;
