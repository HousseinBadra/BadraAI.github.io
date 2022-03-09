const board=document.querySelector('.game')
const locations=Array.from(document.querySelectorAll('.game .kabsi'))
const normalmode=document.querySelector('.normal')
const ai=document.querySelector('.ai')
const container=document.querySelector('.container')
const popup=document.querySelector('.popup')

let mode=undefined;
let gameon=false;
let player='1'
let xo=['','','','','','','','','']
const players=['ai','human']
let aiicon
let humanicon

const scoress={
  'aiwin':1,
  'humanwin':-1,
  'draw':0
}
normalmode.addEventListener('click',()=>{
  mode='normal'
  gameon=true
  container.classList.add('hide')
  board.classList.add('gameon')
  player='1'
  settext()
})
ai.addEventListener('click',()=>{
  mode='ai'
  gameon=true
  container.classList.add('hide')
  board.classList.add('gameon')
  player=getrandomplayer()
  settext()
  if(player=='ai'){
    aiicon='x'
    humanicon='o'
    setTimeout(()=>{aimove()},400)
  }
  else{
    aiicon='o'
    humanicon='x'
  }
})
function drawxo(){
  locations.forEach((elem,index)=>{
    elem.innerHTML=xo[index]
  })
}

function checkwin(){
  
   return (xo[0]==xo[1] && xo[1] ==xo[2] && helper(0,1,2)) || (xo[3]==xo[4] && xo[4] ==xo[5] && helper(3,4,5)) || (xo[6]==xo[7] && xo[7] ==xo[8] && helper(6,7,8)) || (xo[0]==xo[3] && xo[3] ==xo[6] && helper(0,3,6)) || (xo[1]==xo[4] && xo[4] ==xo[7] && helper(1,4,7)) || (xo[2]==xo[5] && xo[5] ==xo[8] && helper(2,5,8)) ||  (xo[0]==xo[4] && xo[4] ==xo[8] && helper(0,4,8)) ||  (xo[2]==xo[4] && xo[4] ==xo[6] && helper(2,4,6))
   
}


locations.forEach((elem,index)=>{
  elem.addEventListener('click',(e)=>{
    if(mode=='normal'){
    if(gameon){
      if(!e.target.innerHTML){
    if(player=='1'){
    xo[index]='x'
      player='2'
      settext()
    }
    else{
    xo[index]='o'
    player='1'
    settext()
    }
    drawxo()
    if(checkwin()){
      setTimeout(()=>{ alert(`Player ${winner()} wins`)
        window.location='./'
      },100)}
      else if(boardfull()){
        setTimeout(()=>{ alert(`Draw`)
        window.location='./'
      },100)
      }
    //  gameon=false
      }
  }}
  if(mode=='ai' && gameon){
  if(player=='human')  {
    if(!e.target.innerHTML){
    xo[index]=humanicon
    drawxo()
      player='ai'
      if(checkwin()){
        gameon=false
       setTimeout(()=>{alert(`${winner()} win`)
         window.location='./'
       },300)
      }
      if(boardfull() && !checkwin()){
      setTimeout(()=>{alert('Draw')
         window.location='./'
       },300)
      }
  if(gameon){settext()}
      setTimeout(()=>{aimove()
  },500)
      
      }
  }
  }
})
})

function helper(index1,index2,index3){
  return xo[index1] !='' && xo[index2] !='' && xo[index3]!=''
}

function helper1(arr,index1,index2,index3){
  return arr[index1] !='' && arr[index2] !='' && arr[index3]!=''
&& arr[index1]==aiicon}

function helper2(arr,index1,index2,index3){
  return arr[index1] !='' && arr[index2] !='' && arr[index3]!=''
&& arr[index1]==humanicon}


function winner(){
  if (player=='1') return '2';
  if (player =='2') return '1'
  if (player=='ai') return 'you';
  if (player=='human') return 'ai'
}

function boardfull(){
  return xo.every((elem)=>{
   return elem !=''
  })
}
function settext(){
  if(mode=='normal'){
  popup.innerHTML=`Player ${player} to play`}
  else if(mode=='ai'){
    popup.innerHTML=`${player} to move`
  }
}


function getrandomplayer(){
  return players[Math.floor(Math.random()*2)]
}

function aimove(){
  let score=-Infinity
  let move
  
 xo.forEach((elem,index)=>{
    if(elem ==''){
    xo[index]=aiicon
   let localscore=minimax(xo,0,false)
    xo[index]=''
    if(localscore>score){
      score=localscore
      move=index
    }}
  })
  xo[move]=aiicon
  if(gameon){
  drawxo()
  
  player='human'
  settext()}
  if(checkwin()){
   setTimeout(()=>{ alert(`${winner()} wins`)
     window.location='./'
   },300)
  }
  if(boardfull() && !checkwin()){
    setTimeout(()=>{alert('draw')
         window.location='./'
       },300)
  }
}
function minimax(test,depth,ismax){
  let result=checkwinner(test)
  if(result !==null){
    return scoress[result]
  }
  if(ismax){
   let best=-Infinity
  test.forEach((elem,index)=>{
    if(elem ==''){
  test[index]=aiicon
  let  localscores=minimax(test,depth+1,false)
  test[index]=''
  best=max(best,localscores)
    }})
    return best
  }
   else{
    let best=Infinity
  test.forEach((elem,index)=>{
    if(elem ==''){
  test[index]=humanicon
   let localscores=minimax(test,depth+1,true)
   test[index]=''
best=min(best,localscores)
    }})
    return best
  }
}
function gameover(){
  return boardfull() || checkwin()
}

 function checkwinner(boards){
if ((boards[0]==boards[1] && boards[1] ==boards[2] && helper1(boards,0,1,2)) || (boards[3]==boards[4] && boards[4] ==boards[5] && helper1(boards,3,4,5)) || (boards[6]==boards[7] && boards[7] ==xo[8] && helper1(boards,6,7,8)) || (boards[0]==boards[3] && boards[3] ==boards[6] && helper1(boards,0,3,6)) || (boards[1]==boards[4] && boards[4] ==boards[7] && helper1(boards,1,4,7)) || (boards[2]==boards[5] && boards[5] ==boards[8] && helper1(boards,2,5,8)) ||  (boards[0]==boards[4] && boards[4] ==boards[8] && helper1(boards,0,4,8)) ||  (boards[2]==boards[4] && boards[4] ==boards[6] && helper1(boards,2,4,6))){return 'aiwin'}
else if(  ((boards[0]==boards[1] && boards[1] ==boards[2] && helper2(boards,0,1,2)) || (boards[3]==boards[4] && boards[4] ==boards[5] && helper2(boards,3,4,5)) || (boards[6]==boards[7] && boards[7] ==xo[8] && helper2(boards,6,7,8)) || (boards[0]==boards[3] && boards[3] ==boards[6] && helper2(boards,0,3,6)) || (boards[1]==boards[4] && boards[4] ==boards[7] && helper2(boards,1,4,7)) || (boards[2]==boards[5] && boards[5] ==boards[8] && helper2(boards,2,5,8)) ||  (boards[0]==boards[4] && boards[4] ==boards[8] && helper2(boards,0,4,8)) ||  (boards[2]==boards[4] && boards[4] ==boards[6] && helper2(boards,2,4,6)))
  ){return 'humanwin'}
else if(boardfull()){
  return 'draw'
}
else{
  return null
}
}
 
 function min(a,b){
   if(a<=b) {return a;}
   else{
     return b
   }
 }
 function max(a,b){
   if(a>=b){
     return a
   }
   else{
     return b
   }
 }