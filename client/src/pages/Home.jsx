import { useEffect, useState } from 'react';
import {Link} from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import SwiperCore from 'swiper';
import 'swiper/css/bundle';
import ListingItem from '../components/ListingItem';

export default function Home() {
  const [offerListings,setOfferListings]=useState([]);
  const [saleListings,setSaleListings]=useState([]);
  const [rentListings,setRentListings]=useState([]);
  SwiperCore.use([Navigation]);
  console.log(offerListings);
  useEffect(()=>{
 
    const fetchOfferListings=async ()=>{
      try {
        const res=await fetch('/api/listing/get?offer=true&limit=4');
        const data= await res.json();
        setOfferListings(data);
        fetchRentListings();

      } catch (error) {
        console.log(error);
      }
    }
    
    const fetchRentListings=async()=>{
      try {
        const res=await fetch('/api/listing/get?type=rent&limit=4');
        const data=await res.json();
        setRentListings(data);
        fetchSaleListings();

      } catch (error) {
        console.log(error);
      }
    }

    const fetchSaleListings=async()=>{
      try {
        const res=await fetch('/api/listing/get?type=sale&limit=4');
        const data=await res.json();
        setSaleListings(data);
       } catch (error) {
        console.log(error);
      }
    }
   fetchOfferListings();
  },[])


  return (
    <div>
      {/*top*/}
      <div className='flex flex-col gap-6 p-28 px-3 max-w-6xl mx-auto'>
        <h1 className='text-slate-700 font-bold text-4xl lg:text-6xl'>
        Find your next <span className='text-slate-500'>perfect</span> 
        <br/>
        place with ease 
        </h1>
        <div className='text-cyan-500 text-s sm:text-lg font-semibold'>
        Step into a realm of real estate excellence with <span className='text-gray-500'>Estatify</span>, where every doorway opens to a realm of endless possibilities, guiding you towards your perfect home sweet home.
        <br/>
        <br/>
        Explore endless options with diverse range of properties, tailored to fit every lifestyle and preference.
        </div>
        <Link to={"/search"} className='text-xs sm:text-sm text-blue-700 font-semibold hover:underline'>
          Explore More
        </Link>
      </div>

      {/*swiper*/ }
      
      <Swiper navigation>
        {offerListings &&
          offerListings.length > 0 &&
          offerListings.map((listing) => (
            <SwiperSlide>
              <div
                style={{
                  background: `url(${listing.imageUrls[0]}) center no-repeat`,
                  backgroundSize: 'cover',
                }}
                className='h-[500px]'
                key={listing._id}
              ></div>
            </SwiperSlide>
          ))}
      </Swiper>


      {/* listing results for offer,sale and rent */}
      <div className='max-w-6xl mx-auto p-3 flex flex-col gap-8 my-10'>
        {offerListings && offerListings.length > 0 && (
          <div className=''>
            <div className='my-3'>
              <h2 className='text-2xl font-semibold text-slate-600'>Recent offers</h2>
              <Link className='text-sm text-blue-800 hover:underline' to={'/search?offer=true'}>Show more offers</Link>
            </div>
            <div className='flex flex-wrap gap-4'>
              {offerListings.map((listing) => (
                <ListingItem listing={listing} key={listing._id} />
              ))}
            </div>
          </div>
        )}
        {rentListings && rentListings.length > 0 && (
          <div className=''>
            <div className='my-3'>
              <h2 className='text-2xl font-semibold text-slate-600'>Recent places for rent</h2>
              <Link className='text-sm text-blue-800 hover:underline' to={'/search?type=rent'}>Show more places for rent</Link>
            </div>
            <div className='flex flex-wrap gap-4'>
              {rentListings.map((listing) => (
                <ListingItem listing={listing} key={listing._id} />
              ))}
            </div>
          </div>
        )}
        {saleListings && saleListings.length > 0 && (
          <div className=''>
            <div className='my-3'>
              <h2 className='text-2xl font-semibold text-slate-600'>Recent places for sale</h2>
              <Link className='text-sm text-blue-800 hover:underline' to={'/search?type=sale'}>Show more places for sale</Link>
            </div>
            <div className='flex flex-wrap gap-4'>
              {saleListings.map((listing) => (
                <ListingItem listing={listing} key={listing._id} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
