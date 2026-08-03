import { contactInfo } from './data'

export function buildWhatsAppUrl(message: string) {
  return `https://wa.me/${contactInfo.whatsappNumber}?text=${encodeURIComponent(message)}`
}
