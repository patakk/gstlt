function map(value, min1, max1, min2, max2) {
    return min2 + (max2 - min2) * ((value - min1) / (max1 - min1));
}

let palettesstrings = [
    '59a96a-8b85c1-ef3054',
    'bf1f2e-297d45-26408f',
    'bf1f2e-297d45-26408f-ff9922',
    '45070a-ee3000-fa6302-83250b',
    '070a45-3000dc-6302fa-250b83',
    '759ef0-8aadf2-2350a8-1261ff-1b54c4',
    'b26e63-084c61-d9fff8-dc758f-73d2de-56a3a6-1f3c36-f4c7a4-664c43-714c04-83bca9-bf2d16-b84527-d36135-282b28-c4f4c7-c83e4d-c8e0f4-d2a467-4f6d7a-3e5641-654c4f-88beb6-e3d3e4-9dd1f1-e8e1ef-9bb291-ffbc42-952709-e3b505-ba1200-218380-32373b-4e2649-9da9a0-cec075-f4d6cc-508aa8-975341-39160e-873d48-a24936-c7ffda-e2af51-c0caad-031927-4a5859-db504a-f4b860-df1129',
    '5da6fb-fc1859-995dff-3c5e85-77a0d0-8c70ba-a8415e-ce935b-dbbb6f-69995d-5c5cfa-fc4319-e45cff-3c3c85-7777d1-af70ba-a85442-cfc95b-c9db70-5d996d-6c6cea-af4666-b86cef-43437e-7f7fc7-9a76b2-865765-a7a381-adb795-638479-9f6cb8-e5432f-e26cbb-5a4366-9c7faa-ad769a-9f554c-c39a65-c8af7b-757f6a-eb7d6c-89cb7c-f0ca6c-7d4a42-c7897f-b3a376-5f8758-80a5a6-95a8b8-7d6285-fab05c-dd4523-c3ff5c-85633c-d1a777-9eba70-42a88b-5b97cf-7090db-8d5d99',
    '0f0465-116ad2-a8e0ff-fbfaf8-c99700-ae9142-ff6600-f37449-ff1d15-f15152',
];

function ssorted(array) {
    let narray = [];
    for (let k = 0; k < array.length; k++) {
        narray.push(array[k]);
    }

    for (let j = 0; j < narray.length; j++) {
        for (let i = 0; i < narray.length; i++) {
            if (getb(narray[i]) > getb(narray[j])) {
                [narray[i], narray[j]] = [narray[j], narray[i]];
            }
        }
    }

    let nnarray = [];
    for (let k = 0; k < Math.min(narray.length, 33); k++) {
        nnarray.push(narray[k]);
    }

    return nnarray;
}

function getFromStrings(strings) {
    let palettes = [];
    strings.forEach(element => {
        palettes.push(element);
    });
    for (var k = 0; k < palettes.length; k++) {
        let text = palettes[k];
        let cols = text.split('-')
        let caca = [];
        cols.forEach((e) => {
            caca.push(hexToRgb(e))
        });
        shuffle(caca)
        //caca = ssorted(caca)
        var coco = [];
        caca.forEach((e, i) => {
            coco.push([
                (caca[i][0] + 0. * map(prng.rand(), 0, 1, -.2, .2)),
                (caca[i][1] + 0. * map(prng.rand(), 0, 1, -.2, .2)),
                (caca[i][2] + 0. * map(prng.rand(), 0, 1, -.2, .2))
            ])
        });
        palettes[k] = coco;
    }
    return palettes;
}

function getPalette() {
    let palettes = getFromStrings(palettesstrings);
    let bgpalettes = getFromStrings([
        'f6bd60-84a59d-f28482-d88c9a-f2d0a9-99c1b9-8e7dbe-edc1a4-f78972-d98db9-f2b3aa-99c2a9-7e87bf-d88c95-f2c1a9-a9b1ac-a27da4-889ca9-90a5b8-6e8998-7f8f9b-7c8da3',]);

    return { palettes, bgpalettes };
}

// let cc = rybcolor(prng.rand());
// cc = saturatecol(cc, -.9);
// cc = (cc, rand(-.2, .5));
// bgpalettes = [[cc]]


// palettesstrings = [
//     ['#324FA6','#478c77','#FC4426','#A3AC3F'],
// ]


// for(let k = 0; k < palettesstrings.length; k++){
//     palettesstrings[k] = palettesstrings[k].join('-').replace(/#/g, '');
// }



function hexToRgb(hex) {
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result
        ? [
            parseInt(result[1], 16) / 255.,
            parseInt(result[2], 16) / 255.,
            parseInt(result[3], 16) / 255.
        ]
        : null;
}


function getb(c) {
    //return 0.2126 * c[0] + 0.7152 * c[1] + 0.0722 * c[2];
    return Math.sqrt(0.299 * c[0] * c[0] + 0.587 * c[1] * c[1] + 0.114 * c[2] * c[2])
}


function shuffle(array) {
    let currentIndex = array.length
    var randomIndex;

    // While there remain elements to shuffle.
    while (currentIndex != 0) {

        // Pick a remaining element.
        randomIndex = Math.floor(prng.rand() * currentIndex);
        currentIndex--;

        // And swap it with the current element.
        [
            array[currentIndex], array[randomIndex]
        ] = [
                array[randomIndex], array[currentIndex]
            ];
    }

    return array;
}


export { getPalette }