window.onload = function(){
    let ctx = canvasInit();
    let lastPos = {x:0,y:0}
    let newPos = {x:0,y:0}
    let drawAble = false
    let eraserAble = false
    let pressDown = false
    let control = [eraser,draw,clear,save]
    let color = [black,yellow,red,blue]
    let lineWid = [three,six,ten,fifteen]

    listenToFuncBtn();
    listenToMouse();

    // 设置功能按钮监听事件
    function listenToFuncBtn(){
        // 控制键设置
        eraser.onclick = function(evt){
            drawAble = false
            eraserAble = true
            addClassList(this,control,'active')
            evt.preventDefault()
        }
        draw.onclick = function(evt){
            drawAble = true
            eraserAble = false
            addClassList(this,control,'active')
            evt.preventDefault()
        }
        clear.onclick = function(evt){
            ctx.clearRect(0,0,canvas.width,canvas.height)
            addClassList(this,control,'active')
            evt.preventDefault()
        }
        save.onclick = function(evt){
            let image = canvas.toDataURL('image/png')
            let a = document.createElement('a')
            a.href = image
            a.download = 'myPaint'
            a.target = '_blank'
            a.click()
            evt.preventDefault()
        }

        // 颜色设置
        black.onclick = function(evt){
            addClassList(this,color,'active')
            ctx.strokeStyle = '#000'
            evt.preventDefault()

        }
        red.onclick = function(evt){
            addClassList(this,color,'active')
            ctx.strokeStyle = '#ff0000'
            evt.preventDefault()

        }
        yellow.onclick = function(evt){
            addClassList(this,color,'active')
            ctx.strokeStyle = '#ffff00'
            evt.preventDefault()

        }
        blue.onclick = function(evt){
            addClassList(this,color,'active')
            ctx.strokeStyle = '#00f'
            evt.preventDefault()

        }

        // 线宽设置
        three.onclick = function(evt){
            ctx.lineWidth = '3'
            addClassList(this,lineWid,'line-active')
        }
        six.onclick = function(evt){
            ctx.lineWidth = '6'
            addClassList(this,lineWid,'line-active')
        }
        ten.onclick = function(evt){
            ctx.lineWidth = '10'
            addClassList(this,lineWid,'line-active')
        }

        fifteen.onclick = function(evt){
            ctx.lineWidth = '15'
            addClassList(this,lineWid,'line-active')
        }        
    }

    // 设置canvas鼠标事件
    function listenToMouse(){
        if('ontouchstart' in document.body){    //特性检测 判断是支持触摸
            canvas.addEventListener('touchstart',(evt) => {
                if(!eraserAble) {
                    drawAble = true
                }else{
                    ctx.clearRect(evt.touches[0].clientX,evt.touches[0].clientY,15,15)
                }
                lastPos.x = evt.touches[0].clientX
                lastPos.y = evt.touches[0].clientY
                pressDown = true
            })
        
            canvas.addEventListener('touchmove',(evt) => {
                if(drawAble && pressDown){
                    newPos.x = evt.touches[0].clientX
                    newPos.y = evt.touches[0].clientY
                    drawLine(lastPos,newPos,ctx)
                }else if(eraserAble && pressDown){
                    ctx.clearRect(evt.touches[0].clientX,evt.touches[0].clientY,25,25)
                }
                lastPos.x = newPos.x
                lastPos.y = newPos.y
            })
        
            canvas.addEventListener('touchend',(evt) => {
                pressDown = false
            })
        }else{
            canvas.addEventListener('mousedown',(evt) => {
                lastPos.x = evt.clientX
                lastPos.y = evt.clientY
                pressDown = true
                if(!eraserAble){
                    drawAble = true
                }else{
                    ctx.clearRect(evt.clientX,evt.clientY,15,15)
                }
            })
        
            canvas.addEventListener('mousemove',(evt) => {
                if(drawAble && pressDown){
                    newPos.x = evt.clientX
                    newPos.y = evt.clientY
                    drawLine(lastPos,newPos,ctx)
                }else if(eraserAble && pressDown){
                    ctx.clearRect(evt.clientX,evt.clientY,25,25)
                }
                lastPos.x = newPos.x
                lastPos.y = newPos.y
            })
        
            canvas.addEventListener('mouseup',(evt) => {
                pressDown = false
            })
        }

    }
}



window.onresize = function (){
    canvasInit();
}

// 初始化canvas
function canvasInit(){
    let canvasWid = document.documentElement.clientWidth
    let canvasHei = document.documentElement.clientHeight
    canvas.width = canvasWid
    canvas.height = canvasHei
    let ctx = canvas.getContext('2d')
    ctx.lineWidth = '3'
    ctx.strokeStyle = '#000'
    ctx.lineCap = 'round'
    ctx.lineJoin = 'round'
    return ctx;
}

// 绘制线条
function drawLine(lastPos,newPos,ctx){
    ctx.beginPath();
    ctx.moveTo(lastPos.x,lastPos.y)
    ctx.lineTo(newPos.x,newPos.y)
    ctx.stroke()
}

// 添加classNamw
function addClassList(item,arr,str){
    if(Array.isArray(arr)){
        arr.forEach((it) => {
            it.classList.remove(str)
        });
    }
    item.classList.add(str)
}

