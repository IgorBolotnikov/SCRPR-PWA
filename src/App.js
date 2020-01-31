import React from 'react';
// Pages
import IndexPage from './pages/indexPage';
// Components
import Navbar from './components/navbar';
import Footer from './components/footer';

function App() {
  return (
    <React.Fragment>
      <Navbar />
      <IndexPage />
      <Footer />
    </React.Fragment>
  );
}

export default App;
