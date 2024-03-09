import { format } from "date-fns";

import { AppointmentDetailsType } from "@/types";

export const createDownloadLink = async (response: Response, fileName: string) => {
  const blob = await response.blob();
  const url = window.URL.createObjectURL(new Blob([blob]));
  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('download', fileName);
  document.body.appendChild(link);
  link.click();
  link.parentNode!.removeChild(link);
}

export const generateGoogleCalendarURL = (appointmentDetails: AppointmentDetailsType) => {
  const {
    appointmentDate,
    appointmentLocation,
    appointmentCity,
  } = appointmentDetails;
  const appointmentDuration = { hours: 6, minutes: 0 }

  const startDateTime = new Date(appointmentDate);
  const endDateTime = new Date(
    startDateTime.getTime() +
      appointmentDuration.hours * 60 * 60 * 1000 +
      appointmentDuration.minutes * 60 * 1000
  );

  const startDate = startDateTime.toISOString().replace(/-|:|\.\d+/g, '');
  const endDate = endDateTime.toISOString().replace(/-|:|\.\d+/g, '');

  const title = encodeURIComponent('Four of Foes Tattoo Appointment');
  const description = encodeURIComponent(
    `Your tattoo appointment with Ted Faulmann at ${appointmentLocation} in ${appointmentCity} on ${format(
      startDateTime,
      'EEEE, MMMM d, yyyy'
    )}`
  );
  const location = encodeURIComponent(`${appointmentLocation}, ${appointmentCity}`);

  const googleCalendarURL = `https://www.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${startDate}/${endDate}&details=${description}&location=${location}&sprop=website:https://www.fouroffoes.com&sprop=name:Four%20of%20Foes&add=info@fouroffoes.com`;

  return googleCalendarURL;
};
