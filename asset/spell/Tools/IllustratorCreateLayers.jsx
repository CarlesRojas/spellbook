#target Illustrator

const layerNames = [
    'AstralProjection',
    'Foresight',
    'Gate',
    'Imprisonment',
    'MassHeal',
    'MeteorSwarm',
    'PowerWordKill',
    'PrismaticWall',
    'Shapechange',
    'StormOfVengeance',
    'TimeStop',
    'TruePolymorph',
    'TrueResurrection',
    'Weird',
    'Wish',
    'Conjuration',
];

function main() {
    var document = app.activeDocument;

    for(var i=0; i<layerNames.length; ++i){
        var myLayer = document.layers.add();
        myLayer.name = layerNames[i];
    }
}

main();
