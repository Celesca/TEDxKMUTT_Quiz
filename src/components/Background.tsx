import React from 'react'
import BackgroundImage from '@/assets/background.svg'
import Image from 'next/image'
import Navbar from './Navbar'

const Background = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="min-h-screen flex flex-col">
            {/* Navbar fixed at the top */}
            <Navbar />
            
            {/* Main content area with proper spacing from navbar */}
            <main 
                className="flex-grow relative overflow-hidden flex flex-col items-center"
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
                
                {/* Content area with proper padding */}
                <div className="relative z-10 w-full max-w-7xl mx-auto px-4 pt-6 md:pt-10">
                    {children}
                </div>
            </main>
        </div>
    )
}

export default Background