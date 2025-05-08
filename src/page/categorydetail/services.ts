import api from '@/services/apiServices'
import { useLangStore } from '@/stores/lang';


const categorydetail = async (id:string) =>{
const store = useLangStore()
    try {
        const response = await api.get(`/news-category?lang=${store.lang}&c_id=${id}`)
        return response.data
    } catch (error) {
        console.log(error);
    }
}
export { categorydetail }