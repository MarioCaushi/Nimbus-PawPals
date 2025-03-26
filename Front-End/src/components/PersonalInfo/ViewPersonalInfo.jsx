import React from 'react';

const ViewPersonalInfo = ({userInfo}) => {


  return (
    <div className="container my-5">
      <div className="card shadow" style={{
          borderRadius: '15px',
          backgroundColor: '#e1f5fe', // Very light blue for a gentle, almost white look
          border: '1px solid rgb(189, 230, 249)', // Complementary very light blue border
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.05), 0 6px 20px rgba(0, 0, 0, 0.1)' // Subtle shadow for depth
        }}>
        <div className="card-header" style={{
            backgroundColor: '#b3e5fc', // Slightly deeper but still very light blue for the header
            color: 'black', // Keeping the text black for better contrast
            borderRadius: '15px 15px 0 0'
          }}>
         View - Personal Information
        </div>
        <div className="card-body" style={{ color: 'black' }}> 
          <div className="row">
            {Object.entries(userInfo).map(([key, value]) => (
              <InfoItem key={key} label={key.replace(/([A-Z])/g, ' $1').trim()} value={value} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

const InfoItem = ({ label, value }) => (
  <div className="col-12 col-md-6 mb-3">
    <h6 className="mb-0 text-capitalize" style={{ color: 'black', fontWeight: 'bold' }}>{label}</h6> 
    <p>{value}</p>
  </div>
);

export default ViewPersonalInfo;
