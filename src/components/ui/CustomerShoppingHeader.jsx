import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Icon from '../AppIcon';
import Input from './Input';
import Button from './Button';

const CustomerShoppingHeader = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [cartCount] = useState(3);
  const location = useLocation();

  const handleSearch = (e) => {
    e?.preventDefault();
    console.log('Searching for:', searchQuery);
  };

  const categories = [
    { name: 'Electronics', path: '/product-catalog?category=electronics' },
    { name: 'Fashion', path: '/product-catalog?category=fashion' },
    { name: 'Home & Garden', path: '/product-catalog?category=home-garden' },
    { name: 'Sports', path: '/product-catalog?category=sports' },
  ];

  const isActive = (path) => {
    return location?.pathname === path || location?.pathname?.startsWith(path);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-card border-b border-border shadow-soft">
      <div className="max-w-7xl mx-auto">
        {/* Main Header */}
        <div className="flex items-center justify-between h-16 px-4 lg:px-6">
          {/* Logo */}
          <Link 
            to="/product-catalog" 
            className="flex items-center space-x-2 hover:opacity-80 transition-opacity duration-150"
          >
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <Icon name="ShoppingBag" size={20} color="white" />
            </div>
            <span className="text-xl font-semibold text-foreground hidden sm:block">
              Praveen E-Commerce
            </span>
          </Link>

          {/* Search Bar - Desktop */}
          <div className="hidden md:flex flex-1 max-w-2xl mx-8">
            <form onSubmit={handleSearch} className="w-full relative">
              <Input
                type="search"
                placeholder="Search for products, brands and more..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e?.target?.value)}
                className="w-full pr-12"
              />
              <Button
                type="submit"
                variant="ghost"
                size="icon"
                className="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8"
              >
                <Icon name="Search" size={18} />
              </Button>
            </form>
          </div>

          {/* Right Actions */}
          <div className="flex items-center space-x-2">
            {/* Search Button - Mobile */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <Icon name="Search" size={20} />
            </Button>

            {/* Cart */}
            <Link to="/user-dashboard">
              <Button variant="ghost" size="icon" className="relative">
                <Icon name="ShoppingCart" size={20} />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-accent text-accent-foreground text-xs font-medium rounded-full h-5 w-5 flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </Button>
            </Link>

            {/* User Account */}
            <Link to="/user-dashboard">
              <Button variant="ghost" size="icon">
                <Icon name="User" size={20} />
              </Button>
            </Link>

            {/* Mobile Menu Toggle */}
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <Icon name={isMenuOpen ? "X" : "Menu"} size={20} />
            </Button>
          </div>
        </div>

        {/* Categories Navigation - Desktop */}
        <div className="hidden lg:flex items-center px-6 py-2 border-t border-border bg-muted/30">
          <nav className="flex items-center space-x-8">
            <Link
              to="/product-catalog"
              className={`text-sm font-medium transition-colors duration-150 hover:text-primary ${
                isActive('/product-catalog') ? 'text-primary' : 'text-muted-foreground'
              }`}
            >
              All Products
            </Link>
            {categories?.map((category) => (
              <Link
                key={category?.name}
                to={category?.path}
                className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors duration-150"
              >
                {category?.name}
              </Link>
            ))}
          </nav>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden border-t border-border bg-card animate-slide-in">
            {/* Mobile Search */}
            <div className="p-4 border-b border-border md:hidden">
              <form onSubmit={handleSearch} className="relative">
                <Input
                  type="search"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e?.target?.value)}
                  className="w-full pr-12"
                />
                <Button
                  type="submit"
                  variant="ghost"
                  size="icon"
                  className="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8"
                >
                  <Icon name="Search" size={18} />
                </Button>
              </form>
            </div>

            {/* Mobile Navigation */}
            <nav className="py-4">
              <Link
                to="/product-catalog"
                className={`flex items-center px-4 py-3 text-sm font-medium transition-colors duration-150 hover:bg-muted ${
                  isActive('/product-catalog') ? 'text-primary bg-muted' : 'text-foreground'
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                <Icon name="Grid3X3" size={18} className="mr-3" />
                All Products
              </Link>
              {categories?.map((category) => (
                <Link
                  key={category?.name}
                  to={category?.path}
                  className="flex items-center px-4 py-3 text-sm font-medium text-foreground hover:bg-muted transition-colors duration-150"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <Icon name="Tag" size={18} className="mr-3" />
                  {category?.name}
                </Link>
              ))}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default CustomerShoppingHeader;