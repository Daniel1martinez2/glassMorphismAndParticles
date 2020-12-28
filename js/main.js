function sketch(p){
    const container = document.querySelector('.container'); 
    const radios = document.querySelectorAll('.radio');
    const range = document.querySelector('.range'); 
    range.addEventListener('input',()=>{
        console.log(range.value*2);
        size = range.value*2; 
    })
    let size = (range.value*2); 
    let current;  
    let img; 
    let img2; 
    let img3; 


    let array1 = Array.from(radios); // convert nodelist to array izi
    radios[0].checked = true;
    radios.forEach(l=>{
        
        l.addEventListener('click',()=>{
            let result = array1.filter((e)=>e.checked); 
            switch(result[0]){
                case radios[0]:
                    current = img;  
                break; 
                case radios[1]:
                    current = img2; 
                break; 
                case radios[2]:  
                current = img3;  
                break; 
            }
        })
    })
   
    p.preload=()=>{
        img = p.loadImage('./img/brand.png');
        img2 = p.loadImage('./img/lol.png');
        img3 = p.loadImage('./img/program.png');
        current = img; 
    }
   
    let c1 = p.color('#3F5EFB'); 
    let colors = [
        p.color('#302b63'),
        p.color('#00b09b'),
        p.color('#96c93d'),
        p.color('#F3F9A7'),
        p.color('#ffc0cb'),
        p.color('#00F260'),
        p.color('#f7b733'),
        p.color('#FF0080'),
        p.color('#FFD200')
    ]; 
 
    let buble =()=>{
        return (posx,posy)=>{
           
            let color=Math.floor(p.random(0,colors.length)); 
            let dir =[1,1]; 
            return{
                display: ()=>{
                    //
                    p.tint(colors[color]); 
                    p.image(current,posx,posy,size,size);

                    const r = p.floor(p.random(4));
                    switch (r) {
                      case 0:
                        posx = posx*dir[0] + 1;
                        break;
                      case 1:
                        posx = posx*dir[0] - 1;
                        break;
                      case 2:
                        posy = posy*dir[1] + 1;
                        break;
                      case 3:
                        posy = posy*dir[1] - 1;
                        break;
                    }

                    // let xStep = Math.floor(p.random(-1,1));
                    // let yStep = Math.floor(p.random(-1,1));
                    // posx += xStep*dir[0];
                    // posy += yStep*dir[1];


                    // if(posx<=0 || posx+size>=container.clientWidth){
                    //     dir[0]*=-1; 
                    // }
                    // if(posy<=0 || posy+size>=container.clientHeight){
                    //     dir[1]*=-1; 
                    // }
                },
                colision: ()=>{
                    color = Math.floor(p.random(0,colors.length)); 

                },
                x: ()=>posx+(size/2),
                y: ()=>posy+(size/2),
                intersects: (other)=>{
                    return p.dist(posx+(size/2),posy+(size/2),other.x(),other.y())<=size; 
                }
            }
        }
    }
    //declare the object
    let bubles;
    let test = buble();
    //----------------
    p.setup=()=>{
        const canvas = p.createCanvas(container.clientWidth,container.clientHeight); 
        canvas.parent('container'); 
        
        //define
        bubles=[
            test(p.random(100,300),p.random(50,200)),
            test(p.random(200,400),p.random(300,350)),
            test(p.random(100,200),p.random(200,350)), 
        ];
    }
    p.windowResized =()=>{
        p.resizeCanvas(container.clientWidth,container.clientHeight); 
    }
    p.draw = ()=>{
        p.background(c1); 
        bubles.forEach(l=>{
            l.display(); 
        }); 
        bubles.forEach(l=>{
            bubles.forEach(el=>{
                if(el != l){
                    if(l.intersects(el)){
                        l.colision();
                    }
                }
            })
        });
        // p.push(); 
        // p.fill(p.color('#ffc0cb')); 
        // p.noStroke(); 
        // p.ellipse(p.mouseX, p.mouseY, 100,100); 
        // p.pop();  
    }
    p.mouseClicked =()=>{
        if(p.mouseX>=0 && p.mouseX<=container.clientWidth &&p.mouseY>=0 && p.mouseY<=container.clientHeight){
            bubles.push(test(p.mouseX,p.mouseY)); 
        }
    }
}
let p5js = new p5(sketch)