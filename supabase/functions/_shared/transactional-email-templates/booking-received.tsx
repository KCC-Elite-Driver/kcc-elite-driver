import * as React from 'npm:react@18.3.1'
import {
  Body, Container, Head, Heading, Hr, Html, Preview, Section, Text,
} from 'npm:@react-email/components@0.0.22'
import type { TemplateEntry } from './registry.ts'

const BRAND = 'KCC EliteDriver'
const GOLD = '#C5A059'
const INK = '#050505'

interface Props {
  firstname?: string
  reservationId?: string
  service?: string
  pickup?: string
  dropoff?: string
  date?: string
  time?: string
  vehicle?: string
}

const BookingReceivedEmail = ({
  firstname, reservationId, service, pickup, dropoff, date, time, vehicle,
}: Props) => (
  <Html lang="en" dir="ltr">
    <Head />
    <Preview>We have received your reservation request — {BRAND}</Preview>
    <Body style={main}>
      <Container style={container}>
        <Section style={header}>
          <Text style={brandMark}>{BRAND}</Text>
        </Section>

        <Heading style={h1}>
          {firstname ? `Dear ${firstname},` : 'Dear Guest,'}
        </Heading>
        <Text style={text}>
          Thank you for choosing {BRAND}. We have received your reservation
          request and our concierge team is reviewing the details.
        </Text>
        <Text style={text}>
          You will receive a separate confirmation once your chauffeur has
          been assigned.
        </Text>

        {reservationId && (
          <Section style={card}>
            <Text style={cardLabel}>Reservation</Text>
            <Text style={cardValue}>{reservationId}</Text>
          </Section>
        )}

        <Section style={detailsBox}>
          {service && <Row label="Service" value={service} />}
          {vehicle && <Row label="Vehicle" value={vehicle} />}
          {pickup && <Row label="Pickup" value={pickup} />}
          {dropoff && <Row label="Drop-off" value={dropoff} />}
          {date && <Row label="Date" value={time ? `${date} · ${time}` : date} />}
        </Section>

        <Hr style={hr} />
        <Text style={footer}>
          {BRAND} · Cairo · Paris<br />
          A discreet, bespoke chauffeur service.
        </Text>
      </Container>
    </Body>
  </Html>
)

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
  component: BookingReceivedEmail,
  subject: 'We have received your reservation request',
  displayName: 'Booking received (client)',
  previewData: {
    firstname: 'Alexandre',
    reservationId: 'RES-20260429-A1B',
    service: 'Airport transfer',
    pickup: 'Cairo International Airport',
    dropoff: 'The Nile Ritz-Carlton',
    date: '2026-05-12',
    time: '14:30',
    vehicle: 'Mercedes S-Class',
  },
} satisfies TemplateEntry

const main = { backgroundColor: '#ffffff', fontFamily: 'Georgia, "Times New Roman", serif', margin: 0, padding: 0 }
const container = { maxWidth: '560px', margin: '0 auto', padding: '32px 28px' }
const header = { borderBottom: `1px solid ${GOLD}`, paddingBottom: '16px', marginBottom: '28px' }
const brandMark = { fontSize: '14px', letterSpacing: '4px', textTransform: 'uppercase' as const, color: INK, fontWeight: 600, margin: 0, fontFamily: 'Arial, sans-serif' }
const h1 = { fontSize: '22px', fontWeight: 400, color: INK, margin: '0 0 18px' }
const text = { fontSize: '15px', color: '#3a3a3a', lineHeight: '1.6', margin: '0 0 16px', fontFamily: 'Arial, sans-serif' }
const card = { backgroundColor: INK, color: '#ffffff', padding: '18px 20px', margin: '24px 0', borderLeft: `3px solid ${GOLD}` }
const cardLabel = { fontSize: '11px', letterSpacing: '2px', textTransform: 'uppercase' as const, color: GOLD, margin: '0 0 4px', fontFamily: 'Arial, sans-serif' }
const cardValue = { fontSize: '18px', color: '#ffffff', margin: 0, fontFamily: 'Arial, sans-serif', fontWeight: 600 }
const detailsBox = { padding: '16px 0', margin: '12px 0 24px' }
const rowLabel = { fontSize: '12px', color: '#888', textTransform: 'uppercase' as const, letterSpacing: '1px', padding: '6px 0', width: '35%', verticalAlign: 'top' as const, fontFamily: 'Arial, sans-serif' }
const rowValue = { fontSize: '14px', color: INK, padding: '6px 0', fontFamily: 'Arial, sans-serif' }
const hr = { borderColor: '#eaeaea', margin: '28px 0 16px' }
const footer = { fontSize: '12px', color: '#999999', margin: 0, lineHeight: '1.6', fontFamily: 'Arial, sans-serif' }