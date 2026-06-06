/// <reference types="npm:@types/react@18.3.1" />
import * as React from 'npm:react@18.3.1'

export interface TemplateEntry {
  component: React.ComponentType<any>
  subject: string | ((data: Record<string, any>) => string)
  to?: string
  displayName?: string
  previewData?: Record<string, any>
}

import { template as bookingReceived } from './booking-received.tsx'
import { template as bookingConfirmed } from './booking-confirmed.tsx'
import { template as adminBookingNotification } from './admin-booking-notification.tsx'
import { template as contactMessage } from './contact-message.tsx'
import { template as contactConfirmation } from './contact-confirmation.tsx'

export const TEMPLATES: Record<string, TemplateEntry> = {
  'booking-received': bookingReceived,
  'booking-confirmed': bookingConfirmed,
  'admin-booking-notification': adminBookingNotification,
  'contact-message': contactMessage,
  'contact-confirmation': contactConfirmation,
}