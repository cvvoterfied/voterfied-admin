import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTwitter, faInstagram, faFacebookF } from '@fortawesome/free-brands-svg-icons';
import Col from 'react-bootstrap/Col';

import "./Footerbar.css";

function Footerbar() {
  return (
    <footer className='footerWrapper'>
        <span className='leftLinks'>  
            <a className='footerLinkL' href='https://voterfied.com'>VOTERFIED.COM</a>
            <a className='footerLinkL' href='https://voterfied.com/privacyPolicy.html'>PRIVACY POLICY</a>
            <a className='footerLinkL' href='https://voterfied.com/terms-conditions.html'>TERMS OF SERVICE</a>
        </span>
        <span className='rightLinks'>
            <Col md={2} sm={2} className='footerLinkR'><a className='footerLinkRight' href='https://twitter.com/Voterfied'><FontAwesomeIcon icon={faTwitter} /></a></Col>
            <Col md={2} sm={2} className='footerLinkR'><a className='footerLinkRight' href='https://www.facebook.com/voterfied/'><FontAwesomeIcon icon={faFacebookF} /></a></Col>
              <Col md={2} sm={2} className='footerLinkR'><a className='footerLinkRight' href='https://www.instagram.com/voterfied'><FontAwesomeIcon icon={faInstagram} /></a></Col>
            <Col md={2} sm={2} className='footerLinkR'><a className='footerLinkRight' href='mailto:contact@voterfied.com'>CONTACT</a></Col>
        </span>
    </footer>
  )
}
export default Footerbar; 