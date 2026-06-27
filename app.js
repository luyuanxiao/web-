// 应用入口
App({
  globalData: {
    env: 'your-env-id', // 替换为你的云开发环境 ID
    openid: '',
    collections: {
      articles: 'articles',
      videos: 'videos',
      cards: 'daily_cards',
      favorites: 'favorites',
      history: 'history'
    }
  },

  onLaunch() {
    if (!wx.cloud) {
      console.error('请使用 2.2.3 或以上的基础库以使用云能力')
    } else {
      wx.cloud.init({
        env: this.globalData.env,
        traceUser: true
      })
    }

    // 获取用户 openid 用于收藏/历史记录
    this.getOpenid()
  },

  getOpenid() {
    wx.cloud.callFunction({
      name: 'login'
    }).then(res => {
      this.globalData.openid = res.result.openid
    }).catch(err => {
      console.error('获取 openid 失败', err)
    })
  }
})
