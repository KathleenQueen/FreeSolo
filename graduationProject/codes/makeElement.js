constructor(protected readonly input: DataSource, csvConfig?: CSVConfig) {
    super();
    this.base = new TextLineDataset(input);
    if (!csvConfig) {
        csvConfig = {};
    }
    this.hasHeader = csvConfig.hasHeader === false ? false : true;
    this.fullColumnNames = csvConfig.columnNames;
    this.columnConfigs = csvConfig.columnConfigs;
    this.configuredColumnsOnly = csvConfig.configuredColumnsOnly;
    if (csvConfig.delimWhitespace) {
        util.assert(
            csvConfig.delimiter == null,
            () =>
                'Delimiter should not be provided when delimWhitespace is true.');
        this.delimWhitespace = true;
        this.delimiter = ' ';
    } else {
        this.delimiter = csvConfig.delimiter ? csvConfig.delimiter : ',';
    }
}

async iterator(): Promise<LazyIterator<TensorContainer>> {
    if (!this.columnNamesValidated) {
    await this.setColumnNames();
}
let lines = await this.base.iterator();
if (this.hasHeader) {
    // We previously read the first line to get the columnNames.
    // Now that we're providing data, skip it.
    lines = lines.skip(1);
}
return lines.map(x => this.makeDataElement(x));
}
makeDataElement(line: string): TensorContainer {
    const values = this.parseRow(line);
    const features: {[key: string]: TensorContainer} = {};
    const labels: {[key: string]: TensorContainer} = {};

    for (let i = 0; i < this.fullColumnNames.length; i++) {
        const key = this.fullColumnNames[i];
        const config = this.columnConfigs ? this.columnConfigs[key] : null;
        //如果是有columnConfigs,config = this.columnConfigs[key]
        if (this.configuredColumnsOnly && !config) {//true + this.columnConfigs[key]项不在columnConfigs中
            // 即该列未被选中
            continue;
        } else {
            const value = values[i];
            let parsedValue = null;
            if (value === '') {
                // If default value is provided, use it. If default value is not
                // provided, set as undefined.
                if (config && config.default !== undefined) {
                    parsedValue = config.default;
                } else if (config && (config.required || config.isLabel)) {
                    throw new Error(
                        `Required column ${key} is empty in this line: ${line}`);
                } else {
                    parsedValue = undefined;
                }
            } else {
                // A value is present, so parse it based on type
                const valueAsNum = Number(value);
                if (isNaN(valueAsNum)) {
                    // The value is a string and this column is declared as boolean
                    // in config, parse it as boolean.
                    if (config && config.dtype === 'bool') {
                        parsedValue = this.getBoolean(value);
                    } else {
                        // Set value as string
                        parsedValue = value;
                    }
                } else if (!config || !config.dtype) {
                    // If this value is a number and no type config is provided, return
                    // it as number.
                    parsedValue = valueAsNum;
                } else {
                    // If this value is a number and data type is provided, parse it
                    // according to provided data type.
                    switch (config.dtype) {
                        case 'float32':
                            parsedValue = valueAsNum;
                            break;
                        case 'int32':
                            parsedValue = Math.floor(valueAsNum);
                            break;
                        case 'bool':
                            parsedValue = this.getBoolean(value);
                            break;
                        default:
                            parsedValue = valueAsNum;
                    }
                }
            }
            // Check if this column is label.
            (config && config.isLabel) ? labels[key] = parsedValue :
                features[key] = parsedValue;
        }
    }
    // If label exists, return an object of features and labels as {xs:features,
    // ys:labels}, otherwise return features only.
    if (Object.keys(labels).length === 0) {
        return features;

    } else {
        return {xs: features, ys: labels};
    }
}













@@ -57,11 +57,11 @@ describeBrowserEnvs('MicrophoneIterator', () => {
});

it('gets tensor in correct shape with fftSize', async () => {
    const microphoneIterator = await tfd.microphone({fftSize: 2048});
    const microphoneIterator = await tfd.microphone({fftSize: 16});
    const result = await microphoneIterator.next();
    expect(result.done).toBeFalsy();
    // tslint:disable-next-line:no-any
    expect((result.value as any).spectrogram.shape).toEqual([43, 2048, 1]);
    expect((result.value as any).spectrogram.shape).toEqual([43, 16, 1]);
});

it('throws error with invalid fftSize', async done => {
@@ -78,7 +78,7 @@ describeBrowserEnvs('MicrophoneIterator', () => {

    it('gets tensor in correct shape with columnTruncateLength', async () => {
        const microphoneIterator =
            await tfd.microphone({columnTruncateLength: 232});
        await tfd.microphone({columnTruncateLength: 232, fftSize: 128});
        const result = await microphoneIterator.next();
        expect(result.done).toBeFalsy();
        // tslint:disable-next-line:no-any
    @@ -87,59 +87,60 @@ describeBrowserEnvs('MicrophoneIterator', () => {

        it('gets tensor in correct shape with numFramesPerSpectrogram', async () => {
            const microphoneIterator =
                await tfd.microphone({numFramesPerSpectrogram: 10});
            await tfd.microphone({numFramesPerSpectrogram: 3, fftSize: 16});
            const result = await microphoneIterator.next();
            expect(result.done).toBeFalsy();
            // tslint:disable-next-line:no-any
            expect((result.value as any).spectrogram.shape).toEqual([10, 1024, 1]);
            expect((result.value as any).spectrogram.shape).toEqual([3, 16, 1]);
        });

        it('gets tensor in correct shape with full spectrogram config', async () => {
            const microphoneIterator = await tfd.microphone({
                sampleRateHz: 44100,
                fftSize: 1024,
                fftSize: 16,
                numFramesPerSpectrogram: 10,
                columnTruncateLength: 100
                columnTruncateLength: 10
            });
            const result = await microphoneIterator.next();
            expect(result.done).toBeFalsy();
            // tslint:disable-next-line:no-any
            expect((result.value as any).spectrogram.shape).toEqual([10, 100, 1]);
            expect((result.value as any).spectrogram.shape).toEqual([10, 10, 1]);
        });

        it('provides both spectrogram and waveform', async () => {
            const microphoneIterator =
                await tfd.microphone({includeSpectrogram: true, includeWaveform: true});
            const microphoneIterator = await tfd.microphone(
                {includeSpectrogram: true, includeWaveform: true, fftSize: 16});
            const result = await microphoneIterator.next();
            expect(result.done).toBeFalsy();
            // tslint:disable-next-line:no-any
            expect((result.value as any).spectrogram.shape).toEqual([43, 1024, 1]);
            expect((result.value as any).spectrogram.shape).toEqual([43, 16, 1]);
            // tslint:disable-next-line:no-any
            expect((result.value as any).waveform.shape).toEqual([44032, 1]);
            expect((result.value as any).waveform.shape).toEqual([688, 1]);
        });

        it('stops and restarts microphone', async () => {
            const microphoneIterator = await tfd.microphone();
            const microphoneIterator = await tfd.microphone({fftSize: 16});
            const result1 = await microphoneIterator.next();
            expect(result1.done).toBeFalsy();
            // tslint:disable-next-line:no-any
            expect((result1.value as any).spectrogram.shape).toEqual([43, 1024, 1]);
            expect((result1.value as any).spectrogram.shape).toEqual([43, 16, 1]);
            microphoneIterator.stop();
            const result2 = await microphoneIterator.next();
            expect(result2.done).toBeTruthy();
            expect(result2.value).toBeNull();
            microphoneIterator.start();
            expect(result1.done).toBeFalsy();
            // tslint:disable-next-line:no-any
            expect((result1.value as any).spectrogram.shape).toEqual([43, 1024, 1]);
            expect((result1.value as any).spectrogram.shape).toEqual([43, 16, 1]);
        });

        it('stops microphone multiple times', async () => {
            const microphoneIterator = await tfd.microphone();
            const microphoneIterator =
                await tfd.microphone({fftSize: 16, numFramesPerSpectrogram: 2});
            const result1 = await microphoneIterator.next();
            expect(result1.done).toBeFalsy();
            // tslint:disable-next-line:no-any
            expect((result1.value as any).spectrogram.shape).toEqual([43, 1024, 1]);
            expect((result1.value as any).spectrogram.shape).toEqual([2, 16, 1]);
            microphoneIterator.stop();
            const result2 = await microphoneIterator.next();
            expect(result2.done).toBeTruthy();
        @@ -181,16 +182,16 @@ describeBrowserEnvs('MicrophoneIterator', () => {
            let timesRun = 0;
            let tensorsReturned = 0;
            const microphoneIterator = await tfd.microphone(
                {numFramesPerSpectrogram: 20, columnTruncateLength: 10});
            {numFramesPerSpectrogram: 10, columnTruncateLength: 10, fftSize: 32});

            // This function will be called 3 times. Between each call there is a 200ms
            // interval. The spectrogram tensor will be returned after 464ms.
            /**
             * The events happen in sequence are:
             * call 1st at 0ms,    timesRun:1, tensorsReturned:0;
             * call 2nd at 200ms,  timesRun:2, tensorsReturned:0;
             * call 3rd at 400ms,  timesRun:3, tensorsReturned:0;
             * tensor returned from 1st call at ~464ms, timesRun:3, tensorsReturned:1;
             * call 2nd at 1ms,  timesRun:2, tensorsReturned:0;
             * call 3rd at 2ms,  timesRun:3, tensorsReturned:0;
             * tensor returned from 1st call at ~7ms, timesRun:3, tensorsReturned:1;
             * tensor returned from 2nd call,  timesRun:3, tensorsReturned:2;
             * tensor returned from 3rd call,  timesRun:3, tensorsReturned:3.
             */
        @@ -203,50 +204,61 @@ describeBrowserEnvs('MicrophoneIterator', () => {
            expect(tensorsReturned).toBe(0);
            const result = await microphoneIterator.next();
            tensorsReturned++;
            // When the first tensor got returned (~464ms), getTensor() function
            // should have been called 3 times (at 400ms).
            expect(timesRun).toBe(3);
            expect(result.done).toBeFalsy();
            // tslint:disable-next-line:no-any
            const value = result.value as any;
            expect(value.spectrogram.shape).toEqual([20, 10, 1]);
            expect(value.spectrogram.shape).toEqual([10, 10, 1]);
        }
        };

        // Call iterator.next() every 200 milliseconds, stop after 3 times.
        const interval = setInterval(getTensor, 200);
        const interval = setInterval(getTensor, 1);

        // Wait 4 seconds for the intervals to run.
        // Wait 3 seconds for the intervals to run.
        await new Promise(resolve => {
            setTimeout(() => {
                resolve();
            }, 2000);
        }, 100);
    });
        // Assert the intervals run 3 times.
        expect(timesRun).toBe(3);
        expect(tensorsReturned).toBe(3);
    });

    it('gets spectrogram from iterator.capture', async () => {
        const microphoneIterator = await tfd.microphone();
        const microphoneIterator =
            await tfd.microphone({fftSize: 16, numFramesPerSpectrogram: 1});
        const result = await microphoneIterator.capture();
        // tslint:disable-next-line:no-any
        expect((result as any).spectrogram.shape).toEqual([43, 1024, 1]);
        expect((result as any).spectrogram.shape).toEqual([1, 16, 1]);
    });

    it('gets waveform from iterator.capture', async () => {
        const microphoneIterator = await tfd.microphone(
            {includeSpectrogram: false, includeWaveform: true});
        const microphoneIterator = await tfd.microphone({
            includeSpectrogram: false,
            includeWaveform: true,
            fftSize: 16,
            numFramesPerSpectrogram: 1
        });
        const result = await microphoneIterator.capture();
        // tslint:disable-next-line:no-any
        expect((result as any).waveform.shape).toEqual([44032, 1]);
        expect((result as any).waveform.shape).toEqual([16, 1]);
    });

    it('gets spectrogram and waveform from iterator.capture', async () => {
        const microphoneIterator =
            await tfd.microphone({includeSpectrogram: true, includeWaveform: true});
        const microphoneIterator = await tfd.microphone({
            includeSpectrogram: true,
            includeWaveform: true,
            fftSize: 16,
            numFramesPerSpectrogram: 1
        });
        const result = await microphoneIterator.capture();
        // tslint:disable-next-line:no-any
        expect((result as any).spectrogram.shape).toEqual([43, 1024, 1]);
        expect((result as any).spectrogram.shape).toEqual([1, 16, 1]);
        // tslint:disable-next-line:no-any
        expect((result as any).waveform.shape).toEqual([44032, 1]);
        expect((result as any).waveform.shape).toEqual([16, 1]);
    });
});