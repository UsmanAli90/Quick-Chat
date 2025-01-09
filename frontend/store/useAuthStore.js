import {create} from 'zustand';
import { axiosInstance } from '../src/lib/axios.js';
import { use } from 'react';

export const useAuthStore = create((set) => ({
    authUser: null,
    
    isSigningUp:false,
    isLoggingIn:false,
    isUpdatingProfile:false,

    ischeckingAuth: true,

    checkAuth: async(req,res)=>{
        try {
            const res=await axiosInstance.get('/auth/check');
            set({authUser:res.data});
        } catch (error) {
            console.log("Error in UseAuthStore: ",error);
            set({authUser:null});
        }finally{
            set({ischeckingAuth:false});
        }
    }
}));