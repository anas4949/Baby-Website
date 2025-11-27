import React from 'react'
import Hero from '../Components/Hero/Hero'
import Sale from '../Components/Sale/Sale'
import Collection from '../Components/Collection/Collection'
import Reviews from '../Components/Reviews/Reviews'
import Subscribe from '../Components/Subscribe/Subscribe'

const Home = () => {
  return (
    <div>
      <Hero/>
      <Sale/>
      <Collection />
      <Reviews/>
      <Subscribe/>
    </div>
  )
}

export default Home