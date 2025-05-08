import api from '@/services/apiServices'
import { useLangStore } from '@/stores/lang';


const getCategory = async () =>{
    const store = useLangStore()
    try {
        const response  = await api.get(`/last-news-category?lang=${store.lang}&c_id=2`)       
        return response.data

    } catch (error) {
       console.log(error);
        
    }
}

const getSocialNews = async () =>{
    const store = useLangStore()
    try {
        const response = await api.get(`/news-category?lang=${store.lang}&c_id=5`)
        return response.data
    } catch (error) {
        console.log(error);
        
    }
}
const getInternationalNews = async () =>{
    const store = useLangStore()
    try {
        const response = await api.get(`/news-category?lang=${store.lang}&c_id=3`)
        return response.data
    } catch (error) {
        console.log(error);
        
    }
}

export {getCategory , getSocialNews , getInternationalNews}