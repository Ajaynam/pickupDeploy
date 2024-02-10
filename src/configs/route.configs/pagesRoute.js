import React from 'react'
import { ADMIN, EMPLOYEE, OWNER, SHOP } from '../../constants/roles.constant'

const pagesRoute = [
    {
        key: 'pickup-dashboard',
        path: `/pickup-dashboard`,
        component: React.lazy(() => import('../../view/dashboard')),
        authority: [ADMIN, EMPLOYEE],
    },

    {
        key: 'PickupOrder.List',
        path: `/PickupOrder/List`,
        component: React.lazy(() => import('../../view/SupplierMasterList')),
        authority: [ADMIN, EMPLOYEE],
    },
    {
        key: 'PickupOrder1.List1',
        path: `/QuickPickupOrder/List`,
        component: React.lazy(() => import('../../view/SupplierMasterList1')),
        authority: [ADMIN, EMPLOYEE],
    },
    {
        key: '/',
        path: '/dashboard',
        component: React.lazy(() => import('../../view/dashboard')),
        authority: [ADMIN, EMPLOYEE],
    },

    {
        key: 'productMaster.List',
        path: `/productMaster/List`,
        component: React.lazy(() => import('../../view/PoProductMasterList')),
        authority: [ADMIN, EMPLOYEE],
    },
    {
        key: 'productssMaster.new',
        path: `/productssMaster/new`,
        component: React.lazy(() => import('../../view/AddProductMaster')),
        authority: [ADMIN, EMPLOYEE],
    },
    {
        key: 'CustomerMaster.new',
        path: `/CustomerMaster/new`,
        component: React.lazy(() => import('../../view/AddCostumer')),
        authority: [ADMIN, EMPLOYEE],
    },
    {
        key: 'supplierMaster.new',
        path: `/PickupedOrder/new`,
        component: React.lazy(() => import('../../view/AddOrder')),
        authority: [ADMIN, EMPLOYEE],
    },
    {
        key: 'PoEntry.new',
        path: `/PoEntry/new`,
        component: React.lazy(() => import('../../view/AddPoPlannerEntry')),
        authority: [ADMIN, EMPLOYEE],
    },
    {
        key: 'PoPlanner.new',
        path: `/PoPlanner/new`,
        component: React.lazy(() => import('../../view/AddPoPlanner')),
        authority: [ADMIN, EMPLOYEE],
    },
    {
        key: 'OrderViewSheet.new',
        path: `/OrderViewSheet/new`,
        component: React.lazy(() => import('../../view/AddOrderViewSheet')),
        authority: [ADMIN, EMPLOYEE],
    },
  
    {
        key: 'customerMaster.List',
        path: `/customerMaster/List`,
        component: React.lazy(() => import('../../view/CustomerMasterList')),
        authority: [ADMIN, EMPLOYEE],
    },
    {
        key: 'Pattern.List',
        path: `/pattern/List`,
        component: React.lazy(() => import('../../view/AddPattern')),
        authority: [ADMIN, EMPLOYEE],
    },

    {
        key: 'category.List',
        path: `/category/List`,
        component: React.lazy(() => import('../../view/AddCategory')),
        authority: [ADMIN, EMPLOYEE],
    },
    {
        key: 'materialGrade.List',
        path: `/materialGrade/List`,
        component: React.lazy(() => import('../../view/AddMaterial')),
        authority: [ADMIN, EMPLOYEE],
    },

    {
        key: 'PoAcceptance.Template',
        path: `/PoAcceptance/Template`,
        component: React.lazy(() => import('../../view/PoAcceptanceTemplate')),
        authority: [ADMIN, EMPLOYEE],
    },
    {
        key: 'PoEntr.list',
        path: `/PoEntr/list`,
        component: React.lazy(() => import('../../view/orderList')),
        authority: [ADMIN, EMPLOYEE, OWNER, SHOP],
    },
    {
        key: 'PoPlannerEntry.new',
        path: `/PoPlannerEntry/new`,
        component: React.lazy(() => import('../../view/AddPoEntry')),
        authority: [ADMIN, EMPLOYEE, OWNER],
    },
    {
        key: 'PoEntrys.new',
        path: `/PoPlannerEntrys/new`,
        component: React.lazy(() => import('../../view/newOrder')),
        authority: [ADMIN, EMPLOYEE, OWNER],
    },
    {
        key: 'orders.details',
        path: `/orders/details/:userId`,
        component: React.lazy(() => import('../../view/PickedOrderDetails')),
        authority: [ADMIN, EMPLOYEE],
    },
    {
        key: 'orders.edit',
        path: `/orders/edit/:userId`,
        component: React.lazy(() => import('../../view/EditPickupDetail')),
        authority: [ADMIN, EMPLOYEE],
    },




















    {
        key: 'shop.list',
        path: `/shop/list`,
        component: React.lazy(() => import('../../view/shopList')),
        authority: [ADMIN, EMPLOYEE],
    },
    // {
    //     key: 'dashboard',
    //     path: `/dashboard`,
    //     component: React.lazy(() => import('../../view/shopList')),
    //     authority: [ADMIN, EMPLOYEE],
    // },
    {
        key: 'shop.details',
        path: `/shop/details`,
        component: React.lazy(() => import('../../view/shopDetails')),
        authority: [ADMIN, EMPLOYEE],
    },
    {
        key: 'owner.list',
        path: `/owner/list`,
        component: React.lazy(() => import('../../view/shopOwnerList')),
        authority: [ADMIN, EMPLOYEE],
    },
    {
        key: 'owner.details',
        path: `/owner/details/:userId`,
        component: React.lazy(() => import('../../view/userProfileIncharge')),
        authority: [ADMIN, EMPLOYEE],
    },
    {
        key: 'order.details',
        path: `/order/details`,
        component: React.lazy(() => import('../../view/orderDetails')),
        authority: [ADMIN, EMPLOYEE],
    },
    {
        key: 'invoice.details',
        path: `/invoice/details`,
        component: React.lazy(() => import('../../view/invoice')),
        authority: [ADMIN, EMPLOYEE],
    },
  
    {
        key: 'owner.new',
        path: `/products/new`,
        component: React.lazy(() => import('../../view/newOwner')),
        authority: [ADMIN, EMPLOYEE],
    },
   
   
    {
        key: 'shop.new',
        path: `/shop/new`,
        component: React.lazy(() => import('../../view/newShop')),
        authority: [ADMIN, EMPLOYEE, OWNER],
    },
    {
        key: 'employee.list',
        path: `/employee/list`,
        component: React.lazy(() => import('../../view/employeeList')),
        authority: [ADMIN],
    },
    {
        key: 'employee.new',
        path: `/employee/new`,
        component: React.lazy(() => import('../../view/addEmployee')),
        authority: [ADMIN],
    },
    {
        key: 'employee.details',
        path: `/employee/details`,
        component: React.lazy(() => import('../../view/employeeDetails')),
        authority: [ADMIN],
    },
    {
        key: 'access.denied',
        path: `/access-denied`,
        component: React.lazy(() => import('../../view/accessDenied')),
        authority: [ADMIN, EMPLOYEE, SHOP, OWNER],
    },
    {
        key: 'product.list',
        path: `/product/list`,
        component: React.lazy(() => import('../../view/productList')),
        authority: [ADMIN, OWNER, EMPLOYEE],
    },
    {
        key: 'product.details',
        path: `/product/details`,
        component: React.lazy(() => import('../../view/productDetails')),
        authority: [ADMIN],
    },
    {
        key: 'address.list',
        path: `/address/list`,
        component: React.lazy(() => import('../../view/address')),
        authority: [ADMIN],
    },
    {
        key: 'product.new',
        path: `/product/new`,
        component: React.lazy(() => import('../../view/ProductNew')),
        authority: [ADMIN, OWNER, EMPLOYEE],
    },
    {
        key: 'profile.settings',
        path: `/profile/settings`,
        component: React.lazy(() => import('../../view/profileSettings')),
        authority: [ADMIN, OWNER, EMPLOYEE],
    },
]

export default pagesRoute
