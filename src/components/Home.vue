<template>
  <div class="home-wrapper col-sm-10 col-md-8 col-lg-6">
    <form class="form-horizontal">
      <fieldset>
        <div class="header">
          <span class="title">Shooooort</span>
          <span class="title-description">The link shortener with a long name</span>
        </div>
        <div class="form-group">
          <input id="link"
                 v-model="url"
                 type="text"
                 maxlength="255"
                 placeholder="Paste the link you want to shorten here"
                 class="form-control input-md"
                 required>
          <button @click="clickHandle" class="btn" :class="{disabled: !isUrlValid(url)}">Shorten this link</button>
        </div>
      </fieldset>
    </form>
    <History></History>
  </div>
</template>

<script>
  import {
    SHOW_LOADER, HIDE_LOADER, SHORTEN_REQUEST, SHORTEN_SUCCESS, SHORTEN_FAIL
  } from '../store/constants'
  import History from './History.vue'

  export default {
    data () {
      return {
        url: ''
      }
    },
    methods: {
      isUrlValid (url) {
        const re = /^((http[s]?|ftp):\/)?\/?([^:/\s]+)((\/\w+)*\/)([\w\-.]+[^#?\s]+)(.*)?(#[\w-]+)?$/
        return re.test(url)
      },
      clickHandle (event) {
        event.preventDefault()

        const url = this.url.trim()
        if (!this.isUrlValid(url)) return

        this.$store.dispatch(SHOW_LOADER)
        this.$store.dispatch(SHORTEN_REQUEST, {
          data: {
            url
          },
          success: res => {
            this.url = ''
            this.$store.dispatch(SHORTEN_SUCCESS, {url, shortcode: res.data.shortcode})
            this.$store.dispatch(HIDE_LOADER)
          },
          fail: err => {
            this.url = ''
            this.$store.dispatch(SHORTEN_FAIL, err)
            this.$store.dispatch(HIDE_LOADER)
          }
        })
      }
    },
    components: {
      History
    }
  }
</script>

<style scoped>
  .home-wrapper {
    float: none;
    margin: 0 auto;
    font-family: 'Roboto', sans-serif;
  }

  .title {
    font-family: 'Montserrat', sans-serif;
    font-size: 47px;
    font-weight: bold;
    color: #EB4A42;
    text-decoration: underline;
  }

  .title-description {
    color: #CCC;
    font-size: 16px;
  }

  .header {
    margin: 60px 0;
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
  }

  .form-group {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 60px 0;
  }

  input {
    margin-right: 5px;
    background-color: #EAEAEA;
  }

  button {
    margin-left: 5px;
    border-color: #EB4a42;
    background-color: #EB4a42;
    color: white;
  }

  button:focus,
  button:hover {
    color: white;
  }

  .disabled, .disabled:hover {
    color: #999;
    border-color: #E0E0E0;
    background-color: #E0E0E0;
  }

  @media only screen and (max-width: 600px) {
    .header {
      flex-direction: column;
      align-items: baseline;
    }
  }
</style>