import React from "react";
import { Navigate } from "react-router-dom";

// //Ecommerce Pages
import EcommerceProducts from "../pages/Ecommerce/EcommerceProducts/index";
import EcommerceAddProduct from "../pages/Ecommerce/EcommerceProducts/EcommerceAddProduct";
import VendorProducts from "../pages/Ecommerce/Vendor";
import VenderPayment from "../pages/Ecommerce/Vendor/VenderPayment";
import VendorContacts from "../pages/Ecommerce/Vendor/VendorContacts";
import VenderPriceLists from "../pages/Ecommerce/Vendor/VenderPriceLists";
import ManageVendors from "../pages/Ecommerce/Vendor/ManageVendors";
import IntegrationList from "../pages/Ecommerce/Integration/IntegrationList";
import CompetitionProduct from "../pages/Ecommerce/EcommerceProducts/CompetitionProduct";

const authProtectedRoutes = [
  { path: "/products", component: <EcommerceProducts /> },
  { path: "/view-product", component: <EcommerceAddProduct /> },
  { path: "/vendor", component: <VendorProducts /> },
  { path: "/vendor-payment", component: <VenderPayment /> },
  { path: "/vendor-contacts", component: <VendorContacts /> },
  { path: "/vendor-price", component: <VenderPriceLists /> },
  { path: "/manage-vendors", component: <ManageVendors /> },
  { path: "/integration", component: <IntegrationList /> },
  { path: "/competition-section", component: <CompetitionProduct /> },



  {
    path: "/",
    exact: true,
    component: <EcommerceProducts />,
  },
  { path: "*", component: <Navigate to="/products" /> },
];

const publicRoutes = [
  // Authentication Page
];

export { authProtectedRoutes, publicRoutes };
