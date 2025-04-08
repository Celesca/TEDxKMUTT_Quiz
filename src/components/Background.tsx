import React from 'react'
import BackgroundImage from '@/assets/background.svg'
import Image from 'next/image'
import Navbar from './Navbar'

const Background = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="min-h-screen flex flex-col">
            <Navbar />
            
            <main 
               className="flex-grow relative overflow-hidden flex flex-col"
                style={{ backgroundColor: "#f5e8da" }} // Background color
            >
                {/* Background image */}
                <div 
                    className="absolute inset-0 overflow-hidden pointer-events-none" 
                    style={{ zIndex: 0 }}
                > 
                    <Image
                        src={BackgroundImage}
                        alt="Background Decoration"
                        className="absolute bottom-0 w-full"
                        priority
                        width={1920}
                        height={1080}
                        style={{ 
                            objectFit: 'contain', 
                            objectPosition: 'bottom',
                            zIndex: 0
                        }}
                    />
                </div>
                
                {/* Content area centered both horizontally and vertically */}
                <div className="relative z-10 flex-grow flex items-center justify-center">
                    <div className="max-w-xl px-4 py-6 md:py-10">
                        {children}
                    </div>
                </div>
            </main>
        </div>
    )
}

export default Background;