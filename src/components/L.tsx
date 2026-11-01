import type { LucideIcon, LucideProps } from 'lucide-react'
import { ArrowUpRight, Bell, BookOpen, CalendarClock, Check, Coins, Eye, EyeOff, Gift, Image, KeyRound, MessageSquare, Mic, Paperclip, Play, Search, Sparkles, Ticket, TriangleAlert, Video, Wallet, X } from 'lucide-react'

/** Lucide icons referenced by name from the reconstructed markup. */
const ICONS: Record<string, LucideIcon> = {
  'arrow-up-right': ArrowUpRight,
  'bell': Bell,
  'book-open': BookOpen,
  'calendar-clock': CalendarClock,
  'check': Check,
  'coins': Coins,
  'eye': Eye,
  'eye-off': EyeOff,
  'gift': Gift,
  'image': Image,
  'key-round': KeyRound,
  'message-square': MessageSquare,
  'mic': Mic,
  'paperclip': Paperclip,
  'play': Play,
  'search': Search,
  'sparkles': Sparkles,
  'ticket': Ticket,
  'triangle-alert': TriangleAlert,
  'video': Video,
  'wallet': Wallet,
  'x': X,
}

export function L({ n, ...props }: { n: string } & LucideProps) {
  const Icon = ICONS[n]
  return Icon ? <Icon {...props} /> : null
}
