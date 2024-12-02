import React from 'react'
import flamer from '../../Public/flamer.png'
import Image from 'next/image'
export default function Navbar() {
  return (
    <div className="navbar bg-base-100 border-b-2 border-gray-600">
    <div className="flex-1">
      <a className="btn btn-ghost text-2xl text-center" href="/">Prometheus<Image width={22}
      height={25} src = {flamer} alt="tezt" /></a>
    </div>
    <div className="">
      <button className="btn space-x-3 ">
       
      <a href="/Services"> Services</a>
      </button>
    </div>
  </div>
  )
}
