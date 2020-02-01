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
      body {
        text-align: center;
      }
      .card-body {
        background-color: #4aaaa5;
        color: white;
        height: 400px;
        margin-top: 40px;
        padding: 0px;
      }
      i {
        padding: 0 1rem;
      }
      #card-color {
        background-color: #777777;
        height: 200px;
        margin-bottom: 25px;
      }
      .card {
        border: 0px;
      }
      .background {
        background: url("https://www.toptal.com/designers/subtlepatterns/patterns/green_gobbler.png");
      }
      img {
        border-style: solid !important;
      }
      
    </head>
  
    <body>
      <div class="background">
      <div class="container">
        <div class="row">
          <div class="d-flex justify-content-center col-sm-12 col-md-12 col-lg-12">
              <div class="card-body rounded" id="card-color" style= "width:500px; height:400px;background-color: #4aaaa5; border-style: solid !important; border-color:white">
                <div class="avatar mx-auto white">
                  <img src="${avatar_url}"  class="rounded-circle img-responsive" style ="height: 200px; border-color:white">
                </div>
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
        <div class="row">
          <div class="d-flex justify-content-center col-sm-6 col-md-12 col-lg-6">
            <div style="max-width: 18rem;">
              <div class="card-body rounded" id="card-color" style= "width:300px; border-style: solid !important; border-color:white">
                <p class="card-text">
                  <h3><u>Public Repositories</u></h3>
                </p>
                <p class="card-text">
                  <h3>${public_repos}</h3>
                </p>
              </div>
            </div>
          </div>
          <div class="d-flex justify-content-center col-sm-6 col-md-12 col-lg-6">
            <div style="max-width: 18rem;">
              <div class="card-body rounded" id="card-color" style= "width:300px; border-style: solid !important; border-color:white">
                <p class="card-text">
                  <h3><u>Followers</u></h3>
                </p>
                <p class="card-text">
                  <h3>${followers}</h3>
                </p>
              </div>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="d-flex justify-content-center col-sm-6 col-md-12 col-lg-6">
            <div style="max-width: 18rem;">
              <div class="card-body rounded" id="card-color" style= "width:300px; border-style: solid !important; border-color:white">
                <p class="card-text">
                  <h3><u>Github Stars</u></h3>
                </p>
                <p class="card-text">
                  <h3>${starred}</h3>
                </p>
              </div>
            </div>
          </div>
          <div class="d-flex justify-content-center col-sm-6 col-md-12 col-lg-6">
            <div style="max-width: 18rem;">
              <div class="card-body rounded" id="card-color" style= "width:300px; border-style: solid !important; border-color:white">
                <p class="card-text">
                  <h3><u>Following</u></h3>
                </p>
                <p class="card-text">
                  <h3>${following}</h3>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </body>
  </div>
  </html>`;
}

//     console.log(html);
//     fs.writeFile("index.html", html, function(err) {
//       if (err) console.log("error", err);
//     });
//   });
