import React from 'react'

const Footer = () => {
  return (
    <div>
        <div className='grid grid-cols-1 place-items-start px-5
        md:grid-cols-2 md:place-items-center
        lg:grid-cols-4 lg:42 lg:place-items-center
        '>
            <div>
                <h1>
                    Help & Support
                </h1>
            </div>
            <div>
                <h1>
                    Useful Links
                </h1>
            </div>
            <div>
                <h1>
                    More
                </h1>
            </div>
            <div>
                <h1>
                    Company
                </h1>
            </div>
        </div>
    </div>
  )
}

export default Footer