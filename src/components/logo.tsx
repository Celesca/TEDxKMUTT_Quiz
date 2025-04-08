import Image from 'next/image'
import React from 'react'
import LogoPicture from '@/assets/logos/Logo.png'

const Logo = () => {
  return (
    <div className="flex flex-col items-center mb-5">
        <Image src={LogoPicture} alt="TEDxKMUTT Logo" width={300} height={300}  />
    </div>
  )
}

export default Logo;