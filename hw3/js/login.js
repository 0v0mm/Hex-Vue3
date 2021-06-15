const url = 'https://vue3-course-api.hexschool.io';
const path = 'minnvue';

// 取出DOM元素
const usernameInput = document.querySelector('#username')
const passwordInput = document.querySelector('#password')
const loginBtn = document.querySelector('#login')
loginBtn.addEventListener('click', login);
// const form = document.querySelector('#form')
// form.addEventListener('submit', login);

function login(event) {
  event.preventDefault();
  const username = usernameInput.value;
  const password = passwordInput.value;
  const data = {
    username,
    password,
  }
  axios.post(`${url}/admin/signin`, data) // 發出請求
    .then((res) => {
      console.log(res);
      if (res.data.success) {
        const { token, expired } = res.data;
        console.log(expired, new Date(expired));
        // 將 Token 存到 Cookie
        document.cookie = `hexToken=${token};expires=${new Date(expired)}; path=/`;
        window.location = 'products_w3.html';
      } else {
        alert(res.data.message);
      }
    }).catch((error) => {
      console.log(error);
    });
}