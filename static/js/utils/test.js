    
  export function console1(){
    
  var code = ''
  var codeId = ''
  var codeImg = ''


  const getverigy = () => {
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

  const userLogin = function (parmas) {
    // 发送登录请求
    fetch('https://api.innovate.quwancode.com/api_1_0/sso-user-login', {
      method: 'POST',
      body: parmas
      //body: JSON.stringify(parmas)
    }).then(function (response) {
      if (response.ok) {
        // 登录成功，更新全局变量
        // { { $login = true } }
        return response.json()
      } else {
        // 登录失败，提示错误信息
        alert('登录失败：' + response.statusText);
      }
    }).then(function (res) {
      console.log(res)
    });

  }
  
  window.onload = function () {
    getverigy()
  }
  document.onkeydown = function (e) {
    if (e.key === 'Enter') {
      userLogin()
      closeDialog()
    }
  }

  const $loginBtn = document.getElementById('loginBtn');
  $loginBtn.addEventListener('click', function () {
    document.getElementById('login-form').style.display = 'block';
    document.querySelector('.overlay').style.display = 'block';
  });

  const inputs = document.querySelectorAll('input');
  const closeDialog = () => {
    document.getElementById('login-form').style.display = 'none';
    document.querySelector('.overlay').style.display = 'none';

    for (var i = 0; i < inputs.length; i++) {
      inputs[i].value = '';
    }
  }

  const $closeBtn = document.getElementById('closeBtn');
  $closeBtn.addEventListener('click', () => closeDialog());

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

  document.getElementById('username').value = '陈钦宇'
  document.getElementById('password').value = 'cqy'

  const $submitBtn = document.getElementById('submitBtn')
  $submitBtn.addEventListener('click', function () {
    // 获取表单数据

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const inputCode = document.getElementById('inputCode').value
    const parmas = {
      account: username,
      // password: password,
      password: rsa_encrypt(password),
      verify_code_id: codeId,
      verify_code: inputCode
    }

    const fd = objectToFormData(parmas)

    fd.forEach((value, key) => {
      console.log(key, value);
    });

    userLogin(fd)

    closeDialog()
  });

  }