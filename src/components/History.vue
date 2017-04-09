<template>
  <div v-if="shortcodes.length">
    <div>
      <span class="section-heading">Previously shortened by you</span>
      <span class="clear-history" @click="clearHistory()">Clear history</span>
    </div>

    <table class="table">
      <thead>
      <tr>
        <th class="link">Link</th>
        <th class="visits">Visits</th>
        <th class="last-visited">Last visited</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="sc in shortcodes" @click="copyToClipboard(sc)" :class="{new: sc.session === session}">
        <td class="link">
          <div>
            <span>{{ url }}</span><span class="shortcode">{{ sc.shortcode }}</span>
            <span class="click-to-copy">Click to copy this link</span>
          </div>
          <div class="url">{{ sc.url }}</div>
        </td>
        <td class="visits">{{ sc.stats && sc.stats.redirectCount || 0 }}</td>
        <td class="last-visited">{{ sc.stats && moment(sc.stats.lastSeenDate).fromNow() || '-' }}</td>
      </tr>
      </tbody>
    </table>
    <input type="text" id="clipboard" />
  </div>
</template>

<script>
  import { CLEAR_HISTORY } from '../store/constants'
  const moment = require('moment')
  import { session } from '../utils/helpers'

  export default {
    data () {
      return {
        url: 'gymia-shorty.herokuapp.com/',
        session
      }
    },
    methods: {
      moment,
      clearHistory () {
        this.$store.dispatch(CLEAR_HISTORY)
      },
      copyToClipboard (sc) {
        const copyDiv = document.getElementById('clipboard')
        copyDiv.value = this.url + sc.shortcode
        copyDiv.style.display = 'block'
        copyDiv.focus()
        document.execCommand('SelectAll')
        document.execCommand('Copy', false, null)
        copyDiv.style.display = 'none'
      }
    },
    computed: {
      shortcodes () {
        return this.$store.getters.shortcodes
      }
    }
  }
</script>

<style scoped>
  .url {
    max-width: 600px;
    overflow: hidden;
    text-overflow: ellipsis;
    color: #AAA;
  }

  .section-heading {
    font-size: 22px;
    color: #777;
  }

  .clear-history {
    color: #EB4A42;
    font-weight: bold;
    cursor: pointer;
    margin-left: 15px;
    font-size: 15px;
  }

  table {
    table-layout: fixed;
    word-wrap: break-word;
  }

  tbody > tr {
    cursor: pointer;
    border-left: solid transparent 3px;
  }

  .new {
    border-color: #EB4A42;
  }

  th {
    font-weight: 400;
    font-size: 14px;
    color: #AAAAAA;
    text-transform: uppercase;
  }

  td {
    white-space: nowrap;
  }

  .visits {
    width: 70px;
  }

  .last-visited {
    width: 130px;
  }

  .shortcode {
    color: #EB4A42;
  }

  .click-to-copy {
    color: #EB4A42;
    margin-left: 15px;
    display: none;
    position: absolute;
  }

  tr:hover .click-to-copy {
    display: inline;
  }

  #clipboard {
    position: absolute;
    top: -50px;
    display: none;
  }
</style>