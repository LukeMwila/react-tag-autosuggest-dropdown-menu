# react-tag-autosuggest-dropdown-menu

A tagging component that has an autosuggest dropdown menu that highlights the matching characters.

## Installation

  ```bash
  npm install react-tag-autosuggest-dropdown-menu --save
  ```
  or
  ```bash
  yarn add react-tag-autosuggest-dropdown-menu
  ```

## Usage

```js
import ReactTagAutoSuggestDropdown from 'react-tag-autosuggest-dropdown-menu'

class App extends Component {
  constructor () {
    super()
    this.state = {
      chosenValue: '',
      searchValue: '',
      showDropdown: false,
      list: [
        {
          id: 1,
          valueToSearch: "Wezi Amanda"
        },
        {
          id: 2,
          valueToSearch: "Mikayu Chindongo"
        },
        {
          id: 3,
          valueToSearch: "Suzuki Kelvin Mwila"
        },
        {
          id: 4,
          valueToSearch: "Maya Thundu"
        },
        {
          id: 5,
          valueToSearch: "Tinta Mwila"
        },
        {
          id: 6,
          valueToSearch: "Franco Lubinda"
        },
        {
          id: 7,
          valueToSearch: "Tchalla Brown"
        },
        {
          id: 8,
          valueToSearch: "Chanda Rose Mwila"
        }
      ],
      chosenItems: []
    }
    this.chooseDropdownItem = this.chooseDropdownItem.bind(this)
    this.updateSearchValue = this.updateSearchValue.bind(this)
    this.showDropdown = this.showDropdown.bind(this)
    this.detectBackSpace = this.detectBackSpace.bind(this)
    this.removeTag = this.removeTag.bind(this)
  }

  chooseDropdownItem (e, valueSelected, valueObject) {
    e.preventDefault()
    this.setState({ showDropdown: false, searchValue: '', chosenItems: [...this.state.chosenItems, valueObject ] })
  }

  detectBackSpace(e){
    e.preventDefault()
    if (e.keyCode === 8 && this.state.searchValue === '' && this.state.chosenItems.length > 0) {
      // backspace key has been hit
      let chosenItems = this.state.chosenItems
      chosenItems.pop()
      this.setState({ chosenItems: chosenItems })
    }
  }

  removeTag(e, tagID){
    e.preventDefault()
    const tags = this.state.chosenItems.filter(tag => tag.id !== tagID)
    this.setState({ chosenItems: tags })
  }

  updateSearchValue(e){
    e.preventDefault()
    this.setState({ searchValue: e.target.value })
  }

  showDropdown(){
    this.setState({ showDropdown: true })
  }

  render() {
    return (
      <div className='App'>
       <ReactTagAutoSuggestDropdown 
          list={this.state.list} 
          showDropdown={this.showDropdown} 
          displayDropdownMenu={this.state.showDropdown}
          chosenValue={this.state.chosenValue} 
          chooseDropdownItem={this.chooseDropdownItem} 
          updateSearchValue={this.updateSearchValue}
          searchValue={this.state.searchValue}
          highlightColour={"#ff9966"}
          chosenItems={this.state.chosenItems}
          detectBackSpace={this.detectBackSpace}
          removeTag={this.removeTag}
        />
       </div>
    );
  }
}

export default App;
```

#### ReactTagAutoSuggestDropdown props

| Props              | Default values | Possible values                          |
| -------------------| --------------| ------------------------------------------|
| list               | none          | array                                     |
| chosenItems        | none          | array                                     |
| showDropdown       | none          | function                                  |
| displayDropdownMenu| false         | bool                                      |
| chosenValue        | none          | any                                       |
| searchValue        | none          | any                                       |
| chooseDropdownItem | none          | function                                  |
| updateSearchValue  | none          | function                                  |
| detectBackSpace    | none          | function                                  |
| removeTag          | none          | function                                  |
| highlightColour    | "#00cc99"     | string                                    |