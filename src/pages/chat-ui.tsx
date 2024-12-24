import React, { useState } from 'react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar } from "@/components/ui/avatar";
import { User, Bot, Loader2 } from 'lucide-react';
import ReactMarkdown from 'react-markdown';

const ChatUI = () => {
  const [messages, setMessages] = useState([
    { role: 'assistant', content: '你好!我是一个AI助手,很高兴为你服务。' },
    { role: 'user', content: '你能做什么?' },
    { role: 'assistant', content: '我可以帮助你:\n\n- 回答问题\n- 编写代码\n- 分析数据\n\n有什么我可以帮你的吗?' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;
    
    // Add user message
    setMessages(prev => [...prev, { role: 'user', content: input }]);
    setInput('');
    
    // Simulate AI response with loading state
    setIsLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: '这是一个支持 **Markdown** 格式的响应示例:\n\n```javascript\nconsole.log("Hello World!");\n```\n\n1. 项目一\n2. 项目二'
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 p-4">
      <div className="flex flex-col w-full max-w-7xl h-[600px] bg-white rounded-lg shadow-lg">
        {/* Chat messages area */}
        <ScrollArea className="flex-1 p-4">
          <div className="space-y-4">
            {messages.map((message, index) => (
              <div key={index} className={`flex items-start gap-3 ${
                message.role === 'user' ? 'justify-end' : 'justify-start'
              }`}>
                {message.role === 'assistant' && (
                  <Avatar className="w-8 h-8 bg-blue-500 shrink-0">
                    <Bot className="w-5 h-5 text-white" />
                  </Avatar>
                )}
                <Card className={`p-3 max-w-[80%] ${
                  message.role === 'user' ? 'bg-blue-500 text-white' : 'bg-gray-100'
                }`}>
                  <div className={`prose ${message.role === 'user' ? 'prose-invert' : ''} max-w-none text-sm`}>
                    <ReactMarkdown>{message.content}</ReactMarkdown>
                  </div>
                </Card>
                {message.role === 'user' && (
                  <Avatar className="w-8 h-8 bg-gray-500 shrink-0">
                    <User className="w-5 h-5 text-white" />
                  </Avatar>
                )}
              </div>
            ))}
            {isLoading && (
              <div className="flex items-start gap-3">
                <Avatar className="w-8 h-8 bg-blue-500">
                  <Bot className="w-5 h-5 text-white" />
                </Avatar>
                <Card className="p-3 bg-gray-100">
                  <Loader2 className="w-4 h-4 animate-spin" />
                </Card>
              </div>
            )}
          </div>
        </ScrollArea>

        {/* Input area */}
        <div className="border-t p-4">
          <form onSubmit={handleSubmit} className="flex gap-2">
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="输入消息..."
              className="flex-1"
              disabled={isLoading}
            />
            <Button type="submit" disabled={isLoading}>
              {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : '发送'}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ChatUI;