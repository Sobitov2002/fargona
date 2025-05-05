import api from '@/services/apiServices'

const lang = localStorage.getItem('lang') || 'uz'
const getMainNews = async () =>{
    try {
        const response = await api.get(`/last-news?lang=${lang}`)
        return response.data
    } catch (error) {
        console.log(error);
    }
}

const getRecNews = async () =>{
    try {
        const response = await api.get(`/rec?lang=${lang}`)
        return response.data
    } catch (error) {
        console.log(error);
        
    }
}
const getLastNews = async () =>{
    try {
       
        const response = await api.get(`last-post?lang=${lang}`)
        return response.data
    } catch (error) {
        console.log(error);
        
    }
}
export {getMainNews , getRecNews , getLastNews}