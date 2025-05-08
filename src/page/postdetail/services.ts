import api from '@/services/apiServices'
import { useLangStore } from '@/stores/lang';


const newsdetail = async (id:string) =>{
const store = useLangStore()
    try {
        const response = await api.get(`/n/${id}?lang=${store.lang}`)
        return response.data
    } catch (error) {
        console.log(error);
    }
}
export { newsdetail }