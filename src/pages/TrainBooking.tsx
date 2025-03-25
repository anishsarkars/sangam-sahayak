
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Header from '@/components/Layout/Header';
import Footer from '@/components/Layout/Footer';
import { Calendar, Users, Train, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { toast } from 'sonner';

const TrainBooking: React.FC = () => {
  const [step, setStep] = useState<number>(1);
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [selectedBatch, setSelectedBatch] = useState<string>('');

  const handleDateSelect = (date: string) => {
    setSelectedDate(date);
    setTimeout(() => setStep(2), 300);
  };

  const handleBatchSelect = (batch: string) => {
    setSelectedBatch(batch);
    setTimeout(() => setStep(3), 300);
  };

  const handleBooking = () => {
    toast.success('Your train booking has been confirmed!', {
      description: `Batch ${selectedBatch} on ${selectedDate}`,
    });
  };

  // Available dates for the pilgrimage
  const availableDates = [
    { date: 'Apr 10, 2028', availability: 'high' },
    { date: 'Apr 12, 2028', availability: 'medium' },
    { date: 'Apr 15, 2028', availability: 'low' },
    { date: 'Apr 18, 2028', availability: 'high' },
    { date: 'Apr 20, 2028', availability: 'medium' },
  ];

  // Batches for selected date
  const availableBatches = [
    { id: 'A-1', time: '06:00 AM', from: 'Delhi', capacity: '85%' },
    { id: 'B-2', time: '08:30 AM', from: 'Mumbai', capacity: '60%' },
    { id: 'C-3', time: '11:00 AM', from: 'Kolkata', capacity: '40%' },
    { id: 'D-4', time: '02:30 PM', from: 'Chennai', capacity: '25%' },
  ];

  return (
    <div className="app-container bg-gradient-to-br from-background to-secondary/30">
      <Header title="Train Booking" showBackButton />
      
      <main className="flex-1 p-4">
        <div className="mb-6">
          <div className="flex items-center space-x-4 mb-6">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step >= 1 ? 'bg-primary text-white' : 'bg-muted text-muted-foreground'}`}>
              1
            </div>
            <div className={`h-0.5 flex-1 ${step > 1 ? 'bg-primary' : 'bg-muted'}`}></div>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step >= 2 ? 'bg-primary text-white' : 'bg-muted text-muted-foreground'}`}>
              2
            </div>
            <div className={`h-0.5 flex-1 ${step > 2 ? 'bg-primary' : 'bg-muted'}`}></div>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step >= 3 ? 'bg-primary text-white' : 'bg-muted text-muted-foreground'}`}>
              3
            </div>
          </div>
          
          <h2 className="text-xl font-medium mb-2">
            {step === 1 && 'Select Travel Date'}
            {step === 2 && 'Choose Batch'}
            {step === 3 && 'Confirm Booking'}
          </h2>
          <p className="text-sm text-muted-foreground">
            {step === 1 && 'Select your preferred date of travel to Ujjain'}
            {step === 2 && 'Choose from available batches for your selected date'}
            {step === 3 && 'Review and confirm your train booking details'}
          </p>
        </div>
        
        {step === 1 && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="space-y-3">
              {availableDates.map((item) => (
                <Card 
                  key={item.date}
                  className="overflow-hidden cursor-pointer hover:shadow-md transition-all border-border/50"
                  onClick={() => handleDateSelect(item.date)}
                >
                  <CardContent className="p-0">
                    <div className="flex items-center">
                      <div className="p-4 border-r border-border/50">
                        <Calendar className="w-6 h-6 text-sangam-600" />
                      </div>
                      <div className="p-4 flex-1">
                        <p className="font-medium">{item.date}</p>
                        <div className="flex items-center mt-1">
                          <div className={`w-2 h-2 rounded-full mr-2 ${
                            item.availability === 'high' ? 'bg-green-500' :
                            item.availability === 'medium' ? 'bg-yellow-500' : 'bg-red-500'
                          }`}></div>
                          <p className="text-xs text-muted-foreground">
                            {item.availability === 'high' ? 'High availability' :
                             item.availability === 'medium' ? 'Medium availability' : 'Low availability'}
                          </p>
                        </div>
                      </div>
                      <div className="p-4">
                        <ArrowRight className="w-4 h-4 text-muted-foreground" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </motion.div>
        )}
        
        {step === 2 && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <p className="text-sm font-medium mb-3">Date: {selectedDate}</p>
            <div className="space-y-3">
              {availableBatches.map((batch) => (
                <Card 
                  key={batch.id}
                  className="overflow-hidden cursor-pointer hover:shadow-md transition-all border-border/50"
                  onClick={() => handleBatchSelect(batch.id)}
                >
                  <CardContent className="p-0">
                    <div className="flex items-center">
                      <div className="p-4 border-r border-border/50">
                        <Train className="w-6 h-6 text-sangam-600" />
                      </div>
                      <div className="p-4 flex-1">
                        <div className="flex justify-between items-start mb-1">
                          <p className="font-medium">Batch {batch.id}</p>
                          <p className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full">{batch.time}</p>
                        </div>
                        <p className="text-sm">From: {batch.from}</p>
                        <div className="flex items-center mt-1">
                          <div className={`w-2 h-2 rounded-full mr-2 ${
                            parseInt(batch.capacity) < 50 ? 'bg-green-500' :
                            parseInt(batch.capacity) < 80 ? 'bg-yellow-500' : 'bg-red-500'
                          }`}></div>
                          <p className="text-xs text-muted-foreground">
                            {batch.capacity} filled
                          </p>
                        </div>
                      </div>
                      <div className="p-4">
                        <ArrowRight className="w-4 h-4 text-muted-foreground" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </motion.div>
        )}
        
        {step === 3 && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="space-y-6"
          >
            <Card className="border-border/50">
              <CardContent className="p-6">
                <h3 className="text-lg font-medium mb-4">Booking Summary</h3>
                
                <div className="space-y-4">
                  <div className="flex items-start">
                    <Calendar className="w-5 h-5 text-sangam-600 mt-0.5 mr-3" />
                    <div>
                      <p className="text-sm text-muted-foreground">Travel Date</p>
                      <p className="font-medium">{selectedDate}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <Train className="w-5 h-5 text-sangam-600 mt-0.5 mr-3" />
                    <div>
                      <p className="text-sm text-muted-foreground">Batch</p>
                      <p className="font-medium">Batch {selectedBatch}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <Users className="w-5 h-5 text-sangam-600 mt-0.5 mr-3" />
                    <div>
                      <p className="text-sm text-muted-foreground">Pilgrims</p>
                      <p className="font-medium">1 Person</p>
                    </div>
                  </div>
                </div>
                
                <div className="mt-6 pt-6 border-t border-border/50">
                  <p className="text-sm text-muted-foreground mb-2">Important Notes:</p>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Please arrive 30 minutes before departure</li>
                    <li>• Keep your ID proof handy for verification</li>
                    <li>• This allocation helps manage crowds efficiently</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
            
            <Button 
              className="w-full py-6" 
              onClick={handleBooking}
            >
              Confirm Booking
            </Button>
          </motion.div>
        )}
      </main>
      
      <Footer />
    </div>
  );
};

export default TrainBooking;
