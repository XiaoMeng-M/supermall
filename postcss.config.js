module.exports = {
    plugins:{
        autoprefixer:{},
            "postcss-px-to-viewport": { 
                viewportWidth:375,  //视窗的宽度
                viewportHeight:667,
                unitPrecision:5,    //指定px转换视窗单位的小数位数
                viewportUnit: 'vw', //指定需要转换成的视窗单位 建议使用vw
                selectorBlackList: ['ignore','tab-bar','tab-bar-item'], //指定不需要转换的类
                minPixelValue: 1, //小于或者是等于 ‘1px'的 不转换视窗单位
                mediaQuery: false //允许媒体查询中转换px
            }
    }
}