'use strict'

const vDistance = (a, c) => Math.sqrt(c*c - a*a).toFixed(1)

window.addEventListener('load', _ => {

  document.addEventListener('onOverlayDataUpdate', event => {
    let enmity = event.detail.Enmity

    $map('[data-key]', el => {
      let key = el.getAttribute('data-key')
      let bar = $(el, '.bar', 0)

      el.classList.toggle('disabled', !enmity[key])
      if(!enmity[key]) return
      let o = enmity[key]

      $(el, '.distance', 0).classList.toggle('hidden', o.Distance == '0.00')

      el.setAttribute('data-type', o.type)

      if(bar) {
        $(el, '.gauge', 0).classList.toggle('hidden', o.MaxHP == 0)
        bar.style.width = o.CurrentHP / o.MaxHP * 100 + '%'
      }
      $map(el, '[data-value]', e => {
        let key2 = e.getAttribute('data-value')
        let v
        if(key2 == 'vDistance') {
          v = vDistance(parseFloat(o.HorizontalDistance), parseFloat(o.Distance))
        } else {
          v = o[key2]
        }

        animateNumber(e, parseFloat(v), {
          timeout: 100,
          digit: ['vDistance', 'Distance'].indexOf(key2) + 1
        })
      })
    })
  })

})
