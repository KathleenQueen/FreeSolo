const tf = require("@tensorflow/tfjs");
// 2x3 Tensor
const a = tf.tensor([1.0, 2.0, 3.0, 10.0, 20.0, 30.0], [2,3]);// 2 行, 3 列
a.print(); // 打印张量值
const b = tf.tensor([[1.0, 2.0, 3.0], [10.0, 20.0, 30.0]]);
b.print();
const c = tf.scalar(3.14);
c.print(); // 输出零维张量
const d = tf.tensor2d([[2, 3, 4], [5, 6, 7]]);
d.print(); // 输出二维张量
const e = tf.zeros([2, 3]);
e.print(); // 输出2行3列的值全是0的张量
const f = tf.ones([3, 5]);
f.print(); // 输出3行5列的值全是1的张量
const g = tf.tensor3d([1, 2, 3, 4, 5, 6],[1,3,2]);//1组，3行，2列
g.print();
const h = tf.tensor4d([1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,
    1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24],[3,2,2,4]);//3组，再2组，2行，四列
h.print();
/*所以tensor的最后两位分别是行列*/
const initialValues = tf.zeros([5]);
const biases = tf.variable(initialValues); // 初始化biases
biases.print(); // 输出: [0, 0, 0, 0, 0]

const updatedValues = tf.tensor1d([0, 1, 0, 1, 0]);
biases.assign(updatedValues); // 更新 biases的值——变量由张量生成，且张量不可变而变量可变。
biases.print(); // 输出: [0, 1, 0, 1, 0]