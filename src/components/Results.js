import React from "react"
import {Container, Divider, Segment, Table} from "semantic-ui-react"
import {Html5Entities} from "html-entities"

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

const ResultsList = props => {
  const list = Array.from(props.postageList)
  const htmlEntities = new Html5Entities()
  const cleaned = htmlEntities
    .decode(list[0].getElementsByTagName("MailService")[0].innerHTML)
    .replace(/&lt;\w+&gt;&\W\d+;&lt;\/\w+&gt;/, "")

  console.log(cleaned)

  return (
    <Table>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell>Service</Table.HeaderCell>
          <Table.HeaderCell>Retail Rate</Table.HeaderCell>
          <Table.HeaderCell>Commercial Rate</Table.HeaderCell>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {list.map((item, index) => (
          <Table.Row key={index}>
            <Table.Cell>
              <span
                dangerouslySetInnerHTML={{
                  __html: htmlEntities
                    .decode(
                      item.getElementsByTagName("MailService")[0].innerHTML
                    )
                    .replace(/&lt;\w+&gt;&\W\d+;&lt;\/\w+&gt;/, "")
                }}
              />
            </Table.Cell>
            <Table.Cell textAlign="right">
              {item.getElementsByTagName("Rate")[0].innerHTML}
            </Table.Cell>
            <Table.Cell textAlign="right">
              {item.getElementsByTagName("CommercialRate").length !== 0
                ? item.getElementsByTagName("CommercialRate")[0].innerHTML
                : "N/A"}
            </Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table>
  )
}

const Results = ({response}) => {
  let parser = new DOMParser()
  const doc = parser.parseFromString(response, "text/xml")
  console.log(doc)

  const error = doc.getElementsByTagName("Error").length !== 0 ? true : false

  const postageList = doc.getElementsByTagName("Postage")

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
            <ErrorResults xmlDoc={doc} />
          ) : (
            <ResultsList postageList={postageList} />
          )}
        </Segment.Group>
      </Container>
    </React.Fragment>
  )
}

export default Results
