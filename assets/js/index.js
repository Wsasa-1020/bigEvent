$(function () {
    getUserInfo()

    var layer = layui.layer
    // 点击按钮实现退出功能
    $('#btnLogout').on('click', function () {
        // 提示用户是否退出
        layer.confirm('确定退出登录？', { icon: 3, title: '提示' }, function (index) {
            // 清空本地存储中的'token
            localStorage.removeItem('token')
            // 重新跳转到登录页面
            location.href = '/login.html'
            // 关闭confirm询问框
            layer.close(index)
        })

    })
})
// 获取用户信息
function getUserInfo() {
    $.ajax({
        method: 'GET',
        url: '/my/userinfo',
        // headers: {
        //     Authorization: localStorage.getItem('token')
        // },
        success: function (res) {
            console.log(res);
            if (res.status === 0) {
                renderAvatar(res.data)

            }

        }
    })

}

// 渲染用户的头像
function renderAvatar(user) {
    // 获取昵称或用户名
    var name = user.nickname || user.username
    // 设置欢迎的文本
    $('#welcome').html('欢迎&nbsp;&nbsp' + name)
    // 按需渲染用户头像
    if (user.user_pic !== null) {
        // 渲染用户头像，并显示头像
        $('.layui-nav-img').attr('src', user.user_pic).show()
        $('.text-avatar').hide()
    } else {
        $('.layui-nav-img').hide()
        var first = name[0].toUpperCase()
        $('.text-avatar').html(first).show()
    }
}