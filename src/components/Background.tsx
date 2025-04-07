import React from 'react'
import BackgroundImage from '@/assets/background.svg'
import Logo from './logo'
import Image from 'next/image'

const Background = ({ children }: { children: React.ReactNode }) => {
    return (
        <>
        <main 
            className="relative min-h-screen overflow-hidden flex flex-col items-center pt-8 space-y-2"
            style={{ backgroundColor: "#f5e8da" }} // Background color
        >
                <Logo />
                {/* Reset the background image styling */}
                <div 
                    className="absolute inset-0 overflow-hidden pointer-events-none" 
                    style={{ zIndex: 0 }} // Try a different z-index
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
                <div className="relative z-10"> {/* Wrap children in a higher z-index div */}
                    {children}
                </div>
        </main>
        </>
    )
}

export default Background