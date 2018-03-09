import React, { Component } from 'react'
import AutosuggestDropdown from './AutosuggestDropdown'

class ReactTagAutoSuggestDropdown extends Component {
  constructor(){
    super()
    this.state = {
      tags: []
    }
  }

  componentWillReceiveProps(nextProps){
    if(nextProps.chosenItems && nextProps.chosenItems){
      this.setState({ tags: nextProps.chosenItems })
    }
  }

  displayTags(){
    let tags = null
    if(Array.isArray(this.state.tags) && this.state.tags.length){
      tags = this.state.tags.map((tag, index) => {
        return <button key={tag.id} onClick={(e) => this.props.removeTag(e, tag.id)}>{ tag.valueToSearch }</button>
      })
    }

    return tags
  }

  render(){
    return(
      <div className='float-left full-width tag-auto-suggest-container'>
        <div>
          { this.displayTags() }
          <input
            className='standard-input-field'
            placeholder='Start typing or select'
            value={this.props.searchValue}
            onFocus={this.props.showDropdown}
            onChange={this.props.updateSearchValue}
            onKeyUp={this.props.detectBackSpace}
          />
        </div>
          <AutosuggestDropdown
            itemsToDisplay={(this.props.list.length) ? this.props.list : null }
            displayDropdown={this.props.displayDropdownMenu}
            searchFor={this.props.searchValue}
            chooseDropdownItem={this.props.chooseDropdownItem}
            highlightColour={this.props.highlightColour}
          />
        </div>
    )
  }
}

export default ReactTagAutoSuggestDropdown