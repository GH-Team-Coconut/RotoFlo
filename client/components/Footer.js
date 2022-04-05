import React from 'react';
import { Link } from "react-router-dom";
import 'boxicons';

export const Footer = () => {
  return (
    <footer>
      <p className='footer_info'>
        <Link>Email: rotoflo.ar@gmail.com</Link>
        <Link><box-icon name='instagram-alt' type='logo' color='#db4855'></box-icon></Link>
        © 2022 Copyright: RotoFlo
      </p>
    </footer>
  );
};

//make an insta and get people to hashtag us?
//hold filter competitions for new coders?
// dance competition video submission?
