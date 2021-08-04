const express = require("express");

const port = process.env.PORT || 3000;

const app = express();
const mongoose = require("mongoose");

app.use(express.urlencoded({ extended: true }));

app.set("view engine", "ejs");
app.use(express.static("public"));

// Here we connect Mongoose!

mongoose.connect(
  "mongodb://localhost:27017/todolistDB",
  { useNewUrlParser: true },
  { useUnifiedTopology: true }
);

const itemsSchema = {
  name: String,
};

const Item = mongoose.model("Item", itemsSchema);

const item1 = new Item({
  name: "Welcome",
});

const item2 = new Item({
  name: "Hit the + button to add a new item.",
});

const item3 = new Item({
  name: "<-- Hit this to delete an item.",
});

const defaultItems = [item1, item2, item3];

app.get("/", function (req, res) {
  Item.find({}, function (err, foundItems) {
    if (foundItems.length === 0) {
      Item.insertMany(defaultItems, function (err) {
        if (err) {
          console.log(err);
        } else {
          console.log("Successfully savevd default items to DB.");
        }
      });
      res.redirect("/");
    } else {
      res.render("list", { listTitle: "Today", newListItems: foundItems });
    }
  });
});

app.post("/", (req, res) => {
  const itemName = req.body.newItem;
  const item = new Item({
    name: itemName,
  });
  item.save();
  res.redirect("/");
});

//Delete Route

app.post("/delete", (req, res) => {
  const checkedItemId = req.body.checkbox;
  Item.findByIdAndRemove(checkedItemId, (error) => {
    if (error) {
      console.log("Problem");
    } else {
      console.log("Success");
      res.redirect("/");
    }
  });
});

//Listening Here

app.listen(port, () => {
  console.log("Server up");
});
