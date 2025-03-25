
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Mic, MicOff, X, Volume2, Volume1, VolumeX } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';
import Confetti from '@/components/ui/confetti';

interface VoiceAssistantProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const VoiceAssistant: React.FC<VoiceAssistantProps> = ({ open, onOpenChange }) => {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [response, setResponse] = useState('');
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [volume, setVolume] = useState(0.8);
  const [showConfetti, setShowConfetti] = useState(false);
  const recognitionRef = useRef<any>(null);
  const { toast } = useToast();
  const navigate = useNavigate();

  // Define common commands and their responses/actions
  const commands = {
    'home': { response: 'Taking you to the home page.', action: () => navigate('/') },
    'trains': { response: 'Navigating to train booking.', action: () => navigate('/train-booking') },
    'train booking': { response: 'Navigating to train booking.', action: () => navigate('/train-booking') },
    'crowd map': { response: 'Navigating to crowd map.', action: () => navigate('/crowd-map') },
    'map': { response: 'Navigating to crowd map.', action: () => navigate('/crowd-map') },
    'lost and found': { response: 'Navigating to lost and found.', action: () => navigate('/lost-found') },
    'find': { response: 'Navigating to lost and found.', action: () => navigate('/lost-found') },
    'emergency': { response: 'Opening emergency services.', action: () => navigate('/emergency') },
    'sos': { response: 'Opening emergency services.', action: () => navigate('/emergency') },
    'services': { response: 'Checking available services.', action: () => navigate('/services') },
    'volunteer': { response: 'Taking you to the volunteer page.', action: () => navigate('/volunteer') },
    'close': { response: 'Closing voice assistant.', action: () => onOpenChange(false) },
    'help': { 
      response: 'I can help you navigate the app, book train tickets, check crowd maps, access emergency services, or find facilities. Try saying: trains, map, emergency, services, or volunteer.', 
      action: () => {} 
    },
  };

  useEffect(() => {
    if (open) {
      // Initialize speech recognition
      if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        recognitionRef.current = new SpeechRecognition();
        recognitionRef.current.continuous = false;
        recognitionRef.current.interimResults = true;
        recognitionRef.current.lang = 'en-US';

        recognitionRef.current.onresult = (event: any) => {
          const current = event.resultIndex;
          const transcriptResult = event.results[current][0].transcript;
          setTranscript(transcriptResult);
        };

        recognitionRef.current.onend = () => {
          if (isListening) {
            // Process the command
            processCommand(transcript.toLowerCase().trim());
            setIsListening(false);
          }
        };

        // Greeting on open
        const greeting = "Hello! How can I help you today?";
        setResponse(greeting);
        speakText(greeting);
      } else {
        toast({
          title: "Voice Assistant Not Available",
          description: "Your browser doesn't support speech recognition.",
          variant: "destructive",
        });
        onOpenChange(false);
      }
    }

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
    };
  }, [open]);

  const toggleListening = () => {
    if (isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
    } else {
      setTranscript('');
      setResponse('');
      recognitionRef.current.start();
      setIsListening(true);
    }
  };

  const processCommand = (command: string) => {
    // Check if the command matches any predefined commands
    let foundCommand = false;
    let responseText = '';
    let action = null;
    
    // Check for direct matches
    Object.entries(commands).forEach(([key, value]) => {
      if (command.includes(key)) {
        foundCommand = true;
        responseText = value.response;
        action = value.action;
      }
    });
    
    // General queries
    if (!foundCommand) {
      if (command.includes('hello') || command.includes('hi') || command.includes('namaste')) {
        responseText = "Hello! How can I help you with Sangam Sahayak?";
        foundCommand = true;
      } else if (command.includes('thank')) {
        responseText = "You're welcome! Is there anything else I can help you with?";
        foundCommand = true;
        setShowConfetti(true);
      } else if (command.includes('kumbh')) {
        responseText = "Kumbh Mela 2028 will be held in Ujjain. I can help you find information about transportation, accommodation, or services.";
        foundCommand = true;
      } else {
        responseText = "I'm sorry, I didn't understand that command. Try saying 'help' to see what I can do.";
      }
    }
    
    setResponse(responseText);
    speakText(responseText);
    
    // Execute the action if one was found
    if (action) {
      setTimeout(() => {
        action();
      }, 1500);
    }
  };
  
  const speakText = (text: string) => {
    if ('speechSynthesis' in window) {
      setIsSpeaking(true);
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.volume = volume;
      utterance.rate = 1.0;
      utterance.pitch = 1.0;
      
      // Use an Indian English voice if available
      const voices = window.speechSynthesis.getVoices();
      const indianVoice = voices.find(voice => voice.lang === 'en-IN');
      if (indianVoice) {
        utterance.voice = indianVoice;
      }
      
      utterance.onend = () => {
        setIsSpeaking(false);
      };
      
      window.speechSynthesis.speak(utterance);
    }
  };
  
  const adjustVolume = (newVolume: number) => {
    setVolume(Math.max(0, Math.min(1, newVolume)));
  };
  
  const stopSpeaking = () => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    }
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.9 }}
          className="fixed bottom-20 left-1/2 transform -translate-x-1/2 w-[90%] max-w-md z-50"
        >
          <Confetti 
            trigger={showConfetti} 
            duration={2000}
            onComplete={() => setShowConfetti(false)}
          />
          
          <div className="premium-card">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-medium">Voice Assistant</h3>
              <div className="flex items-center space-x-2">
                <div className="flex items-center space-x-1">
                  {volume === 0 ? (
                    <VolumeX 
                      className="w-4 h-4 text-muted-foreground cursor-pointer"
                      onClick={() => adjustVolume(0.5)}
                    />
                  ) : volume <= 0.5 ? (
                    <Volume1 
                      className="w-4 h-4 text-muted-foreground cursor-pointer"
                      onClick={() => volume > 0 ? adjustVolume(0) : adjustVolume(1)}
                    />
                  ) : (
                    <Volume2 
                      className="w-4 h-4 text-muted-foreground cursor-pointer"
                      onClick={() => adjustVolume(0)}
                    />
                  )}
                </div>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="h-8 w-8" 
                  onClick={() => onOpenChange(false)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </div>
            
            <div className="bg-background/70 dark:bg-background/30 rounded-lg p-4 min-h-[100px] mb-4">
              {response ? (
                <div className="text-sm">
                  <span className="font-medium text-sangam-800 dark:text-sangam-300">Assistant: </span>
                  <span>{response}</span>
                  
                  {isSpeaking && (
                    <div className="flex justify-end">
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="h-6 text-xs"
                        onClick={stopSpeaking}
                      >
                        <VolumeX className="h-3 w-3 mr-1" />
                        Stop
                      </Button>
                    </div>
                  )}
                </div>
              ) : (
                <div className="text-sm text-muted-foreground flex items-center justify-center h-full">
                  {isListening ? "Listening..." : "Press the microphone button to speak"}
                </div>
              )}
            </div>
            
            {transcript && (
              <div className="bg-background/70 dark:bg-background/30 rounded-lg p-2 mb-4">
                <p className="text-xs">
                  <span className="font-medium text-muted-foreground">You said: </span>
                  <span>{transcript}</span>
                </p>
              </div>
            )}
            
            <div className="flex justify-center">
              <motion.button
                whileTap={{ scale: 0.9 }}
                className={`p-6 rounded-full ${
                  isListening 
                    ? 'bg-red-500 text-white animate-pulse' 
                    : 'bg-sangam-100 dark:bg-sangam-900/50 text-sangam-800 dark:text-sangam-300'
                }`}
                onClick={toggleListening}
              >
                {isListening ? (
                  <MicOff className="h-6 w-6" />
                ) : (
                  <Mic className="h-6 w-6" />
                )}
              </motion.button>
            </div>
            
            <div className="mt-4 text-center text-xs text-muted-foreground">
              <p>Try saying: "trains", "map", "emergency", or "help"</p>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default VoiceAssistant;
