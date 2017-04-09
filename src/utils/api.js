import axios from 'axios'
axios.defaults.baseURL = 'http://34.250.150.216:3002'

export const shorten = ({data, success = () => {}, fail = () => {}} = {}) => {
  axios({
    data,
    url: '/shorten',
    method: 'post'
  }).then(success)
    .catch(fail)
}

export const shortcodeStats = ({shortcode, success = () => {}, fail = () => {}} = {}) => {
  axios({
    url: '/' + shortcode + '/stats'
  }).then(success)
    .catch(fail)
}
