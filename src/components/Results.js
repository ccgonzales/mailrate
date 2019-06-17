import React from "react"

const Results = ({response}) => {
  console.log({response})

  let parser = new DOMParser()
  const doc = parser.parseFromString(response, "text/xml")

  return (
    <div>
      <h2>Rate: {response}</h2>
    </div>
  )
}

export default Results
