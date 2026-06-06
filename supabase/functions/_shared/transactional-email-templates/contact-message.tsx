import * as React from 'npm:react@18.3.1'
import {
  Body, Container, Head, Heading, Hr, Html, Preview, Section, Text,
} from 'npm:@react-email/components@0.0.22'
import type { TemplateEntry } from './registry.ts'

const BRAND = 'KCC EliteDriver'
const GOLD = '#C5A059'
const INK = '#050505'

interface Props {
  name?: string
  email?: string
  phone?: string
  service?: string
  message?: string
}

const ContactMessageEmail = ({ name, email, phone, service, message }: Props) => (
  <Html lang="en" dir="ltr">
    <Head />
    <Preview>New contact message — {name || 'Anonymous'}</Preview>
    <Body style={main}>
      <Container style={container}>
        <Section style={header}>
          <Text style={brandMark}>{BRAND} · CONTACT</Text>
        </Section>

        <Heading style={h1}>New contact form submission</Heading>
        <Text style={text}>
          A visitor has submitted the contact form on the website.
        </Text>

        <Section style={detailsBox}>
          {name && <Row label="Name" value={name} />}
          {email && <Row label="Email" value={email} />}
          {phone && <Row label="Phone" value={phone} />}
          {service && <Row label="Service" value={service} />}
        </Section>

        {message && (
          <Section style={card}>
            <Text style={cardLabel}>Message</Text>
            <Text style={cardBody}>{message}</Text>
          </Section>
        )}

        <Hr style={hr} />
        <Text style={footer}>
          {BRAND} · Cairo · Paris
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
  component: ContactMessageEmail,
  subject: (data: Record<string, any>) =>
    `Contact: ${data.name || 'New message'}${data.service ? ` · ${data.service}` : ''}`,
  to: 'contact@kccelitedriver.com',
  displayName: 'Contact form (admin)',
  previewData: {
    name: 'Alexandre Dupont',
    email: 'alexandre@example.com',
    phone: '+33 6 12 34 56 78',
    service: 'Airport transfer',
    message: 'Bonjour, je souhaite organiser un transfert depuis Roissy.',
  },
} satisfies TemplateEntry

const main = { backgroundColor: '#ffffff', fontFamily: 'Georgia, "Times New Roman", serif', margin: 0, padding: 0 }
const container = { maxWidth: '560px', margin: '0 auto', padding: '32px 28px' }
const header = { borderBottom: `1px solid ${GOLD}`, paddingBottom: '16px', marginBottom: '28px' }
const brandMark = { fontSize: '14px', letterSpacing: '4px', textTransform: 'uppercase' as const, color: INK, fontWeight: 600, margin: 0, fontFamily: 'Arial, sans-serif' }
const h1 = { fontSize: '22px', fontWeight: 400, color: INK, margin: '0 0 18px' }
const text = { fontSize: '15px', color: '#3a3a3a', lineHeight: '1.6', margin: '0 0 16px', fontFamily: 'Arial, sans-serif' }
const detailsBox = { padding: '8px 0', margin: '12px 0 16px' }
const rowLabel = { fontSize: '12px', color: '#888', textTransform: 'uppercase' as const, letterSpacing: '1px', padding: '6px 0', width: '30%', verticalAlign: 'top' as const, fontFamily: 'Arial, sans-serif' }
const rowValue = { fontSize: '14px', color: INK, padding: '6px 0', fontFamily: 'Arial, sans-serif' }
const card = { backgroundColor: INK, color: '#ffffff', padding: '18px 20px', margin: '12px 0 24px', borderLeft: `3px solid ${GOLD}` }
const cardLabel = { fontSize: '11px', letterSpacing: '2px', textTransform: 'uppercase' as const, color: GOLD, margin: '0 0 8px', fontFamily: 'Arial, sans-serif' }
const cardBody = { fontSize: '14px', color: '#ffffff', margin: 0, lineHeight: '1.6', fontFamily: 'Arial, sans-serif', whiteSpace: 'pre-wrap' as const }
const hr = { borderColor: '#eaeaea', margin: '28px 0 16px' }
const footer = { fontSize: '12px', color: '#999999', margin: 0, lineHeight: '1.6', fontFamily: 'Arial, sans-serif' }