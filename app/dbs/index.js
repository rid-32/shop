import mongodb from './mongodb'

const init = () => Promise.all([mongodb])

export default {
    init,
}
