import { useMemo, useRef, useState, type ChangeEvent } from 'react'
import { AlertTriangle, ChevronDown, ChevronLeft, ChevronRight, Download, Eye, FileUp, Package, Plus, Search, Tag, Trash2, TrendingUp, X } from 'lucide-react'
import PageHeader from '../../components/ui/PageHeader'
import StatusBadge from '../../components/ui/StatusBadge'
import ProductFormModal from '../../components/products/ProductFormModal'
import ProductDetailsModal from '../../components/products/ProductDetailsModal'
import { useProductStore } from '../../state/ProductStore'
import { getStockStatus, productCategories, type Product } from '../../types/product'

const currency = (value: number) => `₹${value.toLocaleString('en-IN')}`
const headers = ['name','brand','category','description','image','sellingPrice','purchasePrice','sku','stock','minimumStock','status','featured']
export default function ProductsPage() {
  const { products, addProducts, deleteProduct, notify } = useProductStore()
  const [query, setQuery] = useState(''); const [category, setCategory] = useState('All categories'); const [availability, setAvailability] = useState('Any availability'); const [sort, setSort] = useState('newest'); const [page, setPage] = useState(1)
  const [form, setForm] = useState<Product | 'new' | null>(null); const [details, setDetails] = useState<Product | null>(null); const [deleting, setDeleting] = useState<Product | null>(null); const fileRef = useRef<HTMLInputElement>(null)
  const pageSize = 8
  const filtered = useMemo(() => {
    const term = query.trim().toLowerCase()
    const result = products.filter(product => (!term || [product.name,product.brand,product.sku].some(value => value.toLowerCase().includes(term))) && (category === 'All categories' || product.category === category) && (availability === 'Any availability' || (availability === 'In stock' ? product.stock > 0 : availability === 'Out of stock' ? product.stock === 0 : getStockStatus(product.stock,product.minimumStock) === 'Low Stock')))
    return result.sort((a,b) => sort === 'price-low' ? a.sellingPrice-b.sellingPrice : sort === 'price-high' ? b.sellingPrice-a.sellingPrice : sort === 'stock-low' ? a.stock-b.stock : sort === 'stock-high' ? b.stock-a.stock : sort === 'name' ? a.name.localeCompare(b.name) : b.createdAt.localeCompare(a.createdAt))
  }, [products, query, category, availability, sort])
  const pages = Math.max(1, Math.ceil(filtered.length / pageSize)); const safePage = Math.min(page,pages); const visible = filtered.slice((safePage-1)*pageSize,safePage*pageSize)
  const active = products.filter(item => item.status === 'Active').length; const out = products.filter(item => item.stock === 0).length; const categories = new Set(products.map(item => item.category)).size
  const exportProducts = () => { downloadCsv('smartcell-products.csv', headers, products.map(item => headers.map(header => item[header as keyof Product] as string | number | boolean))); notify('Product catalogue exported as CSV') }
  const importProducts = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]; if (!file) return
    try {
      const rows = parseCsv(await file.text()); if (rows.length < 2) throw new Error('The file does not contain product rows')
      const keys = rows[0].map(key => key.trim()); const items: Array<Omit<Product, 'id' | 'createdAt' | 'updatedAt'>> = []; const seenSkus = new Set(products.map(item => item.sku.toLowerCase()))
      for (const row of rows.slice(1)) {
        const record = Object.fromEntries(keys.map((key,index) => [key,row[index]?.trim() ?? '']))
        if (!record.name || !record.brand || !record.sku || seenSkus.has(record.sku.toLowerCase()) || !productCategories.includes(record.category as typeof productCategories[number])) continue
        seenSkus.add(record.sku.toLowerCase())
        items.push({ name:record.name,brand:record.brand,category:record.category as Product['category'],description:record.description ?? '',image:record.image ?? '',sellingPrice:Number(record.sellingPrice)||0,purchasePrice:Number(record.purchasePrice)||0,sku:record.sku,stock:Number(record.stock)||0,minimumStock:Number(record.minimumStock)||0,status:record.status === 'Draft' || record.status === 'Archived' ? record.status : 'Active',featured:record.featured === 'true' })
      }
      if (!items.length) throw new Error('No valid products found. Include name, brand, category and sku columns.')
      addProducts(items)
    } catch (error) { notify(error instanceof Error ? error.message : 'Could not read that CSV file', 'error') }
    event.target.value = ''
  }
  return <><PageHeader title="Products" description="Manage your shop products and catalogue." action={<div className="header-actions"><button className="secondary-button" aria-label="Import products" onClick={() => fileRef.current?.click()}><FileUp size={15} />Import Products</button><button className="secondary-button export-btn" aria-label="Export products" onClick={exportProducts}><Download size={15} />Export Products</button><button className="primary-button" onClick={() => setForm('new')}><Plus size={16} />Add product</button><input ref={fileRef} type="file" accept=".csv,text/csv" hidden onChange={importProducts} /></div>} /><div className="module-summary-grid"><Summary icon={Package} label="Total products" value={products.length} color="blue" caption="Across your catalogue" /><Summary icon={TrendingUp} label="Active products" value={active} color="green" caption="Available to sell" /><Summary icon={X} label="Out of stock" value={out} color="red" caption="Need replenishment" /><Summary icon={Tag} label="Product categories" value={categories} color="violet" caption="Product types" /></div><section className="card catalog-card"><div className="catalog-heading"><div><h2>Product catalogue <span>{filtered.length}</span></h2><p>View and manage the items available in your shop.</p></div></div><div className="catalog-toolbar"><label className="catalog-search"><Search size={16} /><input placeholder="Search products, brands or SKU..." value={query} onChange={e => { setQuery(e.target.value); setPage(1) }} />{query && <button aria-label="Clear search" onClick={() => setQuery('')}><X size={14} /></button>}</label><div className="filter-controls"><label className="select-wrap"><select value={category} onChange={e => {setCategory(e.target.value);setPage(1)}}><option>All categories</option>{productCategories.map(item=><option key={item}>{item}</option>)}</select><ChevronDown size={14}/></label><label className="select-wrap"><select value={availability} onChange={e=>{setAvailability(e.target.value);setPage(1)}}><option>Any availability</option><option>In stock</option><option>Low stock</option><option>Out of stock</option></select><ChevronDown size={14}/></label><label className="select-wrap"><select value={sort} onChange={e=>setSort(e.target.value)}><option value="newest">Sort: Newest</option><option value="name">Name A–Z</option><option value="price-low">Price: low to high</option><option value="price-high">Price: high to low</option><option value="stock-low">Stock: low to high</option><option value="stock-high">Stock: high to low</option></select><ChevronDown size={14}/></label></div></div><div className="data-table-scroll"><table className="data-table product-table"><thead><tr><th>PRODUCT</th><th>BRAND</th><th>CATEGORY</th><th>SELLING PRICE</th><th>PURCHASE PRICE</th><th>STOCK</th><th>STATUS</th><th className="actions-heading">ACTIONS</th></tr></thead><tbody>{visible.map(product=><ProductRow key={product.id} product={product} onView={()=>setDetails(product)} onEdit={()=>setForm(product)} onDelete={()=>setDeleting(product)} />)}</tbody></table>{visible.length === 0 && <div className="empty-state"><span><Package size={21}/></span><strong>No products found</strong><p>Try adjusting the search or filters, or add a new product.</p><button className="secondary-button" onClick={()=>{setQuery('');setCategory('All categories');setAvailability('Any availability')}}>Clear filters</button></div>}</div><div className="table-pagination"><span>Showing <strong>{filtered.length ? (safePage-1)*pageSize+1 : 0}–{Math.min(safePage*pageSize,filtered.length)}</strong> of <strong>{filtered.length}</strong> products</span><div><button disabled={safePage===1} onClick={()=>setPage(safePage-1)} aria-label="Previous page"><ChevronLeft size={15}/></button><span className="page-count">Page {safePage} of {pages}</span><button disabled={safePage===pages} onClick={()=>setPage(safePage+1)} aria-label="Next page"><ChevronRight size={15}/></button></div></div></section><div className="catalog-note"><span>Inventory counts update automatically when stock is adjusted.</span><span>Prices shown in INR ₹</span></div>
    {form && <ProductFormModal product={form === 'new' ? undefined : form} onClose={()=>setForm(null)} />}{details && <ProductDetailsModal product={details} onClose={()=>setDetails(null)} onEdit={()=>{setForm(details);setDetails(null)}} />}{deleting && <ConfirmDialog title="Delete this product?" message={`“${deleting.name}” will be removed from your catalogue. This action cannot be undone.`} onClose={()=>setDeleting(null)} onConfirm={()=>{deleteProduct(deleting.id);setDeleting(null)}} />}
  </>
}
import type { LucideIcon } from 'lucide-react'
function Summary({icon:Icon,label,value,color,caption}:{icon:LucideIcon;label:string;value:number;color:string;caption:string}) { return <article className="summary-card"><span className={`summary-icon ${color}`}><Icon size={18}/></span><div><span>{label}</span><strong>{value}</strong><small>{caption}</small></div></article> }
function ProductRow({product,onView,onEdit,onDelete}:{product:Product;onView:()=>void;onEdit:()=>void;onDelete:()=>void}) {
  const stockStatus = getStockStatus(product.stock,product.minimumStock)
  return <tr><td><div className="product-primary"><span className="product-thumb"><img src={product.image} alt="" loading="lazy" onError={e=>{e.currentTarget.style.display='none'}}/><Package size={17}/></span><span><strong>{product.name}{product.featured && <i className="featured-star">★</i>}</strong><small>{product.sku}</small></span></div></td><td>{product.brand}</td><td><span className="category-chip">{product.category}</span></td><td className="numeric-cell">{currency(product.sellingPrice)}</td><td className="muted-numeric">{currency(product.purchasePrice)}</td><td><strong className={stockStatus==='Out of Stock'?'stock-zero':stockStatus==='Low Stock'?'stock-low':''}>{product.stock}</strong><small className="stock-minimum">{stockStatus==='Low Stock'?`Min. ${product.minimumStock}`:stockStatus==='Out of Stock'?'Restock required':'in stock'}</small></td><td><StatusBadge tone={stockStatus==='In Stock'?'in-stock':stockStatus==='Low Stock'?'low-stock':'out-stock'}>{stockStatus}</StatusBadge><div className="product-status-sub"><StatusBadge>{product.status}</StatusBadge></div></td><td><div className="row-actions"><button aria-label={`View ${product.name}`} title="View details" onClick={onView}><Eye size={15}/></button><button aria-label={`Edit ${product.name}`} title="Edit product" onClick={onEdit}><span className="edit-symbol">✎</span></button><button aria-label={`Delete ${product.name}`} title="Delete product" className="delete-action" onClick={onDelete}><Trash2 size={15}/></button></div></td></tr>
}

function ConfirmDialog({ title, message, onConfirm, onClose }: { title: string; message: string; onConfirm: () => void; onClose: () => void }) {
  return <div className="modal-backdrop confirm-backdrop" onMouseDown={event => { if (event.target === event.currentTarget) onClose() }}><section className="confirm-dialog" role="alertdialog" aria-modal="true" aria-labelledby="confirm-title"><button className="icon-btn confirm-close" onClick={onClose} aria-label="Close confirmation"><X size={17} /></button><span className="confirm-icon"><AlertTriangle size={21} /></span><h2 id="confirm-title">{title}</h2><p>{message}</p><div><button className="secondary-button" onClick={onClose}>Cancel</button><button className="danger-button" onClick={onConfirm}>Delete product</button></div></section></div>
}

function parseCsv(text: string): string[][] {
  const rows: string[][] = []; let row: string[] = []; let field = ''; let quoted = false
  for (let i = 0; i < text.length; i++) {
    const char = text[i]
    if (char === '"' && quoted && text[i + 1] === '"') { field += '"'; i++ }
    else if (char === '"') quoted = !quoted
    else if (char === ',' && !quoted) { row.push(field); field = '' }
    else if ((char === '\n' || char === '\r') && !quoted) { if (char === '\r' && text[i + 1] === '\n') i++; row.push(field); if (row.some(cell => cell.trim())) rows.push(row); row = []; field = '' }
    else field += char
  }
  row.push(field); if (row.some(cell => cell.trim())) rows.push(row)
  return rows
}
function csvCell(value: string | number | boolean) { return `"${String(value).replaceAll('"', '""')}"` }
function downloadCsv(filename: string, headers: string[], rows: Array<Array<string | number | boolean>>) {
  const csv = [headers, ...rows].map(row => row.map(csvCell).join(',')).join('\r\n')
  const url = URL.createObjectURL(new Blob([`\ufeff${csv}`], { type: 'text/csv;charset=utf-8' }))
  const anchor = document.createElement('a'); anchor.href = url; anchor.download = filename; anchor.click(); URL.revokeObjectURL(url)
}
