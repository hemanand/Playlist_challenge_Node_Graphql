import React from 'react'
import NavLink from './NavLink'

export default React.createClass({
  render() {
    return (
      <div>
        <h1>Playlist_challenge</h1>
        <ul role="nav">
          <li><NavLink to="/about" onlyActiveOnIndex>Library List</NavLink></li>
          <li><NavLink to="/repos">Play List</NavLink></li>
        </ul>
        {this.props.children}
      </div>
    )
  }
})
