export type Order = { id: string; customer: string; initials: string; product: string; amount: number; payment: 'Paid' | 'Pending' | 'Refunded'; status: 'Delivered' | 'Processing' | 'Ready' | 'Cancelled'; date: string; tone: string }

export const salesData = [
  { day: 'Mon', revenue: 28400, orders: 12 }, { day: 'Tue', revenue: 36200, orders: 16 },
  { day: 'Wed', revenue: 31800, orders: 14 }, { day: 'Thu', revenue: 42100, orders: 19 },
  { day: 'Fri', revenue: 38700, orders: 17 }, { day: 'Sat', revenue: 52600, orders: 24 },
  { day: 'Sun', revenue: 46800, orders: 21 },
]

export const orders: Order[] = [
  { id: '#MS-2048', customer: 'Aarav Sharma', initials: 'AS', product: 'iPhone 15 · 128GB', amount: 72999, payment: 'Paid', status: 'Processing', date: 'Today, 10:42 AM', tone: 'blue' },
  { id: '#MS-2047', customer: 'Priya Patel', initials: 'PP', product: 'Samsung Galaxy S24', amount: 68999, payment: 'Paid', status: 'Ready', date: 'Today, 10:18 AM', tone: 'violet' },
  { id: '#MS-2046', customer: 'Rohan Mehta', initials: 'RM', product: 'OnePlus 12 · 256GB', amount: 64999, payment: 'Pending', status: 'Processing', date: 'Today, 9:56 AM', tone: 'amber' },
  { id: '#MS-2045', customer: 'Ananya Rao', initials: 'AR', product: 'Nothing Phone (2a)', amount: 23999, payment: 'Paid', status: 'Delivered', date: 'Today, 9:21 AM', tone: 'rose' },
]

export const repairs = [
  { id: 'RP-0084', name: 'Vikram Singh', device: 'iPhone 13', issue: 'Screen replacement', status: 'In progress', color: 'blue', due: 'Today, 4:30 PM' },
  { id: 'RP-0083', name: 'Meera Iyer', device: 'Samsung A54', issue: 'Battery replacement', status: 'Ready for pickup', color: 'green', due: 'Ready since 11:20 AM' },
  { id: 'RP-0082', name: 'Kabir Khan', device: 'OnePlus Nord 3', issue: 'Charging port repair', status: 'New request', color: 'orange', due: 'Received 10:05 AM' },
]

export const lowStock = [
  { name: 'Apple 20W USB-C Adapter', sku: 'ACC-2041', stock: 2, min: 8, color: 'red' },
  { name: 'Samsung Galaxy Buds FE', sku: 'ACC-1087', stock: 4, min: 10, color: 'orange' },
  { name: 'OnePlus Nord CE 4 · 8/128GB', sku: 'PHN-0312', stock: 3, min: 6, color: 'orange' },
]
