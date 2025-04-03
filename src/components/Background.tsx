import React from 'react'
import BackgroundImage from '@/assets/wave-line-1.webp'
import Logo from './logo'
import Image from 'next/image'

const Background = ({ children }: { children: React.ReactNode }) => {
    return (
        <>
        <main 
            className="relative min-h-screen overflow-hidden flex flex-col items-center pt-8 space-y-2"
            style={{ backgroundColor: "#f5e8da" }} // Added background color
        >
                <Logo />
                <Image
                        src={BackgroundImage}
                        alt="Background Decoration"
                        className="absolute bottom-40 md:bottom-0 md:w-full -z-30 
                                                                left-1/2 md:left-0 -translate-x-1/2 max-w-screen-2xl md:max-w-full 
                                                                md:translate-x-0"
                        priority
                />
                {children}
        </main>
        </>
    )
}

export default Background