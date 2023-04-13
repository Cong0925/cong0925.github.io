
const userName = document.getElementById('userName_h2')
const userIntroduce = document.getElementById('userIntroduce')
if ('{{$NowUrl}}' != '{{$pointUrl}}') {
  //判断 是否登录
  if ((localStorage.getItem('login') == 'true')) {
    console.log('{{ $NowUrl }}')
    console.log('{{ $pointUrl }}')

    userName.innerHTML = localStorage.getItem('userName')
    userIntroduce.innerHTML = localStorage.getItem('userIntroduce')
    console.log(localStorage.getItem('userIntroduce'))
    document.getElementById('showAdd').style.display = 'inline-block'
  }
  else {
    userName.innerHTML = '未登录'
    document.getElementById('showAdd').style.display = 'none'
  }
}

