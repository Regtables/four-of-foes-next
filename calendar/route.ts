// import { NextResponse } from "next/server";
// import { EventStatus, createEvent } from 'ics'

// import { protect } from "@/middleware/authMiddleware";
// import { format } from "date-fns";

// export async function GET(req: Request) {
//   // try{
//   //   const client = await protect(req)
  
//   //   if(client){
//   //     const { appointmentDetails: { appointmentDate: date, appointmentCity, appointmentLocation } } = client
//   //     const appointmentDate = new Date(date)

//   //     const event = {
//   //       start: [
//   //         appointmentDate.getFullYear(),
//   //         appointmentDate.getMonth() + 1,
//   //         appointmentDate.getDate(),
//   //         appointmentDate.getHours(),
//   //         appointmentDate.getMinutes()
//   //       ] as [number, number, number, number, number],
//   //       duration: { hours: 6, minutes: 0 },
//   //       title: 'Four of Foes Tattoo Appointment',
//   //       description: `Your tattoo appointment with Ted Faulmann at ${appointmentLocation} in ${appointmentCity} on the ${format(new Date(appointmentDate), 'dddd MMMM yyyy')}`,
//   //       location: `${appointmentLocation}, ${appointmentCity}`,
//   //       url: 'https://www.fouroffoes.com',
//   //       organizer: { name: 'Four of Foes', email: 'info@fouroffoes.com' },
//   //       status: 'CONFIRMED' as EventStatus
//   //     }

//   //     const { error, value } = createEvent(event)

//   //     if(error){
//   //       console.log(`Error creating the event: ${error.message}`)
//   //       return NextResponse.json({ error: 'Failed to generate ISC file' }, { status: 500 })
//   //     }

//   //     return new NextResponse(value, 
//   //       { headers: 
//   //         { 
//   //           'Content-Type': 'text/calendar',
//   //           'Content-Disposition': 'attachment; filename="tattoo-appointment.ics"'
//   //         }
//   //       })
//   //   }

//   // } catch (error){
//   //   console.log(error)

//   //   return NextResponse.json({ error: `Internal Server Error: ${error}`}, { status: 500 })
//   // }
// }