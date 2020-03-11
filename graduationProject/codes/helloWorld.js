const tf = require("@tensorflow/tfjs");
const model = tf.sequential();//序列模型

//定义网络结构，层数，单元数，输入
model.add(
    tf.layers.dense({
    units: 1,
    inputShape: [1]
    })
);

//定义优化器
model.compile({loss: 'meanSquaredError', optimizer: 'sgd'});

//目标：y=2x+1;
const xs = tf.tensor2d([1, 2, 3, 5], [4, 1]);
const ys = tf.tensor2d([3, 5, 7, 11], [4, 1]);

//使用async是因为训练中有异步操作，需要用到await
var run = (async ()=>{
    //训练1000次
    for(let i = 0;i < 1000;i++){
        await model.fit(xs,ys);//等待训练的异步操作
        console.log(`第${i}次`);
    }
    model.predict(tf.tensor2d([100], [1, 1])).print();//201.几
});
run();