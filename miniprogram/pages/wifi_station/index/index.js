const app = getApp()

Page({
  data: {
    motto: ' ',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    tempFilePaths: null,
  },

  //确定图片来源，从相册中选择或者是拍照
 
  

  //上传图片至服务器并接受返回的结果
  identifyimage: function () {
    var that = this;
    var str = "Hello World "
    

    // 若识别结果为"Hello World "，则向oneNET请求数据并绘图
    if (str == "Hello World ") {
      //从oneNET请求我们的Wi-Fi气象站的数据
      const requestTask = wx.request({
        url: 'http://api.heclouds.com/devices/502967171/datapoints?datastream_id=Light,Temperature,Humidity&limit=15',
        header: {
          'content-type': 'application/json',
          'api-key':'TI=pBXfDhVTwp6uXEuM5DKdtZfs='
        },
        success: function (res) {
          //console.log(res.data)
          //拿到数据后保存到全局数据
          var app = getApp()
          app.globalData.temperature = res.data.data.datastreams[0]
          app.globalData.light = res.data.data.datastreams[1]
          app.globalData.humidity = res.data.data.datastreams[2]
          console.log(app.globalData.light)
          //跳转到天气页面，根据拿到的数据绘图
          wx.navigateTo({
            url: '../tianqi/tianqi',
          })
        },

        fail: function (res) {
          console.log("fail!!!")
        },

        complete: function (res) {
          console.log("end")
        }
      })
    } 
  },

 
  getUserInfo: function (e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }
})
