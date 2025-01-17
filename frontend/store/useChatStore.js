import {create} from  'zustand';
import toast from 'react-hot-toast';
import { axiosInstance } from '../src/lib/axios';
import { useAuthStore } from './useAuthStore';

export const useChatStore = create((set,get) => ({
    messages:[],
    users:[],
    selectedUser:null,
    isUserLoading:false,
    isMessageLoading:false,

    getUsers: async()=>{
        set({isUserLoading:true});
        try {
            const res=await axiosInstance.get('/message/users');
            set({users:res.data});
        } catch (error) {
            toast.error('Failed to fetch users');
        }finally{
            set({isUserLoading:false});
        }
    },

    getMessages: async(userID)=>{
        set({isMessageLoading:true});
        try {
            const res= await axiosInstance.get(`/message/${userID}`);
            set({messages:res.data.messages});
        } catch (error) {
            toast.error('Failed to fetch messages');
        }finally{
            set({isMessageLoading:false});
        }
    },
    sendMessage:async(messageData)=>{
        const{selectedUser,messages}=get();
        try {
            const res=await axiosInstance.post(`/message/send/${selectedUser._id}`,messageData);
            set({messages:[...messages,res.data]});
        } catch (error) {
            toast.error(error.response.data.message);
        }
    },

    subscribeToNewMessages:()=>{
        const {selectedUser}=get();
        if(!selectedUser) return;

        const socket=useAuthStore.getState().socket;

        socket.on('newMessage',(newMessage)=>{
            set({
                messages:[...get().messages,newMessage]
            });
        })

    },

    unsubscribeFromMessages:()=>{
        const socket=useAuthStore.getState().socket;
        socket.off('newMessage');
    },

    setSelectedUser: (selectedUser) => set({ selectedUser }),
}));