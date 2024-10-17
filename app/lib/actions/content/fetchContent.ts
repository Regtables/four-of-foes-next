import { indemnityDataQuery, tipsDataQuery, sectionQuery, aftercareDataQuery } from "../../queries"
import { landingClient, portalClient } from "../../sanity"

export const fetchPrepContent = async () => {
  const content = await portalClient.fetch(tipsDataQuery())

  return content[0].tips
}

export const fetchIndemnityContent = async () => {
  const content = await portalClient.fetch(indemnityDataQuery())

  return content
}

export const fetchAftercareContent = async () => {
  const content = await portalClient.fetch(aftercareDataQuery())

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

  const reshapeArtists = (artists: { name: string; tourOptions: string[] }[]) => {
    return artists.map(artist => ({
      title: artist.name,
      tourOptions: artist.tourOptions.map(city => ({
        choice: { title: city }
      }))
    }));
  };

  const bookingFormData = await Promise.all([artists, placements, experience, dimensions, date, references, idea]);
  const [artistData, ...restData] = bookingFormData;

  let dataObject: { [key: string]: any } = {};

  // Process artists separately
  const reshapedArtists = reshapeArtists(artistData[0].options);
  dataObject['Artists'] = {
    ...artistData[0],
    options: reshapedArtists
  };

  // Process the rest of the data
  for (let content of restData) {
    dataObject[content[0].heading] = content[0];
  }

  return dataObject;
};