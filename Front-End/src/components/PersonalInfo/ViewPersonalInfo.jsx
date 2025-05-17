import React from 'react';

const ViewPersonalInfo = ({ userInfo }) => {
  // Combine full name
  const fullName = `${userInfo.firstName || ''} ${userInfo.lastName || ''}`.trim();

  return (
    <div className="container my-5">
      <div className="card shadow" style={{
        borderRadius: '15px',
        backgroundColor: '#e1f5fe',
        border: '1px solid rgb(189, 230, 249)',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.05), 0 6px 20px rgba(0, 0, 0, 0.1)'
      }}>
        <div className="card-header" style={{
          backgroundColor: '#b3e5fc',
          color: 'black',
          borderRadius: '15px 15px 0 0'
        }}>
          View - Personal Information
        </div>
        <div className="card-body" style={{ color: 'black' }}>
          <div className="row">
            {/* Render Full Name first */}
            {fullName && (
              <InfoItem label="Full Name" value={fullName} />
            )}

            {/* Render remaining fields except excluded ones */}
            {Object.entries(userInfo)
              .filter(([key]) => !['password', 'firstName', 'lastName'].includes(key))
              .map(([key, value]) => (
                <InfoItem
                  key={key}
                  label={key.replace(/([A-Z])/g, ' $1').trim()}
                  value={value}
                />
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const InfoItem = ({ label, value }) => (
  <div className="col-12 col-md-6 mb-3">
    <h6 className="mb-0 text-capitalize" style={{ color: 'black', fontWeight: 'bold' }}>{label}</h6>
    <p>{value}</p>
  </div>
);

export default ViewPersonalInfo;
