import api from '@/services/apiServices'
import { watch } from 'vue'

const getCategory = async () =>{
    try {
        const response  = await api.get(`/news-category?lang=uz&c_id=2`)
        return response.data
    } catch (error) {
       console.log(error);
        
    }
}

const getSocialNews = async () =>{
    try {
        const response = await api.get(`/news-category?lang=uz&c_id=1`)
        return response.data
    } catch (error) {
        console.log(error);
        
    }
}
const getInternationalNews = async () =>{
    try {
        const response = await api.get(`/news-category?lang=uz&c_id=3`)
        return response.data
    } catch (error) {
        console.log(error);
        
    }
}

export {getCategory , getSocialNews , getInternationalNews}