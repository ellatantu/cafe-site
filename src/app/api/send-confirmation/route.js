import { Resend } from 'resend'
import { NextResponse } from 'next/server'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(request) {
  const { email, name, date, time, party_size, status } = await request.json()

  const subject = status === 'confirmed'
    ? 'Your reservation is confirmed!'
    : 'Update on your reservation request'

  const html = status === 'confirmed'
    ? `<p>Hi ${name},</p><p>Great news — your reservation for ${party_size} on ${date} at ${time} is confirmed. We look forward to seeing you!</p><p>— Northstar Café</p>`
    : `<p>Hi ${name},</p><p>Unfortunately we're unable to accommodate your reservation request for ${date} at ${time}. Please reach out if you'd like to try a different time.</p><p>— Northstar Café</p>`

  try {
    await resend.emails.send({
      from: 'Northstar Café <onboarding@resend.dev>',
      to: email,
      subject,
      html
    })
    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 })
  }
}