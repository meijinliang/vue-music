export const HomeRouter = [
  {
    path: 'discover',
    name: 'discover',
    meta: {
      title: '推荐'
    },
    component: () => import('@/views/home')
  },
  {
    path: 'discover/toplist',
    name: 'discover-toplist',
    meta: {
      title: '排行榜'
    },
    component: () => import('@/views/discover-music/toplist')
  },
  {
    path: 'discover/playlist',
    name: 'discover-playlist',
    meta: {
      title: '歌单'
    },
    component: () => import('@/views/discover-music/playlist')
  },
  {
    path: 'discover/djradio',
    name: 'discover-djradio',
    meta: {
      title: '主播电台'
    },
    component: () => import('@/views/discover-music/djradio')
  },
  {
    path: 'discover/artist',
    name: 'discover-artist',
    meta: {
      title: '歌手'
    },
    component: () => import('@/views/discover-music/artist')
  },
  {
    path: 'discover/album',
    name: 'discover-album',
    meta: {
      title: '新碟上架'
    },
    component: () => import('@/views/discover-music/album')
  },
  {
    path: 'playlist', // 歌单详情
    name: 'playlist',
    component: () => import('@/views/details/playDetail')
  },
  {
    path: 'song', // 歌曲详情
    name: 'song',
    component: () => import('@/views/details/songDetail')
  },
  {
    path: 'artist', // 歌曲详情
    name: 'artist',
    component: () => import('@/views/details/artistDetail')
  },
  {
    path: 'demo',
    name: 'demo',
    component: () => import('@/demo')
  }
]
