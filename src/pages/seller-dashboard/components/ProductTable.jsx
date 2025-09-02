import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const ProductTable = () => {
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [sortField, setSortField] = useState('name');
  const [sortDirection, setSortDirection] = useState('asc');

  const products = [
    {
      id: 1,
      name: "iPhone 15 Pro Max",
      image: "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=400",
      category: "Electronics",
      price: 1199.99,
      stock: 25,
      status: "active",
      sales: 156,
      rating: 4.8,
      lastUpdated: "2025-01-02"
    },
    {
      id: 2,
      name: "Samsung Galaxy S24 Ultra",
      image: "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=400",
      category: "Electronics",
      price: 1099.99,
      stock: 18,
      status: "active",
      sales: 89,
      rating: 4.6,
      lastUpdated: "2025-01-01"
    },
    {
      id: 3,
      name: "MacBook Air M3",
      image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400",
      category: "Electronics",
      price: 1299.99,
      stock: 0,
      status: "out_of_stock",
      sales: 234,
      rating: 4.9,
      lastUpdated: "2024-12-30"
    },
    {
      id: 4,
      name: "Nike Air Max 270",
      image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400",
      category: "Fashion",
      price: 149.99,
      stock: 45,
      status: "active",
      sales: 78,
      rating: 4.4,
      lastUpdated: "2025-01-02"
    },
    {
      id: 5,
      name: "Sony WH-1000XM5",
      image: "https://images.unsplash.com/photo-1583394838336-acd977736f90?w=400",
      category: "Electronics",
      price: 399.99,
      stock: 12,
      status: "low_stock",
      sales: 167,
      rating: 4.7,
      lastUpdated: "2025-01-01"
    }
  ];

  const getStatusBadge = (status) => {
    const statusConfig = {
      active: { color: 'bg-success/10 text-success', text: 'Active' },
      out_of_stock: { color: 'bg-error/10 text-error', text: 'Out of Stock' },
      low_stock: { color: 'bg-warning/10 text-warning', text: 'Low Stock' },
      inactive: { color: 'bg-muted text-muted-foreground', text: 'Inactive' }
    };
    
    const config = statusConfig?.[status] || statusConfig?.inactive;
    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${config?.color}`}>
        {config?.text}
      </span>
    );
  };

  const handleSelectAll = (checked) => {
    if (checked) {
      setSelectedProducts(products?.map(p => p?.id));
    } else {
      setSelectedProducts([]);
    }
  };

  const handleSelectProduct = (productId, checked) => {
    if (checked) {
      setSelectedProducts([...selectedProducts, productId]);
    } else {
      setSelectedProducts(selectedProducts?.filter(id => id !== productId));
    }
  };

  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  return (
    <div className="bg-card border border-border rounded-lg shadow-soft overflow-hidden">
      <div className="p-6 border-b border-border">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-foreground">Product Listings</h3>
          <div className="flex items-center space-x-2">
            {selectedProducts?.length > 0 && (
              <div className="flex items-center space-x-2">
                <span className="text-sm text-muted-foreground">
                  {selectedProducts?.length} selected
                </span>
                <Button variant="outline" size="sm" iconName="Edit" iconPosition="left">
                  Bulk Edit
                </Button>
                <Button variant="outline" size="sm" iconName="Trash2" iconPosition="left">
                  Delete
                </Button>
              </div>
            )}
            <Link to="/seller-dashboard/products/add">
              <Button variant="default" iconName="Plus" iconPosition="left">
                Add Product
              </Button>
            </Link>
          </div>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-muted/30">
            <tr>
              <th className="text-left p-4">
                <input
                  type="checkbox"
                  checked={selectedProducts?.length === products?.length}
                  onChange={(e) => handleSelectAll(e?.target?.checked)}
                  className="rounded border-border"
                />
              </th>
              <th className="text-left p-4 font-medium text-foreground">Product</th>
              <th 
                className="text-left p-4 font-medium text-foreground cursor-pointer hover:text-primary"
                onClick={() => handleSort('price')}
              >
                <div className="flex items-center space-x-1">
                  <span>Price</span>
                  <Icon name="ArrowUpDown" size={14} />
                </div>
              </th>
              <th 
                className="text-left p-4 font-medium text-foreground cursor-pointer hover:text-primary"
                onClick={() => handleSort('stock')}
              >
                <div className="flex items-center space-x-1">
                  <span>Stock</span>
                  <Icon name="ArrowUpDown" size={14} />
                </div>
              </th>
              <th className="text-left p-4 font-medium text-foreground">Status</th>
              <th 
                className="text-left p-4 font-medium text-foreground cursor-pointer hover:text-primary"
                onClick={() => handleSort('sales')}
              >
                <div className="flex items-center space-x-1">
                  <span>Sales</span>
                  <Icon name="ArrowUpDown" size={14} />
                </div>
              </th>
              <th className="text-left p-4 font-medium text-foreground">Rating</th>
              <th className="text-right p-4 font-medium text-foreground">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products?.map((product) => (
              <tr key={product?.id} className="border-t border-border hover:bg-muted/20">
                <td className="p-4">
                  <input
                    type="checkbox"
                    checked={selectedProducts?.includes(product?.id)}
                    onChange={(e) => handleSelectProduct(product?.id, e?.target?.checked)}
                    className="rounded border-border"
                  />
                </td>
                <td className="p-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 rounded-lg overflow-hidden bg-muted">
                      <Image 
                        src={product?.image} 
                        alt={product?.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <h4 className="font-medium text-foreground">{product?.name}</h4>
                      <p className="text-sm text-muted-foreground">{product?.category}</p>
                    </div>
                  </div>
                </td>
                <td className="p-4">
                  <span className="font-medium text-foreground">${product?.price}</span>
                </td>
                <td className="p-4">
                  <span className={`font-medium ${product?.stock === 0 ? 'text-error' : product?.stock < 20 ? 'text-warning' : 'text-foreground'}`}>
                    {product?.stock}
                  </span>
                </td>
                <td className="p-4">
                  {getStatusBadge(product?.status)}
                </td>
                <td className="p-4">
                  <span className="font-medium text-foreground">{product?.sales}</span>
                </td>
                <td className="p-4">
                  <div className="flex items-center space-x-1">
                    <Icon name="Star" size={14} className="text-warning fill-current" />
                    <span className="text-sm font-medium text-foreground">{product?.rating}</span>
                  </div>
                </td>
                <td className="p-4">
                  <div className="flex items-center justify-end space-x-1">
                    <Button variant="ghost" size="icon">
                      <Icon name="Eye" size={16} />
                    </Button>
                    <Button variant="ghost" size="icon">
                      <Icon name="Edit" size={16} />
                    </Button>
                    <Button variant="ghost" size="icon">
                      <Icon name="MoreHorizontal" size={16} />
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProductTable;