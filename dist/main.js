(()=>{var e={325:(e,t,r)=>{const n=r(61);e.exports=class{constructor(e,t,r,s,a){this.ships=[new n(e[0],e[1],e[2]),new n(t[0],t[1],t[2]),new n(r[0],r[1],r[2]),new n(s[0],s[1],s[2]),new n(a[0],a[1],a[2])],this.board=[],this.init()}init(){for(let e=0;e<10;e++){let e=[];for(let t=0;t<10;t++)e.push({hasShip:!1,isShot:!1});this.board.push(e)}this.PlacingShips()}PlacingShips(){this.ships.forEach((e=>{for(let t=0;t<=e.length-1;t++)"y"===e.al?this.board[e.position[0][0]][e.position[0][1]-t].hasShip=e.name:this.board[e.position[0][0]+t][e.position[0][1]].hasShip=e.name}))}receiveAttack(e){if(this.board[e[0]-1][e[1]-1].hasShip){let t=this.ships.find((t=>t.name===this.board[e[0]-1][e[1]-1].hasShip));return t.hit(),t.isSunk()?`sunk ${t.name.toLowerCase()}`:t.name.toLowerCase()}return this.board[e[0]-1][e[1]-1].isShot=!0,!1}}},62:(e,t,r)=>{r(325),e.exports=class{constructor(e){this.gameboard=e,this.turn=!1,this.hits=[]}attack(e){if(!this.hits.includes(e))return this.hits.push(e),this.turn=!1,this.gameboard.receiveAttack(e)}}},61:e=>{e.exports=class{constructor(e,t,r){switch(e.toLowerCase()){case"carrier":this.length=5;break;case"battleship":this.length=4;break;case"cruiser":case"submarine":this.length=3;break;case"destroyer":this.length=2;break;default:return"unknow Ship"}this.name=e,this.hits=0,this.Sunk=!1,this.position=t,this.position[0][0]-=1,this.position[0][1]-=1,this.al=r}hit(){this.hits+=1}isSunk(){return this.hits===this.length&&(this.Sunk=!0)}}},832:(e,t,r)=>{const n=r(325);e.exports=function(){const e=[],t=[];return[{name:"carrier",length:5},{name:"battleship",length:4},{name:"cruiser",length:3},{name:"submarine",length:3},{name:"destroyer",length:2}].forEach((r=>{for(;;){let n=Math.floor(2*Math.random())+1;n=1===n?"x":"y";let a=[Math.floor(10*Math.random())+1,Math.floor(10*Math.random())+1];if(s(a,r.length,n)){t.push([r.name,a,n]);for(let t=0;t<r.length;t++)"x"===n?e.push([a[0]+t,a[1]]):e.push([a[0],a[1]-t]);break}}})),new n([t[0][0],[t[0][1]],t[0][2]],[t[1][0],[t[1][1]],t[1][2]],[t[2][0],[t[2][1]],t[2][2]],[t[3][0],[t[3][1]],t[3][2]],[t[4][0],[t[4][1]],t[4][2]]);function r(e,t){return t[0]>10||t[1]>10||t[0]<1||t[1]<1||e.some((e=>e.every(((e,r)=>e===t[r]))))}function s(t,n,s){for(let a=0;a<n;a++)if("x"===s){if(r(e,[t[0]+a,t[1]]))return!1}else if(r(e,[t[0],t[1]-a]))return!1;return!0}}}},t={};function r(n){var s=t[n];if(void 0!==s)return s.exports;var a=t[n]={exports:{}};return e[n](a,a.exports,r),a.exports}(()=>{"use strict";const e=r(325);var t;const n=document.querySelector(".player"),s=document.createElement("div"),a=document.querySelector(".small-board"),i=document.querySelector(".ship-name"),o=["Carrier","BattleShip","Cruiser","Submarine","Destroyer"];let c="url(../resources/carrier.svg)",l="x";var u=5;function d(e){if(!e.target.classList.contains("board")){let t=null,r=!0;for(let n=1;n<=u;n++)if(t){if(parseInt(t.parentNode.dataset.x)+1>10)return null;t=document.querySelector(`[data-x="${parseInt(t.parentNode.dataset.x)+1}`).children[10-t.dataset.y],t.style.backgroundImage.length>1&&(r=!1)}else t=e.target,t.style.backgroundImage.length>1&&(r=!1);if(r){t=null;let r=i.innerText.replace("Place Your","");r=r.replace(/\s/g,"");for(let n=1;n<=u;n++)t?(t=document.querySelector(`[data-x="${parseInt(t.parentNode.dataset.x)+1}`).children[10-t.dataset.y],t.setAttribute("data-name",r),t.style.backgroundImage=c):(t=e.target,t.setAttribute("data-name",r),t.style.backgroundImage=c);m(s)}}}function h(e){if(!e.target.classList.contains("board")){let t=i.innerText.replace("Place Your","");t=t.replace(/\s/g,"");let r=e.target,n=!0;for(let e=1;e<=u;e++)r.style.backgroundImage.length>1&&(n=!1),r=r.nextElementSibling;if(n){r=e.target;for(let e=1;e<=u;e++)r.setAttribute("data-name",t),r.style.backgroundImage=c,r=r.nextElementSibling;m(s)}}}function p(){let e=a.firstElementChild.firstElementChild;"x"===l?(s.style.width=e.offsetWidth*u+"px",s.style.height=`${e.offsetHeight}px`):(s.style.width=`${e.offsetWidth}px`,s.style.height=e.offsetHeight*u+"px")}function m(r){switch(getComputedStyle(r).backgroundColor){case"rgb(102, 102, 255)":r.style.backgroundColor="rgb(102, 255, 102)",c="url(../resources/battleShip.svg)",u=4,i.innerText="Place Your BattleShip",p();break;case"rgb(102, 255, 102)":r.style.backgroundColor="rgb(255, 255, 102)",c="url(../resources/cruiser.svg)",u=3,i.innerText="Place Your Cruiser",p();break;case"rgb(255, 255, 102)":r.style.backgroundColor="rgb(255, 102, 102)",c="url(../resources/submarine.svg)",i.innerText="Place Your Submarine",p();break;case"rgb(255, 102, 102)":r.style.backgroundColor="rgb(255, 102, 255)",c="url(../resources/destroyer.svg)",u=2,i.innerText="Place Your Destroyer",p();break;case"rgb(255, 102, 255)":{let r=function(){let e=[];return o.forEach((t=>{let r=a.querySelectorAll(`[data-name="${t}"]`),n=f(r[0]),s=f(r[r.length-1]);n[0]===s[0]?e.push([t,n,"y"]):e.push([t,n,"x"])})),e}();t=new e([r[0][0],[r[0][1]],r[0][2]],[r[1][0],[r[1][1]],r[1][2]],[r[2][0],[r[2][1]],r[2][2]],[r[3][0],[r[3][1]],r[3][2]],[r[4][0],[r[4][1]],r[4][2]]);const n=document.createElement("div"),i=document.createElement("div");n.classList.add("endpos-btn-container"),i.classList.add("endpos-btn"),i.innerText="Submit",s.remove(),i.addEventListener("click",g),n.append(i),a.append(n)}}}function f(e){return[parseInt(e.parentNode.dataset.x),parseInt(e.dataset.y)]}function g(){a.removeEventListener("click",d),a.removeEventListener("click",h);const e=document.querySelector(".setup-container"),t=document.querySelectorAll("[data-name]");e.remove(),function(e){e.forEach((e=>{let t=f(e),r=n.querySelector(`[data-x="${t[0]}"]`).querySelector(`[data-y="${t[1]}"]`);r.style.backgroundImage=e.style.backgroundImage,r.setAttribute("data-name",e.dataset.name)}))}(t)}r(325);const b=r(62),y=r(832);s.classList.add("has_ship"),a.append(s),s.style.width=s.offsetWidth*u+"px",a.addEventListener("mouseover",(e=>{e.target.classList.contains("board")||(s.style.top=e.target.offsetTop+"px",s.style.left=e.target.offsetLeft+"px")})),a.addEventListener("click",d),document.querySelector(".rotate-btn").addEventListener("click",(function(){if("x"===l?(a.removeEventListener("click",d),a.addEventListener("click",h),l="y",p()):(a.removeEventListener("click",h),a.addEventListener("click",d),l="x",p()),void 0!==t)return t})),window.addEventListener("resize",p);const k=new b(y());var v;const x=document.querySelector(".computer"),L=document.querySelector(".information"),S=[{name:"carrier",pos:[]},{name:"battleship",pos:[]},{name:"cruiser",pos:[]},{name:"submarine",pos:[]},{name:"destroyer",pos:[]}],E=[{name:"carrier",pos:[]},{name:"battleship",pos:[]},{name:"cruiser",pos:[]},{name:"submarine",pos:[]},{name:"destroyer",pos:[]}];function w(e){if(e.target.classList.contains("hitable")){let t=k.attack(f(e.target));if(!1===t)L.innerText="Player Missed",e.target.classList.add("hitted");else if(e.target.classList.add("hit-ship"),t.includes("sunk")){const r=t.replace(new RegExp("\\bsunk\\s*","g"),"");L.innerText=`Computer sank Players : ${r}`;let n=q(r);S[n].pos.push(e.target);for(const e of S[n].pos)e.classList.add("sunk");if(T(k))return I("Player Wins")}else{L.innerText="Player Hit";let r=q(t);S[r].pos.push(e.target)}e.target.classList.remove("hitable"),function(){x.removeEventListener("click",w);const e=function(e){let t;for(;t=[Math.floor(10*Math.random())+1,Math.floor(10*Math.random())+1],C(e.hits,t););return t}(v),t=document.querySelector(`[data-x="${e[0]}"]`).querySelector(`[data-y="${e[1]}"]`);if(t.classList.contains("square")){let e=v.attack(f(t));if(!1===e)L.innerText="Computer Missed",t.classList.add("hitted");else if(t.classList.add("hit-ship"),e.includes("sunk")){const r=e.replace(new RegExp("\\bsunk\\s*","g"),"");L.innerText=`Computer sank Players : ${r}`;let n=q(r);E[n].pos.push(t);for(const e of E[n].pos)e.classList.add("sunk");if(T(v))return I("Computer Wins")}else{L.innerText="Computer Hit",e=e.toLowerCase();let r=q(e);E[r].pos.push(t)}x.addEventListener("click",w)}}()}}function C(e,t){return e.some((e=>e.every(((e,r)=>e===t[r]))))}function q(e){for(let t=0;t<S.length;t++)if(S[t].name===e)return t}function T(e){let t=!0;for(const r of e.gameboard.ships)r.Sunk||(t=!1);return t}function I(e){x.removeEventListener("click",w);const t=document.createElement("div"),r=document.createElement("div"),n=document.createElement("h1"),s=document.createElement("button");n.innerText=e,s.innerText="Play Again",t.classList.add("endgame-container"),r.classList.add("endgame"),n.classList.add("endgame-title"),s.classList.add("endgame-button"),s.addEventListener("click",(()=>{window.location.href="index.html"})),r.append(n,s),t.append(r),document.body.append(t)}!async function(){await new Promise((e=>{const r=setInterval((()=>{void 0!==t&&(clearInterval(r),e())}),500)})),v=new b(t),x.addEventListener("click",w)}()})()})();