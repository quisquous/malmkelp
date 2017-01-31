'use strict'

window.addEventListener('load', _ => {

  try {
    for(let k of ['autoattack', 'yalm']) {
      let v = localStorage.getItem('malmkelp_config_' + k)
      let b = !(v && v === 'false')
      document.body.classList.toggle(k, b)
      $('#config_' + k).checked = b
    }
  } catch(e) { }

  $map('[data-config]', _ => {
    _.addEventListener('click', e => {
      let key = _.getAttribute('data-config')
      let type = _.getAttribute('type')
      let value

      if(type === 'checkbox')
        value = _.checked

      localStorage.setItem('malmkelp_config_' + key, value)
      document.body.classList.toggle(key, value)
    })
  })

})
