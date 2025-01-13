import {create} from  'zustand';
import toast from 'react-hot-toast';
import { axiosInstance } from '../src/lib/axios';

export const useChatStore = create((set) => ({
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
            set({messages:res.messages});
        } catch (error) {
            toast.error('Failed to fetch messages');
        }finally{
            set({isMessageLoading:false});
        }
    },

    setSelectedUser: (selectedUser) => set({ selectedUser }),
}));