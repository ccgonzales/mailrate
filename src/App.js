import React, {Component} from "react"
import FormPage from "./components/Form"
//import "./App.css"
import Results from "./components/Results"
import Rate from "./components/Rate"

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      data: {
        serviceType: "",
        pounds: "0",
        ounces: "0",
        zipOrigin: "00000",
        zipDestination: "00000"
      },
      hasData: false
    }

    this.handleInputChange = this.handleInputChange.bind(this)
  }

  handleInputChange(event) {
    const target = event.target
    const value = target.value
    const name = target.name
    const data = {...this.state.data, [name]: value}
    this.setState({data})
  }

  handleSubmit = event => {
    const fields = Object.entries(this.state.data)
    let temp = ""
    for (const [key, value] of fields) {
      temp += `${key} ${value} \n`
    }
    //alert(temp)
    this.setState({hasData: true})
  }

  render() {
    const {hasData} = this.state
    return (
      <div className="App">
        <header>
          <h1>mailrate</h1>
        </header>
        <main>
          <FormPage
            onFormChange={this.handleInputChange}
            onFormSubmit={this.handleSubmit}
          />
          {hasData && <Rate data={this.state.data} />}
        </main>
      </div>
    )
  }
}

export default App
