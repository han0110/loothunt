import raw from './raw'

const interfaces = raw.reduce((prev, abi) => {
  // eslint-disable-next-line no-param-reassign
  prev[abi.name] = abi
  return prev
}, {})

export default interfaces
