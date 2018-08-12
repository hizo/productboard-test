import React from 'react'
import PropTypes from 'prop-types'
import cx from 'classnames'
import './autocomplete-item.css'

const AutocompleteItem = ({ item, active, onClick }) => {
  return (
    <li
      className={cx('autocomplete-item', { 'autocomplete-item--active': active })}
      onClick={() => onClick(item)}>
      {item.matched}
      <span className="unmatched">{item.unmatched}</span>
    </li>
  )
}

AutocompleteItem.propTypes = {
  item: PropTypes.shape({
    matched: PropTypes.string.isRequired,
    unmatched: PropTypes.string.isRequired,
  }).isRequired,
  active: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
}

export default AutocompleteItem
