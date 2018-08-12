import React from 'react'
import PropTypes from 'prop-types'
import memoize from 'memoize-one'
import AutocompleteItem from './AutocompleteItem'
import KeyHandler from '../key-handler'
import './autocomplete.css'

class Autocomplete extends React.Component {
  state = {
    activeItem: null,
    show: false,
  }

  componentDidUpdate(prevProps) {
    if (prevProps.query !== this.props.query) {
      this.setState({ show: !!this.props.query })
    }
  }

  // using memoization function to avoid filtering every time
  // when query and data are the same as last time
  filter = memoize((query, data) => {
    const regex = new RegExp(`^${query}`, 'gi')

    return data
      .reduce((acc, item) => {
        const found = item.name.match(regex)
        if (found) {
          acc.push({
            ...item,
            matched: found[0],
            unmatched: item.name.split(found[0])[1],
          })
        }
        return acc
      }, [])
      .slice(0, 10)
  })

  getItems = () => {
    const { query, data } = this.props
    return this.filter(query, data)
  }

  setActiveItem = item => {
    this.setState({ activeItem: item }, () => {
      const { onActiveItemChange } = this.props
      onActiveItemChange && onActiveItemChange(this.state.activeItem)
    })
  }

  handleKeyDown = () => {
    const items = this.getItems()
    const { activeItem } = this.state
    let nextItem = items[0]

    if (activeItem) {
      const activeItemIndex = items.findIndex(item => item.name === activeItem.name)
      nextItem = items[Math.min(activeItemIndex + 1, items.length - 1)]
    }
    this.setActiveItem(nextItem)
  }

  handleKeyUp = () => {
    const items = this.getItems()
    const { activeItem } = this.state

    if (!activeItem) {
      return
    } else {
      const activeItemIndex = items.findIndex(item => item.name === activeItem.name)
      const previousItem = activeItemIndex === 0 ? null : items[activeItemIndex - 1]
      this.setActiveItem(previousItem)
    }
  }

  hide = () => {
    this.setState({ show: false })
  }

  handleKeyEnter = () => {
    this.hide()
    this.props.onSelect(this.state.activeItem)
  }

  handleItemClick = item => {
    this.setActiveItem(item)
    this.hide()
    this.props.onSelect(item)
  }

  render() {
    const { activeItem, show } = this.state

    const items = this.getItems()

    return show && items.length > 0 ? (
      <React.Fragment>
        <div className="autocomplete">
          <span className="autocomplete__label">Search suggestions</span>

          <ul className="autocomplete__list">
            {items.map(item => (
              <AutocompleteItem
                key={item.code}
                active={activeItem ? activeItem.name === item.name : false}
                item={item}
                onClick={this.handleItemClick}
              />
            ))}
          </ul>
        </div>

        <KeyHandler
          onKeyDown={this.handleKeyDown}
          onKeyUp={this.handleKeyUp}
          onKeyEnter={this.handleKeyEnter}
        />
      </React.Fragment>
    ) : null
  }
}

Autocomplete.propTypes = {
  query: PropTypes.string.isRequired,
  data: PropTypes.array.isRequired,
  onSelect: PropTypes.func.isRequired,
  onActiveItemChange: PropTypes.func,
}

export default Autocomplete
