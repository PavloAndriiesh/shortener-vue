import {
  APP_START,
  SHORTEN_REQUEST,
  SHORTEN_SUCCESS,
  SHORTEN_FAIL,
  SHORTCODE_STATS_REQUEST,
  SHORTCODE_STATS_SUCCESS,
  SHORTCODE_STATS_FAIL,
  CLEAR_HISTORY
} from '../constants'
import { shorten, shortcodeStats } from '../../utils/api'
import { getItem, setItem, removeItem } from '../../utils/persistent'
import { session } from '../../utils/helpers'

const state = {
  shortcodes: []
}

const actions = {
  [APP_START] ({commit}) {
    const shortcodes = getItem('shortcodes') || []

    shortcodes.forEach(item => {
      commit(SHORTCODE_STATS_REQUEST, item)
      shortcodeStats({
        shortcode: item.shortcode,
        success: res => {
          const shortcodes = getItem('shortcodes') || []
          shortcodes.find(sc => sc.url === item.url).stats = res.data

          setItem('shortcodes', shortcodes)
          commit(SHORTCODE_STATS_SUCCESS, shortcodes)
        },
        fail: err => {
          commit(SHORTCODE_STATS_FAIL, err)
        }
      })
    })
    commit(APP_START, shortcodes)
  },
  [SHORTEN_REQUEST] ({commit}, data) {
    commit(SHORTEN_REQUEST, data)
    shorten(data)
  },
  [SHORTEN_SUCCESS] ({commit}, item) {
    const shortcodes = getItem('shortcodes') || []
    shortcodes.unshift({...item, session, stats: {lastSeenDate: Date.now(), redirectCount: 0, startDate: Date.now()}})
    if (shortcodes.length > 5) shortcodes.pop()
    setItem('shortcodes', shortcodes)
    commit(SHORTEN_SUCCESS, shortcodes)
  },
  [SHORTEN_FAIL] ({commit}, data) {
    commit(SHORTEN_FAIL, data)
  },
  [SHORTCODE_STATS_REQUEST] ({commit}, data) {
    commit(SHORTCODE_STATS_REQUEST, data)
  },
  [SHORTCODE_STATS_SUCCESS] ({commit}, data) {
    commit(SHORTCODE_STATS_SUCCESS, data)
  },
  [SHORTCODE_STATS_FAIL] ({commit}, data) {
    commit(SHORTCODE_STATS_FAIL, data)
  },
  [CLEAR_HISTORY] ({commit}) {
    removeItem('shortcodes')
    commit(CLEAR_HISTORY)
  }
}

const mutations = {
  [APP_START] (state, shortcodes) {
    state.shortcodes = shortcodes
  },
  [SHORTEN_REQUEST] (state) {

  },
  [SHORTEN_SUCCESS] (state, shortcodes) {
    state.shortcodes = shortcodes
  },
  [SHORTEN_FAIL] (state, err) {

  },
  [SHORTCODE_STATS_REQUEST] (state) {

  },
  [SHORTCODE_STATS_SUCCESS] (state, shortcodes) {
    state.shortcodes = shortcodes
  },
  [SHORTCODE_STATS_FAIL] (state, err) {

  },
  [CLEAR_HISTORY] (state) {
    state.shortcodes = []
  }
}

const getters = {
  shortcodes: state => state.shortcodes
}

export default {
  state,
  mutations,
  actions,
  getters
}
