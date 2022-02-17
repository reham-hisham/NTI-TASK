const dealWithData = require("./helpers/dealWithData")
const uniqid = require("uniqid")

const req = require("express/lib/request")


const showall=(req, res)=>{
    const allTasks=dealWithData.readDataFromJSON('./models/Data.json')
    res.render('showAll',{
        pageTitle: "ALL TASKS",
        allTasks,
        isEmpty: allTasks.length==0? true: false
    }
    
    
    )
}
const find =(item , data )=>{      
    index =0 
    result = {}
   
     data.forEach(element => {
         
         if(((element.title).toLowerCase()).trim() == (item.toLowerCase()).trim()){
            
            index =1
            result = element
         }

     });
     if (index==1){
         return result
     }
} 
const addTask = (req,res)=>{
    
   
    if(req.query.title&&req.query.contant){
        const allTasks = dealWithData.readDataFromJSON('./models/Data.json') 
       const check= find(req.query.title, allTasks)
      
       if (!check){
        allTasks.push({
                           
                            title: req.query.title,
                            contant:req.query.contant,
                           
                        })
                        dealWithData.writeDataToFile('./models/Data.json', allTasks)
                        return res.redirect('/')
       }
       else{

           res.render('addErorr',{
               error:"Title Must Be unique"
           })
       }
       
        
        
    }
    else {
        res.render('addErorr',{
            error:"BOTH TITLE AND CONTANT MUST BE ADDED"
        })
    }



   
}


const del=(req,res)=>{
    const allTasks = dealWithData.readDataFromJSON('./models/Data.json')
    
    index=0
    temp =[]
    allTasks.forEach(element => {
        
        if (((element.title).toLowerCase()).trim() != ((req.params.title).toLowerCase()).trim()){
        allTasks[index]=element
          
        index=index+1
    } 
       
    });
  

    dealWithData.writeDataToFile('./models/Data.json',temp)
    res.render('showAll')




}
const showOne=(req,res)=>{
    const allTasks=dealWithData.readDataFromJSON('./models/Data.json')
    const item = find(req.params.title, allTasks)
   
    res.render('showOneTask',{
        pageTitle: "one Task ",
        item,
        
    },
    )
   
    
    
}
const edit=(req,res)=>{
     const allTasks=dealWithData.readDataFromJSON('./models/Data.json')
    const task =find(req.params.title, allTasks)



        res.render('edit',{
           task
        })
    
}
const edditFunctions =(req,res)=>{
    const allTasks=dealWithData.readDataFromJSON('./models/Data.json')
    index =0
    temp=[]
  
    allTasks.forEach(element => {
        
        if ((element.title) == (req.params.title)){
        
            temp[index]={     
                title: req.body.title,
                contant:req.body.contant,}
          index=index+1
      
    } 
    else{
        temp[index]=element
        index=index+1
      
    }

       
    });
   
    dealWithData.writeDataToFile('./models/Data.json', temp)
    res.redirect('showAll')
}
const delAll =(req,res)=>{
    dealWithData.writeDataToFile('./models/Data.json', [])
    res.redirect('showAll')
}
module.exports = {
   
addTask, 
showall,
  del,
  showOne,
  edit,
  edditFunctions,
  delAll
 
}