import { data } from "autoprefixer";
import Vue from "vue";

const thumbs = {
  props: ["works", "currentWork"],
  template: "#preview-thumbs"
  
}
const btns = {
  template: "#preview-btns",
 
}
const display = {
  props: ["currentWork", "works", "currentIndex"],
  template: "#preview-display",
  components: {thumbs, btns},
  computed: {
    reversedWorks(){
      const works = [...this.works];
      return works.slice(0, 3).reverse();
    }
  }
 
}
const tags = {
  props: ["tags"],
  template: "#preview-tags"
}
const info = {
  props: ["currentWork"],
  template: "#preview-info",
  components: {tags},
  computed: {
    tagsArray(){
      return this.currentWork.skills.split(',');
    }
  }

}

new Vue({
  el: "#preview-component",
  template: "#preview-container",
  components: {display, info},
  data(){
    return {
      works:[],
      currentIndex: 0
    }
  },
  computed:{
    currentWork(){
      return this.works[this.currentIndex];
    }
  },
  // watch:{
  //   currentIndex(value) {
  //     this.mekeInfiniteLoopForIndex(value)
  //   }
  // },
  methods: {
    // mekeInfiniteLoopForIndex(index){
    //   const worksQuantity = this.works.length - 1;
    //   if( index < 0 ) this.currentIndex = worksQuantity;
    //   if ( index > worksQuantity) this.currentIndex = 0
    // },
    // checkSlideIndex(currentSlide, lastSlide = 2, worksBtnNext, worksBtnPrev ){
    //   console.log(lastSlide);
    //   if(currentSlide === lastSlide){
    //     worksBtnNext.style.opacity = 0.5;
    //   } else {
    //     this.currentIndex++
    //     worksBtnNext.style.opacity = 1;
    //   };
    //   if(currentSlide === 0){
    //     this.worksBtnPrev.style.opacity = 0.5;
    //   } else {
    //     this.currentIndex--
    //     worksBtnPrev.style.opacity = 1;
    //   };
    // },
    requireImagesToArray(data){
      return data.map(item => {
        const requiredImg = require(`../images/content/${item.photo}`).default;
        item.photo = requiredImg;
        return item
      })
    },
        
    slide(direction, e){
      this.$emit("slide", direction);
      const lastItem = this.works.length - 1;
      const worksBtnNext = document.querySelector('.works-slider__btn_next');
      const worksBtnPrev = document.querySelector('.works-slider__btn_prev');
      function opacityBtns(currentIndex){
        if(currentIndex === lastItem){
          worksBtnNext.style.opacity = 0.5;
        } else{
          worksBtnNext.style.opacity = 1;
        }
        if(currentIndex === 0){
          worksBtnPrev.style.opacity = 0.5;
        } else{
          worksBtnPrev.style.opacity = 1;
        }
      }
      opacityBtns();
      switch(direction) {
        case "next" : 
        // this.works.push(this.works[0]);
        // this.works.shift();

        if(this.currentIndex === lastItem){
          opacityBtns(this.currentIndex)
        } else {
          this.currentIndex++
          opacityBtns(this.currentIndex)
        }
        // this.checkSlideIndex(this.currentIndex, lastItem, worksBtnNext, worksBtnPrev)

        break;
        case "prev" : 
        // this.works.unshift(lastItem);
        // this.works.pop();
        if(this.currentIndex === 0){
          opacityBtns(this.currentIndex)
        } else {
          this.currentIndex--
          opacityBtns(this.currentIndex)
        }
        // this.checkSlideIndex(this.currentIndex, lastItem,worksBtnNext, worksBtnPrev)
        break;
      }
    }
  },
  created(){
    const data = require("../data/works.json");
    this.works = this.requireImagesToArray(data);
  }
})

// import axios from "axios";

// const baseUrl = process.env.BASE_URL;

// axios.defaults.baseURL = baseUrl;

// const btns = {
//   template: "#slider-btns",
//   methods: {
//     slide(direction) {
//       switch (direction) {
//         case "next":
//           break;
//         case "prev":
//           break;
//       }
//     }
//   }
// };

// const thumbs = {
//   template: "#slider-thumbs",
//   props: {
//     works: Array,
//     currentWork: Object
//   }
// };

// const tags = {
//   template: "#slider-tags",
//   props: {
//     tags: Array
//   }
// };

// const info = {
//   template: "#slider-info",
//   components: { tags },
//   props: {
//     currentWork: Object
//   },
//   computed: {
//     tagsArray() {
//       return this.currentWork.techs.split(",");
//     }
//   }
// };

// const display = {
//   components: { btns, thumbs },
//   props: {
//     works: Array,
//     currentWork: Object,
//     currentIndex: Number
//   },
//   computed: {
//     reversedWorks() {
//       const works = [...this.works];
//       return works.reverse();
//     }
//   },
//   template: "#slider-display"
// };

// new Vue({
//   el: "#works-slider-component",
//   data() {
//     return {
//       works: [],
//       currentIndex: 0
//     };
//   },
//   components: {
//     display,
//     info
//   },
//   computed: {
//     currentWork() {
//       return this.works[this.currentIndex];
//     }
//   },
//   methods: {
//     handleSlide(direction) {
//       switch (direction) {
//         case "next":
//           this.currentIndex++;
//           break;
//         case "prev":
//           this.currentIndex--;
//           break;
//       }
//     },
//     slideDirectly(workToShow) {
//       this.works.forEach((item, index) => {
//         if (workToShow.id === item.id) {
//           this.currentIndex = index;
//         }
//       });
//     },
//     makeInfititeLoopForCurIndex(value) {
//       const worksAmount = this.works.length - 1;

//       if (value > worksAmount) this.currentIndex = 0;
//       if (value < 0) this.currentIndex = worksAmount;
//     },
//     async fetchWorks() {
//       const { data: works } = await axios.get("/works/1");
//       this.works = works;
//     }
//   },
//   watch: {
//     currentIndex(value) {
//       this.makeInfititeLoopForCurIndex(value);
//     }
//   },
//   async mounted() {
//     await this.fetchWorks();
//   },
//   template: "#slider-container"
// });
