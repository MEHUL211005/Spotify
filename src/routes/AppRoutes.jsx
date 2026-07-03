import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from '../pages/Home'
import Library from '../pages/Library'
import Search from '../pages/Search'
import Mainlayout from '../layouts/Mainlayout'

const AppRoutes = () => {
  return (
    <Routes>
        <Route path ='/' element={<Mainlayout />}>
        <Route index element = {<Home />} />
        <Route path='library' element ={<Library />} />
        <Route path ='search' element={<Search />} />
        </Route>
    </Routes>
  );
}

export default AppRoutes