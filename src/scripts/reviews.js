import Vue from "vue";
import { Swiper, SwiperSlide, directive } from 'vue-awesome-swiper';
import 'swiper/swiper-bundle.css'

// import axios from "axios";

// const baseUrl = process.env.BASE_URL;

// axios.defaults.baseURL = baseUrl;
new Vue ({
  el: "#reviews-component",
  template: "#reviews",
  components: {
    Swiper, SwiperSlide
  },
  data(){
    return {
      reviews : [],
      sliderOption: {
        slidesPerView: 2,
        breakpoints: {
          // when window width is <= 320px
          320: {
            slidesPerView: 1,
          },
          480: {
    	  		slidesPerView: 2,
    	  	}
        }
      }
    }
  },
  methods: {
    requireImagesToArray(data) {
      return data.map((item) => {
        const requireImage = require(`../images/content/${item.pic}`).default;
        item.photo = requireImage;
        return item;
      })
    },
    slide(direction){
      const slider = this.$refs["slider"].$swiper;
      switch(direction) {
        case "next" :
          slider.slideNext();
          checkEndBegin(slider.isEnd, slider.isBeginning);
          console.log(slider);

        break;
        case "prev" :
          slider.slidePrev();
          checkEndBegin(slider.isEnd, slider.isBeginning);
        break;
      }
    }
  },
  mounted(){},
  created() {
    const data = require("../data/reviews.json");
    this.reviews = this.requireImagesToArray(data);
  }
})

function checkEndBegin(isend, isbegin){
  const btnReviewsNext = document.querySelector('.reviews__btn_next');
  const btnReviewsPrev = document.querySelector('.reviews__btn_prev');
  if(isbegin){
    btnReviewsPrev.style.opacity = 0.5;
  } else {
    btnReviewsPrev.style.opacity = 1;
  }
  if(isend){
    btnReviewsNext.style.opacity = 0.5;
  } else {
    btnReviewsNext.style.opacity = 1;
  }
}

// new Vue({
//   el: "#reviews-component",
//   template: "#reviews",
//   data() {
//     return {
//       reviews: [],
//       strafe: 0
//     };
//   },
//   methods: {
//     arrWithRequiredImages(array) {
//       return array.map(item => {
//         const requredPic = require(`../images/content/${item["author-pic"]}`);
//         item["author-pic"] = requredPic;

//         return item;
//       });
//     },
//     slide(direction) {
//       const slider = this.$refs["reviews-slider"];
//       const elemWidth = +slider.getBoundingClientRect().width;
//       const oneItemWidth = +slider.firstElementChild.getBoundingClientRect()
//         .width;
//       const itemsInView = 2;
//       const availableWidth =
//         oneItemWidth * (slider.children.length - itemsInView);

//       switch (direction) {
//         case "next":
//           if (Math.abs(this.strafe) <= availableWidth) {
//             this.strafe += elemWidth;
//           }
//           break;
//         case "prev":
//           if (Math.abs(this.strafe) > 0) {
//             this.strafe -= elemWidth;
//           }
//           break;
//       }

//       slider.style.transform = `translateX(-${this.strafe}px)`;
//     },
//     resetSliderOnResize() {
//       const throttledSliderReset = this.debounse(() => {
//         const slider = this.$refs["reviews-slider"];
//         this.strafe = 0;
//         slider.style.transform = "translateX(0)";
//       }, 1000);

//       window.addEventListener("resize", throttledSliderReset);
//     },
//     debounse(fn, ms) {
//       let timer = null;

//       return function(...args) {
//         const onComplete = () => {
//           fn.apply(this, args);
//           timer = null;
//         };

//         if (timer) {
//           clearTimeout(timer);
//         }

//         timer = setTimeout(onComplete, ms);
//       };
//     },
//     async fetchReviews() {
//       const { data: reviews } = await axios.get("/reviews/1");

//       this.reviews = reviews;
//     }
//   },
//   async created() {
//     await this.fetchReviews();
//   },
//   mounted() {
//     this.resetSliderOnResize();
//   }
// });
