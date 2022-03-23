//  按位操作
const NoFlags = 0b000;//0
const HasEffect = 0b001;//1 2^0
const Layout = 0b010;//2  2^1
const Passive = 0b100;// 2^2
// 0b 0xa 16进制

let layoutTag = HashEffect | Layout; // 0b011;
if (layoutTag&layout !== NoFlags) { // 0b010 != 0b000
  console.log('hasLayout');
}

let tag = HasEffect | Passive; //0b011;
if (tag&Passive !== NoFlags) {
  console.log('hasPassive');
}


