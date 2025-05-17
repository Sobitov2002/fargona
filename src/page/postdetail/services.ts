import api from '@/services/apiServices'
import { useLangStore } from '@/stores/lang';


const newsdetail = async (type: 'n' | 'r', id: string) =>{
const store = useLangStore()
    try {
          const response = await api.get(`/${type}/${id}?lang=${store.lang}`)          
        return response.data
    } catch (error) {
        console.log(error);
    }
}
const fetchLastNewsCategory = async () => {
const store = useLangStore()
const selectedCategoryId = localStorage.getItem('selectedCategoryId');
  try {
    const response = await api.get(`/last-news-category?lang=${store.lang}&c_id=${selectedCategoryId}`)
    return response.data
  } catch (e) {
    console.log(e)
    return []
  }
}
 const fetchAllRec = async (page = 1) => {
const store = useLangStore()

  try {
    const response = await api.get(`/all-rec?lang=${store.lang}&page=${page}`)
    return response.data
  } catch (e) {
    console.log(e)
    return []
  }
}
export { newsdetail , fetchLastNewsCategory ,fetchAllRec   }