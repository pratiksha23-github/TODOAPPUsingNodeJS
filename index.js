const express=require('express');
const port=8000;

const db = require('./config/mongoose');
const task=require('./models/task');

const app = express();

app.use(express.urlencoded());

app.set('view engine', 'ejs');
app.set('views', './views');

// finding task
app.get('/', async (req, res) => {
  try {
    const Task = await task.find({});
    return res.render('home', {
      title: "Home",
       task: Task
    });
  } catch (err) {
    console.log('Error in fetching task', err);
    return;
  }
});
// 
// app.get('/', (req, res) => {
//     Task.find({}, function(err, task) {
//         if(err){
//             console.log("Error in fetching task", err);
//             return;
//         }
//         return res.render('home',{
//             title: 'Home',
//             task: task
//         });
//     }
// )});

//creating tasks
app.post('/create-task', function(req, res) {
  task.create({
        description:req.body.description,
        category:req.body.category,
        date:req.body.date
  })
    .then(newtask => {
      console.log(newtask);
      return res.redirect('back');
    })
    .catch(err => {
      console.log('error in creating task', err);
      return;
    });
});


// app.post('/create-task', (req, res) => {
//     Task.create({
//         description:req.body.description,
//         category:req.body.category,
//         date:req.body.date
//     }, function(err, newtask) {
//         if(err) {
//             console.log('error in creating task', err);
//             return;
//         }
//         return res.redirect('back');
//     });
// });

//deleting Tasks
app.get('/delete-task', function(req, res) {
   var id=req.query;
    var cnt=Object.keys(id).length;
    for(let i=0; i<cnt; i++){
    task.findByIdAndDelete(Object.keys(id)[i]).then(function(id){
        console.log(id);
        return res.redirect('back');
    })
    .catch(err => {
        console.log('error in deleting task', err);
        return;
    })
}
})

// app.get('/delete-task', function(req, res) {
//     var id=req.query;
//     var cnt=Object.keys(id).length;
//     for(let i=0; i<cnt; i++){
//         task.findByIdAndDelete(Object.keys(id)[i], function(err){
//             if(err){
//                 console.log("error deleting task", err);
//             }
//         })
//     }
//     return res.redirect('back');
// })




app.listen(port, function(err){
    if(err){
        console.log("error listening on port", err);
    }
    console.log("listening on port", port);
})