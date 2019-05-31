import React from 'react';
import '../App.css';
import ButtonAppBar from './Header/Header'
import ContentCards from './Content/Content'
import Footer from './Footer/Footer'
 
export default class App extends React.Component {
  render() {
    return (
      <div>
        <ButtonAppBar/>
        <ContentCards/>
        <Footer/>
      </div>
    );
  }
}


