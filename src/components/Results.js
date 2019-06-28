import React from "react"
import {Container, Divider, Segment} from "semantic-ui-react"

const ErrorResults = props => {
  const errorDesc = props.xmlDoc.getElementsByTagName("Description")[0]
    .innerHTML
  return (
    <React.Fragment>
      <h2>Error</h2>
      <Divider />
      <Segment>
        <p>{errorDesc}</p>
      </Segment>
    </React.Fragment>
  )
}

const Results = ({response}) => {
  let parser = new DOMParser()
  const doc = parser.parseFromString(response, "text/xml")
  console.log(doc)

  const error = doc.getElementsByTagName("Error").length !== 0 ? true : false

  let price,
    zone = ""

  if (!error) {
    zone = doc.getElementsByTagName("Zone")[0].childNodes[0].nodeValue
    if (doc.getElementsByTagName("CommercialRate").length !== 0) {
      price = doc.getElementsByTagName("CommercialRate")[0].childNodes[0]
        .nodeValue
    } else if (doc.getElementsByTagName("Rate").length !== 0) {
      price = doc.getElementsByTagName("Rate")[0].childNodes[0].nodeValue
    }
  }

  return (
    <React.Fragment>
      <Divider hidden />
      <Container>
        <Segment.Group horizontal>
          {error ? (
            <Segment>
              <ErrorResults xmlDoc={doc} />
            </Segment>
          ) : (
            <Segment>
              <h2>Rate</h2>
              <Divider />
              <Segment>
                <h2>Price: ${price}</h2>
              </Segment>
              <Segment>
                <h3>Zone: {zone}</h3>
              </Segment>
            </Segment>
          )}
        </Segment.Group>
      </Container>
    </React.Fragment>
  )
}

export default Results
