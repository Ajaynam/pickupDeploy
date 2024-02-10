import {
    NAV_ITEM_TYPE_TITLE,
    NAV_ITEM_TYPE_ITEM,
    NAV_ITEM_TYPE_COLLAPSE
} from '../../constants/navigation.constant'
import { ADMIN  } from '../../constants/roles.constant'

const pagesNavigationConfig = [
    {
        key: 'pages',
        path: '',
        title: 'PAGES',
        translateKey: 'nav.pages',
        icon: 'pages',
        type: NAV_ITEM_TYPE_TITLE,
        authority: [ ADMIN],
        subMenu: [
            {
                key: 'pickup-dashboard',
                path: `/pickup-dashboard`,
                title: 'Dashboard',
                translateKey: 'nav.dashboard',
                icon: 'dashboard',
                type: NAV_ITEM_TYPE_ITEM,
                authority: [ADMIN],
                subMenu: [],
            },
            // {
            //     key: 'productMaster',
            //     path: `/productMaster/List`,
            //     title: ' Pricing ',
            //     translateKey: 'nav.productMaster',
            //     icon: 'withdraw',
            //     type: NAV_ITEM_TYPE_ITEM,
            //     authority: [ADMIN],
            //     subMenu: [],
            // },
            // {
            //     key: 'productsMaster',
            //     path: `/productssMaster/new`,
            //     title: 'Add products Master ',
            //     translateKey: 'nav.productMaster',
            //     icon: 'withdraw',
            //     type: NAV_ITEM_TYPE_ITEM,
            //     authority: [ADMIN],
            //     subMenu: [],
            // },
            // {
            //     key: 'CustomerMaster',
            //     path: `/CustomerMaster/new`,
            //     title: 'Add Customer Master ',
            //     translateKey: 'nav.CustomerMaster',
            //     icon: 'user',
            //     type: NAV_ITEM_TYPE_ITEM,
            //     authority: [ADMIN],
            //     subMenu: [],
            // },
            // {
            //     key: 'supplierMaster',
            //     path: `/supplierMaster/new`,
            //     title: 'Add supplier Master ',
            //     translateKey: 'nav.supplierMaster',
            //     icon: 'user',
            //     type: NAV_ITEM_TYPE_ITEM,
            //     authority: [ADMIN],
            //     subMenu: [],
            // },
            // {
            //     key: 'PoEntry',
            //     path: `/PoPlannerEntrys/new`,
            //     title: ' Po Entry ',
            //     translateKey: 'nav.PoEntry',
            //     icon: 'withdraw',
            //     type: NAV_ITEM_TYPE_ITEM,
            //     authority: [ADMIN],
            //     subMenu: [],
            // },
            // {
            //     key: 'PoPlanner',
            //     path: `/PoPlanner/new`,
            //     title: ' Po Planner ',
            //     translateKey: 'nav.PoPlanner',
            //     icon: 'withdraw',
            //     type: NAV_ITEM_TYPE_ITEM,
            //     authority: [ADMIN],
            //     subMenu: [],
            // },
            // {
            //     key: 'OrderViewSheet',
            //     path: `/OrderViewSheet/new`,
            //     title: ' Order View Sheet ',
            //     translateKey: 'nav.OrderViewSheet',
            //     icon: 'list',
            //     type: NAV_ITEM_TYPE_ITEM,
            //     authority: [ADMIN],
            //     subMenu: [],
            // },

            // {
            //     key: 'supplierMaster',
            //     path: `/supplierMaster/List`,
            //     title: 'supplier Master ',
            //     translateKey: 'nav.supplier_Master',
            //     icon: 'user',
            //     type: NAV_ITEM_TYPE_ITEM,
            //     authority: [ADMIN],
            //     subMenu: [],
            // },

            // {
            //     key: 'customerMaster',
            //     path: `/customerMaster/List`,
            //     title: 'custumer Master ',
            //     translateKey: 'nav.customer_Master',
            //     icon: 'user',
            //     type: NAV_ITEM_TYPE_ITEM,
            //     authority: [ADMIN],
            //     subMenu: [],
            // },
          

            // {
            //     key: 'PoEntr.list',
            //     path: `/PoEntr/list`,
            //     title: 'Po Acceptance  ',
            //     translateKey: 'nav.PoAcceptance',
            //     icon: 'list',
            //     type: NAV_ITEM_TYPE_ITEM,
            //     authority: [ADMIN],
            //     subMenu: [],
            // },

            {
                key: 'apps.settings',
                path: '',
                title: 'Order',
                translateKey: 'nav.appsPricing.Pricing',
                icon: 'list',
                type: NAV_ITEM_TYPE_COLLAPSE,
                authority: [ADMIN ],
                subMenu: [
                    {
                        key: 'Order.list',
                        path: `/PickupOrder/List`,
                        title: 'Order List ',
                        translateKey: 'nav.OrderList',
                        icon: '',
                        type: NAV_ITEM_TYPE_ITEM,
                        authority: [ADMIN],
                        subMenu: [],
                    },
                    {
                        key: 'QuickOrder.list',
                        path: `/QuickPickupOrder/List`,
                        title: 'Quick Order List ',
                        translateKey: 'nav.OrderList',
                        icon: '',
                        type: NAV_ITEM_TYPE_ITEM,
                        authority: [ADMIN],
                        subMenu: [],
                    },
                    {
                        key: 'Order.new',
                        path: `/PickupedOrder/new`,
                        title: ' Add New Order  ',
                        translateKey: 'nav.material',
                        icon: '',
                        type: NAV_ITEM_TYPE_ITEM,
                        authority: [ADMIN],
                        subMenu: [],
                    },
                   
                   
                   
                ],
            },

































            // {
            //     key: 'employee',
            //     path: `/employee/list`,
            //     title: 'Employee list',
            //     translateKey: 'nav.employee',
            //     icon: 'withdraw',
            //     type: NAV_ITEM_TYPE_ITEM,
            //     authority: [ADMIN],
            //     subMenu: [],
            // },
            // {
            //     key: 'shop',
            //     path: '/shop/list',
            //     title: 'Shop list',
            //     translateKey: 'nav.shop.list',
            //     icon: 'payout',
            //     type: NAV_ITEM_TYPE_ITEM,
            //     authority: [ADMIN, OWNER, EMPLOYEE],
            //     subMenu: [],
            // },
            // {
            //     key: 'product.new',
            //     path: '/product/new',
            //     title: 'New product',
            //     translateKey: 'nav.product.new',
            //     icon: 'product',
            //     type: NAV_ITEM_TYPE_ITEM,
            //     authority: [ADMIN],
            //     subMenu: [],
            // },
            // {
            //     key: 'product',
            //     path: '/product/list',
            //     title: 'Product list',
            //     translateKey: 'nav.product',
            //     icon: 'product',
            //     type: NAV_ITEM_TYPE_ITEM,
            //     authority: [ADMIN, OWNER, EMPLOYEE],
            //     subMenu: [],
            // },
            // {
            //     key: 'order.list',
            //     path: '/order/list',
            //     title: 'Order List',
            //     translateKey: 'nav.order.list',
            //     icon: 'orderList',
            //     type: NAV_ITEM_TYPE_ITEM,
            //     authority: [ADMIN, OWNER, SHOP, EMPLOYEE],
            //     subMenu: [],
            // },
            // {
            //     key: 'order.new',
            //     path: '/order/new',
            //     title: 'New order   ',
            //     translateKey: 'nav.order.new',
            //     icon: 'list',
            //     type: NAV_ITEM_TYPE_ITEM,
            //     authority: [ADMIN, OWNER, EMPLOYEE],
            //     subMenu: [],
            // },
            // {
            //     key: 'address',
            //     path: '/address/list',
            //     title: 'Address',
            //     translateKey: 'nav.address',
            //     icon: 'product',
            //     type: NAV_ITEM_TYPE_ITEM,
            //     authority: [ADMIN],
            //     subMenu: [],
            // },
        ],
    },
]

export default pagesNavigationConfig
