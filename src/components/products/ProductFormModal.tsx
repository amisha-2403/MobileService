import { useEffect, useState, type FormEvent, type ReactNode } from 'react'
import { Check, ImagePlus, X } from 'lucide-react'
import { productCategories, type Product, type ProductCategory, type ProductStatus } from '../../types/product'
import { useProductStore } from '../../state/ProductStore'

type Draft = Omit<Product, 'id' | 'createdAt' | 'updatedAt'>
const blankDraft: Draft = { name: '', brand: '', category: 'Smartphones', description: '', image: '', sellingPrice: 0, purchasePrice: 0, sku: '', stock: 0, minimumStock: 3, status: 'Active', featured: false }
export default function ProductFormModal({ product, onClose }: { product?: Product; onClose: () => void }) {
  const { addProduct, updateProduct, products, notify } = useProductStore()
  const [draft, setDraft] = useState<Draft>(product ? { name: product.name, brand: product.brand, category: product.category, description: product.description, image: product.image, sellingPrice: product.sellingPrice, purchasePrice: product.purchasePrice, sku: product.sku, stock: product.stock, minimumStock: product.minimumStock, status: product.status, featured: product.featured } : blankDraft)
  const [errors, setErrors] = useState<Record<string, string>>({})
  useEffect(() => { const onKey = (event: KeyboardEvent) => { if (event.key === 'Escape') onClose() }; window.addEventListener('keydown', onKey); return () => window.removeEventListener('keydown', onKey) }, [onClose])
  const set = (key: keyof Draft, value: string | number | boolean) => { setDraft(current => ({ ...current, [key]: value })); setErrors(current => ({ ...current, [key]: '' })) }
  const submit = (event: FormEvent) => {
    event.preventDefault()
    const next: Record<string, string> = {}
    if (!draft.name.trim()) next.name = 'Enter a product name'
    if (!draft.brand.trim()) next.brand = 'Enter a brand'
    if (!draft.sku.trim()) next.sku = 'Enter a SKU'
    if (!draft.category) next.category = 'Choose a category'
    if (draft.sellingPrice < 0) next.sellingPrice = 'Price cannot be negative'
    if (draft.purchasePrice < 0) next.purchasePrice = 'Price cannot be negative'
    if (draft.stock < 0) next.stock = 'Stock cannot be negative'
    if (draft.minimumStock < 0) next.minimumStock = 'Minimum stock cannot be negative'
    if (products.some(item => item.sku.toLowerCase() === draft.sku.trim().toLowerCase() && item.id !== product?.id)) next.sku = 'This SKU is already in use'
    if (Object.keys(next).length) { setErrors(next); notify('Please fix the highlighted fields', 'error'); return }
    if (product) updateProduct({ ...draft, name: draft.name.trim(), brand: draft.brand.trim(), sku: draft.sku.trim(), id: product.id, createdAt: product.createdAt, updatedAt: product.updatedAt })
    else addProduct({ ...draft, name: draft.name.trim(), brand: draft.brand.trim(), sku: draft.sku.trim() })
    onClose()
  }
  const field = (key: string, label: string, child: ReactNode, required = false) => <label className="form-field" key={key}><span>{label}{required && <b> *</b>}</span>{child}{errors[key] && <small className="field-error">{errors[key]}</small>}</label>
  return <div className="modal-backdrop" onMouseDown={event => { if (event.target === event.currentTarget) onClose() }}><section className="form-drawer" role="dialog" aria-modal="true" aria-labelledby="product-form-title"><div className="drawer-head"><div><span className="drawer-kicker">PRODUCT CATALOGUE</span><h2 id="product-form-title">{product ? 'Edit product' : 'Add a product'}</h2><p>Fill in the details below to manage this item.</p></div><button className="icon-btn" onClick={onClose} aria-label="Close product form"><X size={19} /></button></div><form onSubmit={submit} noValidate><div className="drawer-body"><div className="form-section"><h3>Basic information</h3><div className="form-grid">{field('name','Product name',<input autoFocus value={draft.name} onChange={e => set('name',e.target.value)} placeholder="e.g. iPhone 15" />,true)}{field('brand','Brand',<input value={draft.brand} onChange={e => set('brand',e.target.value)} placeholder="e.g. Apple" />,true)}{field('category','Category',<select value={draft.category} onChange={e => set('category',e.target.value as ProductCategory)}>{productCategories.map(category => <option key={category}>{category}</option>)}</select>,true)}{field('sku','SKU',<input value={draft.sku} onChange={e => set('sku',e.target.value)} placeholder="e.g. APL-IP15-128" />,true)}<label className="form-field full-field"><span>Product description</span><textarea value={draft.description} onChange={e => set('description',e.target.value)} rows={3} placeholder="Add key details about this product" /></label><label className="form-field full-field"><span>Product image URL</span><div className="input-with-icon"><ImagePlus size={16} /><input value={draft.image} onChange={e => set('image',e.target.value)} placeholder="https://..." /></div></label></div></div><div className="form-section"><h3>Pricing & stock</h3><div className="form-grid">{field('sellingPrice','Selling price (₹)',<input type="number" min="0" value={draft.sellingPrice} onChange={e => set('sellingPrice',Number(e.target.value))} />,true)}{field('purchasePrice','Purchase price (₹)',<input type="number" min="0" value={draft.purchasePrice} onChange={e => set('purchasePrice',Number(e.target.value))} />,true)}{field('stock','Stock quantity',<input type="number" min="0" value={draft.stock} onChange={e => set('stock',Number(e.target.value))} />,true)}{field('minimumStock','Minimum stock level',<input type="number" min="0" value={draft.minimumStock} onChange={e => set('minimumStock',Number(e.target.value))} />,true)}</div></div><div className="form-section form-last"><h3>Product settings</h3><div className="form-grid"><label className="form-field"><span>Product status</span><select value={draft.status} onChange={e => set('status',e.target.value as ProductStatus)}><option>Active</option><option>Draft</option><option>Archived</option></select></label><label className="switch-field"><span><strong>Featured product</strong><small>Highlight this item in your catalogue</small></span><input type="checkbox" checked={draft.featured} onChange={e => set('featured',e.target.checked)} /><i /></label></div></div></div><div className="drawer-foot"><button type="button" className="secondary-button" onClick={onClose}>Cancel</button><button type="submit" className="primary-button"><Check size={16} />{product ? 'Save changes' : 'Add product'}</button></div></form></section></div>
}
