 //判断 是否存在 localStorage   不存在就新定义一个  用于全局使用登陆状态
 if(!localStorage ){
    localStorage.setItem('login', false);
    console.log(localStorage.getItem('login'))
  }
  console.log('config.js is running! ')
