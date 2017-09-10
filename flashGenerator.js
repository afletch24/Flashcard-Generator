var BasicCard = require("./BasicCard.js");
var ClozeCard = require("./ClozeCard.js");
var inquirer = require("inquirer");
var fs = require("fs");

inquirer.prompt([
    {
        type: "list",
        name: "createOrShow",
        message: "Hello, What would you like to do?",
        choices: ["Create new flash cards", "Show all flash cards"]
    }
]).then(function(answer){
    if(answer.createOrShow === "Create new flash cards" ){
        createCard();
    }
    else if(answer.createOrShow === "Show all flash cards"){
        showCards();
    }
    else{
        console.log("error");
    }
});

var createCard = function(answer){
    inquirer.prompt([
        {
            type: "list",
            name: "cardType",
            message: "What kind of card would you like to create?",
            choices: ["Basic Question", "Fill in the Blank"]
        }
    ]).then(function(answer){
        if(answer.cardType === "Basic Question"){
            inquirer.prompt([
                {
                    type: "input",
                    name: "front",
                    message: "What is the Question?",
                },{
                    type: "input",
                    name: "back",
                    message: "What is the answer to your question?"
                }
            ]).then(function(answer){
                var newBasic = new BasicCard(answer.front, answer.back);
                newBasic.create();
                nowWhat();
            });
        }else if(answer.cardType === "Fill in the Blank"){
            // ask user for info to create new card
            // create new card through consdtructor
        }
    });  
}

var nowWhat = function(){
    console.log("inside the nowWhat funciton");
    inquirer.prompt([
        {
            type: "list",
            name: "nowWhat",
            message: "What would you like to do next?",
            choices: ["Create another new card", "show cards", "Nothing, I'm done."]
        }
    ]).then(function(answer){
        if(answer.nowWhat === "Create another new card"){
            createCard();
        }else if(answer.nowWhat === "show cards"){
            showCards();
            console.log("show cards function");
            
        }else if(answer.nowWhat === "Nothing, I'm done."){
            console.log("Ok, come again!");
            return;
        }
    });
};

var showCards = function(){
    console.log("inside showCards function");
    fs.readFile("log.txt", "utf8", function(error, data){
        console.log("inside readFile");
        if(error){
            console.log("Error Ocurred: " + error);
        }
        var questions = data.split(';');
        showQuestion();
    });
    
}

var showQuestion = function(){
    var question = JSON.parse(questions);
    var questionText;
    var correctAnswer;
    if(question.type === "basic"){
        questiontext= question.front;
        correctAnswer= question.back;
    }else if(question.type === "cloze"){

    }
    inquirer.prompt([
        {
            name: "response",
            message: "questionText"
        }
    ]).then(function(answer){
        if(answer.response === correctAnswer){
            console.log("Correct! Good job!");
        }
        else{
            console.log("ehh nice try");
        }
    }
    );
}