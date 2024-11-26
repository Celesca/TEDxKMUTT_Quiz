import Image from 'next/image'
import React from 'react'
import LogoPicture from '@/assets/TEDxKMUTT_w.png'

const Logo = () => {
  return (
    <div className="flex flex-col items-center mb-5">
        <Image src={LogoPicture} alt="TEDxKMUTT" width={300} height={300}  />
        <h1 className="font-bold text-3xl pt-3">Quiz</h1>
    </div>
  )
}

export default Logo