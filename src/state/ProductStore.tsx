import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from 'react'
import { initialProducts } from '../data/products'
import type { Product, StockHistoryEntry } from '../types/product'

type Toast = { id: number; message: string; kind: 'success' | 'error' }
type ProductStoreValue = {
  products: Product[]; history: StockHistoryEntry[]; toasts: Toast[]
  addProduct: (product: Omit<Product, 'id' | 'createdAt' | 'updatedAt'>) => void
  addProducts: (products: Array<Omit<Product, 'id' | 'createdAt' | 'updatedAt'>>) => void
  updateProduct: (product: Product) => void; deleteProduct: (id: string) => void
  adjustStock: (id: string, nextStock: number, reason: string) => void
  notify: (message: string, kind?: Toast['kind']) => void; dismissToast: (id: number) => void
}
const ProductStoreContext = createContext<ProductStoreValue | null>(null)
export function ProductStoreProvider({ children }: { children: ReactNode }) {
  const [products, setProducts] = useState(initialProducts)
  const [history, setHistory] = useState<StockHistoryEntry[]>([])
  const [toasts, setToasts] = useState<Toast[]>([])
  const notify = useCallback((message: string, kind: Toast['kind'] = 'success') => {
    const id = Date.now() + Math.random()
    setToasts(current => [...current, { id, message, kind }])
    window.setTimeout(() => setToasts(current => current.filter(toast => toast.id !== id)), 3600)
  }, [])
  const addProduct = useCallback((data: Omit<Product, 'id' | 'createdAt' | 'updatedAt'>) => {
    const today = new Date().toISOString().slice(0, 10)
    setProducts(current => [{ ...data, id: `prd-${Date.now()}`, createdAt: today, updatedAt: today }, ...current])
    notify('Product added to your catalogue')
  }, [notify])
  const addProducts = useCallback((items: Array<Omit<Product, 'id' | 'createdAt' | 'updatedAt'>>) => {
    const today = new Date().toISOString().slice(0, 10)
    const timestamp = Date.now()
    setProducts(current => [...items.map((item, index) => ({ ...item, id: `prd-${timestamp}-${index}`, createdAt: today, updatedAt: today })), ...current])
    if (items.length) notify(`${items.length} product${items.length === 1 ? '' : 's'} imported`)
  }, [notify])
  const updateProduct = useCallback((updated: Product) => {
    const today = new Date().toISOString().slice(0, 10)
    setProducts(current => current.map(product => product.id === updated.id ? { ...updated, updatedAt: today } : product))
    notify('Product details saved')
  }, [notify])
  const deleteProduct = useCallback((id: string) => {
    const product = products.find(item => item.id === id)
    setProducts(current => current.filter(item => item.id !== id))
    if (product) notify(`${product.name} removed from products`)
  }, [notify, products])
  const adjustStock = useCallback((id: string, nextStock: number, reason: string) => {
    const product = products.find(item => item.id === id)
    if (!product) return
    setProducts(current => current.map(item => item.id === id ? { ...item, stock: nextStock, updatedAt: new Date().toISOString().slice(0, 10) } : item))
    setHistory(current => [{ id: `stk-${Date.now()}`, productId: id, previousStock: product.stock, change: nextStock - product.stock, nextStock, reason, date: new Date().toISOString() }, ...current])
    notify(`Stock updated for ${product.name}`)
  }, [notify, products])
  const dismissToast = useCallback((id: number) => setToasts(current => current.filter(toast => toast.id !== id)), [])
  const value = useMemo(() => ({ products, history, toasts, addProduct, addProducts, updateProduct, deleteProduct, adjustStock, notify, dismissToast }), [products, history, toasts, addProduct, addProducts, updateProduct, deleteProduct, adjustStock, notify, dismissToast])
  return <ProductStoreContext.Provider value={value}>{children}</ProductStoreContext.Provider>
}
export function useProductStore() {
  const value = useContext(ProductStoreContext)
  if (!value) throw new Error('useProductStore must be used within ProductStoreProvider')
  return value
}
