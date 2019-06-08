var express = require("express");
var app = express();
var port = 4000;
var mongoose = require("mongoose");
mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost:27017/node-demos", { useNewUrlParser: true });

app.use(express.json())
var nameSchema = new mongoose.Schema({
lastName: String,
firstName: String,
email_id: String
});
var User = mongoose.model("AppUser1", nameSchema);
app.get("/app/user/_all", (req, res) => {
User.find((err,users) => {
if (err) return res.status(400).json(err);
if(!users.length) return res.status(404).json({ users: "Not Found" })
return res.json(users);
});
});
app.get("/app/user/:id", (req, res) => {
User.findById(req.params.id,(err,user) => {
if (err) return res.status(400).json(err);
if(!user) return res.status(404).json({ user: "Not Found" })
return res.json(user);
});
});
app.post("/app/user", (req, res) => {
var user = new User(req.body);
console.log(req.body);
user.save()
.then(item => {
res.json(item);
})
.catch(err => {
res.status(400).json(err);
});
});
app.delete("/app/user/:id", (req, res) => {
var id = req.params.id;
User.findByIdAndRemove(id, { sort: "_id" }, (err, data) => {
if (err) return res.status(400).json(err);
if (!data) return res.status(404).json({ id: "Not Found" })
return res.json({ deleted: data });
});
});
app.put('/app/user/:id', function(req, res) {
let id = req.params.id;
var data = {
lastName : req.body.lastName,
firstName : req.body.firstName,
email_id : req.body.email_id
}
User.findByIdAndUpdate(id, data, function(err, user) {
if (err) throw err;
res.send('Document Updated Successfully..!');
});
});

app.listen(port, () => {
console.log("Server listening on port " + port);
});