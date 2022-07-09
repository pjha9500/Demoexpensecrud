class datas
{
    constructor(amount,description,category)
    {
        this.amount=amount;
        this.description=description;
        this.category=category;
    }
}


async function getMethod()
{



    let get=new Promise((resolve, reject) => {
        axios({
            method:'get',
            url:'https://crudcrud.com/api/04b08715e8144c719bd1d55a307c9b43/expense',
        }).then((res)=> {
            showOnScreen(res.data);
            resolve();
        });
        
    })
    await get;
}
getMethod().then(()=>console.log("Showed on screen")).catch(()=>{console.log("Something went wrong")});

async function showOnScreen(res)
{
    let showdata=new Promise((resolve, reject) => {
        for(let i=0;i<res.length;i++)
        {
            let dt=res[i]._id;
            let data=document.createElement('li');
            data.id=dt;
            data.innerHTML=`${res[i].amount}--${res[i].description}---${res[i].category}--<button class="deletes" onclick=deletes('${dt}')>Delete</button>-<button onclick=edits('${dt}')>Edit</button>`
            document.getElementById('showdata').appendChild(data);
            console.log(data);
        }
        
    })
    await showdata;

}

async function appendData(res)
{
    let appending=new Promise((resolve, reject) => {
        let parent=document.getElementById('showdata');
        let dt=res._id;
        let data=document.createElement('li');
        data.id=dt;
        data.innerHTML=`${res.amount}--${res.description}---${res.category}--<button class="deletes" onclick=deletes('${dt}')>Delete</button>-<button onclick=edits('${dt}')>Edit</button>`
        document.getElementById('showdata').appendChild(data);

        document.getElementById('amount').value='';
        document.getElementById('description').value='';
        resolve();
        
    })

    await appending;
}

let data=document.getElementById('formbox');

data.addEventListener('submit',xyz);
function xyz(e)
{
    e.preventDefault();
    

        let expense= new datas(document.getElementById('amount').value ,document.getElementById('description').value,document.getElementById('categorys').value);
        axios({
            method:'post',
            url:'https://crudcrud.com/api/04b08715e8144c719bd1d55a307c9b43/expense',
            data:expense
        }).then((res)=>{
            console.log(res.data);
            appendData(res.data).then(()=>{console.log("Data Added")}).catch(()=>{console.log("Data not Added")});
        }).catch(()=>console.log("error"));
        // localStorage.setItem(document.getElementById('description').value,JSON.stringify(expense));
        // location.reload();
}
function deleteFromScreen(datasx)
{
    let parent=document.getElementById('showdata');
    let child=document.getElementById(datasx);
    parent.removeChild(child);

}
function deletes(datasx)
{
        deleteFromScreen(datasx);
        axios({
        method:'delete',
        url:`https://crudcrud.com/api/04b08715e8144c719bd1d55a307c9b43/expense/${datasx}`
    }).then((res)=>console.log("Done"));
    
}
function edits(datasx)
{
    axios({
        method:'get',
        url:`https://crudcrud.com/api/04b08715e8144c719bd1d55a307c9b43/expense/${datasx}`
    }).then((res)=>
    {
            let dt=res.data._id;
            deletes(dt);
            document.getElementById('amount').value=res.data.amount;
            document.getElementById('description').value=res.data.description;
            document.getElementById('categorys').value=res.data.category;
    }
    ).catch((res)=>(console.log("error")));

}




