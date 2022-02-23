export {}

const $ = require('jquery');
const axios = require('axios');
/**
 * 使用适配器，替换jquery 老方法
 */

 $.ajax({
   url: '',
   type: 'GET',
   success(data) {

   },
   error(err) {

   }
 })

 function toAxiosAdapter(options) {
   return axios({
      url: options.url,
      method: options.method
   }).then(options.success, options.error)
 }

 $.ajax = (options) => {
   return toAxiosAdapter(options)
 }