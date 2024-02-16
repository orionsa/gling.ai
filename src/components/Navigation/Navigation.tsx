import { FC } from 'react';
import { Link, Route, Routes, Navigate } from 'react-router-dom';

import { UploadVideo } from '../../pages/UplaodVideo/UploadVideo';
import { Editor } from '../../pages/Editor/Editor'; 
import './Navigation.scss';

export const Navigation:FC = ()=> {
  return (
    <>
        <nav className='navigation'>
          <Link className='navigation__link' to="/upload">Upload</Link>
          <Link className='navigation__link' to="/editor">Editor</Link>
        </nav>
        <Routes>
          <Route path="/upload" element={<UploadVideo />} />              
          <Route path="/editor" element={<Editor />} />            
          <Route path="/" element={<Navigate to="/upload" />} />
        </Routes>
    </>
  )
}