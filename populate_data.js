const db = require(`./models/db.js`);

var post = {
    title: `An Ode to Lumpia`,
    username: `@H.P.Lovecraft`,
    tag: [`Poem`, `Food`],
    general:   `You make it with fresh meat
                From a fat and happy pig
                You can make it with shrimp
                Giving it a fishy good stink
                Add salt and pepper for flavor
                Minced onions and carrots, no taters
                Use a head of garlic for boldness
                And add a little dash of niceness
                A bit of soy sauce can be used
                Worcestershire for the adventurous
                Some use herbs and fish sauce
                And mix it all up with no pause
                But youâ€™ll have to roll it after
                Hence the name of the liâ€™l critter
                So buy a nice spring roll wrap
                And roll away after filling it up
                A quick bath in heated hot oil
                Is what each needs to fulfill
                Its destiny of crunchy goodness
                In ones tummy it will reach absolute happiness`,
    upvote: [],
    downvote: [],
    comment: 5
};

db.insertOne(`posts`, post, function(){});
