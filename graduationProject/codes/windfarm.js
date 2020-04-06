const tf = require("@tensorflow/tfjs");
const csvUrl =
        'https://kathleenqueen.work/graduationProject/codes/train.csv';

    async function run() {
        const csvDataset = tf.data.csv(
            csvUrl, {
                columnConfigs: {
                    date:{
                        isLabel:false
                    },
                    wp1: {
                        isLabel: true
                    }
                },
                configuredColumnsOnly:true,
            });
        const fd = csvDataset.toArray();

        fd.then(value => console.log(value));
        // csvDataset.base.map(({xs,ys}) =>
        // {
        //     console.log({xs:Object.values(xs),ys:Object.values(ys)}) ;
        // });
        console.log(typeof csvDataset);
        // Number of features is the number of column names minus one for the label
        // column.
        const numOfFeatures = (await csvDataset.columnNames()).length - 1;
        //console.log(csvDataset.data)
        var t = csvDataset.fullColumnNames[0];
        //console.log(t)
        //console.log(csvDataset.columnConfigs[t]);
        //const dataset = csvDataset.toArray();
       // console.log(dataset);
        var xsDataset =
            csvDataset.map(({xs,ys}) =>
                {
                    // Convert xs(features) and ys(labels) from object form (keyed by
                    // column name) to array form.
                    return {xs:Object.values(xs)};
                });


        var ysDataset =
            csvDataset.map(({xs,ys}) =>
                {
                    // Convert xs(features) and ys(labels) from object form (keyed by
                    // column name) to array form.
                    return {ys:Object.values(ys)};
                });
        //console.log(xsDataset,ysDataset)
        const f = csvDataset.map(({xs,ys}) =>
        {
            // Convert xs(features) and ys(labels) from object form (keyed by
            // column name) to array form.
            return {xs:Object.values(xs),ys:Object.values(ys)};
        });
        /*
        tfvis.render.scatterplot(
            {name: 'Model Predictions vs Original Data'},
            {values: [xsDataset, ysDataset]},
            {
                xLabel: 'Horsepower',
                yLabel: 'MPG',
                height: 300
            }
        );
        */

    }


    run();
function date_num(date) {//2009 07 01 00
    var year = date / 1000000;//2009
    var monthDayHour = date % 1000000 ;
    var month = monthDayHour / 10000;
    var dayHour = monthDayHour % 10000;
    var day = dayHour / 100;
    var hour = dayHour % 100;
        return year + (month + (day + hour/24)/30)/12;
}



/*async iterator(): Promise<LazyIterator<string>> {
    const inputIterator = await this.input.iterator();
const utf8Iterator = inputIterator.decodeUTF8();
const lineIterator = utf8Iterator.split('\n').map(line => {
    // Windows/DOS format text file has extra line breaker at the end of line.
    if (line.endsWith('\r')) {
        line = line.slice(0, -1);
    }
    return line;
});
return lineIterator;
}*/