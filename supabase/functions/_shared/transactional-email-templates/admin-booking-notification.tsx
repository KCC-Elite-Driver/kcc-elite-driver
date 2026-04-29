import * as React from 'npm:react@18.3.1'
import {
  Body, Container, Head, Heading, Hr, Html, Preview, Section, Text,
} from 'npm:@react-email/components@0.0.22'
import type { TemplateEntry } from './registry.ts'

const BRAND = 'KCC EliteDriver'
const GOLD = '#C5A059'
const INK = '#050505'

interface Props {
  reservationId?: string
  firstname?: string
  lastname?: string
  email?: string
  phone?: string
  service?: string
  pickup?: string
  dropoff?: string
  date?: string
  time?: string
  vehicle?: string
  passengers?: number | string
  luggage?: number | string
  flightNumber?: string
  notes?: string
  estimatedPrice?: string
}

const AdminBookingNotificationEmail = ({
  reservationId, firstname, lastname, email, phone, service, pickup, dropoff,
  date, time, vehicle, passengers, luggage, flightNumber, notes, estimatedPrice,
}: Props) => {
  const fullName = [firstname, lastname].filter(Boolean).join(' ') || 'New client'
  return (
    <Html lang="en" dir="ltr">
      <Head />
      <Preview>New reservation request — {fullName}</Preview>
      <Body style={main}>
        <Container style={container}>
          <Section style={header}>
            <Text style={brandMark}>{BRAND} · ADMIN</Text>
          </Section>

          <Heading style={h1}>New reservation received</Heading>
          <Text style={text}>
            A new reservation request has just been submitted and requires
            your review.
          </Text>

          {reservationId && (
            <Section style={card}>
              <Text style={cardLabel}>Reservation</Text>
              <Text style={cardValue}>{reservationId}</Text>
            </Section>
          )}

          <Heading as="h2" style={h2}>Client</Heading>
          <Section style={detailsBox}>
            <Row label="Name" value={fullName} />
            {email && <Row label="Email" value={email} />}
            {phone && <Row label="Phone" value={phone} />}
          </Section>

          <Heading as="h2" style={h2}>Trip</Heading>
          <Section style={detailsBox}>
            {service && <Row label="Service" value={service} />}
            {vehicle && <Row label="Vehicle" value={vehicle} />}
            {pickup && <Row label="Pickup" value={pickup} />}
            {dropoff && <Row label="Drop-off" value={dropoff} />}
            {date && <Row label="Date" value={time ? `${date} · ${time}` : date} />}
            {passengers !== undefined && <Row label="Passengers" value={String(passengers)} />}
            {luggage !== undefined && <Row label="Luggage" value={String(luggage)} />}
            {flightNumber && <Row label="Flight" value={flightNumber} />}
            {estimatedPrice && <Row label="Estimated price" value={estimatedPrice} />}
          </Section>

          {notes && (
            <>
              <Heading as="h2" style={h2}>Client notes</Heading>
              <Text style={notesBox}>{notes}</Text>
            </>
          )}

          <Hr style={hr} />
          <Text style={footer}>
            Manage this reservation from the {BRAND} admin dashboard.
          </Text>
        </Container>
      </Body>
    </Html>
  )
}

const Row = ({ label, value }: { label: string; value: string }) => (
  <table style={{ width: '100%', borderCollapse: 'collapse', margin: '0 0 8px' }}>
    <tbody>
      <tr>
        <td style={rowLabel}>{label}</td>
        <td style={rowValue}>{value}</td>
      </tr>
    </tbody>
  </table>
)

export const template = {
  component: AdminBookingNotificationEmail,
  subject: (data: Record<string, any>) =>
    `New reservation — ${[data.firstname, data.lastname].filter(Boolean).join(' ') || 'client'}`,
  displayName: 'Admin: new booking notification',
  to: 'admin@kccelitedriver.com',
  previewData: {
    reservationId: 'RES-20260429-A1B',
    firstname: 'Alexandre',
    lastname: 'Durand',
    email: 'alexandre@example.com',
    phone: '+33 6 00 00 00 00',
    service: 'Airport transfer',
    pickup: 'Cairo International Airport',
    dropoff: 'The Nile Ritz-Carlton',
    date: '2026-05-12',
    time: '14:30',
    vehicle: 'Mercedes S-Class',
    passengers: 2,
    luggage: 3,
    flightNumber: 'AF1690',
    notes: 'Please provide a child seat.',
    estimatedPrice: '€ 180',
  },
} satisfies TemplateEntry

const main = { backgroundColor: '#ffffff', fontFamily: 'Georgia, "Times New Roman", serif', margin: 0, padding: 0 }
const container = { maxWidth: '600px', margin: '0 auto', padding: '32px 28px' }
const header = { borderBottom: `1px solid ${GOLD}`, paddingBottom: '16px', marginBottom: '28px' }
const brandMark = { fontSize: '13px', letterSpacing: '4px', textTransform: 'uppercase' as const, color: INK, fontWeight: 600, margin: 0, fontFamily: 'Arial, sans-serif' }
const h1 = { fontSize: '22px', fontWeight: 400, color: INK, margin: '0 0 14px' }
const h2 = { fontSize: '13px', fontWeight: 600, color: GOLD, margin: '24px 0 8px', letterSpacing: '2px', textTransform: 'uppercase' as const, fontFamily: 'Arial, sans-serif' }
const text = { fontSize: '15px', color: '#3a3a3a', lineHeight: '1.6', margin: '0 0 16px', fontFamily: 'Arial, sans-serif' }
const card = { backgroundColor: INK, color: '#ffffff', padding: '18px 20px', margin: '24px 0', borderLeft: `3px solid ${GOLD}` }
const cardLabel = { fontSize: '11px', letterSpacing: '2px', textTransform: 'uppercase' as const, color: GOLD, margin: '0 0 4px', fontFamily: 'Arial, sans-serif' }
const cardValue = { fontSize: '18px', color: '#ffffff', margin: 0, fontFamily: 'Arial, sans-serif', fontWeight: 600 }
const detailsBox = { padding: '8px 0', margin: '0 0 8px' }
const rowLabel = { fontSize: '12px', color: '#888', textTransform: 'uppercase' as const, letterSpacing: '1px', padding: '6px 0', width: '35%', verticalAlign: 'top' as const, fontFamily: 'Arial, sans-serif' }
const rowValue = { fontSize: '14px', color: INK, padding: '6px 0', fontFamily: 'Arial, sans-serif' }
const notesBox = { fontSize: '14px', color: INK, padding: '12px 14px', backgroundColor: '#f7f4ee', borderLeft: `3px solid ${GOLD}`, margin: '0 0 16px', fontFamily: 'Arial, sans-serif', lineHeight: '1.6', whiteSpace: 'pre-wrap' as const }
const hr = { borderColor: '#eaeaea', margin: '28px 0 16px' }
const footer = { fontSize: '12px', color: '#999999', margin: 0, lineHeight: '1.6', fontFamily: 'Arial, sans-serif' }