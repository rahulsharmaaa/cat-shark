import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos'
import React, { useEffect, useState } from 'react'
import './styles.css'

export const Carousel = ({ data }) => {
  const dataLength = Boolean(data.length) ? data.length - 1 : 0
  const [activeIndex, setActiveIndex] = useState(0)
  const currentImage = data[activeIndex]
  const prevImage = () => {
    activeIndex !== 0 && setActiveIndex((state) => state - 1)
  }
  const nextImage = () => {
    activeIndex < dataLength && setActiveIndex((state) => state + 1)
  }
  const handleKeyEvent = (event) => {
    const char = event.keyCode
    if (char === 37) prevImage()
    if (char === 39) nextImage()
  }

  useEffect(() => {
    window.addEventListener('keydown', handleKeyEvent)
    return () => {
      window.removeEventListener('keydown', handleKeyEvent)
    }
  }, [activeIndex])

  return (
    <div className='carouselContainer'>
      {activeIndex !== 0 && (
        <ArrowBackIosNewIcon
          onClick={prevImage}
          style={{ marginRight: '20px', marginTop: '12rem' }}
        />
      )}
      <img
        key={activeIndex}
        className='carouselImage'
        width='700'
        src={currentImage}
        alt='carousel-item'
      />
      {activeIndex < dataLength && (
        <ArrowForwardIosIcon
          onClick={nextImage}
          style={{ marginLeft: '20px', marginTop: '12rem' }}
        />
      )}
    </div>
  )
}
