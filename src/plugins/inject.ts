import Vue from 'vue'

import { MessageBox, Notification, Message } from 'element-ui'

export default function (context: any, inject: any) {
  context.$msgbox = MessageBox
  context.$alert = MessageBox.alert
  context.$confirm = MessageBox.confirm
  context.$prompt = MessageBox.prompt
  context.$notify = Notification
  context.$message = Message
  inject('msgbox', MessageBox)
  inject('alert', MessageBox.alert)
  inject('confirm', MessageBox.confirm)
  inject('prompt', MessageBox.prompt)
  inject('notify', Notification)
  inject('message', Message)
  Object.defineProperty(Vue.prototype, '$msgbox', {
    get() {
      return MessageBox
    }
  })
  Object.defineProperty(Vue.prototype, '$alert', {
    get() {
      return MessageBox.alert
    }
  })
  Object.defineProperty(Vue.prototype, '$confirm', {
    get() {
      return MessageBox.confirm
    }
  })
  Object.defineProperty(Vue.prototype, '$prompt', {
    get() {
      return MessageBox.prompt
    }
  })
  Object.defineProperty(Vue.prototype, '$notify', {
    get() {
      return Notification
    }
  })
  Object.defineProperty(Vue.prototype, '$message', {
    get() {
      return Message
    }
  })
}
