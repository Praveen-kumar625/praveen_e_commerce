import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";
import NotFound from "pages/NotFound";
import SellerDashboard from './pages/seller-dashboard';
import ProductCatalog from './pages/product-catalog';
import ProductDetails from './pages/product-details';
import OrderHistory from './pages/order-history';
import UserDashboard from './pages/user-dashboard';
import AdminPanel from './pages/admin-panel';

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
      <ScrollToTop />
      <RouterRoutes>
        {/* Define your route here */}
        <Route path="/" element={<OrderHistory />} />
        <Route path="/seller-dashboard" element={<SellerDashboard />} />
        <Route path="/product-catalog" element={<ProductCatalog />} />
        <Route path="/product-details" element={<ProductDetails />} />
        <Route path="/order-history" element={<OrderHistory />} />
        <Route path="/user-dashboard" element={<UserDashboard />} />
        <Route path="/admin-panel" element={<AdminPanel />} />
        <Route path="*" element={<NotFound />} />
      </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;