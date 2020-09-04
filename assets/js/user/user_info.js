$(function () {
    const form = layui.form
    const layer = layui.layer
    form.verify({
        nickname(value) {
            if (value.length > 16) {
                return '昵称长度必须在1~6个字符之间'
            }
        }
    })
    initUserInfo()
    // 初始化用户信息
    function initUserInfo() {
        $.ajax({
            method: 'GET',
            url: '/my/userinfo',
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('获取用户信息失败!')
                }
                console.log(res);
                form.val('formUserInfo', res.data)
            }

        })
    }
    // 重置表单数据
    $('#btnReset').on('click', function (e) {
        e.preventDefault()
        initUserInfo()
    })

    // 监听表单的提交事件
    $('.layui-form').on('submit', function (e) {
        // 阻止表单的默认提交行为
        e.preventDefault()
        // 发起ajax数据请求
        $.ajax({
            method: 'POST',
            url: '/my/userinfo',
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('更新用户信息失败！')
                }
                layer.msg('更新用户信息成功！')

                // 调用父页面中的方法，重新渲染永固的头像和用户的学习
                window.parent.getUserInfo()
            }
        })
    })
})