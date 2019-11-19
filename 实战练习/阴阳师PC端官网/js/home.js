/*
 * @Author: SeLiNnnn
 * @Description: Go for my goal and for the life I want.
 * @Date: 2019-10-18 13:41:13
 * @LastEditTime: 2019-10-18 14:09:07
 */

//首屏滑动显示

;(function() {
  var $logo = $("#logo")
  $logo.show().animate(
    {
      opacity: 1,
      left: 0
    },
    1000
  )
})()
