import axios from "axios"

//sanity 
export const valueQuery = (value: string) => {
  const query = `*[_type == "${value}"]`

  return query
}

export const clientQuery = (id: string) => {
  const query = `*[_type == "client" && _id == "${id}"]`

  return query
}

export const allClientChatsQuery = () =>  {
  const query = '*[_type == "client"]{clientName, chat[]->{sender->, content, image, isSent, hasError, readBy, isFromClient, createdAt, _id }, appointmentDetails, _id}'

  return query
} 

export const clientChatQuery = (clientId: string) => {
  const query = `*[_type == "client" && _id == "${clientId}"]{chat[]->{sender->, readBy, content, createdAt, _id, isFromClient, image, isSent }} | order(_createdAt desc) [0...100]`

  return query
}

export const sectionQuery = (section: string) => {
  const query = `*[_type == "${section}"]{heading, description, options[]->}`

  return query
}

export const portalProgressQuery = (page: string) => {
  const query = `*[_type == "client"]{progress{${page}}}`

  return query
}

export const contactQuery = () => {
  const query = '*[_type == "contact"]'

  return query
}

export const fetchClientDataQuery = (id: string) => {
  const query = `*[_type == "client" && _id == "${id}"]`

  return query
}

export const clientSectionQuery = (id: string, ) => {
  
}

export const indemnityDataQuery = () => {
  const query = '*[_type == "indemnity"]'

  return query
}

export const miniIndemnityDataQuery = () => {
  const query = '*[_type == "individualIndemnityClause"]'

  return query
}

export const aftercareDataQuery = () => {
  const query = '*[_type == "aftercare"]'

  return query
}

export const tipsDataQuery = () => {
  const query = '*[_type == "tips"]'

  return query
}

export const tattooImagesQuery = (id: string) => {
  const query = `*[_type == "client" && _id == "${id}"]{tattooImages}`

  return query
}


//mongoDB
export const fetchClient = async (token: string) => {
  const res = await axios.get(`${process.env.BASE_URL}/api/portal/clients`, {
    withCredentials: true,
    headers: {
      Cookie: token
    }
  })

  return res
}

export const fetchDepositStatus = async (token: string) => {
  const res = await axios.get(`${process.env.BASE_URL}/api/portal/deposit`, {
    withCredentials: true,
    headers: {
      Cookie: token
    }
  })

  return res
}


export const fetchPaymentStatus = async (token: string) => {
  const res = await axios.get(`${process.env.BASE_URL}/api/portal/payment`, {
    withCredentials: true,
    headers: {
      Cookie: token
    }
  })

  return res
}

export const fetchIndemityStatus = async (token: string) => {
  const res = await axios.get(`${process.env.BASE_URL}/api/portal/indemnity`, {
    withCredentials: true,
    headers: {
      Cookie: token
    }
  })
  
  return res
}