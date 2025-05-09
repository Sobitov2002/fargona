import api from '@/services/apiServices'
import { useLangStore } from '@/stores/lang';


const searchDetail = async (text:string) =>{
const store = useLangStore()
    try {
        const response = await api.get(`/search?search=${text}&lang=${store.lang}`)
        return response.data
    } catch (error) {
        console.log(error);
    }
}
export { searchDetail }