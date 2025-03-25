
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '../ui/form';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { Checkbox } from '../ui/checkbox';
import { useToast } from '@/hooks/use-toast';
import Confetti from '../ui/confetti';
import { Award, User, Phone, Mail, School, Briefcase } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const volunteerFormSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters.' }),
  email: z.string().email({ message: 'Please enter a valid email address.' }),
  phone: z.string().min(10, { message: 'Please enter a valid phone number.' }),
  age: z.string().refine((val) => !isNaN(Number(val)) && Number(val) >= 18, {
    message: 'You must be at least 18 years old to volunteer.',
  }),
  occupation: z.string().min(2, { message: 'Please specify your occupation.' }),
  institution: z.string().optional(),
  volunteerType: z.string({
    required_error: "Please select a volunteer type",
  }),
  skills: z.array(z.string()).optional(),
  roles: z.array(z.string()).min(1, { message: 'Please select at least one role.' }),
  languages: z.array(z.string()).min(1, { message: 'Please select at least one language.' }),
  availability: z.array(z.string()).min(1, { message: 'Please select at least one availability.' }),
  agreeTerms: z.boolean().refine((val) => val === true, {
    message: 'You must agree to the terms and conditions.',
  }),
});

type VolunteerFormValues = z.infer<typeof volunteerFormSchema>;

const VolunteerForm: React.FC = () => {
  const [showConfetti, setShowConfetti] = useState(false);
  const { toast } = useToast();
  
  const form = useForm<VolunteerFormValues>({
    resolver: zodResolver(volunteerFormSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      age: '',
      occupation: '',
      institution: '',
      volunteerType: '',
      skills: [],
      roles: [],
      languages: [],
      availability: [],
      agreeTerms: false,
    },
  });

  const roleOptions = [
    { id: 'crowd-guidance', label: 'Crowd guidance & navigation' },
    { id: 'first-aid', label: 'First aid & medical assistance' },
    { id: 'missing-persons', label: 'Missing persons assistance' },
    { id: 'traffic-support', label: 'Traffic & train station support' },
    { id: 'tech-support', label: 'Tech support for elderly pilgrims' },
  ];

  const languageOptions = [
    { id: 'hindi', label: 'Hindi' },
    { id: 'english', label: 'English' },
    { id: 'marathi', label: 'Marathi' },
    { id: 'gujarati', label: 'Gujarati' },
    { id: 'bengali', label: 'Bengali' },
    { id: 'tamil', label: 'Tamil' },
    { id: 'telugu', label: 'Telugu' },
    { id: 'kannada', label: 'Kannada' },
    { id: 'malayalam', label: 'Malayalam' },
    { id: 'punjabi', label: 'Punjabi' },
  ];

  const availabilityOptions = [
    { id: 'weekdays', label: 'Weekdays' },
    { id: 'weekends', label: 'Weekends' },
    { id: 'mornings', label: 'Mornings' },
    { id: 'afternoons', label: 'Afternoons' },
    { id: 'evenings', label: 'Evenings' },
    { id: 'special-days', label: 'Special Bathing Days' },
  ];

  const onSubmit = (data: VolunteerFormValues) => {
    console.log('Volunteer form submitted:', data);
    
    // Trigger confetti
    setShowConfetti(true);
    
    // Show success toast
    toast({
      title: "Registration Successful!",
      description: "Thank you for volunteering! You will receive a confirmation email shortly.",
      variant: "default",
    });
    
    // Reset form after submission
    setTimeout(() => {
      form.reset();
    }, 2000);
  };

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
        <div className="mb-4">
          <div className="inline-flex items-center px-3 py-1 bg-sangam-100 dark:bg-sangam-900/40 text-sangam-800 dark:text-sangam-300 rounded-full text-xs font-medium">
            <Award className="w-3.5 h-3.5 mr-1.5" />
            Volunteer Registration
          </div>
          
          <h2 className="text-xl md:text-2xl font-bold text-sangam-900 dark:text-sangam-100 mt-3 mb-2">
            Join our Volunteer Network
          </h2>
          
          <p className="text-muted-foreground mb-6">
            Fill out this form to become part of our volunteer team for Kumbh 2028
          </p>
        </div>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Full Name</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input placeholder="Enter your full name" className="pl-10" {...field} />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input placeholder="Enter your email" className="pl-10" {...field} />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone Number</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input placeholder="Enter your phone number" className="pl-10" {...field} />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="age"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Age</FormLabel>
                    <FormControl>
                      <Input type="number" placeholder="Enter your age" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="occupation"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Occupation</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Briefcase className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input placeholder="Student/Professional/Other" className="pl-10" {...field} />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="institution"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Institution/Organization (Optional)</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <School className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input placeholder="Enter your institution/organization" className="pl-10" {...field} />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="volunteerType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Volunteer Type</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select volunteer type" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="student">Student</SelectItem>
                        <SelectItem value="professional">Professional</SelectItem>
                        <SelectItem value="ngo">NGO Member</SelectItem>
                        <SelectItem value="firstResponder">First Responder</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            
            <div className="border-t border-border/40 pt-6">
              <h3 className="text-lg font-medium mb-4">Volunteer Roles</h3>
              
              <FormField
                control={form.control}
                name="roles"
                render={() => (
                  <FormItem>
                    <div className="mb-4">
                      <FormLabel>Select roles you're interested in</FormLabel>
                      <FormDescription>
                        You can select multiple roles
                      </FormDescription>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {roleOptions.map((role) => (
                        <FormField
                          key={role.id}
                          control={form.control}
                          name="roles"
                          render={({ field }) => {
                            return (
                              <FormItem
                                key={role.id}
                                className="flex flex-row items-start space-x-3 space-y-0 p-3 border border-border/60 rounded-md"
                              >
                                <FormControl>
                                  <Checkbox
                                    checked={field.value?.includes(role.id)}
                                    onCheckedChange={(checked) => {
                                      return checked
                                        ? field.onChange([...field.value, role.id])
                                        : field.onChange(
                                            field.value?.filter(
                                              (value) => value !== role.id
                                            )
                                          )
                                    }}
                                  />
                                </FormControl>
                                <FormLabel className="font-normal cursor-pointer text-sm">
                                  {role.label}
                                </FormLabel>
                              </FormItem>
                            )
                          }}
                        />
                      ))}
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="languages"
                render={() => (
                  <FormItem>
                    <div className="mb-2">
                      <FormLabel>Languages you speak</FormLabel>
                      <FormDescription>
                        Select all that apply
                      </FormDescription>
                    </div>
                    <div className="grid grid-cols-2 gap-2 max-h-40 overflow-y-auto">
                      {languageOptions.map((language) => (
                        <FormField
                          key={language.id}
                          control={form.control}
                          name="languages"
                          render={({ field }) => {
                            return (
                              <FormItem
                                key={language.id}
                                className="flex flex-row items-start space-x-2 space-y-0"
                              >
                                <FormControl>
                                  <Checkbox
                                    checked={field.value?.includes(language.id)}
                                    onCheckedChange={(checked) => {
                                      return checked
                                        ? field.onChange([...field.value, language.id])
                                        : field.onChange(
                                            field.value?.filter(
                                              (value) => value !== language.id
                                            )
                                          )
                                    }}
                                  />
                                </FormControl>
                                <FormLabel className="font-normal cursor-pointer text-sm">
                                  {language.label}
                                </FormLabel>
                              </FormItem>
                            )
                          }}
                        />
                      ))}
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="availability"
                render={() => (
                  <FormItem>
                    <div className="mb-2">
                      <FormLabel>Availability</FormLabel>
                      <FormDescription>
                        When can you volunteer?
                      </FormDescription>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      {availabilityOptions.map((option) => (
                        <FormField
                          key={option.id}
                          control={form.control}
                          name="availability"
                          render={({ field }) => {
                            return (
                              <FormItem
                                key={option.id}
                                className="flex flex-row items-start space-x-2 space-y-0"
                              >
                                <FormControl>
                                  <Checkbox
                                    checked={field.value?.includes(option.id)}
                                    onCheckedChange={(checked) => {
                                      return checked
                                        ? field.onChange([...field.value, option.id])
                                        : field.onChange(
                                            field.value?.filter(
                                              (value) => value !== option.id
                                            )
                                          )
                                    }}
                                  />
                                </FormControl>
                                <FormLabel className="font-normal cursor-pointer text-sm">
                                  {option.label}
                                </FormLabel>
                              </FormItem>
                            )
                          }}
                        />
                      ))}
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            
            <FormField
              control={form.control}
              name="agreeTerms"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0 py-4 border-t border-border/40">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel className="font-normal cursor-pointer">
                      I agree to the terms and conditions
                    </FormLabel>
                    <FormDescription>
                      By signing up, you agree to our volunteer code of conduct and privacy policy.
                    </FormDescription>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <div className="flex justify-end">
              <Button type="submit" className="premium-button min-w-32">
                Register as Volunteer
              </Button>
            </div>
          </form>
        </Form>
      </motion.div>
    </>
  );
};

export default VolunteerForm;
