const router = require("./route");
const github = require("github-api")

const gh = new github();
const user = gh.getUser("vzze");

function organizeRepos(repos) {
    const filtered_props = [];
    repos.data.forEach(repo => {
        filtered_props.push({name: repo.name, description: repo.description, url: repo.html_url, stars: repo.stargazers_count})
    });
    filtered_props.sort((a, b) => b.stars - a.stars);
    return filtered_props;
}

let handle_requests = false;
let filtered_props;

user.listRepos().then(repos => {
    router.get('/', (_, res) => {
        filtered_props = organizeRepos(repos);
        res.render("home.ejs", {filtered_props});
    });

    router.post('/', (req, res) => {
        const { refreshbutton } = req.body;
        if(refreshbutton != undefined && !handle_requests) {
            handle_requests = true;
            user.listRepos().then(repos => {
                filtered_props = organizeRepos(repos);
                setTimeout(() => { handle_requests = false; }, 1000);
                res.render("home.ejs", {filtered_props});
            }).catch(_ => {
                res.render("404.ejs")
            });
        } else {
            res.render("home.ejs", {filtered_props});
        }
    });
}).catch(_ => {
    res.render("404.ejs");
});

module.exports = router;
