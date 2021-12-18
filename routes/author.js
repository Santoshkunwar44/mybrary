const express = require("express");
const router = express.Router();
const Author = require("../model/auther");

// ALL AUTHOR ROUTE

router.get("/", async(req, res) => {
    try{
        const fetchedAuthors =await Author.find({});
        res.render("authors/index",{authors:fetchedAuthors});
    }catch{
        res.redirect("/")
    }   

});

//NEW AUTHOR ROUTE

router.get("/new", (req, res) => {
  res.render("authors/new", { author: new Author() });
});

// CREATE A NEW AUTHOR
router.post("/", async (req, res) => {
  const author = new Author({
    name: req.body.name,
  });
  try {
    const newAuthor = await author.save();
    //    res.redirect(`authors/${newAuthor._id}`)
    res.redirect(`authors`);
  } catch (err) {
    res.render("authors/new", {
      author: author,
      errMessage: "Error creating Author",
    });
  }
});

module.exports = router;
