import React from 'react';

function Dashboard() {
  return (
    <div style={{ padding: '20px' }}>
      <h1>Welcome to the Homepage</h1>
      <p>This is the public landing page.</p>
      {/* You might redirect logged-in users away from here */}
    </div>
  );
}

export default Dashboard;