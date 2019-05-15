import React from 'react'
import cx from 'classnames'
// Style
import s from './Icon.sass'

const unicode = input =>
  input.replace(/\\u(\w\w\w\w)/g, (a, b) =>
    String.fromCharCode(parseInt(b, 16)),
  )

const Icon = ({ icon, className }) => (
  <i className={cx(s.icon, className)}>{unicode(icon)}</i>
)

export default Icon
