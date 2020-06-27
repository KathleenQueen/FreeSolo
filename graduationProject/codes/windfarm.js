const csvUrl = 'https://kathleenqueen.work/graduationProject/codes/train.csv';
const output = require('d3node-output');
const d3nLine = require('d3node-linechart');
const fs = require('fs');
const d3 = require('d3-node')().d3;
const tf = require("@tensorflow/tfjs");//node-gpu已安装

// read 'train.csv'
async function readTrain() {
    const csvString = fs.readFileSync('train.csv').toString();
    const data = d3.csvParse(csvString);
    return data.map(d => ({
        date:d.date - "",
        wp1:d.wp1 - ""
    }));
}

// date => number
function date_num(date) {//2009 07 01 00
    var year = Math.floor(date / 1000000);//2009
    var monthDayHour = date % 1000000 ;
    var month = Math.floor(monthDayHour / 10000);
    var dayHour = monthDayHour % 10000;
    var day = Math.floor(dayHour / 100);
    var hour = dayHour % 100;
    var time = new Date(year,month,day,hour);
    var start = new Date(2009,7,1);
    return ((time - start)/1000/3600/24)/365;//1h:3600*1000ms
}

//获取wf1数据
async function getWf1Data(){
    const csvString = fs.readFileSync('windforecasts_wf1.csv').toString();
    const tempData = d3.csvParse(csvString);
    const data = tempData.map(function (d) {
        var monthDayHour = (d.date - "") % 1000000 ;
        var month = Math.floor(monthDayHour / 10000);
        return {
            date:d.date - "",
            hors:d.hors - "",
            month:month,//temperature
            u:d.u - "",
            v:d.v - "",
            ws:d.ws - "",
            wd:d.wd - ""}
    });
    const wf1Dataset = data.filter(d => ((d.hors - "") < 13) && (d.u != "NA")).map(d => ({
        date:d.date,
        hors:d.hors,
        month:d.month,
        u:d.u,
        v:d.v,
        ws:d.ws,
        wd:d.wd
    }));
    return wf1Dataset;

}

function deal(d) {
    var year = Math.floor(d.date / 1000000);//2009
    var monthDayHour = d.date % 1000000 ;
    var month = Math.floor(monthDayHour / 10000);
    var dayHour = monthDayHour % 10000;
    var day = Math.floor(dayHour / 100);
    var hour = dayHour % 100;
    var h = hour + d.hors;
    var results = "";
    if (h == 24){
        //闰年：公历年份是4的倍數的，且不是100的倍數
        if(year % 4 == 0 && year % 100 != 0){
            //是该月的最后一天
            if (isDayLast(month, day, 1)){
                //且不是该年的最后一天
                if(month == 12) month = 1;
                else month++;
                if(month < 10) month = "0" + month;
                if (day < 10) day = "0" + day;
                results = results + year + month + "0100";
                return {date:results - "",
                    month:d.month,
                    u:d.u,
                    v:d.v,
                    ws:d.ws,
                    wd:d.wd };
            }
            else {
                day++;
                if(month < 10) month = "0" + month;
                if (day < 10) day ="0" + day;
                results = results + year + month + day + "00";
                return {date:results - "",
                    month:d.month,
                    u:d.u,
                    v:d.v,
                    ws:d.ws,
                    wd:d.wd };
            }
        }
        else {
            //是该月的最后一天
            if (isDayLast(month, day, 0)){
                month++;
                if(month < 10) month = "0" + month;
                if (day < 10) day ="0" + day;
                results += year + month + "0100";
                return {date:results - "",
                    month:d.month,
                    u:d.u,
                    v:d.v,
                    ws:d.ws,
                    wd:d.wd };
            }
            else {
                day++;
                if(month < 10) month = "0" + month;
                if (day < 10) day ="0" + day;
                results = results + year + month + day + "00";
                return {date:results - "",
                    month:d.month,
                    u:d.u,
                    v:d.v,
                    ws:d.ws,
                    wd:d.wd };
            }
        }
    }
    else {
        results = d.date + d.hors;
        return {date:results,
            month:d.month,
            u:d.u,
            v:d.v,
            ws:d.ws,
            wd:d.wd };
    }
}
function del(trainData, wfData){
    const wf = wfData.map(deal);
    var cleaned = [];
    var labels = [];
    trainData.shift();
    for (var j = 0; j < wf.length; j++){
        for (var i = 0; i < trainData.length;i++){
            if(trainData[i].date == wf[j].date){
                labels.push(trainData[i]);
                cleaned.push(wf[j]);
            break;}
        }
    }


    // const features = cleaned.filter(d => d.date < 2011010100).map(d => ({
    //     month:d.month,
    //     u:d.u,
    //     v:d.v,
    //     ws:d.ws,
    //     wd:d.wd}));
    // const label = labels.filter(d => d.date < 2011010100).map(d => ({wp1:d.wp1}));
    //
    // const testFeatures = cleaned.filter(d => d.date >= 2011010100).map(d => ({
    //     month:d.month,
    //     u:d.u,
    //     v:d.v,
    //     ws:d.ws,
    //     wd:d.wd}));
    // const testLabels = labels.filter(d => d.date >= 2011010100).map(d => ({wp1:d.wp1}));
    // const testDate = labels.filter(d => d.date >= 2011010100).map(d => d.date);



     const features = cleaned.filter(d => d.date >= 2011010100).map(d => ({
        month:d.month,
        u:d.u,
        v:d.v,
        ws:d.ws,
        wd:d.wd}));
    const label = labels.filter(d => d.date >= 2011010100).map(d => ({wp1:d.wp1}));

    const testFeatures = cleaned.filter(d => d.date < 2011010100).map(d => ({
        month:d.month,
        u:d.u,
        v:d.v,
        ws:d.ws,
        wd:d.wd}));
    const testLabels = labels.filter(d => d.date < 2011010100).map(d => ({wp1:d.wp1}));
    const testDate = labels.filter(d => d.date < 2011010100).map(d => d.date);



    return {
        features:features,
        labels:label,
        testFeatures:testFeatures,
        testLabels:testLabels,
        testDate:testDate
    };
}

function isDayLast(month, day, isYear) {
    if (month == 2){
        if(isYear){
            if(day == 29)return true;
        }
        else{
            if(day == 28)return true;
        }
    }
    else if(month == 1||month == 3||month == 5||month == 7||month == 8||month == 10||month == 12){
        if(day == 31)return true;
    }
    else {
        if(day == 30)return true;
    }
    return false;
}


// 主程序，执行入口
async function run() {
    // 加载并绘制我们要训练的原始输入数据
    var trainData = await readTrain();
    const drawDataset = trainData.map(function (d) {
        return {
            key: date_num(d.date),
            value: d.wp1
        }
    });
    var wf1Data = await getWf1Data();


    //train.csv + wf1.csv结合起来 feature - label
     var d = del(trainData, wf1Data);
     var inputs = tf.data.array(d.features);var outputs = tf.data.array(d.labels);
     var flattenedInputs = inputs.map(data =>
     {
         return Object.values(data)
     });
    var flattenedOutputs = outputs.map(data =>
    {
        return Object.values(data)
    });
    const xyDataset = tf.data.zip({xs:flattenedInputs, ys:flattenedOutputs})
        .batch(32)
        .shuffle(4);

    //train model
    const model = tf.sequential();
    model.add(tf.layers.dense(
        {units: 3, kernelInitializer:'randomNormal', inputShape: [5], useBias:true}));
    model.add(tf.layers.prelu({alphaInitializer: 'heUniform', sharedAxes:[1,2]}));
    model.add(tf.layers.dense({units: 1,  kernelInitializer: 'randomNormal', useBias:true}));

    //compile model
    model.compile({
        optimizer: tf.train.adam(0.001,0.9,0.999,1e-8),//adam优化器在实践中非常有效并且不需要配置
        loss: tf.losses.meanSquaredError,//均方误差
        metrics: ['accuracy'],//模型在训练和测试过程中的各种度量指标
    });
    var t=[];
    const history = await model.fitDataset(xyDataset, {
        epochs: 50,
        callbacks: {onEpochEnd: (epoch, logs) => {
            t.push(logs.loss);
            console.log(logs.loss)
        }}
    });
    //输出loss
    var loss = t.map(function (value, index) {
       return{
           key:index,
           value:value
       }
    });
    output('./loss',d3nLine({
        data:loss,
        container: `
            <div id="container">
            <h2>loss</h2>
            <div id="chart"></div>
            </div>`,
        tickPadding: _tickPadding = 0,
        tickSize: _tickSize = 5,
        margin: _margin = { top: 20, right: 20, bottom: 60, left: 50 },}));

    //test model
    const Test = d.testFeatures.map(data => Object.values(data));
    var truth = d.testLabels.map(data => Object.values(data));
    var testInputs = tf.tensor(Test);
    var trueTensor = tf.tensor(truth).as1D();
    const preds = model.predict(testInputs).as1D();
    const predsArray = preds.dataSync().map(function (d) {
        if(d < 0) return 0;
        else return d;
    });
    var predsFinal = tf.tensor1d(predsArray);
    const mse = await tf.metrics.meanSquaredError(trueTensor, predsFinal);
    mse.print();

    const testDate = d.testDate;

    const datePreds = testDate.map((item, idx) => [item, predsArray[idx]])
        .map(d => ({key:date_num(d[0]), value:d[1]}));
    //const dateTruth = testDate.map((item, idx) => [item, truth[idx]]).map(d => ({key:date_num(d[0]), value:d[1]}));
    const drawData = [drawDataset, datePreds/*, dateTruth*/];
    drawData.allKeys = drawDataset.map(d => d.key);

    //可视化
    const drawLine = d3nLine({
        data: drawData,
        //selector: _selector = '#chart',
        container: `
            <div id="container">
            <h2>wp1(2009/07/01/00:00-2012/06/26/12:00)</h2>
            <div id="chart"></div>
            </div>`,
        width: 1500,
        height: 200,
        lineWidth: 0.7,
        // lineColor: _lineColor = 'steelblue',
         lineColors: ['steelblue', 'orange', /*'green'*/],
        // isCurve: _isCurve = false,
        // tickSize: _tickSize = 5,//轴刻度标记长度
        // tickPadding: _tickPadding = 5,//轴刻度数字距离轴的距离
    });
    output('./wp1', drawLine);
}
run();
