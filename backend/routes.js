
let Todo = require('./todo.model');

module.exports = (app) => {

      const todoRoutes = express.Router();
      app.use('/todos', todoRoutes);

      todoRoutes.route('/').get(function(req, res) {
          Todo.find(function(err, todos) {
              if (err) {
                  console.log(err);
              } else {

                  res.json(todos);
              }
          });
      });

      todoRoutes.route('/:id').get(function(req, res) {
          let id = req.params.id;
          Todo.findById(id, function(err, todo) {
              res.json(todo);

          });
      });

      todoRoutes.route('/add').post(function(req, res) {
          let todo = new Todo(req.body);
          todo.save()
              .then(todo => {
                  res.status(200).json('todo added successfully');
              })
              .catch(err => {
                  res.status(400).send('adding new todo failed');
              });
      });

      todoRoutes.route('/update/:id').post((req,res)=>{
        let id=req.params.id;
        Todo.findById(id,(err,todo)=>{
          if(err) {console.log(err)}
          else{

            todo.todoname = req.body.todoname;
            todo.todoresponsible = req.body.todoresponsible;
            todo.todopriority = req.body.todopriority;
            todo.todocompleted = req.body.todocompleted;


            todo.save()
                .then(todo => res.json('todo updated successfully'))
                .catch(err => console.log(err));

          }
        });
      })

      todoRoutes.route('/delete/:id').delete((req,res)=> {
        Todo.findByIdAndRemove(req.params.id,(err,todo)=>{
          if(err) {res.send(err)}
          else{

            res.json('deleted todo');
          }
        });

      });

}
