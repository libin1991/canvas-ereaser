window.onload = function(){
    var oCanvas = document.getElementById("canvas"),
        oContext = oCanvas.getContext("2d"),
        tImgUrl = "1.jpg",
        width = oCanvas.width,
        height = oCanvas.height,
        isDown = false,
        oImg = new Image();
    //  获取一些常亮

    oImg.src = tImgUrl;
    oImg.onload = function(){
        oCanvas.style.background = "url("+ tImgUrl +") no-repeat";
        oCanvas.style.backgroundSize = width + "px " + height + "px";
        //  绘制底图
        oContext.beginPath();
        oContext.fillStyle = "#ccc";
        oContext.fillRect(0,0,width,height);
        oContext.fill();
        oContext.globalCompositeOperation = "destination-out";

        oCanvas.addEventListener("mousedown",function(ev){
            isDown = true;
            if(ev.preventDefault){
                ev.preventDefault();
            }else{
                return false;
            }
        },false);
        //  鼠标按下,将监听状态值改成true

        oCanvas.addEventListener("mousemove",function(ev){
            if(isDown){
                var t;
                clearTimeout(t);
                t = setTimeout(function(){
                    var x = ev.clientX + document.body.scrollLeft - oCanvas.offsetLeft,
                        y = ev.clientY + document.body.scrollTop - oCanvas.offsetTop;
                    oContext.beginPath();
                    oContext.arc(x, y, 20, 0, Math.PI * 2);
                    oContext.fill();
                    var imgData = oContext.getImageData(0,0,width,height)["data"],
                        len = imgData.length,
                        transparent = 0;
                    for(var i = 0;i < len;i += 4){
                        if(imgData[i] == 0 && imgData[i + 1] == 0 && imgData[i + 2] == 0 && imgData[i + 3] == 0){
                            transparent += 4;
                        }
                    }
                },16);
            }
            if(ev.preventDefault){
                ev.preventDefault();
            }else{
                return false;
            }
        },false);
        oCanvas.addEventListener("mouseup",function(ev){
            isDown = false;
            if(ev.preventDefault){
                ev.preventDefault();
            }else{
                return false;
            }
        },false);

    };

};