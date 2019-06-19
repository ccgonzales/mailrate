import React from "react"
import {Container, Divider, Segment} from "semantic-ui-react"

const Results = ({response}) => {
  let parser = new DOMParser()
  const doc = parser.parseFromString(response, "text/xml")
  console.log(doc)

  return (
    <React.Fragment>
      <Divider hidden />
      <Container>
        <h2>Rate</h2>
        <Divider />
        <Segment.Group horizontal>
          <Segment>
            <h2>
              Price: $
              {
                doc.getElementsByTagName("CommercialRate")[0].childNodes[0]
                  .nodeValue
              }
            </h2>
          </Segment>
          <Segment>
            <h3>
              Zone:{" "}
              {doc.getElementsByTagName("Zone")[0].childNodes[0].nodeValue}
            </h3>
          </Segment>
        </Segment.Group>
      </Container>
    </React.Fragment>
  )
}

export default Results
