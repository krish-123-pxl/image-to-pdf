import jsPDF from 'jspdf'
import React, { useState } from 'react'
import image_icon from "./assets/img_icon.png"

function App() {
  const [images, setImages] = useState([])

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files)
    const imgPreview = files.map(file => URL.createObjectURL(file))
    setImages(imgPreview)
  }
  const handleConvertToPdf = () => {
    const pdf = new jsPDF()
    let imgCount = 0;

    images.forEach((img, i) => {
      const image = new Image()
      image.src = img;

      image.onload = () => {
        const imgWidth = pdf.internal.pageSize.getWidth();
        const imgHeight = (image.height * imgWidth) / image.width;

        if (i !== 0) pdf.addPage()
        pdf.addImage(image, "JPEG", 0, 0, imgWidth, imgHeight)

        imgCount++;
        if (imgCount === images.length) {
          pdf.save("converted.pdf")
        }
      }
    })
  }

  return (
    <div className='bg-gray-200 w-full h-screen flex flex-col items-center justify-center'>
      <div className='bg-white w-[310px] sm:w-[400px] rounded-3xl shadow-2xl flex flex-col items-center justify-between p-5 gap-4'>
        <div className='text-[16px] sm:text-2xl flex items-center justify-center gap-2 font-semibold'><img className='rounded-[3px] h-[1rem] sm:h-[22px]' src={image_icon} />IMAGE TO PDF CONVERTOR</div>
        <div className='relative flex items-center justify-center'>
          <input type="file" multiple accept='image/*' onChange={handleImageUpload} className='cursor-pointer border-2 sm:border-4 border-dashed border-blue-800 sm:p-7 text-blue-800 py-5 sm:py-11 rounded-2xl' />
          {/* <span className='absolute'>Click or Drag images</span> */}
        </div>
        <div className='flex overflow-y-auto flex-wrap gap-10 sm:gap-1 p-0 sm:p-3 max-h-[200px]'>
          {images.map((img, i) => {
            return <img src={img} key={i} className='h-[100px] w-[100px] rounded-2xl' />
          })}
        </div>
        <button className='bg-blue-500 text-white transition-all duration-100 transform active:scale-90 hover:bg-blue-600 font-semibold flex justify-center items-center cursor-pointer text-[1.2rem] sm:text-2xl p-2 w-full rounded-[8px]' onClick={handleConvertToPdf}>Convert to pdf</button>
      </div>
    </div>
  )
}

export default App
