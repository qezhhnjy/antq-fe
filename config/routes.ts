export default [
  {
    path: '/user',
    layout: false,
    routes: [
      {
        path: '/user',
        routes: [{name: 'login', path: '/user/login', component: './user/Login'}],
      },
      {
        component: './404',
      },
    ],
  },
  {
    path: '/welcome',
    name: 'welcome',
    icon: 'home',
    component: './Welcome',
  },
  {
    path: '/outdoor',
    name: 'outdoor',
    icon: 'home',
    routes: [
      {path: '/outdoor/hiking-trail', name: 'hiking-trail', icon: 'home', component: './outdoor/HikingTrail'}
    ]
  },
  {
    path: '/finance',
    name: 'finance',
    icon: 'fund',
    routes: [
      {path: '/finance/stock', name: 'stock', icon: 'sliders', component: './finance/Stock'},
      {path: '/finance/fund', name: 'fund', icon: 'fund', component: './finance/Fund'},
    ],
  },
  {
    path: '/snowball',
    name: 'snowball',
    icon: 'sliders',
    routes: [
      {path: '/snowball/quote-center', name: 'quote-center', component: './snowball/QuoteCenter'},
      {path: '/snowball/stock-info', name: 'stock-info', component: './snowball/StockInfo'},
    ],
  },
  {
    path: '/robo',
    name: 'robo',
    icon: 'sliders',
    routes: [
      {
        path: '/robo/market-statistic',
        name: 'market-statistic',
        component: './robo/MarketStatistic',
      },
    ],
  },
  {
    path: '/system',
    name: 'system',
    icon: 'setting',
    access: 'system',
    routes: [
      {path: '/system', redirect: '/system/user'},
      {
        path: '/system/user',
        name: 'user',
        icon: 'wechat',
        access: 'system-user',
        component: './user/Manager',
      },
      {
        path: '/system/role',
        name: 'role',
        access: 'system-role',
        component: './role/Manager',
      },
      {
        path: '/system/menu',
        name: 'menu',
        access: 'system-menu',
        component: './menu/Manager',
      },
      {
        path: '/system/login-info',
        name: 'login-info',
        access: 'system-login-info',
        component: './login-info/Manager',
      },
    ],
  },
  {
    path: '/util',
    name: 'util',
    icon: 'setting',
    access: 'util',
    routes: [
      {path: '/util', redirect: '/util/form'},
      {
        path: '/util/form',
        name: 'form',
        icon: 'form',
        access: 'util-form',
        component: './util/Form',
      },
      {
        path: '/util/table',
        name: 'table',
        icon: 'table',
        access: 'util-table',
        component: './util/Table',
      },
      {
        path: '/util/braft',
        name: 'braft',
        access: 'util-braft',
        component: './util/Braft',
      },
      {
        path: '/util/quill',
        name: 'quill',
        access: 'util-quill',
        component: './util/Quill',
      },
      {
        path: '/util/vditor',
        name: 'Vditor',
        component: './util/Vditor',
      },
    ],
  },
  {
    path: '/blog',
    name: 'blog',
    icon: 'database',
    access: 'blog',
    routes: [
      {path: '/blog/list', name: 'list', access: 'blog-list', component: './blog/BlogList'},
      {path: '/blog/detail', component: './blog/BlogDetail'},
    ],
  },
  {
    path:'/album',
    name:'album',
    icon:'picture',
    routes: [
      {path:'/album/detail',name:'detail',component: './album/AlbumDetail'}
    ]
  },
  {
    path: '/report',
    name: 'report',
    icon: 'fileExcel',
    routes: [{path: '/report/jmreport', name: 'jmreport', component: './report/JMReport'}],
  },
  {
    path: '/account',
    name: 'account',
    icon: 'github',
    routes: [
      {path: '/account/center', name: 'center', component: './account/Center'},
      {path: '/account/settings', name: 'settings', component: './account/Settings'},
      {path: '/account/timeline', name: 'timeline', component: './account/TimelineRecord'},
      {path: '/account/chatInfo', name: 'chatInfo', component: './account/ChatInfo'},
    ],
  },
  {
    path: '/system-monitor',
    name: 'monitor',
    icon: 'monitor',
    routes: [
      {path: '/system-monitor/nacos', name: 'nacos', component: './monitor/Nacos'},
      {path: '/system-monitor/admin', name: 'admin', component: './monitor/Admin'},
      {path: '/system-monitor/sentinel', name: 'sentinel', component: './monitor/Sentinel'},
      {path: '/system-monitor/system', name: 'system', component: './monitor/System'},
      {path: '/system-monitor/minio', name: 'minio', component: './monitor/Minio'},
      {path: '/system-monitor/quartz', name: 'quartz', component: './monitor/Quartz'},
      {path: '/system-monitor/redis', name: 'redis', component: './monitor/Redis'},
    ],
  },
  {
    path: '/',
    redirect: '/welcome',
  },
  {
    component: './404',
  },
];
