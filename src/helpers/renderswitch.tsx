import React from 'react'

const AddTripButton = (props: any) => {
  return <button onClick={props.addTrip} className="nav-item active" style={{marginRight: "100px"}}>Proceed</button>
}

export default AddTripButton