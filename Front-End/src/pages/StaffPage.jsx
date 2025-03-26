import React from 'react'
import StaffNavBar from '../components/NavBars/StaffNavBar'
import ViewStaff from '../components/Staff/ViewStaff'

const StaffPage = () => {
  return (
    <div>   
        <StaffNavBar />
        <div className="container mt-5">
            <h2>Staff Page</h2>
            <ViewStaff />
        </div>
    </div>
  )
}

export default StaffPage
