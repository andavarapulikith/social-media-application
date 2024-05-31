import React from 'react'
import Logo from '../../img/logo.png'
import {UilSearch} from '@iconscout/react-unicons'
import './LogoSearch.css'
const LogoSearch = () => {
  return (
   <div className="LogoSearch">
       {/* <img src={Logo} alt="" /> */}
       
       <div className="Search">
       <div className="s-icon">
               <UilSearch/>
           </div>
           <input type="text" placeholder='Search here' />
          
       </div>
   </div>
  )
}

export default LogoSearch