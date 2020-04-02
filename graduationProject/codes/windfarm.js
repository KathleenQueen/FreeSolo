// const csvUrl = 'train.csv';
//
// async function run() {
//     const csvDataset = tf.data.csv(
//         csvUrl, {
//             hasHeader:true,
//             columnConfigs: {
//                 date:{
//                     required:true
//                 },
//                 wp1: {
//                     required:true,
//                     isLabel: true
//                 }
//             },
//             configuredColumnsOnly:true,
//         });
//     // Number of features is the number of column names minus one for the label
//     // column.
//     const numOfFeatures = (await csvDataset.columnNames()).length - 1;
//     var values = csvDataset
//         .map(function({key, value}) {//xs-ys,key-value
//             // Convert xs(features) and ys(labels) from object form (keyed by column name) to array form.
//             console.log({
//                 xs: Object.values(key), ys: Object.values(value)
//             });
//             return {xs: Object.values(key), ys: Object.values(value)};
//         });
//     console.log(Object.entries(csvDataset))
//     //for(var i in csvDataset) console.log(csvDataset[i]);
//     console.log()
//     //console.log(t);
//     // tfvis.render.scatterplot(//散点图
//     //     {name: 'Horsepower v MPG'},
//     //     {t},
//     //     {
//     //         xLabel: 'Horsepower',
//     //         yLabel: 'MPG',
//     //         height: 300
//     //     }
//     // );
//
// // Prepare the Dataset for training.
//     const flattenedDataset =
//         csvDataset
//             .map(({xs, ys}) =>
//             {
//                 // Convert xs(features) and ys(labels) from object form (keyed by
//                 // column name) to array form.
//                 return {xs:Object.values(xs), ys:Object.values(ys)};
//             })
//             .batch(10);
//
//     // Define the model.
//     const model = tf.sequential();
//     model.add(tf.layers.dense({
//         inputShape: [numOfFeatures],
//         units: 1
//     }));
//     model.compile({
//         optimizer: tf.train.sgd(0.000001),
//         loss: 'meanSquaredError'
//     });
//
//     // Fit the model using the prepared Dataset
//     return model.fitDataset(flattenedDataset, {
//         epochs: 10,
//         callbacks: {
//             onEpochEnd: async (epoch, logs) => {
//                 console.log(epoch + ':' + logs.loss);
//             }
//         }
//     });




    //
    const csvUrl2 =
        'train.csv';

    async function run2() {
        // We want to predict the column "medv", which represents a median value of
        // a home (in $1000s), so we mark it as a label.
        const csvDataset = tf.data.csv(
            csvUrl2, {
                columnConfigs: {
                    date:{},
                    wp1: {
                        isLabel: true
                    }
                },
                configuredColumnsOnly:true,
            });

        // Number of features is the number of column names minus one for the label
        // column.
        const numOfFeatures = (await csvDataset.columnNames()).length - 1;

        // Prepare the Dataset for training.
        const flattenedDataset =
            csvDataset
                .map(({xs, ys}) =>
                {
                    // Convert xs(features) and ys(labels) from object form (keyed by
                    // column name) to array form.
                    return {xs:date_num(Object.values(xs)), ys:Object.values(ys)};
                });
             //   .batch(10);

        const a =
            flattenedDataset.mapAsync(({xs,ys}) => new Promise(function(resolve){
                setTimeout(() => {
                    resolve({xs:xs,ys:ys});
                }, Math.random()*1000 + 500);
            }));
       flattenedDataset.forEachAsync(e => console.log(e))
        //console.log(await a.toArray());
        //console.log(valuesX);
    // //console.log(datas);
    //  datas.then(function (val) {
    //      const values = val.map(data => ({
    //          x: data.xs,
    //          y: data.ys,
    //      }));
    //      console.log(values);
    //      tfvis.render.scatterplot(//散点图
    //          {name: 'Horsepower v MPG'},
    //          {values},
    //          {
    //              xLabel: 'Horsepower',
    //              yLabel: 'MPG',
    //              width:600,
    //              height: 300,
    //              xAxisDomain:[2009.6, 2012.8],
    //          }
    //      );
    //  });
        const t = [];
        for(i = 0;i<1100;i++) t[i] = i ;
        const m = tf.data.array(t);
        console.log(await a.toArray());

    }


 run2();
function date_num(date) {//2009 07 01 00
    var year = date / 1000000;//2009
    var monthDayHour = date % 1000000 ;
    var month = monthDayHour / 10000;
    var dayHour = monthDayHour % 10000;
    var day = dayHour / 100;
    var hour = dayHour % 100;
        return year + (month + (day + hour/24)/30)/12;
}

//为何tf.toString只能处理1000个数据