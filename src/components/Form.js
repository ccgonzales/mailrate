import React, {Component} from "react"

class Form extends Component {
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
      <div>
        <form onSubmit={this.handleFormSubmit}>
          <label>Service Type:</label>
          <select
            name="serviceType"
            value={serviceType}
            required
            onChange={this.handleChange}
          >
            <option>Choose Service</option>
            <option value="FIRST CLASS">First Class</option>
            <option value="FIRST CLASS COMMERCIAL">
              First Class Commercial
            </option>
            <option value="PRIORITY">Priority</option>
          </select>
          <label>Pounds:</label>
          <input
            name="pounds"
            value={pounds}
            type="number"
            onChange={this.handleChange}
          />
          <label>Ounces:</label>
          <input
            name="ounces"
            value={ounces}
            type="number"
            onChange={this.handleChange}
          />
          <label htmlFor="zipOrigin">Zip Origin:</label>
          <input
            name="zipOrigin"
            id="zipOrigin"
            value={zipOrigin}
            type="text"
            size="5"
            required
            onChange={this.handleChange}
          />
          <label htmlFor="zipDestination">Zip Destination:</label>
          <input
            name="zipDestination"
            id="zipDestination"
            value={zipDestination}
            type="text"
            size="5"
            required
            onChange={this.handleChange}
          />
          <button type="submit">Check Rate</button>
          <button type="reset">Clear</button>
        </form>
      </div>
    )
  }
}

export default Form
