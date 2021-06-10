const app = {
  data: {
    apiUrl: 'https://vue3-course-api.hexschool.io/api',
    apiPath: 'minnvue',
    products: [],
  },

  // 取得產品列表
  getData(page = 1) {
    const url = `${this.data.apiUrl}/${this.data.apiPath}/admin/products?page=${page}`;
    axios.get(url).then((response) => {
      if (response.data.success) {
        this.data.products = response.data.products;
        this.render(); // 觸發render渲染商品於畫面
      } else {
        alert('您尚未登入，請重新登入。');
        window.location = 'login.html';
      }
    }).catch((error) => {
        console.log(error);
    });
  },

  // 刪除產品
  deleteData(e) {
    if (window.confirm('確定刪除此商品嗎？')) {
      const { id } = e.target.dataset;
      const url = `${this.data.apiUrl}/${this.data.apiPath}/admin/product/${id}`;

      axios.delete(url).then((response) => {
        if (response.data.success) {
          alert(response.data.message)
          this.getData();
        }
      });
    }
  },

  // 渲染
  render() {

    //產品清單DOM元素 
    const el = document.querySelector('#productList');
    const productCount = document.querySelector('#productCount');

    // 定義空字串
    let str = '';
    this.data.products.forEach((item) => {
      str += `
        <tr>
          <td>${item.title}</td>
          <td width="120">
            ${item.origin_price}
          </td>
          <td width="120">
            ${item.price}
          </td>
          <td width="100">
            <span class="${item.is_enabled ? 'text-success' : 'text-secondary'}">${item.is_enabled ? '啟用' : '未啟用'}</span>
          </td>
          <td width="120">
            <button type="button" class="btn btn-sm btn-outline-danger move deleteBtn" data-action="remove" data-id="${item.id}"> 刪除 </button>
          </td>
        </tr>`;
    });

    // 渲染DOM元素
    el.innerHTML = str;
    productCount.textContent = this.data.products.length;
    const deleteBtn = document.querySelectorAll('.deleteBtn');
    deleteBtn.forEach((item) => {
      item.addEventListener('click', this.deleteData.bind(this));
    })
  },
  init() {
    // 取出 Token
    const token = document.cookie.replace(/(?:(?:^|.*;\s*)hexToken\s*=\s*([^;]*).*$)|^.*$/, '$1');
    axios.defaults.headers.common.Authorization = token;

    this.getData();
  }
}

app.init();