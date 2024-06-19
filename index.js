import {menuArray} from './data.js'


const payForm = document.getElementById('pay-form')
let isClicked = false
let selectedItem = []
let selectedItemsPrice = []

document.addEventListener('click', e=>{
    if(e.target.dataset.add){
        renderSelectedItems(e.target.dataset.add)
        document.getElementById('yourOrderTxt').innerHTML = "Your order"
    } 
    
    else if(e.target.dataset.remove){
        remove(e.target.dataset.remove)
    } 
    
    else if(e.target.id === 'complete-order-btn'){
        if(!selectedItemsPrice.reduce((t,c)=>{
            return t + c
        }, 0)){
            document.getElementById('pay-cont').style.display = "none"
            document.getElementById('yourOrderTxt').innerHTML = "Please select what to buy first"
        } else{
            document.getElementById('pay-cont').style.display = "Flex"
        } 
    } else if(e.target.id === 'cancel-payment'){
        document.getElementById('pay-cont').style.display = "none"
    } 
    else if(e.target.id === 'changeTheme'){
        if(!isClicked){
        const linkTag= document.createElement('link')
        linkTag.href = 'dark.css'
        linkTag.rel = 'stylesheet'
        linkTag.id = 'darkCss'
        document.getElementsByTagName('head')[0].appendChild(linkTag)
        document.getElementById('changeTheme').innerText = '☀️'
        isClicked = !isClicked
    }
        else {
            const darkCss = document.getElementById('darkCss')
            darkCss.remove()
            document.getElementById('changeTheme').innerText = '🌙'
            isClicked = !isClicked 
        }
    }
})

payForm.addEventListener('submit',e =>{ 
    e.preventDefault()
    document.getElementById('pay-cont').style.display = "none"
    document.getElementById('thanks').style.display = "block"
} )

function ItemHtml(itemArr){
    return itemArr.map((item)=>{
    const {name, ingredients, price, emoji, id} = item
        return `
<div class="item-cont">
    <div class="Item-detail">
        <div class="item-thumb" id="item-thumb" role="img" aria-label="">${emoji}</div>
        <div class="text-description">
            <h1 id="item-name" >${name}</h1>
            <p id="description"> ${ingredients}</p>
            <h2 id="price-tag">$${price}</h2>
        </div>
    </div>
    <button id="add-item-btn-${name}" class="add-item-btn" data-add="${id}"> + </button>
</div>`}, 0).join('')
}

function GetOrderedItemHtml (){
        return selectedItem.map((item)=>{
            const {name, ingredients, price, emoji, id, count} = item
            return`
            <div class="oreder-overview" id="oreder-overview">
                <p class="selected-item" id="selected-item"> ${name} 
                    <span id="removebtns"> 
                        <button 
                        id="remove-btns ${id}" 
                        class="remove-btns" 
                        data-remove = 'R${id}'>
                            Remove </button>
                    </span>
                </p>
                <div class="prices-count">
                    <p  
                    class="ordered-price"                
                    id="ordered-price"> $${price} </p>
                </div>
            </div>` 
        }).join('')
    }
function renderSelectedItems(btnId){
    const selctedItemObj = menuArray.filter((item)=>btnId.includes(item.id))[0]
    let{name, price} = selctedItemObj
    
    selectedItemsPrice.push(price)
    selectedItem.push(selctedItemObj) 

    document.getElementById('count-cont').innerHTML =  GetOrderedItemHtml()            
    document.getElementById('total-price').innerText = `$${selectedItemsPrice.reduce((t,c)=>{
        return t + c
    })}`  
}

function remove(removebtnId){
        const filtered = selectedItem.filter((item)=>removebtnId.includes(item.id))[0]
        const index = selectedItem.indexOf(filtered)
        selectedItem.splice(index, 1)
        document.getElementById('count-cont').innerHTML =  GetOrderedItemHtml()  
        const whatsLeft = selectedItemsPrice.reduce((t,c) => t + c) - filtered.price
        document.getElementById('total-price').innerText = `$${whatsLeft}`
        selectedItemsPrice = [whatsLeft]
}

    document.getElementById('memu-cont').innerHTML = ItemHtml(menuArray)


