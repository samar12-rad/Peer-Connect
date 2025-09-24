import { create } from 'zustand';

const useConversation = create((set) => ({
  selectedConversation: null, // Tracks current active conversation
  setSelectedConversation: (conversation) =>
    set(() => ({
      selectedConversation: conversation,
    })), // Updates selected conversation
  messages: [], // Stores messages array
  setMessages: (messages) => set((state) => {
    const newMessages = typeof messages === 'function' ? messages(state.messages) : messages;
    return { messages: Array.isArray(newMessages) ? newMessages : [] };
  }), // Updates messages list, handles both direct values and callback functions, ensures array
}));

export default useConversation;
