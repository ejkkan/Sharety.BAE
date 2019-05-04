export default {
  isLoggedIn: async (parent, args, { request }) => request.isLoggedIn
};
