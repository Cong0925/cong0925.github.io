function exitLogin(){
  const $exitBtn = document.getElementById('exitBtn')
  $exitBtn.addEventListener('click',function(){
    if (confirm("你想要退出登陆吗?")) {
      // 用户选择了“确定”
      localStorage.setItem('login', false);
      loginBtnValue()
      location.reload();
      
    } else {
      // 用户选择了“取消”
    }
  })
}
exitLogin()

window.onclick = function(){
  if (!event.target.matches('#loginBtn') && !event.target.matches('.dropdown-content')) {
    document.getElementById("myDropdown").style.display = 'none'
  }
}

// 判断是否登录 来显示 具体的按钮 信息
function loginBtnValue() {
  //两种状态 登录/用户名
  const loginBtn = document.getElementById('loginBtn')

  //判断 是否登录
  if (localStorage.getItem('login') == 'true') {
    loginBtn.innerHTML = localStorage.getItem('userName');
  }
  else {
    loginBtn.innerHTML = "登录";
  }
}
loginBtnValue()


//登录的接口调用
const loginApi = function (parmas) {
  // 发送登录请求
  fetch('https://www.fastmock.site/mock/8c52aef5cd262a1e39dc8a6c6a1f2eb8/api_1_0/api/login', {
    method: 'POST',
    body: parmas
  }).then(function (response) {
    if (response.ok) {
      return response.json()
    } else {
      // 接口访问失败
      alert('登录失败：' + response.statusText);
    }
  }).then(function (res) {
    if (res.code === '2000') {
      // 登录成功，更新全局变量
      localStorage.setItem('login', true);
      localStorage.setItem('userName', res.data.username);
      localStorage.setItem('userIntroduce',res.data.userIntroduce)
      loginBtnValue()
      console.log(res)

      closeDialog()
      location.reload();
    }
    else {
      alert(res.message)
    }

  });
}

//默认值
document.getElementById('username').value = 'admin'
document.getElementById('password').value = '123456'
// 登录功能
const userLogin = function () {
  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;
  const parmas = {
    account: username,
    password: password,
  }
  loginApi(parmas)
}

// 显示登录窗口
const $loginBtn = document.getElementById('loginBtn');
$loginBtn.addEventListener('click', function showDialog() {
  // 退出登录
  if (localStorage.getItem('login') === 'true') {
    if (document.getElementById("myDropdown").style.display == 'block') {
      document.getElementById("myDropdown").style.display = 'none'
    }
    else {
      document.getElementById("myDropdown").style.display = 'block'
    }
  }
  else {
    document.getElementById('login-form').style.display = 'block';
    document.querySelector('.overlay').style.display = 'block';
  }
});

//获取 输入框 
const inputs = document.querySelectorAll('input');
//清空输入框
const closeDialog = () => {
  document.getElementById('login-form').style.display = 'none';
  document.querySelector('.overlay').style.display = 'none';
}

// 关闭 登录窗口
const $closeBtn = document.getElementById('closeBtn');
$closeBtn.addEventListener('click', () => closeDialog());




// 登陆提交
const $submitBtn = document.getElementById('submitBtn')
$submitBtn.addEventListener('click', userLogin);