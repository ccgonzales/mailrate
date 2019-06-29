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

  buildXMLQuery() {
    let query = document.implementation.createDocument("", "", null)
    let rateRequest = query.createElement("RateV4Request")
    rateRequest.setAttribute(
      "USERID",
      `${process.env.REACT_APP_USPS_API_USERID}`
    )

    let packageGroup = query.createElement("Package")
    packageGroup.setAttribute("ID", "1")

    let packageService = query.createElement("Service")
    let packageFirstClassMailType = query.createElement("FirstClassMailType")
    let packageZipOrigination = query.createElement("ZipOrigination")
    let packageZipDestination = query.createElement("ZipDestination")
    let packagePounds = query.createElement("Pounds")
    let packageOunces = query.createElement("Ounces")
    let packageContainer = query.createElement("Container")
    let packageSize = query.createElement("Size")
    let packageMachinable = query.createElement("Machinable")

    let packageGroupItems = new Array(packageService)

    //there's probably a more concise way of doing this
    if (this.props.data.serviceType.indexOf("FIRST CLASS") !== -1) {
      packageFirstClassMailType.innerHTML = "PACKAGE SERVICE"
      if (this.props.data.serviceType.indexOf("COMMERCIAL") === -1) {
        packageFirstClassMailType.innerHTML += " RETAIL"
      }
      packageGroupItems.push(packageFirstClassMailType)
    }

    packageGroupItems.push(packageZipOrigination)
    packageGroupItems.push(packageZipDestination)
    packageGroupItems.push(packagePounds)
    packageGroupItems.push(packageOunces)

    if (this.props.data.serviceType === "FIRST CLASS") {
      packageContainer.innerHTML = "VARIABLE"
    }
    packageGroupItems.push(packageContainer)

    packageGroupItems.push(packageSize)
    packageGroupItems.push(packageMachinable)

    packageGroupItems.forEach(item => packageGroup.appendChild(item))

    //unfortunately, these can't be chained within each other
    rateRequest.appendChild(packageGroup)
    query.appendChild(rateRequest)

    query.getElementsByTagName(
      "Service"
    )[0].innerHTML = this.props.data.serviceType
    query.getElementsByTagName(
      "ZipOrigination"
    )[0].innerHTML = this.props.data.zipOrigin
    query.getElementsByTagName(
      "ZipDestination"
    )[0].innerHTML = this.props.data.zipDestination
    query.getElementsByTagName("Pounds")[0].innerHTML = this.props.data.pounds
    query.getElementsByTagName("Ounces")[0].innerHTML = this.props.data.ounces
    query.getElementsByTagName("Size")[0].innerHTML = "REGULAR"
    query.getElementsByTagName("Machinable")[0].innerHTML = "false"

    let serializer = new XMLSerializer()

    return serializer.serializeToString(query)
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
    const xmlPayload = this.buildXMLQuery()
    const urlComplete = urlBase + xmlPayload

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
    const urlBase =
      "http://production.shippingapis.com/ShippingAPI.dll?API=RateV4&XML="
    const xmlPayload = this.buildXMLQuery()
    const urlComplete = urlBase + xmlPayload

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
