import { usePortalProgress } from "@/context/PortalProgressContext"
import axios from "axios"
import { useRouter } from "next/navigation"
import { useModal } from "@/context/ModalContext"
import { ClientType } from "@/types"

export const useAuth = () => {
  const router = useRouter()
  const { handleModalClose, handleModalOpen } = useModal()
  const { clearProgress, setProgress, progress } = usePortalProgress()

  const signInClient = async (client: ClientType) => {
    try{
      handleModalOpen('loading')
      const res = await axios.post('/api/clients/auth', { client })

      console.log(res, 'response')

      if(res.status === 200){
        setProgress(client.progress)
        router.push('/portal/pre')
        console.log(progress)
      }
    } catch (error){
      console.log(`Unable to sign client in: ${error}`)
      throw error
    } finally{
      handleModalClose('loading')
    }
  }

  const logoutClient = async () => {
    try{
      handleModalOpen('loading')
      await axios.get('/api/clients/auth/logout')
  
      clearProgress()
      router.push('/')
    } catch (error){
      console.log(`Unable to logout client: ${error}`)
      throw error
    } finally{
      handleModalClose('loading')
    }
  }

  const refreshClientSession = async () => {
    try{
      handleModalOpen('loading')
      const res = await axios.get('/api/clients/auth/refresh', { withCredentials: true })
  
      if(res.status === 200){
        router.push('/portal/pre')
      }
    } catch (error){
      console.log(`Unable to refresh client's session: ${error}`)
      throw error
    } finally {
      handleModalClose('loading')
    }
  }

  return { logoutClient, refreshClientSession, signInClient }
}