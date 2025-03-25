
import React, { useState } from 'react';
import Header from '@/components/Layout/Header';
import Footer from '@/components/Layout/Footer';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import VolunteerCard from '@/components/Volunteer/VolunteerCard';
import VolunteerForm from '@/components/Volunteer/VolunteerForm';
import VolunteerDashboard from '@/components/Volunteer/VolunteerDashboard';
import { Users, UserPlus, Award } from 'lucide-react';
import { motion } from 'framer-motion';

const Volunteer: React.FC = () => {
  const [isRegistered, setIsRegistered] = useState(false);
  
  const handleRegisterSuccess = () => {
    setIsRegistered(true);
  };
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-secondary/20">
      <div className="max-w-7xl mx-auto min-h-[100dvh] flex flex-col">
        <Header title="Volunteer Program" showBackButton />
        
        <main className="flex-1 p-4 pt-6 md:px-6 lg:px-8">
          <div className="md:max-w-5xl lg:max-w-6xl mx-auto">
            <Tabs defaultValue={isRegistered ? "dashboard" : "info"} className="w-full">
              <div className="flex justify-center mb-6">
                <TabsList className="grid grid-cols-3 w-full md:w-auto">
                  <TabsTrigger value="info" className="flex items-center gap-2">
                    <Users className="w-4 h-4" />
                    <span className="hidden sm:inline">About</span>
                  </TabsTrigger>
                  <TabsTrigger value="register" className="flex items-center gap-2">
                    <UserPlus className="w-4 h-4" />
                    <span className="hidden sm:inline">Register</span>
                  </TabsTrigger>
                  <TabsTrigger value="dashboard" className="flex items-center gap-2">
                    <Award className="w-4 h-4" />
                    <span className="hidden sm:inline">Dashboard</span>
                  </TabsTrigger>
                </TabsList>
              </div>
              
              <TabsContent value="info">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <div className="max-w-4xl mx-auto">
                    <VolunteerCard onJoinClick={() => document.querySelector('[data-value="register"]')?.click()} />
                    
                    <div className="premium-card my-6">
                      <h2 className="text-xl md:text-2xl font-bold text-sangam-900 dark:text-sangam-100 mb-4">
                        <span className="wavy-text">Frequently Asked Questions</span>
                      </h2>
                      
                      <div className="space-y-4">
                        <div className="bg-white/40 dark:bg-black/20 rounded-lg p-4">
                          <h3 className="font-medium text-foreground">Who can volunteer?</h3>
                          <p className="text-sm text-muted-foreground mt-1">
                            Anyone above 18 years of age can volunteer. We welcome students, professionals, NGO workers, 
                            and anyone passionate about making Kumbh Mela a safe and well-organized event.
                          </p>
                        </div>
                        
                        <div className="bg-white/40 dark:bg-black/20 rounded-lg p-4">
                          <h3 className="font-medium text-foreground">What training will be provided?</h3>
                          <p className="text-sm text-muted-foreground mt-1">
                            Volunteers will receive comprehensive training on crowd management, first aid, 
                            using the Sangam Sahayak app, and specific role-based training. Both online and 
                            in-person training sessions will be conducted.
                          </p>
                        </div>
                        
                        <div className="bg-white/40 dark:bg-black/20 rounded-lg p-4">
                          <h3 className="font-medium text-foreground">What are the benefits of volunteering?</h3>
                          <p className="text-sm text-muted-foreground mt-1">
                            Volunteers receive government-endorsed certificates, digital badges, 
                            recognition on social media, and college credits (for students). The experience 
                            also provides valuable skill development and networking opportunities.
                          </p>
                        </div>
                        
                        <div className="bg-white/40 dark:bg-black/20 rounded-lg p-4">
                          <h3 className="font-medium text-foreground">How much time do I need to commit?</h3>
                          <p className="text-sm text-muted-foreground mt-1">
                            Volunteering schedules are flexible. You can choose from various time slots based on 
                            your availability. Minimum commitment is 4 hours per week during non-peak periods
                            and 8 hours per week during peak bathing days.
                          </p>
                        </div>
                        
                        <div className="bg-white/40 dark:bg-black/20 rounded-lg p-4">
                          <h3 className="font-medium text-foreground">Is accommodation provided for volunteers?</h3>
                          <p className="text-sm text-muted-foreground mt-1">
                            Basic accommodation is provided for volunteers coming from outside Ujjain who commit 
                            to at least 7 consecutive days of service. Transportation to and from volunteer 
                            sites is also arranged.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </TabsContent>
              
              <TabsContent value="register">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <VolunteerForm />
                </motion.div>
              </TabsContent>
              
              <TabsContent value="dashboard">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <VolunteerDashboard />
                </motion.div>
              </TabsContent>
            </Tabs>
          </div>
        </main>
        
        <Footer />
      </div>
    </div>
  );
};

export default Volunteer;
