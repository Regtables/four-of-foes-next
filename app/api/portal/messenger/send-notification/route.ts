import { NextResponse } from 'next/server';
import { Resend } from 'resend';

export async function POST(request: Request) {
  const body = await request.json();
  const { client, isAdmin } = body;


  console.log('sending message')
  try {
    const resend = new Resend(process.env.RESEND_API_KEY);

    if (isAdmin) {
      await resend.emails.send({
        from: 'Four of Foes <reg@regtables.com>',
        to: client.email,
        subject: 'You have received a new message from Ted Faulmann on the Four of Foes Patron Lounge',
        html: `
          <p>Hello ${client.clientName},</p>
          <br />
          <p>You have received a message from your tattoo artist regarding your appointment.</p>
          <a href="https://www.fouroffoes.com/portal/auth/${client._id}">
            <p>Click this link to go to your Patron lounge and view the message.</p>
          </a>
        `,
      });
    } else if(!isAdmin) {
      await resend.emails.send({
        from: 'Four of Foes <reg@regtables.com>',
        to: 'info@poetscxrner.com',
        subject: `You have received a new message from your client, ${client.clientName} on the Four of Foes Patron Lounge`,
        html: `
          <a href="https://www.fouroffoes.com/portal/messenger-dashboard/${client._id}">
            <p>Click this link to go to the messenger chat.</p>
          </a>
        `,
      });
    }

    return new NextResponse('Notification sent', { status: 200 });
  } catch (error) {
    console.log(error);
    return new NextResponse(`Internal Error ${error}`, { status: 500 });
  }
}