  // 判断是否登录 来显示 具体的按钮 信息
  function loginBtnValue(){
    //两种状态 登录/用户名
    const loginBtn = document.getElementById('loginBtn')

    //判断 是否登录
    if(localStorage.getItem('login') == 'true'){
      loginBtn.innerHTML = localStorage.getItem('userName');
    }
    else{
      loginBtn.innerHTML = "登录";
    }
  }
  loginBtnValue()


  //存储验证码相关信息
  let code = ''
  let codeId = ''
  let codeImg = ''


  //获取/刷新 验证码
  const getverigy = () => {
    document.getElementById('inputCode').value = ''

    fetch('https://api.innovate.quwancode.com/api_1_0/verify-code', {
      method: 'GET',
    })
      .then(function (response) {
        return response.json()
      })
      .then(res => {
        codeImg = res.data.verify_code_base64
        codeId = res.data.verify_code_id
        code = res.data.verify_code
        document.getElementById("myImg").src = codeImg;
      });
  }

  // post数据 处理
  function objectToFormData(obj, form, namespace) {
    const fd = form || new FormData();
    let formKey;
    for (var property in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, property)) {
        const key = Array.isArray(obj) ? "[]" : `[${property}]`;
        if (namespace) {
          formKey = namespace + key;
        } else {
          formKey = property;
        }
        // if the property is an object, but not a File, use recursivity.
        if (typeof obj[property] === "object" && !(obj[property] instanceof File)) {
          objectToFormData(obj[property], fd, formKey);
        } else {
          // if it's a string or a File object
          fd.append(formKey, obj[property]);
        }
      }
    }
    return fd;
  }

  //密码加密
  function rsa_encrypt(params) {
    // console.log(params)
    const PublicKey = "MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAuOETBCLuWJWTguFSiUXHvg02qRXNaeS5zYYtd7WaA8e2q4aG4wiCreOwFVGJXFRLvvtPKJ9A6B128Hh6bncMa+GeloA00DMoVccs6dyLAmYuhu7jifhSrevfhFyz1flVrTdCiIrdgNfbcmqx7c1kldMb/1cbSgNQ8cOqVqiXI+KV59MloW43M6n4HBjtdplUUx1f/jLqVk5bHB9pyD0E95rnOV7zQu9u0RvCP+vHfyOOSl60m3mZcMhzKQYr36g2fb6PDeRBDuzXTeqmbDhD3Lk9xsaPvereS/eBxZuh0e/rl8a/mQTYMnhFKsTQwjrtHkkJ6NFhvvl4TO2Q1LTuPQIDAQAB"

    const Encrypt = new JSEncrypt();

    Encrypt.setPublicKey(PublicKey);

    let timestamp = "" + parseInt(new Date() / 1000);
    let param = params.toString() + timestamp;
    let data = Encrypt.encrypt(
      typeof params === 'object' ? JSON.stringify(params) : param
    );
    return data
  }


  //登录的接口调用
  const loginApi = function (parmas) {
    console.log('api')

    // 发送登录请求
    fetch('https://api.innovate.quwancode.com/api_1_0/sso-user-login', {
      method: 'POST',
      body: parmas
      //body: JSON.stringify(parmas)
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
        localStorage.setItem('userName', res.data.user_name);
        localStorage.setItem('userIntroduce'.res.data.userIntroduce)
        alert(res.data.userIntroduce)
        
        loginBtnValue()
        console.log(res)

        closeDialog()
        location.reload();
      }
      else {
        getverigy()
        alert(res.message)
      }

    });
  }

  // 登录功能
  const userLogin = function () {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const inputCode = document.getElementById('inputCode').value
    const parmas = {
      account: username,
      password: rsa_encrypt(password),
      verify_code_id: codeId,
      verify_code: inputCode
    }
    const fd = objectToFormData(parmas)
    loginApi(fd)
  }
  // 预加载 验证码
  window.onload = function () {
    getverigy()
  }

  // 回车事件
  //document.onkeydown = function (e) {
  //  const dialog = document.getElementById('login-form').style.display
  //  if (e.key === 'Enter' && dialog === 'block') {
  //      console.log('asda')
  //      userLogin()
  //  }
  //}

  // 显示登录窗口
  const $loginBtn = document.getElementById('loginBtn');
  $loginBtn.addEventListener('click', function showDialog() {
    // 退出登录 
    if (localStorage.getItem('login') === 'true') {
      if (confirm("你想要退出登陆吗?")) {
        // 用户选择了“确定”
        localStorage.setItem('login', false);
        loginBtnValue()
        location.reload();
        
      } else {
        // 用户选择了“取消”
      }
    }
    else {
      // getverigy()
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
    getverigy()
  }

  // 关闭 登录窗口
  const $closeBtn = document.getElementById('closeBtn');
  $closeBtn.addEventListener('click', () => closeDialog());


  //默认值
  document.getElementById('username').value = '陈钦宇'
  document.getElementById('password').value = 'cqy'

  // 登陆提交
  const $submitBtn = document.getElementById('submitBtn')
  $submitBtn.addEventListener('click', userLogin);