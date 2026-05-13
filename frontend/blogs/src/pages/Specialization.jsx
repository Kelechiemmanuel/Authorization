import React from 'react'
import { motion } from 'framer-motion'

const Specialization = () => {

    const cardVariant = {
        hidden: {
            opacity: 0,
            y: 50,
        },

        visible: (index) => ({
            opacity: 1,
            y: 0,

            transition: {
                duration: 0.5,
                delay: index * 0.15,
            }
        })
    }

    const cards = [
        {
            title: "Pixel Perfect Design",
            text: "Pixel perfect accuracy with latest web trends at your fingertips without any coding needed."
        },
        {
            title: "Responsive & Retina Ready",
            text: "Unique layouts with the ability to control settings per each device and viewport."
        },
        {
            title: "Flexible & Customizable",
            text: "Mix and match anything, anywhere. Every element can be modified with ease."
        },
        {
            title: "Perfect Foundation",
            text: "Consistent workflow across the board helps you deliver the most ambitious ideas."
        },
        {
            title: "Easy Setup",
            text: "Easily install a starter site with just a few clicks via our simple demo importer module."
        },
        {
            title: "Optimized for Speed",
            text: "Optimized for speed to create a pleasant experience that really loads and feels fast."
        }
    ]

    return (
        <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
        >

            <div
                className='grid grid-cols-1 place-items-center w-full px-5 gap-10
                md:grid-cols-2 md:px-14
                lg:grid-cols-3 lg:px-40'
            >

                {cards.map((card, index) => (

                    <motion.div
                        key={index}

                        variants={cardVariant}

                        initial="hidden"

                        whileInView="visible"

                        viewport={{
                            once: false,
                            amount: 0.2,
                        }}
                        custom={index}

                        whileHover={{
                            y: -8,
                            scale: 1.03,
                        }}

                        className='
                        
                            text-[#1f2228]
                            text-[13px]
                            p-10
                            rounded-sm
                            shadow-sm
                            hover:shadow-xl
                            transition
                            duration-300
                            bg-white
                        '
                    >

                        <div className='flex items-center gap-2 mb-4'>
                            <p className='text-4xl'>✅</p>

                            <h2 className='text-md font-bold text-[#1f2228]'>
                                {card.title}
                            </h2>
                        </div>

                        <div>
                            <p className='leading-6 text-[#5c6166]'>
                                {card.text}
                            </p>
                        </div>

                    </motion.div>

                ))}

            </div>

        </motion.div>
    )
}

export default Specialization