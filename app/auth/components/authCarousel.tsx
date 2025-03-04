import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/autoplay";
// import { useState } from "react";
import { AUTH_CAROUSEL_ITEMS } from "../constants";
import AuthCarouselItem from "./carouselItem";
import styles from "../styles/authCarousel.module.scss";

function AuthCarousel() {
  // const [pageCount, setPageCount] = useState();
  // const [activeIndex, setActiveIndex] = useState();
  // const swiperInstanceRef = useRef();

  return (
    <div className={styles.auth_carousel_container}>
      <Swiper
        modules={[Autoplay, Pagination]}
        spaceBetween={0}
        slidesPerView={1}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        loop={true}
      >
        {AUTH_CAROUSEL_ITEMS.map((item, i) => (
          <SwiperSlide key={i}>
            <AuthCarouselItem
              title={item.title}
              subtitle={item.subtitle}
              imagePath={item?.imagePath}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

export default AuthCarousel;
