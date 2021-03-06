import { defineNuxtPlugin } from '@nuxtjs/composition-api'
import { MessageBox, Notification, Message, Loading } from 'element-ui'
import lodash from 'lodash'
const nzhcn = require('nzh/cn')
const { toWords } = require('number-to-words')

export default defineNuxtPlugin((_context, inject) => {
  // context.$msgbox = MessageBox
  // context.$alert = MessageBox.alert
  // context.$confirm = MessageBox.confirm
  // context.$prompt = MessageBox.prompt
  // context.$notify = Notification
  // context.$message = Message
  // context.$fullLoading = Loading.service
  // context.$_ = lodash
  // context.$nzhcn = nzhcn
  inject('msgbox', MessageBox)
  inject('alert', MessageBox.alert)
  inject('confirm', MessageBox.confirm)
  inject('prompt', MessageBox.prompt)
  inject('notify', Notification)
  inject('message', Message)
  inject('fullLoading', Loading.service)
  inject('_', lodash)
  inject('nzhcn', nzhcn)
  inject('toWords', toWords)
  // Object.defineProperty(Vue.prototype, '$msgbox', {
  //   get() {
  //     return MessageBox
  //   }
  // })
  // Object.defineProperty(Vue.prototype, '$alert', {
  //   get() {
  //     return MessageBox.alert
  //   }
  // })
  // Object.defineProperty(Vue.prototype, '$confirm', {
  //   get() {
  //     return MessageBox.confirm
  //   }
  // })
  // Object.defineProperty(Vue.prototype, '$prompt', {
  //   get() {
  //     return MessageBox.prompt
  //   }
  // })
  // Object.defineProperty(Vue.prototype, '$notify', {
  //   get() {
  //     return Notification
  //   }
  // })
  // Object.defineProperty(Vue.prototype, '$message', {
  //   get() {
  //     return Message
  //   }
  // })
}
)
