!function(e){var i={};function t(l){if(i[l])return i[l].exports;var s=i[l]={i:l,l:!1,exports:{}};return e[l].call(s.exports,s,s.exports,t),s.l=!0,s.exports}t.m=e,t.c=i,t.d=function(e,i,l){t.o(e,i)||Object.defineProperty(e,i,{enumerable:!0,get:l})},t.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},t.t=function(e,i){if(1&i&&(e=t(e)),8&i)return e;if(4&i&&"object"==typeof e&&e&&e.__esModule)return e;var l=Object.create(null);if(t.r(l),Object.defineProperty(l,"default",{enumerable:!0,value:e}),2&i&&"string"!=typeof e)for(var s in e)t.d(l,s,function(i){return e[i]}.bind(null,s));return l},t.n=function(e){var i=e&&e.__esModule?function(){return e.default}:function(){return e};return t.d(i,"a",i),i},t.o=function(e,i){return Object.prototype.hasOwnProperty.call(e,i)},t.p="",t(t.s=0)}([function(e,i,t){"use strict";t.r(i);const l=(e,i)=>(e=Math.ceil(e),i=Math.floor(i),Math.floor(Math.random()*(i-e+1))+e);var s=class{constructor(e=!1){this.isMine=e,this.isFlagged=!1,this.isDiscovered=!1,this.surroundingMines=0}};const r=["field__cell_opened","field__cell_closed","field__cell_flagged","field__cell_bombed"];for(let e=1;e<=8;++e)r.push("field__cell_number_"+String(e));class n{static synchronizeCell(e,i){let t=[];t.push(i.isDiscovered?"field__cell_opened":"field__cell_closed"),i.isFlagged?t.push("field__cell_flagged"):i.isDiscovered&&(i.isMine?t.push("field__cell_bombed"):i.surroundingMines>0&&(t.push("field__cell_number_"+String(i.surroundingMines)),e.innerText=String(i.surroundingMines)));for(let i of r)e.classList.remove(i);for(let i of t)e.classList.add(i)}static getFieldView(){return document.getElementById("field")}static getCellView(e,i,t){return this.getFieldView().getElementsByClassName("field__cell")[e*t+i]}static synchronizeField(e){this.getFieldView().innerHTML="";for(let i=0;i<e.size();++i)for(let i=0;i<e.size();++i)this.getFieldView().innerHTML+="<div class='field__cell'></div>";for(let i=0;i<e.size();++i)for(let t=0;t<e.size();++t)this.synchronizeCell(this.getCellView(i,t,e.size()),e.getCell(i,t))}static getCellIndex(e,i){const t=Array.from(e.parentNode.children).indexOf(e);return[Math.floor(t/i),t%i]}}const o=[-1,-1,-1,0,1,1,1,0],d=[-1,0,1,1,1,0,-1,-1];class f{constructor(e){let i=e;this.size=(()=>i),this.valid=((e,t)=>e>=0&&e<i&&t>=0&&t<i);let t=new Array(i);t=t.fill(0).map(e=>new Array(i));for(let e=0;e<i;++e)for(let l=0;l<i;++l)t[e][l]=new s;this.getCell=((e,i)=>{if(!this.valid(e,i))throw RangeError("Invalid property range");return t[e][i]});(()=>{let e=new Array(i).fill(0).map(e=>new Array(i).fill(!1)),s=Math.floor(i*i/10);for(;s>0;){let t=l(0,i-1),r=l(0,i-1);e[t][r]||(e[t][r]=!0,--s)}for(let l=0;l<i;++l)for(let s=0;s<i;++s)e[l][s]&&(t[l][s].isMine=!0);for(let e=0;e<i;++e)for(let l=0;l<i;++l)t[e][l].surroundingMines=this.surroundingMines(e,l)})()}surroundingMines(e,i){let t=0;for(let l=0;l<o.length;++l){let s=e+o[l],r=i+d[l];this.valid(s,r)&&(this.getCell(s,r).isMine&&++t)}return t}}const c=new class{constructor(e=4){this.field=new f(e),this.ended=!1,n.synchronizeField(this.field)}_discover(e,i){if(this.field.valid(e,i)&&!this.field.getCell(e,i).isDiscovered&&!this.field.getCell(e,i).isFlagged){if(this.field.getCell(e,i).isDiscovered=!0,0==this.field.surroundingMines(e,i)&&!this.field.getCell(e,i).isMine)for(let t=0;t<o.length;++t)this._discover(e+o[t],i+d[t]);n.synchronizeCell(n.getCellView(e,i,this.field.size()),this.field.getCell(e,i))}}discover(e,i){this._discover(e,i),this.handleEndOfTheGame()}flag(e,i){this.field.valid(e,i)&&!this.field.getCell(e,i).isDiscovered&&(this.field.getCell(e,i).isFlagged^=1,n.synchronizeCell(n.getCellView(e,i,this.field.size()),this.field.getCell(e,i)),this.handleEndOfTheGame())}checkLose(){for(let e=0;e<this.field.size();++e)for(let i=0;i<this.field.size();++i)if(this.field.getCell(e,i).isMine&&this.field.getCell(e,i).isDiscovered)return!0;return!1}checkWin(){for(let e=0;e<this.field.size();++e)for(let i=0;i<this.field.size();++i){let t=this.field.getCell(e,i);if(!t.isDiscovered&&!t.isMine)return!1}return!0}handleEndOfTheGame(){if(this.checkWin()||this.checkLose()){if(this.ended=!0,this.checkLose()){for(let e=0;e<this.field.size();++e)for(let i=0;i<this.field.size();++i)this.field.getCell(e,i).isMine&&this._discover(e,i);n.synchronizeField(this.field)}setTimeout(()=>{alert(this.checkWin()?"You won!":"You lost!"),location.reload()},2e3)}}}(10);for(let e=0;e<c.field.size();++e)for(let i=0;i<c.field.size();++i){const t=n.getCellView(e,i,c.field.size());t.addEventListener("contextmenu",function(e){if(e.preventDefault(),c.ended)return;let[i,l]=n.getCellIndex(t,c.field.size());c.flag(i,l)}),t.addEventListener("click",function(e){if(e.preventDefault(),c.ended)return;let[i,l]=n.getCellIndex(t,c.field.size());c.discover(i,l)})}}]);