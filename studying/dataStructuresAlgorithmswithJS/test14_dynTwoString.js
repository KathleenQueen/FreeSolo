//寻找最长公共子串
function lcs(word1, word2) {
    var max = 0;
    var d = [];
    var lcsarr = new Array(word1.length+1);
    for (var i = 0; i <= word1.length+1; ++i) {
        lcsarr[i] = new Array(word2.length+1);
        for (var j = 0; j <= word2.length+1; ++j) {
            lcsarr[i][j] = 0;
        }
    }//设置word1.length+1行，word2.length+1列，所有元素设为0
    for (var i = 0; i <= word1.length; ++i) {
        for (var j = 0; j <= word2.length; ++j) {
            if (i == 0 || j == 0) {
                lcsarr[i][j] = 0;
            }//0行0列元素设为0
            else {
                if (word1[i - 1] == word2[j - 1]) {
                    lcsarr[i][j] = lcsarr[i - 1][j - 1] + 1;
                }//若word1的第i个字母和word2的第j个字母相同，就设置i行j列元素值为i-1行j-1列元素值+1
                else {
                    lcsarr[i][j] = 0;//否则i行j列元素值设为0
                }
            }

            if (i > 0 && j > 0) {
                if (max < lcsarr[i][j]) {
                    max = lcsarr[i][j];//最长子串
                    d = [i];//保留最后一位相同的word1的（index+1），即word1的第i位
                }
                else if ((max == lcsarr[i][j]) && (max > lcsarr[i - 1][j - 1])) {
                    d.push(i);
                }
            }
        }
    }
    var str = d.length + "个最长公共字串";var t = 0;
    if (max == 0) {
        return "";
    }
    else {
        while((t = d.shift())!= undefined){
            str +=" "
            for (var i = t - max; i <= t-1; ++i) {
                str += word1[i];
            }
        }
    }
    return str;
}
console.log(lcs("abb77cc","dbbc46ccc"));

//finished