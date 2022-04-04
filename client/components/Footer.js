import React from 'react';
import 'boxicons'
import { Link } from "react-router-dom";

export const Footer = () => {
  return (
    <footer>
      <p className='footer_info'>
        Email: rotoflo.ar@gmail.com <box-icon name='instagram-alt' type='logo' color='#db4855'></box-icon>  <Link to="/about" style={{color:'#db4855'}}>About The Developers</Link> © 2021 Copyright: RotoFlo
      </p>
    </footer>
  );
};

//make an insta and get people to hashtag us?
//hold filter competitions for new coders?
// dance competition video submission?
