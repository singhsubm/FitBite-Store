import HorizontalScroll from '../../components/HorizontalScroll/HorizontalScroll'
import ProductSlider from '../../components/ProductSlider/ProductSlider'

export default function Product() {
  return (
    <div >
      <div className='min-h-screen w-full flex items-center justify-center'>
        <ProductSlider/>
      </div>
      <HorizontalScroll/>
    </div>
  )
}
