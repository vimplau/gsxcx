const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

/**
 * showModel
 * @param {*} msg
 */
function show(msg){
  wx.showModal({
    title: '',
    content: msg,
    showCancel: false,
    confirmText: '确定',
    confirmColor: '#3CC51F'
  });
}

/**
 * showToast
 * @param {*} msg
 */
function toast(msg,icon='success',duration=1000){
  wx.showToast({
    title: msg,
    icon: icon,
    duration: duration
  })
}

/**
 *校验手机号
 *
 * @param {*} phone
 * @returns
 */
function checkPhone(phone){
  if((/^1(3|4|5|6|7|8|9)\d{9}$/.test(phone))){
    return true;
  }else{
    return false;
  }
}

//图片预览
function previewImg(current,imgArr){ 
  wx.previewImage({
    current: current, //当前图片地址 
    urls: imgArr, //所有要预览的图片的地址集合 数组形式 
  })
}

module.exports = {
  formatTime: formatTime,
  show : show,
  toast : toast,
  checkPhone : checkPhone,
  previewImg : previewImg
}
