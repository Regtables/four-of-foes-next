import { clientQuery, fetchClient } from "../../queries"
import { portalClient } from "../../sanity"

export const fetchSanityClient = async (id: string) => {
  try{
    const clientData = await portalClient.fetch(clientQuery(id))
  
    console.log(clientData)
  
    return clientData[0]
  } catch (error) {
    console.log(error)

    return error
  }
}