import React, { Component } from 'react'
import Autocomplete from './autocomplete'
import countries from './countries'
import './app.css'

class App extends Component {
  state = {
    query: '',
    activeItem: '',
  }

  activeItemChanged = item => {
    this.setState({ activeItem: item ? item.name : '' })
  }

  handleSelect = item => {
    console.log(item)
  }

  render() {
    const { query, activeItem } = this.state

    return (
      <main className="form">
        <p>Hint: start typing 'uni'.</p>
        <label htmlFor="query">Country: </label>
        <input
          autoFocus
          id="query"
          type="text"
          value={activeItem || query}
          onChange={e => this.setState({ query: e.target.value, activeItem: '' })}
          // prevents cursor from jumping to the beginning on UP key
          onKeyDown={e => e.keyCode === 38 && e.preventDefault()}
        />

        <Autocomplete
          query={query}
          data={countries}
          onSelect={this.handleSelect}
          onActiveItemChange={this.activeItemChanged}
        />
      </main>
    )
  }
}

export default App
