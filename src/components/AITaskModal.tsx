import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send, Bot, User, Sparkles } from "lucide-react";
import { v4 as uuidv4 } from 'uuid';

interface AITaskModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface Message {
  type: 'user' | 'ai';
  content: string;
  timestamp: string;
}

export const AITaskModal = ({ isOpen, onClose }: AITaskModalProps) => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    {
      type: 'ai',
      content: "Hi! I'll help you create a new lead generation task. Just describe what you're looking for in natural language.",
      timestamp: new Date().toLocaleTimeString()
    }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const [sessionId, setSessionId] = useState<string>(uuidv4());

  useEffect(() => {
    if (isOpen) {
      // Set up interval to refresh sessionId and clear chat every 30 minutes (1800000 ms)
      const interval = setInterval(() => {
        setSessionId(uuidv4());
        setMessages([
          {
            type: 'ai',
            content: "Hi! I'll help you create a new lead generation task. Just describe what you're looking for in natural language.",
            timestamp: new Date().toLocaleTimeString()
          }
        ]);
      }, 1800000); // 30 minutes

      // Clear interval on component unmount or when modal closes
      return () => clearInterval(interval);
    }
  }, [isOpen]);

  const handleSendMessage = async () => {
    if (!message.trim()) return;

    const userMessage: Message = {
      type: 'user',
      content: message,
      timestamp: new Date().toLocaleTimeString()
    };

    setMessages(prev => [...prev, userMessage]);
    setMessage("");
    setIsLoading(true);

    try {
      const response = await fetch("url for talking with the ai", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: message, sessionId: sessionId }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      const aiResponse: Message = {
        type: 'ai',
        content: data.output || "Sorry, I couldn't get a response from the AI.", // Assuming the webhook returns an 'output' field
        timestamp: new Date().toLocaleTimeString()
      };
      
      setMessages(prev => [...prev, aiResponse]);
    } catch (error) {
      console.error("Failed to send message to webhook:", error);
      const errorMessage: Message = {
        type: 'ai',
        content: "I'm sorry, I encountered an error and couldn't process your request. Please try again later.",
        timestamp: new Date().toLocaleTimeString()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreateTask = () => {
    // Create task logic here
    console.log('Creating task with message:', message);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-gray-900 border-gray-700 max-w-4xl max-h-[90vh] flex flex-col">
        <DialogHeader>
          <DialogTitle className="text-white flex items-center">
            <Sparkles className="w-5 h-5 mr-2 text-blue-400" />
            Create New Lead Generation Task
          </DialogTitle>
        </DialogHeader>

        <div className="flex-1 flex flex-col space-y-4 min-h-0">
          {/* Chat Messages */}
          <div className="flex-1 bg-gray-800 rounded-lg p-4 space-y-4 overflow-y-auto min-h-[400px] max-h-[60vh]">
            {messages.map((msg, index) => (
              <div key={index} className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`flex items-start space-x-2 max-w-[80%] ${msg.type === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}>
                  <div className={`p-2 rounded-full ${msg.type === 'user' ? 'bg-blue-500' : 'bg-gray-600'}`}>
                    {msg.type === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                  </div>
                  <div className={`p-3 rounded-lg ${msg.type === 'user' ? 'bg-blue-500' : 'bg-gray-700'}`}>
                    <p className="text-sm whitespace-pre-line text-white">{msg.content}</p>
                    <p className="text-xs text-gray-300 mt-1">{msg.timestamp}</p>
                  </div>
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="flex items-start space-x-2">
                  <div className="p-2 rounded-full bg-gray-600">
                    <Bot className="w-4 h-4" />
                  </div>
                  <div className="p-3 rounded-lg bg-gray-700">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Input Area */}
          <div className="flex space-x-2 mt-auto">
            <Input
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Describe your lead requirements..."
              className="flex-1 bg-gray-800 border-gray-600 text-white placeholder-gray-400"
              onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
            />
            <Button 
              onClick={handleSendMessage} 
              disabled={!message.trim() || isLoading}
              className="bg-blue-600 hover:bg-blue-700 text-white border-0"
            >
              <Send className="w-4 h-4" />
            </Button>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end space-x-2">
            <Button 
              variant="ghost" 
              onClick={onClose}
              className="text-gray-300 hover:bg-gray-700 hover:text-white"
            >
              Cancel
            </Button>
            <Button 
              onClick={handleCreateTask} 
              className="bg-green-600 hover:bg-green-700 text-white border-0"
            >
              Create Task
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
