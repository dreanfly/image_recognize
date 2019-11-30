var md5 = require("../../../utils/md5.js");
const app = getApp()

Page({
  data: {

    urls:[
      '/pages/text/detail/common/index',
      '/pages/image/detail/dongwu/index',
      '/pages/image/detail/zhiwu/index',
      '/pages/image/detail/car/index',
      '/pages/image/detail/shucai/index',
      '/pages/image/detail/huobi/index',
      '/pages/image/detail/logo/index',
      '/pages/image/detail/dibiao/index',
      '/pages/image/detail/hongjiu/index',

    ]
  },

  
  /**上传海报图 */
  uploadImg: function (e) {

   var type = e.currentTarget.dataset.type;

    var that = this;
    var timestamp = Date.now().toString();

    wx.chooseImage({
      count: 1, //最多可以选择的图片总数
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        var tempFilePath = res.tempFilePaths[0];

        var url = that.data.urls[type]+"?image=" + tempFilePath;
        wx.navigateTo({
          url: url,
        })
      }
    });

  },


  //事件处理函数
  bindViewTap: function() {
    
  },
  onLoad: function () {

  },
  onShareAppMessage() {

  }
})
