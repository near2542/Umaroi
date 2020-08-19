function jjj(){
    document.querySelector('#sidebar').classList.toggle('show');
}

document.querySelector('.ham-wrap').addEventListener('click',jjj)

/*document.querySelector('.ham-wrap').addEventListener('click',()=>
{
    document.querySelector('#sidebar').classList.toggle('show')
})*/

/*usort(a,b,function()
{
    return a<b? 1 : -1
})*/



function OrderSearch(e)
{
    e.preventDefault();
}