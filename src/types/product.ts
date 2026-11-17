export const productCategories = ['Smartphones', 'Mobile Accessories', 'Chargers', 'Earphones', 'Mobile Covers', 'Screen Protectors', 'Smart Watches', 'Power Banks', 'Other Accessories'] as const
export type ProductCategory = typeof productCategories[number]
export type ProductStatus = 'Active' | 'Draft' | 'Archived'
export type Product = {
  id: string; name: string; brand: string; category: ProductCategory; description: string; image: string
  sellingPrice: number; purchasePrice: number; sku: string; stock: number; minimumStock: number
  status: ProductStatus; featured: boolean; createdAt: string; updatedAt: string
}
export type StockHistoryEntry = { id: string; productId: string; previousStock: number; change: number; nextStock: number; reason: string; date: string }
export type StockStatus = 'In Stock' | 'Low Stock' | 'Out of Stock'
export function getStockStatus(quantity: number, minimum: number): StockStatus {
  if (quantity === 0) return 'Out of Stock'
  if (quantity <= minimum) return 'Low Stock'
  return 'In Stock'
}
