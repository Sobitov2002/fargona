
import api from '@/services/apiServices'


const getCategory = async (lang: string) => {
  try {
    const response = await api.get(`/category?lang=${lang}`)
    return response.data
  } catch (error) {
    console.log(error)
    return []
  }
}

export { getCategory }

