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
  message?: string
}

const ContactConfirmationEmail = ({ name, message }: Props) => (
  <Html lang="en" dir="ltr">
    <Head />
    <Preview>We have received your message — {BRAND}</Preview>
    <Body style={main}>
      <Container style={container}>
        <Section style={header}>
          <Text style={brandMark}>{BRAND}</Text>
        </Section>

        <Heading style={h1}>{name ? `Dear ${name},` : 'Dear Guest,'}</Heading>
        <Text style={text}>
          Thank you for contacting {BRAND}. We have received your message and
          our concierge team will reply within two business hours.
        </Text>
        <Text style={text}>
          For urgent enquiries, you may also reach us on WhatsApp at
          +20 150 704 0949.
        </Text>

        {message && (
          <Section style={card}>
            <Text style={cardLabel}>Your message</Text>
            <Text style={cardBody}>{message}</Text>
          </Section>
        )}

        <Hr style={hr} />
        <Text style={footer}>
          {BRAND} · Cairo · Paris<br />
          A discreet, bespoke chauffeur service.
        </Text>
      </Container>
    </Body>
  </Html>
)

export const template = {
  component: ContactConfirmationEmail,
  subject: 'We have received your message',
  displayName: 'Contact confirmation (client)',
  previewData: {
    name: 'Alexandre',
    message: 'Bonjour, je souhaite organiser un transfert depuis Roissy.',
  },
} satisfies TemplateEntry

const main = { backgroundColor: '#ffffff', fontFamily: 'Georgia, "Times New Roman", serif', margin: 0, padding: 0 }
const container = { maxWidth: '560px', margin: '0 auto', padding: '32px 28px' }
const header = { borderBottom: `1px solid ${GOLD}`, paddingBottom: '16px', marginBottom: '28px' }
const brandMark = { fontSize: '14px', letterSpacing: '4px', textTransform: 'uppercase' as const, color: INK, fontWeight: 600, margin: 0, fontFamily: 'Arial, sans-serif' }
const h1 = { fontSize: '22px', fontWeight: 400, color: INK, margin: '0 0 18px' }
const text = { fontSize: '15px', color: '#3a3a3a', lineHeight: '1.6', margin: '0 0 16px', fontFamily: 'Arial, sans-serif' }
const card = { backgroundColor: '#f6f3ec', color: INK, padding: '18px 20px', margin: '20px 0 24px', borderLeft: `3px solid ${GOLD}` }
const cardLabel = { fontSize: '11px', letterSpacing: '2px', textTransform: 'uppercase' as const, color: GOLD, margin: '0 0 8px', fontFamily: 'Arial, sans-serif' }
const cardBody = { fontSize: '14px', color: INK, margin: 0, lineHeight: '1.6', fontFamily: 'Arial, sans-serif', whiteSpace: 'pre-wrap' as const }
const hr = { borderColor: '#eaeaea', margin: '28px 0 16px' }
const footer = { fontSize: '12px', color: '#999999', margin: 0, lineHeight: '1.6', fontFamily: 'Arial, sans-serif' }