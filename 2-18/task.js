//跨浏览器事件绑定
//* ele：监听对象 
// * event：监听函数类型，如click,mouseover 
//* handlder：监听函数
function addEventHandlder(ele, event, handlder) {
    if (ele.addEventHandlder) {
        //监听IE9，谷歌和火狐
        ele.addEventHandlder(event, handlder, false);
    } else if (ele.attachEvent) {
        ele.attachEvent("on" + event, handlder);
    } else {
        ele["on" + event] = handlder;
    }
}
window.onload = function() {
    var container = document.getElementById("container");
    var buttons = document.getElementsByTagName("input");
    //定义队列的对象
    var queue = {
            str: [],
            isempty: function() {
                return (this.str.length == 0);
            },
            leftIn: function(num) {
                this.str.unshift(num);
                this.paint();
            },
            rightIn: function(num) {
                this.str.push(num);
                this.paint();
            },
            leftOut: function() {
                if (!this.isempty()) {
                    alert(this.str.shift());
                    this.paint();
                } else {
                    alert("the queue is already empty!");
                }
            },
            rightOut: function() {
                if (!this.isempty()) {
                    alert(this.str.pop());
                    this.paint();
                } else {
                    alert("the queue is already empty!");
                }
            },
            paint: function() {
                var text = "";
                this.str.forEach(function(item) { text += "<div>" + parseInt(item) + "</div>" });
                container.innerHTML = text;
                addDivDleEvent();
            },
            deleteID: function(id) {
                this.str.splice(id, 1);
                this.paint();
            }
        }
        //为container中的每个div绑定删除函数
    function addDivDleEvent() {
        for (var i = 0; i < container.childElementCount; i++) {
            addEventHandlder(container.childNodes[i], "click", function(i) {
                return function() {
                    return queue.deleteID(i);
                }
            }(i))

        }
    };
    addEventHandlder(buttons[1], "click", function() {
        var input = buttons[0].value;
        if ((/^[0-9]+$/).test(input)) {
            queue.leftIn(input);
        } else { alert("请一个输入数字"); }
    });
    addEventHandlder(buttons[2], "click", function() {
        var input = buttons[0].value;
        if ((/^[0-9]+$/).test(input)) {
            queue.rightIn(input);
        } else { alert("请一个输入数字"); }
    });
    addEventHandlder(buttons[3], "click", function() {
        queue.leftOut();
    });
    addEventHandlder(buttons[4], "click", function() {
        queue.rightOut();
    });

}