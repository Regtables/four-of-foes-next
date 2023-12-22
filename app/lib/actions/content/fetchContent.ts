import { indemnityDataQuery, tipsDataQuery } from "../../queries"
import { portalClient } from "../../sanity"

export const fetchPrepContent = async () => {
  const content = await portalClient.fetch(tipsDataQuery())

  return content[0].tips
}

export const fetchIndemnityContent = async () => {
  const content = await portalClient.fetch(indemnityDataQuery())

  return content
}