/* --------  
   Utils.js

   Utility functions.
   -------- */

function trim(str)      // Use a regular expression to remove leading and trailing spaces.
{
    return str.replace(/^\s+ | \s+$/g, "");	
}

function update(){
let line=1
let text=document.querySelector("#Main_Code").value
 document.querySelector(".line").innerHTML=" "
 text.split("\n").map(()=>{//aquí rompo el texto y recorro para ir añadiendo el numero
  document.querySelector(".line").innerHTML+="<p>"+line+"</p>"
  line++
})
}
window.onload=()=>{
  let editor=document.querySelector(".editor")
  let text=document.querySelector("#Main_Code")
  let line=document.querySelector(".line")
  //agrego un evento de scroll para mover ambos scroll al tiempo (el del editor y el del textarea)
    document.querySelector("#Main_Code").addEventListener("scroll",()=>{   
      let k=editor.scrollHeight/text.scrollHeight //usando proporción para mover simultáneamente ambos scrolls
      editor.scrollTop=text.scrollTop*k

    })
 
}