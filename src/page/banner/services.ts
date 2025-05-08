import api from '@/services/apiServices'
import { useLangStore } from '@/stores/lang';

const getMainNews = async () =>{
    const store = useLangStore()
    try {
        const response = await api.get(`/last-news?lang=${store.lang}`)
        return response.data
    } catch (error) {
        console.log(error);
    }
}

const getRecNews = async () =>{
    try {
        const response = await api.get(`/header-ads`)
        return response.data
    } catch (error) {
        console.log(error);
        
    }
}
const getLastNews = async () =>{
    const store = useLangStore()
    try {
       
        const response = await api.get(`last-post?lang=${store.lang}`)
        console.log("Songi yangiliklar", response.data);
        
        return response.data
    } catch (error) {
        console.log(error);
        
    }
}
export {getMainNews , getRecNews , getLastNews}