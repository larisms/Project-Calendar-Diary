import axios from "axios";
import Main from "../pages/Main";

const instance = axios.create({
  // 기본적으로 우리가 바라볼 서버의 주소
  baseURL: "http://localhost:4000/",
  headers: {
    "content-type": "application/json;charset=UTF-8",
    accept: "application/json",
  },
  withCredentials: true,
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
  logInAX: () => instance.get("/login"),

  //회원가입 페이지
  signUpAX: () => instance.get("/signup"),

  //회원가입 등록
  createAccountAX: (user) => instance.post("/signup", user),

  //회원가입시 아이디 중복
  checkOverlapAX: (userID) => instance.post("/signup/checkup", { userID }),

  //로그인
  loginPostAX: (user) => instance.post("/login", user),

  //캘린더 목록 가져오기
  getPostAX: (date) => instance.get("/", date),

  // 게시물 불러오기
  setContentAX: () => instance.get("/diary"),

  // 게시물 작성하기
  addContentAX: (post) => instance.post("/diary", post),

  // 게시물 수정하기
  udtContentAX: (id, post) => instance.put(`/diary/${id}`, post),

  // 게시물 삭제하기
  delContentAX: (id) => instance.delete(`/diary/${id}`),
};
