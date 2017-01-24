'use strict'

/*
 * Part of kagerou
 *
 * (c) 2017 kuriyama hibiya - GNU Public License Version 3
 *
 */

const $ = function $(root, selector, index) {
  'This is not actually jQuery, just shortcut for `document.querySelectorAll`.'
  if(arguments.length === 2) {
    index = selector
    selector = root
    root = document
  } else if(arguments.length === 1) {
    selector = root
    root = document
    index = undefined
  }

  if(!root) {
    root = document
  }

  if(/^#[0-9a-z_\-]+?$/.test(selector))
    return root.getElementById(selector.slice(1))
  else if(index || index === 0)
    if(index === 0)
      return root.querySelector(selector)
    else
      return root.querySelectorAll(selector)[index]
  else
    return root.querySelectorAll(selector)
}

const $map = function $map(root, selector, callback) {
  let _$

  switch(arguments.length) {
    case 2: // selector, callback, undefined
      _$ = $(root)
      callback = selector
      break
    case 3: // root, selector, callback
      _$ = $(root, selector, false)
      break
  }

  return [].map.call(_$, callback)
}

const updateObject = function updateObject(obj/*, ... */) {
  for(let i=1; i<arguments.length; i++) {
    for(let prop in arguments[i]) {
      let val = arguments[i][prop]
      if(typeof val == 'object')
        updateObject(obj[prop], val)
      else
        obj[prop] = val
    }
  }
  return obj
}

const resolveDotIndex = function resolveDotIndex(o, p, v) {
  // Example:
  //   o: {a: {b: {c: 1}}}
  //   p: 'a.b.c'
  //   returns: 1
  if (typeof p === 'string')
    return resolveDotIndex(o, p.split('.'), v);
  else if (p.length === 1 && v !== undefined)
    return o[p[0]] = v;
  else if (p.length==0)
    return o
  else
    return resolveDotIndex(o[p[0]], p.slice(1), v);
}

const animateNumber = function animateNumber(element, to, option) {
  if(typeof element === 'string') {
    element = $(element, 0)
  }

  option.timeout = option.timeout || 500

  const from = parseFloat(element.textContent)
  const step = (from - to) / (option.timeout / 20)
  let current = from - step

  let set = function(v) {
    element.textContent = v.toFixed(option.digit || 0)
  }

  let interval = setInterval(function() {
    current -= step
    set(current)
    if(current == to) {
      clearInterval(interval)
    }
  }, 20)

  setTimeout(function() {
    clearInterval(interval)
    set(to)
  }, option.timeout)
}
