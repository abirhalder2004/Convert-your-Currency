const url =   "https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies";

const dropDownSelects = document.querySelectorAll("select");

const btn = document.querySelector("form button");

const fromCurr = document.querySelector(".from select");

const toCurr = document.querySelector(".to select")

const msg = document.querySelector(".msg")


for(let select of dropDownSelects){
               for(currCode in countryList){
                              let newOption = document.createElement("option");
                              newOption.innerText = currCode;
                              newOption.value = currCode;
                              select.append(newOption);
                              if(select.name === "from" && currCode === "INR"){
                                             newOption.selected = "selected";
                              } else if(select.name === "to" &&  currCode==="USD"){
                                             newOption.selected="selected"
                              }

               }
        select.addEventListener("change",(evt)=>{
               updateFlag(evt.target);
        })       
}

const updateFlag = (element) => {
               let currCode = element.value;
               let countryCode = countryList[currCode];
               let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
               let img = element.parentElement.querySelector("img");
               img.src = newSrc;


}

btn.addEventListener("click", async (evt)=>{
               evt.preventDefault();
               let amount = document.querySelector("input");
               let amountVal = amount.value;
               if(amountVal === "" || amountVal < 1){
                              amountVal = 1;
                              amount.value = "1";
               }
               const mainUrl = `${url}/${fromCurr.value.toLowerCase()}/${toCurr.value.toLowerCase()}.json`
               let response = await fetch(mainUrl);
               let data = await response.json();
               let rate = data[toCurr.value.toLowerCase()];
               let finalAmt = amountVal * rate;
               msg.innerText = `${amountVal} ${fromCurr.value} = ${finalAmt} ${toCurr.value}`

})





