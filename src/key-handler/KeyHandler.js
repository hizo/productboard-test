import React from 'react'
import PropTypes from 'prop-types'

class KeyHandler extends React.Component {
  componentDidMount() {
    document.addEventListener('keydown', this.onKeyDown)
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.onKeyDown)
  }

  onKeyDown = e => {
    const { onKeyUp, onKeyDown, onKeyEnter } = this.props

    switch (e.keyCode) {
      case 40:
        // down
        return onKeyDown && onKeyDown()

      case 38:
        // up
        return onKeyUp && onKeyUp()

      case 13:
        // enter
        return onKeyEnter && onKeyEnter()

      default:
        break
    }
  }

  render() {
    return null
  }
}

KeyHandler.propTypes = {
  onKeyUp: PropTypes.func,
  onKeyDown: PropTypes.func,
  onKeyEnter: PropTypes.func,
}

export default KeyHandler
