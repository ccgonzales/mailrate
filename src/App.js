import React, {Component} from "react"
import {Header, Container, Divider, Icon} from "semantic-ui-react"
import FormPage from "./components/Form"
import "./App.css"
import Results from "./components/Results"
import Rate from "./components/Rate"

const Stripebar = () => {
  const cells = []
  for (let index = 0; index < window.innerWidth / 10 - 1; index++) {
    cells.push(
      React.createElement("div", {className: "stripebar__cell", key: index})
    )
  }

  return <div className="stripebar">{cells.map(item => item)}</div>
}

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
    let value = target.value
    const name = target.name

    switch (name) {
      case "pounds":
        if (value !== null || value !== undefined) {
          value = Math.ceil(parseFloat(value))
        } else {
          value = 0
        }
        break
      case "ounces":
        if (value !== null || value !== undefined) {
          value = parseFloat(value)
          if (value > 15.0 && value < 16.0) {
            value = 15.99
          } else {
            value = Math.ceil(parseFloat(value))
          }
        } else {
          value = 0
        }
        break
      default:
        break
    }

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
        <Stripebar />
        <Header as="h1" textAlign="center" icon>
          <Icon name="mail" />
          <span className="title">Mailrate</span>
        </Header>
        <main>
          <Container text>
            <p>
              Quickly check the price of mailing a package via USPS. Fill out
              the form below to recieve the rate and zone based on the
              origination and destination of the package.
            </p>
          </Container>
          <Divider />
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
