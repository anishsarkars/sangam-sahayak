
import React, { useState } from 'react';
import Header from '@/components/Layout/Header';
import Footer from '@/components/Layout/Footer';
import { motion } from 'framer-motion';
import { Phone, AlertCircle, Ambulance, Shield, MapPin, UserRoundCog } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { toast } from 'sonner';

const Emergency: React.FC = () => {
  const [isSending, setIsSending] = useState(false);
  
  const handleSendSOS = () => {
    setIsSending(true);
    
    setTimeout(() => {
      setIsSending(false);
      toast.success('SOS alert sent successfully', {
        description: 'Help is on the way. Stay where you are if possible.',
      });
    }, 2000);
  };
  
  const emergencyContacts = [
    { id: '1', title: 'Medical Emergency', phone: '108', icon: Ambulance },
    { id: '2', title: 'Police Assistance', phone: '100', icon: Shield },
    { id: '3', title: 'Kumbh Control Room', phone: '1800-XXX-XXXX', icon: Phone },
    { id: '4', title: 'Volunteer Assistance', phone: '1800-XXX-YYYY', icon: UserRoundCog },
  ];
  
  return (
    <div className="app-container bg-gradient-to-br from-background to-secondary/30">
      <Header title="Emergency Assistance" showBackButton />
      
      <main className="flex-1 p-4">
        <div className="glass rounded-xl p-5 mb-6">
          <div className="text-center mb-4">
            <h3 className="text-xl font-medium mb-1">SOS Emergency</h3>
            <p className="text-sm text-muted-foreground">
              Press the button below to send an emergency alert with your location
            </p>
          </div>
          
          <div className="flex justify-center mb-4">
            <Button 
              variant={isSending ? "secondary" : "destructive"} 
              size="lg"
              className={`h-24 w-24 rounded-full ${isSending ? 'animate-pulse' : ''}`}
              onClick={handleSendSOS}
              disabled={isSending}
            >
              {isSending ? (
                <div className="flex items-center justify-center flex-col">
                  <div className="w-6 h-6 border-2 border-t-transparent border-white rounded-full animate-rotate mb-1"></div>
                  <span className="text-xs">Sending...</span>
                </div>
              ) : (
                <div className="flex items-center justify-center flex-col">
                  <AlertCircle className="w-8 h-8 mb-1" />
                  <span className="text-xs">SOS</span>
                </div>
              )}
            </Button>
          </div>
          
          <div className="flex items-center justify-center text-sm space-x-1">
            <MapPin className="w-4 h-4 text-destructive" />
            <span>Your location will be shared automatically</span>
          </div>
        </div>
        
        <div className="mb-6">
          <h3 className="font-medium mb-3">Emergency Contacts</h3>
          <div className="space-y-3">
            {emergencyContacts.map((contact) => (
              <Card key={contact.id} className="overflow-hidden border-border/50">
                <CardContent className="p-0">
                  <div className="flex items-center">
                    <div className="p-4 border-r border-border/50 flex items-center justify-center">
                      <contact.icon className="w-6 h-6 text-sangam-600" />
                    </div>
                    <div className="p-4 flex-1">
                      <p className="font-medium">{contact.title}</p>
                      <p className="text-sm text-muted-foreground">{contact.phone}</p>
                    </div>
                    <a 
                      href={`tel:${contact.phone.replace(/-/g, '')}`} 
                      className="p-4 bg-primary/10 text-primary h-full flex items-center"
                    >
                      <Phone className="w-5 h-5" />
                    </a>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
        
        <Card className="mb-6 border-yellow-200 dark:border-yellow-800 bg-yellow-50/50 dark:bg-yellow-900/10">
          <CardContent className="p-4">
            <h3 className="font-medium flex items-center mb-2">
              <AlertCircle className="w-4 h-4 text-yellow-600 dark:text-yellow-400 mr-2" />
              Important Notice
            </h3>
            <p className="text-sm text-yellow-700 dark:text-yellow-300">
              The SOS feature should only be used in genuine emergencies. Misuse may lead to penalties.
            </p>
          </CardContent>
        </Card>
        
        <div className="text-center">
          <p className="text-xs text-muted-foreground mb-1">Emergency services work even in offline mode</p>
          <p className="text-xs text-muted-foreground">Your safety is our priority</p>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Emergency;
