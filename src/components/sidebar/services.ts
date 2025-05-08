import api from '@/services/apiServices'
import { useLangStore } from '@/stores/lang';


const getSidebar = async () => {
       const store = useLangStore()
  try {
    const response = await api.get(`/category?lang=${store.lang}`)
    return response.data
  } catch (error) {
    console.log(error)
    return []
  }
}

export { getSidebar }