import React, {Component} from "react"
import Form from "./components/Form"
import "./App.css"
import Results from "./components/Results"

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      serviceType: "",
      pounds: "0",
      ounces: "0",
      zipOrigin: "00000",
      zipDestination: "00000",
      results: null
    }

    this.handleInputChange = this.handleInputChange.bind(this)
  }

  handleInputChange(event) {
    const target = event.target
    const value = target.value
    const name = target.name

    this.setState({
      [name]: value
    })
  }

  handleSubmit = event => {
    const fields = Object.entries(this.state)
    let data = ""
    for (const [key, value] of fields) {
      data += `${key} ${value} \n`
    }

    alert(data)
  }

  render() {
    const {results} = this.state
    return (
      <div className="App">
        <header>
          <h1>mailrate</h1>
        </header>
        <main>
          <Form
            onFormChange={this.handleInputChange}
            onFormSubmit={this.handleSubmit}
          />
          {results !== null && <Results />}
        </main>
      </div>
    )
  }
}

export default App
