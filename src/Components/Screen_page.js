import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import Segment_popup from './Segment_popup'

export default function Screen_page() {
    let [popup,setPopup]=useState(false)
function PopupOpen(){
    setPopup(!popup)
}
function closePopup() {
    setPopup(false);
}
  return (
    <div className='screen_page_bg'>
        <div className='transparent_bg'></div>
        <div className='save_segemnt_btn_section' onClick={PopupOpen}>
            <a>Save segment</a>
        </div>
        <div className='popup_section'style={{ display: popup ? 'block' : 'none' }}> 
            <Segment_popup onCancel={closePopup}/>
        </div>
    </div>
  )
}
