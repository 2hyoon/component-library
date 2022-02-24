export default class Sticky {
  constructor(elem) {
    this.elem = elem;
    // this.content = this.elem.querySelector('.js-sd-content');
    this.slide1 = this.elem.querySelector('.slide1');
    this.slide2 = this.elem.querySelector('.slide2');
    this.slide3 = this.elem.querySelector('.slide3');
    this.slide4 = this.elem.querySelector('.slide4');
    this.orange = this.elem.querySelector('.sticky-bar-orange');
    this.textArr = this.elem.querySelectorAll('.text');
  }

  stickyScrollHandler = () => {
    // console.log('scroll');
    // console.log(window.pageYOffset);

    const slide1Top = this.slide1.offsetTop + this.elem.offsetTop;
    const slide2Top = this.slide2.offsetTop + this.elem.offsetTop;
    const slide3Top = this.slide3.offsetTop + this.elem.offsetTop;
    const slide4Top = this.slide4.offsetTop + this.elem.offsetTop;
    const contentBottom = slide1Top + this.elem.offsetHeight;
    const windowBottom = window.pageYOffset + window.innerHeight;

    let barWidth;
    const menuWidth = window.innerWidth/4; 

    // console.log(slide1Top)

    if(windowBottom >= slide1Top && windowBottom < slide2Top) {
      // console.log(window.pageYOffset/this.slide1.offsetHeight*100)
      barWidth = window.pageYOffset/this.slide1.offsetHeight;
      this.orange.style.width = `${barWidth * menuWidth}px`;
    } else if (windowBottom >= slide2Top && windowBottom < slide3Top) {
      barWidth = (window.pageYOffset-this.slide2.offsetTop)/this.slide2.offsetHeight;
      this.orange.style.width = `${menuWidth + barWidth * menuWidth}px`;
    } else if (windowBottom >= slide3Top && windowBottom < slide4Top) {
      barWidth = (window.pageYOffset-this.slide3.offsetTop)/this.slide3.offsetHeight;
      this.orange.style.width = `${menuWidth*2 + barWidth * menuWidth}px`;
    } else if (windowBottom >= slide4Top && windowBottom < contentBottom) {
      barWidth = (window.pageYOffset-this.slide4.offsetTop)/this.slide4.offsetHeight;
      this.orange.style.width = `${menuWidth*3 + barWidth * menuWidth}px`;
    } else if (windowBottom > contentBottom) {
      this.orange.style.width = `${window.innerWidth}px`;
    }

    // slide2 animation
    if(windowBottom >= slide2Top && windowBottom < slide3Top+window.innerHeight) {
      const pct = (window.pageYOffset-this.slide2.offsetTop)/(this.slide2.offsetHeight+window.innerHeight);
      const targetDeg = 100*pct;
      const targetArr= [];
      this.textArr.forEach((t, i) => {
        targetArr.push(240+targetDeg+i*30)
      })

      targetArr.reverse();

      this.textArr.forEach((t, i)=>{
        const leng = (window.pageYOffset-this.slide2.offsetTop)/this.slide2.offsetHeight;
        t.style.transform = `rotateY(${targetArr[i]}deg) skewY(3deg)`; //300 - 410 //perspective(1000px) 
      })
    }
  }

  // width / 4
  // slide1 height ==> total amount -- elem.innerHeight
  // scroll amount ==> slide1 start ~ slide1 end -- window.pageYOffset + window.innerHeight
  // slide1 start = this.slide1.offsetTop + this.elem.offsetTop 


  init() {
    window.addEventListener('scroll', this.stickyScrollHandler);
  }
}
