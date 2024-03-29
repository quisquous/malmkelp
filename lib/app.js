'use strict'

const vDistance = (a, c) => Math.sqrt(c*c - a*a).toFixed(1)

window.addEventListener('load', _ => {

  const POINTS = {
    vDistance: 1,
    Distance: 2,
    HPPercent: 2
  }

  if(location.hash){
    try {
      let scale = parseFloat(location.hash.slice(1))
      if(0.5 <= scale && scale <= 2.0) {
        $('html', 0).style.fontSize = (scale * 16) + 'px'
      }
    } catch(e) {}
  }

  document.addEventListener('onOverlayDataUpdate', event => {
    let enmity = event.detail.Enmity

    $map('[data-key]', el => {
      let key = el.getAttribute('data-key')
      let point = el.getAttribute('data-point')
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
        } else if(key2 == 'HPPercent') {
          v = (o.CurrentHP / o.MaxHP * 100).toFixed(2)
        } else {
          v = o[key2]
        }

        animateNumber(e, parseFloat(v), {
          timeout: 100,
          digit: point || key2 in POINTS && POINTS[key2] || 0
        })
      })
    })
  })

})
