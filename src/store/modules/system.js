import { SHOW_LOADER, HIDE_LOADER } from '../constants'

const state = {
  loader: {
    show: false
  }
}

const actions = {
  [SHOW_LOADER] ({commit}) {
    commit(SHOW_LOADER)
  },
  [HIDE_LOADER] ({commit}) {
    commit(HIDE_LOADER)
  }
}

const mutations = {
  [SHOW_LOADER] ({loader}) {
    loader.show = true
  },
  [HIDE_LOADER] ({loader}) {
    loader.show = false
  }
}

const getters = {
  loader: state => state.loader
}

export default {
  state,
  mutations,
  actions,
  getters
}
