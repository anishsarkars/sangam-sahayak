
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, Award, Users, Star, Calendar, MapPin, Clock, AlertCircle } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import Confetti from '@/components/ui/confetti';
import { useToast } from '@/hooks/use-toast';

interface TaskProps {
  id: string;
  title: string;
  location: string;
  time: string;
  importance: 'high' | 'medium' | 'low';
  status: 'pending' | 'completed';
}

const mockTasks: TaskProps[] = [
  {
    id: 't1',
    title: 'Guide pilgrims at Ramghat entrance',
    location: 'Ramghat, Ujjain',
    time: 'Today, 10:00 AM - 1:00 PM',
    importance: 'high',
    status: 'pending'
  },
  {
    id: 't2',
    title: 'Assist elderly pilgrims with mobile app',
    location: 'Mahakal Temple Queue',
    time: 'Tomorrow, 9:00 AM - 12:00 PM',
    importance: 'medium',
    status: 'pending'
  },
  {
    id: 't3',
    title: 'Help at first aid station',
    location: 'Sector 3 Medical Camp',
    time: 'Wed, 2:00 PM - 5:00 PM',
    importance: 'high',
    status: 'pending'
  },
  {
    id: 't4',
    title: 'Lost & Found desk duty',
    location: 'Central Information Center',
    time: 'Thu, 10:00 AM - 1:00 PM',
    importance: 'medium',
    status: 'pending'
  },
  {
    id: 't5',
    title: 'Train station navigation assistance',
    location: 'Ujjain Railway Station',
    time: 'Fri, 8:00 AM - 11:00 AM',
    importance: 'high',
    status: 'pending'
  }
];

const VolunteerDashboard: React.FC = () => {
  const [tasks, setTasks] = useState<TaskProps[]>(mockTasks);
  const [completedTasks, setCompletedTasks] = useState<TaskProps[]>([]);
  const [points, setPoints] = useState(120);
  const [level, setLevel] = useState(2);
  const [showConfetti, setShowConfetti] = useState(false);
  const { toast } = useToast();
  
  const handleCompleteTask = (taskId: string) => {
    // Find the task
    const taskToComplete = tasks.find(task => task.id === taskId);
    if (!taskToComplete) return;
    
    // Remove from pending tasks
    const updatedTasks = tasks.filter(task => task.id !== taskId);
    
    // Add to completed tasks
    const updatedTask = { ...taskToComplete, status: 'completed' as const };
    
    // Award points based on importance
    let pointsToAdd = 0;
    if (updatedTask.importance === 'high') pointsToAdd = 50;
    else if (updatedTask.importance === 'medium') pointsToAdd = 30;
    else pointsToAdd = 20;
    
    setTasks(updatedTasks);
    setCompletedTasks([updatedTask, ...completedTasks]);
    
    // Update points and potentially level
    const newPoints = points + pointsToAdd;
    setPoints(newPoints);
    
    // Check for level up
    if (newPoints >= 200 && level === 2) {
      setLevel(3);
      setShowConfetti(true);
      toast({
        title: "Level Up!",
        description: "Congratulations! You've reached Level 3!",
        variant: "default",
      });
    }
    
    toast({
      title: "Task Completed!",
      description: `You earned ${pointsToAdd} points!`,
      variant: "default",
    });
  };
  
  const completionPercentage = Math.min(Math.round((points / (level * 100)) * 100), 100);
  
  return (
    <>
      <Confetti 
        trigger={showConfetti} 
        duration={3000}
        onComplete={() => setShowConfetti(false)}
      />
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="premium-card my-6"
      >
        <div className="flex flex-col md:flex-row gap-6">
          <div className="flex-1">
            <h2 className="text-xl md:text-2xl font-bold text-sangam-900 dark:text-sangam-100 mb-4">
              Volunteer Dashboard
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <Card className="hoverable-card bg-white/50 dark:bg-white/5">
                <CardHeader className="pb-2">
                  <CardTitle className="text-base flex items-center">
                    <Users className="w-4 h-4 mr-2 text-sangam-500" />
                    Volunteer Status
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center space-x-4">
                    <Avatar className="h-12 w-12 border-2 border-sangam-200">
                      <AvatarFallback className="bg-sangam-100 text-sangam-800">VS</AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-medium">Active Volunteer</div>
                      <div className="text-xs text-muted-foreground">Since June 2023</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="hoverable-card bg-white/50 dark:bg-white/5">
                <CardHeader className="pb-2">
                  <CardTitle className="text-base flex items-center">
                    <Star className="w-4 h-4 mr-2 text-sangam-500" />
                    Volunteer Points
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{points}</div>
                  <div className="text-xs text-muted-foreground mt-1">Level {level} Volunteer</div>
                  <div className="mt-2">
                    <Progress value={completionPercentage} className="h-2" />
                    <div className="flex justify-between mt-1 text-xs text-muted-foreground">
                      <span>{completionPercentage}%</span>
                      <span>Level {level+1}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="hoverable-card bg-white/50 dark:bg-white/5">
                <CardHeader className="pb-2">
                  <CardTitle className="text-base flex items-center">
                    <Award className="w-4 h-4 mr-2 text-sangam-500" />
                    Achievements
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    <Badge className="bg-sangam-100 text-sangam-800 hover:bg-sangam-200">First Aid</Badge>
                    <Badge className="bg-sangam-100 text-sangam-800 hover:bg-sangam-200">Guide</Badge>
                    <Badge className="bg-sangam-100 text-sangam-800 hover:bg-sangam-200">Tech Helper</Badge>
                  </div>
                  <div className="text-xs text-muted-foreground mt-2">3 badges earned</div>
                </CardContent>
              </Card>
            </div>
            
            <Tabs defaultValue="tasks" className="w-full">
              <TabsList>
                <TabsTrigger value="tasks">Assigned Tasks</TabsTrigger>
                <TabsTrigger value="completed">Completed Tasks</TabsTrigger>
                <TabsTrigger value="certificates">Certificates</TabsTrigger>
              </TabsList>
              
              <TabsContent value="tasks" className="mt-4">
                {tasks.length === 0 ? (
                  <div className="text-center py-6">
                    <div className="mb-3 inline-flex items-center justify-center w-10 h-10 rounded-full bg-sangam-50 dark:bg-sangam-900/20">
                      <CheckCircle className="w-5 h-5 text-sangam-500" />
                    </div>
                    <h3 className="text-base font-medium">All tasks completed!</h3>
                    <p className="text-sm text-muted-foreground mt-1">Check back later for new assignments.</p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {tasks.map((task) => (
                      <motion.div 
                        key={task.id}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="p-4 border border-border rounded-lg flex flex-col md:flex-row items-start md:items-center justify-between bg-card/30"
                      >
                        <div className="flex-1 mb-3 md:mb-0">
                          <div className="flex items-start">
                            {task.importance === 'high' && (
                              <span className="inline-flex mr-2 h-5 w-1.5 bg-red-500 rounded-full"></span>
                            )}
                            {task.importance === 'medium' && (
                              <span className="inline-flex mr-2 h-5 w-1.5 bg-yellow-500 rounded-full"></span>
                            )}
                            {task.importance === 'low' && (
                              <span className="inline-flex mr-2 h-5 w-1.5 bg-green-500 rounded-full"></span>
                            )}
                            <div>
                              <h4 className="font-medium text-foreground">{task.title}</h4>
                              <div className="flex flex-col md:flex-row md:items-center gap-1 md:gap-3 mt-1 text-xs text-muted-foreground">
                                <div className="flex items-center">
                                  <MapPin className="w-3 h-3 mr-1" />
                                  {task.location}
                                </div>
                                <div className="flex items-center">
                                  <Clock className="w-3 h-3 mr-1" />
                                  {task.time}
                                </div>
                                {task.importance === 'high' && (
                                  <div className="flex items-center">
                                    <AlertCircle className="w-3 h-3 mr-1 text-red-500" />
                                    High Priority
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="border-sangam-200 text-sangam-800 dark:border-sangam-700 dark:text-sangam-300 hover:bg-sangam-50 dark:hover:bg-sangam-900/20"
                          onClick={() => handleCompleteTask(task.id)}
                        >
                          Mark Complete
                        </Button>
                      </motion.div>
                    ))}
                  </div>
                )}
              </TabsContent>
              
              <TabsContent value="completed" className="mt-4">
                {completedTasks.length === 0 ? (
                  <div className="text-center py-6">
                    <div className="mb-3 inline-flex items-center justify-center w-10 h-10 rounded-full bg-sangam-50 dark:bg-sangam-900/20">
                      <CheckCircle className="w-5 h-5 text-sangam-500" />
                    </div>
                    <h3 className="text-base font-medium">No completed tasks yet</h3>
                    <p className="text-sm text-muted-foreground mt-1">Start by completing some tasks from your list.</p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {completedTasks.map((task) => (
                      <motion.div 
                        key={task.id}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="p-4 border border-border rounded-lg flex items-start justify-between bg-card/30"
                      >
                        <div className="flex-1">
                          <div className="flex items-start">
                            <CheckCircle className="w-5 h-5 mr-2 text-green-500 flex-shrink-0 mt-0.5" />
                            <div>
                              <h4 className="font-medium text-foreground">{task.title}</h4>
                              <div className="flex flex-col md:flex-row md:items-center gap-1 md:gap-3 mt-1 text-xs text-muted-foreground">
                                <div className="flex items-center">
                                  <MapPin className="w-3 h-3 mr-1" />
                                  {task.location}
                                </div>
                                <div className="flex items-center">
                                  <Clock className="w-3 h-3 mr-1" />
                                  {task.time}
                                </div>
                                <div className="flex items-center">
                                  <CheckCircle className="w-3 h-3 mr-1 text-green-500" />
                                  Completed
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <Badge 
                          className={`
                            ${task.importance === 'high' ? 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-300' : ''}
                            ${task.importance === 'medium' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-300' : ''}
                            ${task.importance === 'low' ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300' : ''}
                          `}
                        >
                          {task.importance === 'high' ? '+50 pts' : task.importance === 'medium' ? '+30 pts' : '+20 pts'}
                        </Badge>
                      </motion.div>
                    ))}
                  </div>
                )}
              </TabsContent>
              
              <TabsContent value="certificates" className="mt-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Card className="hoverable-card bg-white/50 dark:bg-white/5">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-base">Volunteer Certificate</CardTitle>
                        <Award className="w-5 h-5 text-sangam-500" />
                      </div>
                      <CardDescription>Govt. of Madhya Pradesh</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm">For dedicated service during Kumbh Mela 2028 preparations.</p>
                      <div className="mt-2">
                        <Badge variant="outline" className="bg-green-50 text-green-700 dark:bg-green-900/20 dark:text-green-300 border-green-200 dark:border-green-800">Completed</Badge>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button variant="outline" className="w-full border-sangam-200 text-sangam-800 dark:border-sangam-700 dark:text-sangam-300 hover:bg-sangam-50 dark:hover:bg-sangam-900/20">
                        Download Certificate
                      </Button>
                    </CardFooter>
                  </Card>
                  
                  <Card className="hoverable-card bg-white/50 dark:bg-white/5">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-base">First Aid Training</CardTitle>
                        <Award className="w-5 h-5 text-sangam-500" />
                      </div>
                      <CardDescription>Red Cross Society</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm">Certified training in emergency first aid and response.</p>
                      <div className="mt-2">
                        <Badge variant="outline" className="bg-yellow-50 text-yellow-700 dark:bg-yellow-900/20 dark:text-yellow-300 border-yellow-200 dark:border-yellow-800">In Progress</Badge>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button variant="outline" className="w-full border-sangam-200 text-sangam-800 dark:border-sangam-700 dark:text-sangam-300 hover:bg-sangam-50 dark:hover:bg-sangam-900/20">
                        Continue Training
                      </Button>
                    </CardFooter>
                  </Card>
                  
                  <Card className="hoverable-card bg-white/50 dark:bg-white/5">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-base">Crowd Management</CardTitle>
                        <Award className="w-5 h-5 text-sangam-500" />
                      </div>
                      <CardDescription>Kumbh Mela Authority</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm">Safe crowd management and control techniques.</p>
                      <div className="mt-2">
                        <Badge variant="outline" className="bg-blue-50 text-blue-700 dark:bg-blue-900/20 dark:text-blue-300 border-blue-200 dark:border-blue-800">Available</Badge>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button variant="outline" className="w-full border-sangam-200 text-sangam-800 dark:border-sangam-700 dark:text-sangam-300 hover:bg-sangam-50 dark:hover:bg-sangam-900/20">
                        Start Training
                      </Button>
                    </CardFooter>
                  </Card>
                </div>
              </TabsContent>
            </Tabs>
          </div>
          
          <div className="md:w-[280px] flex-shrink-0">
            <div className="bg-gradient-to-br from-sangam-50 to-sangam-100 dark:from-sangam-900/30 dark:to-sangam-900/50 rounded-xl p-4 sticky top-20">
              <h3 className="font-medium text-sangam-900 dark:text-sangam-100 mb-3 flex items-center">
                <Award className="w-4 h-4 mr-2 text-sangam-500" />
                Volunteer Leaderboard
              </h3>
              
              <div className="space-y-3">
                <div className="flex items-center justify-between p-2 bg-white/50 dark:bg-black/20 rounded-lg">
                  <div className="flex items-center">
                    <div className="bg-yellow-500 text-white w-5 h-5 rounded-full flex items-center justify-center text-xs mr-2">1</div>
                    <Avatar className="h-6 w-6 mr-2">
                      <AvatarFallback className="text-[10px]">RK</AvatarFallback>
                    </Avatar>
                    <span className="text-sm font-medium">Rahul K.</span>
                  </div>
                  <span className="text-xs">350 pts</span>
                </div>
                
                <div className="flex items-center justify-between p-2 bg-white/50 dark:bg-black/20 rounded-lg">
                  <div className="flex items-center">
                    <div className="bg-gray-400 text-white w-5 h-5 rounded-full flex items-center justify-center text-xs mr-2">2</div>
                    <Avatar className="h-6 w-6 mr-2">
                      <AvatarFallback className="text-[10px]">AP</AvatarFallback>
                    </Avatar>
                    <span className="text-sm font-medium">Ananya P.</span>
                  </div>
                  <span className="text-xs">320 pts</span>
                </div>
                
                <div className="flex items-center justify-between p-2 bg-white/50 dark:bg-black/20 rounded-lg">
                  <div className="flex items-center">
                    <div className="bg-amber-700 text-white w-5 h-5 rounded-full flex items-center justify-center text-xs mr-2">3</div>
                    <Avatar className="h-6 w-6 mr-2">
                      <AvatarFallback className="text-[10px]">SM</AvatarFallback>
                    </Avatar>
                    <span className="text-sm font-medium">Suresh M.</span>
                  </div>
                  <span className="text-xs">295 pts</span>
                </div>
                
                <div className="flex items-center justify-between p-2 bg-sangam-200/50 dark:bg-sangam-800/40 rounded-lg">
                  <div className="flex items-center">
                    <div className="bg-sangam-500 text-white w-5 h-5 rounded-full flex items-center justify-center text-xs mr-2">4</div>
                    <Avatar className="h-6 w-6 mr-2">
                      <AvatarFallback className="text-[10px]">YOU</AvatarFallback>
                    </Avatar>
                    <span className="text-sm font-medium">You</span>
                  </div>
                  <span className="text-xs">{points} pts</span>
                </div>
                
                <div className="flex items-center justify-between p-2 bg-white/50 dark:bg-black/20 rounded-lg">
                  <div className="flex items-center">
                    <div className="bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 w-5 h-5 rounded-full flex items-center justify-center text-xs mr-2">5</div>
                    <Avatar className="h-6 w-6 mr-2">
                      <AvatarFallback className="text-[10px]">PJ</AvatarFallback>
                    </Avatar>
                    <span className="text-sm font-medium">Priya J.</span>
                  </div>
                  <span className="text-xs">110 pts</span>
                </div>
              </div>
              
              <div className="mt-4 pt-4 border-t border-sangam-200/50 dark:border-sangam-800/50">
                <h4 className="text-sm font-medium mb-2">Upcoming Events</h4>
                <div className="space-y-2">
                  <div className="text-xs p-2 bg-white/50 dark:bg-black/20 rounded-md">
                    <div className="font-medium">Volunteer Training Session</div>
                    <div className="text-muted-foreground mt-1 flex items-center">
                      <Calendar className="w-3 h-3 mr-1" />
                      June 15, 2023 • 10:00 AM
                    </div>
                  </div>
                  <div className="text-xs p-2 bg-white/50 dark:bg-black/20 rounded-md">
                    <div className="font-medium">Virtual Coordination Meeting</div>
                    <div className="text-muted-foreground mt-1 flex items-center">
                      <Calendar className="w-3 h-3 mr-1" />
                      June 20, 2023 • 4:00 PM
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </>
  );
};

export default VolunteerDashboard;
