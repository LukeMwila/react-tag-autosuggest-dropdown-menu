import React, { Component } from 'react'
import classnames from 'classnames'
import PropTypes from 'prop-types'
import './index.css'

class AutosuggestDropdown extends Component {

  checkForMatch (textBeingChecked) {
    if (textBeingChecked.toUpperCase().indexOf(this.props.searchFor.toUpperCase()) !== -1) {
      let start = textBeingChecked.toUpperCase().search(this.props.searchFor.toUpperCase())
      let end = start + this.props.searchFor.length
      let stringToWrap = ''
      for (let i = 0; i < textBeingChecked.length; i++) {
        if (i === start) {
          stringToWrap = stringToWrap + ')_' + textBeingChecked.charAt(i)
        } else if (i === end) {
          stringToWrap = stringToWrap + ')_' + textBeingChecked.charAt(i)
        } else {
          stringToWrap = stringToWrap + textBeingChecked.charAt(i)
        }
      }

      return stringToWrap
    } else {
      return textBeingChecked
    }
  }

  itemsToDisplay () {
    let itemsToDisplay = null
    let text, endOfText, divStyle
    let newText = []
    divStyle = { background: "#00cc99" }
    if(this.props.highlightColour && this.props.highlightColour !== ""){
      divStyle = { background: this.props.highlightColour }
    }

    if (this.props.itemsToDisplay) {
      if (this.props.searchFor !== '') {
        itemsToDisplay = this.props.itemsToDisplay.filter((item) => {
          if (item.valueToSearch !== null) {
            return item.valueToSearch.toUpperCase().indexOf(this.props.searchFor.toUpperCase()) !== -1
          }
        })
        if (itemsToDisplay.length) {
          itemsToDisplay = itemsToDisplay.map((item, index) => {
            endOfText = ''

            text = this.checkForMatch(item.valueToSearch)
            if (text.includes(')_')) {
              newText = text.split(')_')
            }

            endOfText = (newText && newText[2]) ? newText[2] : endOfText

            return <div key={index} className='float-left full-width standard-dropdown-menu-item' onClick={(e) => this.props.chooseDropdownItem(e, item.valueToSearch, item)}>
              <i className='fa fa-gavel' />&nbsp;&nbsp;
              {
                (newText.length) ? <span><span>{ newText[0] }</span><span style={divStyle} >{ newText[1] }</span><span>{ newText[2] }</span></span> : text
              }
            </div>
          })
        } 
      }
    }
    return itemsToDisplay
  }

  render () {
    let classes = classnames({
      'standard-dropdown-menu': true,
      'hide-me': !this.props.displayDropdown
    })

    return (
      <div className={classes}>
        { this.itemsToDisplay() }
      </div>
    )
  }
}

AutosuggestDropdown.propTypes = {
  searchFor: PropTypes.string.isRequired,
  itemsToDisplay: PropTypes.array
}

export default AutosuggestDropdown
