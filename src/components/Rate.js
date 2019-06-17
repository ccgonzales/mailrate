import React, {Component} from "react"
import Results from "./Results"

// this code looks terrible, but it does get a response. unfortunately, it does it twice

class Rate extends Component {
  constructor(props) {
    super(props)

    this.state = {
      response: "",
      done: false
    }
  }

  // cant use because 'this.setState' because 'this' is bound to event; maybe try to rebind?
  //   xhrListener() {
  //     console.log(this.responseText)
  //     //const xhrResponse = this.responseText
  //     //this.setState({response: xhrResponse})
  //   }

  componentDidMount() {
    const urlBase =
      "http://production.shippingapis.com/ShippingAPI.dll?API=RateV4&XML="
    const xmlPayload = `<RateV4Request USERID="${process.env.REACT_APP_USPS_API_USERID}">
    <Package ID="1"><Service>${this.props.data.serviceType}</Service>
    <FirstClassMailType>PACKAGE SERVICE</FirstClassMailType>
    <ZipOrigination>${this.props.data.zipOrigin}</ZipOrigination>
    <ZipDestination>${this.props.data.zipDestination}</ZipDestination>
    <Pounds>${this.props.data.pounds}</Pounds>
    <Ounces>${this.props.data.ounces}</Ounces>
    <Container />
    <Size>REGULAR</Size></Package>
</RateV4Request>`

    const urlComplete = urlBase + xmlPayload.replace(/\n/, "")

    let xhr = new XMLHttpRequest()
    xhr.open("GET", encodeURI(urlComplete), true)

    xhr.onload = function(e) {
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          this.setState({response: xhr.responseText, done: true})
        } else {
          console.error(xhr.statusText)
        }
      }
    }.bind(this)

    xhr.send()
  }

  componentDidUpdate(prevProps) {
    const data = this.props.data
    console.log(prevProps)
    const urlBase =
      "http://production.shippingapis.com/ShippingAPI.dll?API=RateV4&XML="
    const xmlPayload = `<RateV4Request USERID="${process.env.REACT_APP_USPS_API_USERID}">
    <Package ID="1"><Service>${this.props.data.serviceType}</Service>
    <FirstClassMailType>PACKAGE SERVICE</FirstClassMailType>
    <ZipOrigination>${this.props.data.zipOrigin}</ZipOrigination>
    <ZipDestination>${this.props.data.zipDestination}</ZipDestination>
    <Pounds>${this.props.data.pounds}</Pounds>
    <Ounces>${this.props.data.ounces}</Ounces>
    <Container />
    <Size>REGULAR</Size></Package>
</RateV4Request>`

    const urlComplete = urlBase + xmlPayload.replace(/\n/, "")

    let xhr = new XMLHttpRequest()
    xhr.open("GET", encodeURI(urlComplete), true)

    xhr.onload = function(e) {
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          console.log(prevProps.data)
          console.log(xhr.responseText)
          if (JSON.stringify(prevProps.data) !== JSON.stringify(data)) {
            console.log("new data")
            this.setState({response: xhr.responseText, done: true})
          } else {
            console.log("old data")
          }
        } else {
          console.error(xhr.statusText)
        }
      }
    }.bind(this)

    xhr.send()
  }

  render() {
    return this.state.done && <Results response={this.state.response} />
  }
}

export default Rate
