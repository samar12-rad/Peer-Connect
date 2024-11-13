import { create } from 'zustand';

const useConversation = create((set) => ({
  selectedConversation: null, // Tracks current active conversation
  setSelectedConversation: (conversation) => set({ selectedConversation }), // Updates selected conversation
  messages: [], // Stores messages array
  setMessages: (messages) => set({ messages }), // Updates messages list
}));

export default useConversation;
