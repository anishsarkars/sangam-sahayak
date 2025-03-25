
import React, { useState } from 'react';
import Header from '@/components/Layout/Header';
import Footer from '@/components/Layout/Footer';
import { motion } from 'framer-motion';
import { Search, Camera, User, MapPin, Upload, Smartphone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toast } from 'sonner';

const LostFound: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('find');
  
  const handleUploadPhoto = () => {
    toast.success('Photo uploaded successfully', {
      description: 'Our system will scan for matches in the database',
    });
  };
  
  const handleEmergencyReport = () => {
    toast.success('Emergency report submitted', {
      description: 'Authorities have been notified about the missing person',
    });
  };
  
  const handleDeviceRegistration = () => {
    toast.success('Device registered successfully', {
      description: 'Your device can now be tracked if reported lost',
    });
  };
  
  const recentFinds = [
    { id: '1', type: 'person', name: 'Elderly Woman', location: 'Mahakal Temple', time: '2 hours ago' },
    { id: '2', type: 'item', name: 'Blue Backpack', location: 'Ram Ghat', time: '5 hours ago' },
    { id: '3', type: 'person', name: 'Young Boy (Age 8-10)', location: 'Main Bazaar', time: '1 day ago' },
  ];
  
  return (
    <div className="app-container bg-gradient-to-br from-background to-secondary/30">
      <Header title="Lost & Found" showBackButton />
      
      <main className="flex-1 p-4">
        <Tabs defaultValue="find" onValueChange={setActiveTab}>
          <TabsList className="grid grid-cols-2 mb-6">
            <TabsTrigger value="find">Find Someone</TabsTrigger>
            <TabsTrigger value="report">Report Missing</TabsTrigger>
          </TabsList>
          
          <TabsContent value="find" className="space-y-6">
            <div className="p-4 glass rounded-xl">
              <h3 className="text-sm font-medium mb-3">Upload a Photo</h3>
              <div className="border-2 border-dashed border-border rounded-lg p-8 text-center cursor-pointer" onClick={handleUploadPhoto}>
                <Camera className="w-8 h-8 mx-auto mb-2 text-muted-foreground" />
                <p className="text-sm text-muted-foreground mb-3">
                  Upload a clear front-facing photo of the missing person
                </p>
                <Button variant="outline" size="sm">
                  <Upload className="w-4 h-4 mr-2" />
                  Upload Image
                </Button>
              </div>
            </div>
            
            <div>
              <h3 className="text-sm font-medium mb-3">Recently Found</h3>
              <div className="space-y-3">
                {recentFinds.map((item) => (
                  <Card key={item.id} className="overflow-hidden border-border/50 hover:shadow-sm transition-all">
                    <CardContent className="p-0">
                      <div className="flex items-center">
                        <div className="p-4 border-r border-border/50">
                          {item.type === 'person' ? (
                            <User className="w-6 h-6 text-sangam-600" />
                          ) : (
                            <Smartphone className="w-6 h-6 text-sangam-600" />
                          )}
                        </div>
                        <div className="p-4 flex-1">
                          <p className="font-medium">{item.name}</p>
                          <div className="flex items-center mt-1">
                            <MapPin className="w-3 h-3 text-muted-foreground mr-1" />
                            <p className="text-xs text-muted-foreground">
                              Found at {item.location} • {item.time}
                            </p>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
            
            <p className="text-xs text-center text-muted-foreground px-4">
              Visit the nearest help center with your Aadhaar card to claim any found items or persons
            </p>
          </TabsContent>
          
          <TabsContent value="report" className="space-y-6">
            <Card className="overflow-hidden border-border/50">
              <CardContent className="p-4">
                <h3 className="text-sm font-medium mb-3">Report Missing Person</h3>
                <p className="text-xs text-muted-foreground mb-4">
                  If a family member or friend is missing, report immediately for quick assistance
                </p>
                
                <div className="space-y-4">
                  <div>
                    <label className="text-xs font-medium mb-1 block">Name</label>
                    <input 
                      type="text" 
                      className="w-full p-2 rounded-md border border-border bg-background" 
                      placeholder="Enter name"
                    />
                  </div>
                  
                  <div>
                    <label className="text-xs font-medium mb-1 block">Age</label>
                    <input 
                      type="number" 
                      className="w-full p-2 rounded-md border border-border bg-background" 
                      placeholder="Enter age"
                    />
                  </div>
                  
                  <div>
                    <label className="text-xs font-medium mb-1 block">Last Seen Location</label>
                    <input 
                      type="text" 
                      className="w-full p-2 rounded-md border border-border bg-background" 
                      placeholder="Enter location"
                    />
                  </div>
                  
                  <div>
                    <label className="text-xs font-medium mb-1 block">Description</label>
                    <textarea 
                      className="w-full p-2 rounded-md border border-border bg-background resize-none" 
                      placeholder="Clothing, appearance, etc."
                      rows={3}
                    />
                  </div>
                </div>
                
                <div className="mt-4 flex gap-3">
                  <Button 
                    variant="default" 
                    className="w-full"
                    onClick={handleEmergencyReport}
                  >
                    Submit Emergency Report
                  </Button>
                </div>
              </CardContent>
            </Card>
            
            <Card className="overflow-hidden border-border/50">
              <CardContent className="p-4">
                <h3 className="text-sm font-medium mb-3">Register Your Device</h3>
                <p className="text-xs text-muted-foreground mb-4">
                  Register your mobile device to help with recovery if lost
                </p>
                
                <div className="space-y-4">
                  <div>
                    <label className="text-xs font-medium mb-1 block">Device Type</label>
                    <input 
                      type="text" 
                      className="w-full p-2 rounded-md border border-border bg-background" 
                      placeholder="Phone, tablet, etc."
                    />
                  </div>
                  
                  <div>
                    <label className="text-xs font-medium mb-1 block">IMEI Number</label>
                    <input 
                      type="text" 
                      className="w-full p-2 rounded-md border border-border bg-background" 
                      placeholder="Enter IMEI number"
                    />
                  </div>
                </div>
                
                <div className="mt-4">
                  <Button 
                    variant="outline" 
                    className="w-full"
                    onClick={handleDeviceRegistration}
                  >
                    Register Device
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
      
      <Footer />
    </div>
  );
};

export default LostFound;
