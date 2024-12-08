import React from 'react'

export default function Card() {
  return (
    <div className='flex flex-row justify-between p-10'>
      <div className="card bg-base-100 w-96 shadow-xl border-[2px] border-green-400">
    <figure>
      <img className=' h-[250px]  w-[375px]'
        src="https://images.pexels.com/photos/9893729/pexels-photo-9893729.jpeg?cs=srgb&dl=pexels-tomfisk-9893729.jpg&fm=jpg"
        alt="RWA" />
    </figure>
    <div className="card-body">
      <h2 className="card-title">Solar Farms</h2>
      <p>Expected Yield:- <span className=' font-bold'>15% APY </span> </p>
      <div className="card-actions justify-end">
       <a href='/Solar'>
        <button className="btn btn-primary">Know More</button>
        </a> 
      </div>
    </div>
  </div>
  <div className="card bg-base-100 w-96 shadow-xl border-[2px] border-green-400">
    <figure>
      <img className=' h-[250px] w-[375px]'
        src="https://nationaltoday.com/wp-content/uploads/2022/05/National-Windmill-Day-min.jpg"
        alt="RWA" />
    </figure>
    <div className="card-body">
      <h2 className="card-title">Wind farms</h2>
      <p>Expected Yield:- <span className=' font-bold'>11% APY </span> </p>
      <div className="card-actions justify-end">
      <a href='/gaali'>
        <button className="btn btn-primary">Know More</button>
        </a> 
              </div>
    </div>
  </div>
  <div className="card bg-base-100 w-96 shadow-xl border-[2px] border-green-400">
    <figure>
      <img className=' h-[250px]  w-[375px]'
        src="https://ksgi.edu.in/img/blog/ksit_widget1.webp"
        alt="RWA" />
    </figure>
    <div className="card-body">
      <h2 className="card-title">KSIT</h2>
      <p><span className=' font-bold'>Buy KSIT</span> </p>
      <div className="card-actions justify-end">
      <a href='/KSIT'>
        <button className="btn btn-primary">Know More</button>
        </a>       </div>
    </div>
  </div> 
  
  
  </div>
  )
}
