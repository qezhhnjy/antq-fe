/**
 * @see https://umijs.org/zh-CN/plugins/plugin-access
 * */
export default function access(initialState: { currentUser?: API.UserVO | undefined }) {
  const {currentUser} = initialState || {};
  const {menuMap} = currentUser || {};
  return menuMap || {blog: true};
}
