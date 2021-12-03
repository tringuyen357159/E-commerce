import React from 'react'
import Announcement from '../components/Announcement'
import Category from '../components/Category'
import Navbar from '../components/Navbar'
import Slide from '../components/Slide'
import ListProduct from '../components/ListProduct'
import NewsLatter from '../components/NewsLatter'
import Footer from '../components/Footer'

const Home = () => {
    return (
        <div>
            <Announcement />
            <Navbar />
            <Slide />
            <Category />
            <ListProduct />
            <NewsLatter />
            <Footer />
        </div>
    )
}

export default Home
