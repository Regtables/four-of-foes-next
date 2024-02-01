import { indemnityDataQuery, tipsDataQuery, sectionQuery } from "../../queries"
import { landingClient, portalClient } from "../../sanity"

export const fetchPrepContent = async () => {
  const content = await portalClient.fetch(tipsDataQuery())

  return content[0].tips
}

export const fetchIndemnityContent = async () => {
  const content = await portalClient.fetch(indemnityDataQuery())

  return content
}

export const fetchBookingFormContent = async () => {
  const artists = landingClient.fetch(sectionQuery("artists"));
  const placements = landingClient.fetch(sectionQuery("placements"));
  const experience = landingClient.fetch(sectionQuery("experiences"));
  const dimensions = landingClient.fetch(sectionQuery("dimensions"));
  const date = landingClient.fetch(sectionQuery("preferredDate"));
  const references = landingClient.fetch(sectionQuery("references"));
  const idea = landingClient.fetch(sectionQuery("idea"));
  // const contact = await landingClient.fetch(contactQuery());

  const bookingFormData = await Promise.all([artists, placements, experience, dimensions, date, references, idea])

  console.log(bookingFormData)

  // const parsedData = bookingFormData.map((content) => ({
  //   [content[0].heading]: {
  //     heading: content[0].heading,
  //     description: content[0].description,
  //     options: content[0].options
  //   }
  // }))

  const parsedData = bookingFormData.map((content) => content[0])

  let dataObject = {}

  for(let i = 0; i < parsedData.length; i++){
    //@ts-ignore
    dataObject[parsedData[i].heading] = parsedData[i]
  }

  console.log(dataObject)

  return dataObject
}