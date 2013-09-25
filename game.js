var canvasElem = document.getElementById("game");
var world = boxbox.createWorld(canvasElem);

var frank = null;
var f_x, f_y = 0;
var b1, b2, b3 = null;
var stemmen = 4739;
var limiet = 950;

world.onRender(function(ctx) {   
    ctx.fillStyle = "blue";
    ctx.font = "bold 16px Arial";
    ctx.fillText("Stemmen SP.A:  " + stemmen, 10, 16); 
    ctx.fillText("Kiesdrempel:      " + limiet, 10, 35); 
});

function on_tick(e) {
    var pos = this.position();
    if (pos.x == f_x && pos.y == f_y) {
        world.unbindOnTick(on_tick);
        stemmen -= 1000;
        init();
    } else {
        f_x = pos.x;
        f_y = pos.y;
    }
}

function init() {

    if (stemmen < limiet) {
        alert('Jammer maar helaas! SP.A haalt de kiesdrempel niet meer! Druk op Ok om nogmaals te spelen!');
        stemmen = 4739;
    }

    if (frank)
        frank.destroy();
    if (b1)
        b1.destroy();
    if (b2)
        b2.destroy();
    if (b3)
        b3.destroy();

    frank = world.createEntity({
        name: "player",
        shape: "circle",
        radius: 1,
        image: "pig.png",
        imageStretchToFit: true,
        density: 4,
        x: 2,
        onKeyDown: function(e) {
            this.applyImpulse(200, 60);
            this.onTick(on_tick);
        }
    });

    world.createEntity({
        name: "ground",
        shape: "square",
        type: "static",
        color: "rgb(0,100,0)",
        width: 40,
        height: .5,
        y: 16 
    });


    // Brug pijler rechts
    world.createEntity({
        name: "block",
        shape: "square",
        color: "gray",
        type: "static",
        width: .5,
        height: 5,
        y: 13 ,
        x: 23
    });

    // Brug pijler links
    world.createEntity({
        name: "block",
        shape: "square",
        color: "gray",
        type: "static",
        width: .5,
        height: 5,
        y: 13 ,
        x: 28
    });

    // Brug bovenkant
    world.createEntity({
        name: "block",
        shape: "square",
        color: "gray",
        type: "static",
        width: 7,
        height: .5,
        y: 10.5,
        x: 25.5,
        onRender: function(ctx) {
            ctx.fillStyle = "blue";
            ctx.font = "bold 16px Arial";
            ctx.fillText("Centrumbrug", 720, 380);
        }
    });

    var block = {
        name: "block",
        shape: "square",
        color: "gray",
        width: .5,
        height: 3,
        onImpact: function(entity, force) {
            if (entity.name() === "player") {
                this.color("black");
            }
        }
    };

    b1 = world.createEntity(block, {
        x: 15
    });

    b2 = world.createEntity(block, {
        x: 17
    });

    b3 = world.createEntity(block, {
        x: 16,
        y: 1,
        width: 3,
        height: .5,
        onRender: function(ctx) {
            ctx.fillStyle = "blue";
            ctx.font = "bold 16px Arial";
            ctx.fillText("Raadszaal", 439, 380);
        }
    });
}

init();
