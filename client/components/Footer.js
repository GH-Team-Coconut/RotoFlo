import React from 'react';
import { Link } from "react-router-dom";
import 'boxicons';

export const Footer = () => {
  return (
    <footer>
      <p className='footer_info'>
       <Link style={{color:'#db4855'}}>Email: rotoflo.ar@gmail.com</Link>    
       <Link><box-icon name='instagram-alt' type='logo' color='#db4855'></box-icon></Link> 
       <Link to="/about" style={{color:'#db4855'}}>About The Developers</Link>
       © 2022 Copyright: RotoFlo
      </p>
    </footer>
  );
};
