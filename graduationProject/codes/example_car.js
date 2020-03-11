/**
 * Get the car data reduced to just the variables we are interested
 * and cleaned of missing data.
 */
console.log('Hello TensorFlow');
async function getData() {
    //fetch是一种HTTP数据请求的方式
    //JSON 是 JS 对象的字符串表示法，它使用文本表示一个 JS 对象的信息，本质是一个字符串
    const carsDataReq = await fetch('https://storage.googleapis.com/tfjs-tutorials/carsData.json');
    const carsData = await carsDataReq.json();
    //.map建立新数组
    const cleaned = carsData.map(car => ({
        mpg: car.Miles_per_Gallon,
        horsepower: car.Horsepower,
    })).filter(car => (car.mpg != null && car.horsepower != null));
    return cleaned;
}
function createModel() {
    //建立顺序模型：其输入直接向下流至其输出
    const model = tf.sequential();
    //添加1个隐藏层：一输入、一输出；默认情况下，密集层带有一个偏差项，因此我们不需要将useBias设置为true
    model.add(tf.layers.dense({inputShape: [1], units: 1/*, useBias: true*/}));
    //添加1个输出层
    model.add(tf.layers.dense({units: 1, useBias: true}));
    return model;
}
//将输入数据转换为张量，我们可以使用张量进行机器学习。我们还将在y轴上执行数据洗牌和数据MPG标准化的重要最佳实践。
function convertToTensor(data) {
    //Wrapping these calculations in a tidy will dispose any intermediate tensors.
    //将这些计算打包整理以处理所有中间张量。
    return tf.tidy(() => {
        // Step 1. 洗牌数据
        tf.util.shuffle(data);
        //在早期的TensorFlow中，大规模训练数据的Shuffle、Batch划分和异步预加载等一直是开发的难点。
        // tf.data.Dataset的出现统一了数据读取的规范，并提供了便利的接口。
        // Step 2. 将数据转化成张量
        const inputs = data.map(d => d.horsepower);
        const labels = data.map(d => d.mpg);
        const inputTensor = tf.tensor2d(inputs, [inputs.length, 1]);
        const labelTensor = tf.tensor2d(labels, [labels.length, 1]);
        //Step 3. 归一化处理
        const inputMax = inputTensor.max();
        const inputMin = inputTensor.min();
        const labelMax = labelTensor.max();
        const labelMin = labelTensor.min();
        //使用 sub() 把字符串显示为下标
        const normalizedInputs = inputTensor
            .sub(inputMin)
            .div(inputMax.sub(inputMin));
        const normalizedLabels = labelTensor
            .sub(labelMin)
            .div(labelMax.sub(labelMin));
        return {
            inputs: normalizedInputs,
            labels: normalizedLabels,
            // 要返回用于标准化的基准为最后的结果进行处理
            inputMax,
            inputMin,
            labelMax,
            labelMin,
        }
    });
}
async function trainModel(model, inputs, labels) {
    // Prepare the model for training.
    model.compile({
        optimizer: tf.train.adam(),//adam优化器在实践中非常有效并且不需要配置
        loss: tf.losses.meanSquaredError,//均方误差
        metrics: ['accuracy'],//模型在训练和测试过程中的各种度量指标
    });
    const batchSize = 32;
    //常见的批量大小通常在32-512之间。对于所有问题，实际上并没有理想的批量大小
    //所谓Batch就是每次送入网络中训练的一部分数据，而Batch Size就是每个batch中训练样本的数量
    //Batch size的选择——在内存效率和内存容量之间寻求最佳平衡，从而最优化网络模型的性能及速度。
    const epochs = 50;
    //开始训练循环
    //model.fit是我们用来启动训练循环的函数。它是一个异步函数，因此我们返回它给我们的承诺，以便调用者可以确定培训何时完成。
    //为了监控培训进度，我们将一些回调传递给model.fit。我们用tfvis.show.fitCallbacks生成函数，以绘制我们先前指定的“损失”和“ mse”指标的图表。
    return await model.fit(inputs, labels, {
        batchSize,
        epochs,
        shuffle: true,
        callbacks: tfvis.show.fitCallbacks(
            { name: 'Training Performance' },
            ['loss'],
            { height: 200, callbacks: ['onEpochEnd'] }
        )
    });
}
async function run() {
    //加载并绘制我们要训练的原始输入数据
    const data = await getData();//await等待getData执行完
    const values = data.map(d => ({
        x: d.horsepower,
        y: d.mpg,
    }));
    tfvis.render.scatterplot(//散点图
        {name: 'Horsepower v MPG'},
        {values},
        {
            xLabel: 'Horsepower',
            yLabel: 'MPG',
            height: 300
        }
    );
    // Create the model
    const model = createModel();
    tfvis.show.modelSummary({name: 'Model Summary'}, model);//模型简介表
    // 数据转张量并归一化
    const tensorData = convertToTensor(data);
    const {inputs, labels} = tensorData;
    // Train the model
    await trainModel(model, inputs, labels);
    console.log('Done Training');
}
//当纯HTML被完全加载以及解析时，DOMContentLoaded 事件会被触发，而不必等待样式表，图片或者子框架完成加载。
document.addEventListener('DOMContentLoaded', run);