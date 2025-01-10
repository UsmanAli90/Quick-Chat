import {create} from 'zustand';
import { axiosInstance } from '../src/lib/axios.js';
import toast from 'react-hot-toast';

export const useAuthStore = create((set) => ({
    authUser: null,
    
    isSigningUp:false,
    isLoggingIn:false,
    isUpdatingProfile:false,

    ischeckingAuth: true,

    checkAuth: async()=>{
        try {
            const res=await axiosInstance.get('/auth/check');
            set({authUser:res.data});
        } catch (error) {
            console.log("Error in UseAuthStore: ",error);
            set({authUser:null});
        }finally{
            set({ischeckingAuth:false});
        }
    },

    signup:async(data)=>{
        set({isSigningUp:true});
        try {
            const res=await axiosInstance.post('/auth/signup',data);
            set({authUser:res.data});
            toast.success("Account created successfully");
        } catch (error) {
            toast.error(error.response.data.message);
            
        }finally{
            set({isSigningUp:false})
        }
    },

    login: async(data)=>{
        set({isLoggingIn:true});
        try {
            const res=await axiosInstance.post('/auth/login',data);
            set({authUser:res.data});
            toast.success("Logged in successfully");
        } catch (error) {
            toast.error(error.response.data.message);
        }finally{
            set({isLoggingIn:false});
        }
    },

    logout: async()=>{
        try {
            const res=await axiosInstance.post('/auth/logout');
            console.log(res.data);
            set({authUser:null});
            toast.success("Logged out successfully");
        } catch (error) {
            toast.error(error.response.data.message);
        }
    },
    
    updateProfile: async(data)=>{
        set({isUpdatingProfile:true});
        try {
            const res=await axiosInstance.put('/auth/update-profile',data);
            console.log(res.data);
            set({authUser:res.data});
            toast.success("Profile updated successfully");
        } catch (error) {
            console.log("Error in UseAuthStore Update Image: ",error);
            toast.error(error.response.data.message);
        }finally{
            set({isUpdatingProfile:false});
        }
    }
}));