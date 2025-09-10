import React, { useState, useEffect } from 'react';
import { toastService, ToastMessage } from '../services/toast';
import { CheckCircle } from './icons';

const Toast: React.FC<{ message: ToastMessage, onDismiss: () => void }> = ({ message, onDismiss }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onDismiss();
    }, 2500);

    return () => clearTimeout(timer);
  }, [onDismiss]);

  return (
    <div
      className="flex items-center gap-4 bg-surface border border-border shadow-lg rounded-xl p-4 animate-fade-in-up motion-reduce:animate-none"
      role="alert"
      aria-live="assertive"
    >
      <CheckCircle className="text-ok" size={24} />
      <p className="text-text font-medium">{message.text}</p>
    </div>
  );
};

const ToastContainer: React.FC = () => {
  const [messages, setMessages] = useState<ToastMessage[]>([]);

  useEffect(() => {
    const unsubscribe = toastService.subscribe(setMessages);
    return () => unsubscribe();
  }, []);

  const dismiss = (id: number) => {
    setMessages(currentMessages => currentMessages.filter(msg => msg.id !== id));
  };

  return (
    <div className="fixed bottom-4 right-4 z-50 space-y-2">
      {messages.map(message => (
        <Toast key={message.id} message={message} onDismiss={() => dismiss(message.id)} />
      ))}
    </div>
  );
};

export default ToastContainer;
