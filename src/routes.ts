const routes = {
  home: "/",
  login: "/login",
  signUp: "/sign-up",
  profile: "/profile/:userId",
  editProfile: "/edit-profile/:userId",
  shopDetail: "/shop/:shopId",
  likes: "/likes/:username",
  createCafe: "/add",
  search: "/search",
  comment: "/comment/:shopId",
  category:"/category/:categorySlug"
};

export default routes;
