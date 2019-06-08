/**
 *
 * CreateBy zhuzhaofneg
 * DateTime 2019年05月26日10:36:31
 * 瀑布流插件脚本
 */

; (function ($) {
    $.fn.cascadeFlow = function (options) {
        var defaultConfig = {
            width: 200, // 每列宽度
            col: 3, // 列数
            my: 5, // 上下边距
            mx: 5, //左右边距
        };
        var _self = $(this);
        _self.addClass('cascade-flow-wrapper');
        var cascadeFlowItems = _self.find('.cascade-flow-item');
        // 判断是否存在此元素
        if (!_self) {
            console.error('Element does not exist !');
        }
        // 合并参数
        var endOptions = $.extend(defaultConfig, options);
        if (cascadeFlowItems.length > 0) {
            cascadeFlowItems.each(function (index, item) {
                $(item).removeAttr('style').css({ "width": endOptions.width, 'marginLeft': '5px',"float": "left" });
            })
            _self.css({
                "position": "relative",
                "paddingRight": endOptions.mx
            });
            // 获取需要设置瀑布流容器中的子元素一共有多少个
            var cascadeFlowItemsLength = cascadeFlowItems.length;
            // 根据 每行的个数 col 获取 一共有多少行
            var rows = (cascadeFlowItemsLength % endOptions.col == 0) ? (cascadeFlowItemsLength / endOptions.col) : Math.ceil(cascadeFlowItemsLength / endOptions.col);
            // 初始行数 即 从第二行开始设置瀑布流样式
            var initRow = 2;
            if (rows > 1) {
                while (initRow <= rows) {
                    initRow = setCascadeFlowItemStyle(endOptions, initRow, cascadeFlowItems, rows);
                }
            }
        }
        /**
         * 获取每一行的的第一个元素下标
         * @param {Integer} col 每行几列
         * @param {Integer} row 第几行
         */
        function getRowFirstNum(col, row) {
            return (col * row - (col - 1)) - 1;
        }

        /**
         * 设置某一行 元素样式
         * @param {Integer} options 参数对象
         * @param {Integer} row 第几行
         * @param {Integer} cascadeFlowItems 所有需要设置样式的元素
         */
        function setCascadeFlowItemStyle(options, row, cascadeFlowItems) {
            var index = getRowFirstNum(options.col, row);
            if (index >= cascadeFlowItems.length) {
                return;
            } else {
                // /对应上一行第一个元素
                for (let i = 0; i < options.col; i++) {
                    // console.log(`设置第 ${row} 行,第 ${i + 1} 个元素`)
                    var j = index + i;
                    // 此处判断为 第二行基于第一行对应元素的 高度做定位
                    if ((row - 1) === 1) {
                        var th = $(cascadeFlowItems[j - options.col]).outerHeight(true);
                        var tw = $(cascadeFlowItems[j - options.col]).outerWidth(true);
                        $(cascadeFlowItems[j]).css({ "position": "absolute", "left": tw * i, 'top': th + options.my });
                    } else { // 此处判断为 第三行之后基于前一行 对应元素元素的 定位做 定位
                        var temp = $(cascadeFlowItems[j - options.col]);
                        var th = (temp.outerHeight() + temp.position().top + options.my);
                        var tw = $(cascadeFlowItems[j - options.col]).outerWidth(true);
                        $(cascadeFlowItems[j]).css({ "position": "absolute", "left": tw * i, 'top': th });
                    }
                }
            }
            return row + 1;
        }
    };
})(jQuery);