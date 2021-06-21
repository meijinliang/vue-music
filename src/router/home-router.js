export const HomeRouter = [
  {
    path: 'home',
    name: 'home',
    meta: {
      title: '首页'
    },
    // import 异步加载
    component: () => import('@/views/home')
  }, {
    path: 'discover',
    name: 'discover',
    meta: {
      title: '发现音乐-推荐'
    },
    component: () => import('@/views/home'),
  }, {
    path: 'discover/toplist',
    name: 'discover-toplist',
    meta: {
      title: '发现音乐-排行榜'
    },
    component: () => import('@/views/discover-music/toplist')
  },
  {
    path: 'discover/playlist',
    name: 'discover-playlist',
    meta: {
      title: '发现音乐-歌单'
    },
    component: () => import('@/views/discover-music/playlist')
  }, {
    path: 'discover/djradio',
    name: 'discover-djradio',
    meta: {
      title: '发现音乐-主播电台'
    },
    component: () => import('@/views/discover-music/djradio')
  }, {
    path: 'discover/artist',
    name: 'discover-artist',
    meta: {
      title: '发现音乐-歌手'
    },
    component: () => import('@/views/discover-music/artist')
  }, {
    path: 'discover/album',
    name: 'discover-album',
    meta: {
      title: '发现音乐-新碟上架'
    },
    component: () => import('@/views/discover-music/album')
  }
]