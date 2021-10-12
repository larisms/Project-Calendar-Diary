import axios from 'axios';

const instance = axios.create({
  // 기본적으로 우리가 바라볼 서버의 주소
  baseURL: 'http://localhost:4000/',
  headers: {
    'content-type': 'application/json;charset=UTF-8',
    accept: 'application/json',
  },
});

export const apis = {
  // baseURL을 미리 지정해줬기 때문에 함수의 첫 번째 인자에 들어가는 url은
  // http://localhost:4000/ + 내가 작성한 url 즉 예시로
  // getPost함수에서는 instance.get('http://localhost:4000/posts')로 요청을 보내게 됩니다.
  // get과 delete의 경우 두 번째 인자에 데이터를 담아 보낼수 없기 때문에 서버에 데이터를 보낼경우 쿼리를 이용하여 보내주도록 합니다.

  // 게시물 불러오기
//   getPost: () => instance.get('/posts'),
  // 게시물 작성하기
//   createPost: (contents) => instance.post('/posts', contents),
  // 게시물 수정하기
//   editPost: (id, content) => instance.put(`/posts/${id}`, content),
  // 게시물 삭제하기
//   delPost: (id) => instance.delete(`/posts/${id}`),

//로그인 페이지
logIn:()=>instance.get('/login'),

//회원가입 페이지
signUp:()=>instance.get('/signup'),

//회원가입 등록
createAccount:(list)=>instance.post('/signup',list),

//회원가입시 아이디 중복
checkOverlapID:(userID)=>instance.post('/signup/checkup',{userID})

};