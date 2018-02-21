import '../css/index.less';
document.write('Hello, World!');
const obj1 = { a: 1 };
const obj2 = { b: 2 };
const obj3 = Object.assign({}, obj1, obj2);
const a = obj3;
document.write(JSON.stringify(obj3));