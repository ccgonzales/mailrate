import React, {Component} from "react"
import {Button, Form, Container} from "semantic-ui-react"

class FormPage extends Component {
  constructor(props) {
    super(props)
    this.handleChange = this.handleChange.bind(this)
    this.handleFormSubmit = this.handleFormSubmit.bind(this)
  }

  handleFormSubmit = e => {
    e.preventDefault()
    this.props.onFormSubmit(e)
  }

  handleChange = e => {
    this.props.onFormChange(e)
  }

  render() {
    const {serviceType, pounds, ounces, zipOrigin, zipDestination} = this.props
    return (
      <Container>
        <Form onSubmit={this.handleFormSubmit}>
          <Form.Field
            label="Service Type"
            name="serviceType"
            control="select"
            onChange={this.handleChange}
            required
            value={serviceType}
            width={8}
          >
            <option>Choose Service</option>
            <option value="ONLINE">All</option>
            <option value="FIRST CLASS">First Class</option>
            <option value="FIRST CLASS COMMERCIAL">
              First Class Commercial
            </option>
            <option value="PRIORITY">Priority</option>
          </Form.Field>
          <Form.Group>
            <Form.Input
              name="pounds"
              label="Pounds"
              type="text"
              max={70}
              value={pounds}
              onChange={this.handleChange}
            />

            <Form.Input
              name="ounces"
              label="Ounces"
              type="text"
              max={15.99}
              value={ounces}
              onChange={this.handleChange}
            />
          </Form.Group>
          <Form.Group>
            <Form.Input
              name="zipOrigin"
              label="Zip Origin"
              type="text"
              required
              value={zipOrigin}
              onChange={this.handleChange}
            />

            <Form.Input
              name="zipDestination"
              label="Zip Destination"
              type="text"
              required
              value={zipDestination}
              onChange={this.handleChange}
            />
          </Form.Group>
          <Button type="submit" primary>
            Check Rate
          </Button>
          <Button type="reset">Clear</Button>
        </Form>
      </Container>
    )
  }
}

export default FormPage
