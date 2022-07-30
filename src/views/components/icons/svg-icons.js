const req = require.context('../../../assets/icons/svg', false, /\.svg$/)
const requireAll = requireContext => requireContext.keys()
const re = /\.\/(.*)\.svg/

// console.log(requireAll(req));
const SvgIcon = requireAll(req).map(x => {
  return x.match(re)[1]
})
// console.log(SvgIcon);
export default SvgIcon
