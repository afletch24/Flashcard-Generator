var fs = require("fs");

var BasicCard = function(front, back){
    this.front = front,
    this.back = back,
    this.create = function(){
        var cardContent = {
            front: this.front,
            back: this.back,
            type: "basic"
        };

        fs.appendFile("log.txt", JSON.stringify(cardContent) + ';', "utf8", function(error) {
            if (error) {
                console.log(error);
            }
            console.log("New Basic card added!");
        });
    };

    
}

module.exports = BasicCard;