// pages/image/detail/index.js

var md5 = require("../../../../utils/md5.js");
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imagePath: '',
    type:7,
    imageData:{}

  },

  /**上传海报图 */
  uploadImg: function () {
    var that = this;
    var timestamp = Date.now().toString();

    wx.chooseImage({
      count: 1, //最多可以选择的图片总数
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        var tempFilePath = res.tempFilePaths[0];

        that.setData({
          imagePath: tempFilePath
        })
        that.shituData(tempFilePath);
       
      }
    });

  },


  shituData:function(image){
    wx.showLoading({
      title: '分析中',
      mask: true,
    })
    var timestamp = Date.now().toString();
     var that = this;
     wx.uploadFile({
          url: app.globalData.apiUrl, //仅为示例，非真实的接口地址
          filePath: image,
          name: 'file',
          header: {
            'content-type': 'application/x-www-form-urlencoded'
          },
          formData: {
            'method': 'shitu/upload_image',
            'timestamp': timestamp,
            'sign': md5('shitu/upload_image' + timestamp),
            'type':that.data.type

          },
          success(res) {
            wx.hideLoading();
            var data = JSON.parse(res.data);

            that.setData({
              imageData: data.msg
            })

          }
        })

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    var imagePath = options.image;

    this.setData({
      imagePath: imagePath,
    })

    this.shituData(imagePath);

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})