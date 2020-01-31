"use strict";
const { writeFile } = require("fs");
const axios = require("axios");
const inquirer = require("inquirer");
const { promisify } = require("util");

const writeFileAsync = promisify(writeFile);
async function userInfo() {
  try {
    const answers = await inquirer.prompt([
      {
        type: "input",
        message: "Enter your GitHub username:",
        name: "username"
      },
      {
        type: "list",
        message: "What is your favorite color?",
        choices: ["Red", "Green", "Blue"],
        name: "colors"
      }
    ]);
    console.log(answers);
    const response = await axios.get(
      `https://api.github.com/users/${answers.username}`
    );
    // const {
    //   name,
    //   blog,
    //   bio,
    //   public_repos,
    //   followers,
    //   following,
    //   location,
    //   starred,
    //   avatar_url
    // } = response.data;

    const htmltext = html(response.data);
    console.log(htmltext);
  } catch (error) {
    console.log(answers.username);
  }
}
userInfo();
function html({
  name,
  blog,
  bio,
  public_repos,
  followers,
  following,
  location,
  starred,
  avatar_url
}) {
  return `<!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta http-equiv="X-UA-Compatible" content="ie=edge" />
        <link
          rel="stylesheet"
          href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css"
          integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh"
          crossorigin="anonymous"
        />
        <link
          rel="stylesheet"
          href="https://use.fontawesome.com/releases/v5.12.0/css/all.css"
          integrity="sha384-REHJTs1r2ErKBuJB0fCK99gCYsVjwxHrSU0N7I1zl9vZbggVJXRMsv/sLlOAGb4M"
          crossorigin="anonymous"
        />
    
        <link rel="stylesheet" type="text/css" href="style.css" />
        <title>|| User Github Info ||</title>
      </head>
    
      <body>
        <div class="container">
          <div class="row">
            <div class="col-md-2">
              <div class="card" style="width: 69rem;">
                <div class="card-body">
                  <img src="${avatar_url}" class="card-img-top" alt="..." />
                  <h1 class="card-title">Hi!</h1>
                  <h1 class="card-title">My name is ${name}!</h1>
                  <p class="card-text">
                    <i class="fas fa-location-arrow"> ${location}</i>
                    <i class="fab fa-github">${bio}</i>
                    <i class="fas fa-rss-square">${blog}</i>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </body>
    </html>`;
}

//     console.log(html);
//     fs.writeFile("index.html", html, function(err) {
//       if (err) console.log("error", err);
//     });
//   });
// //Profile image
// // User name
// // Links to the following:

// // User location via Google Maps
// // User GitHub profile
// // User blog

// // User bio
// // Number of public repositories
// // Number of followers
// // Number of GitHub stars
// // Number of users following
