import api from '@/services/apiServices'
import { useLangStore } from '@/stores/lang';


const categorydetail = async (page = 1) => {
  const store = useLangStore()
  try {
    const response = await api.get(`/all-rec?lang=${store.lang}&page=${page}`)
    console.log(response.data);
    
    return response.data
  } catch (error) {
    console.log(error)
  }
}
export { categorydetail }