const backgrounds = {
    "Farm": "https://keenlychung.com/dailymood/backgrounds/bg_default.PNG",
    "FlowerFields": "https://keenlychung.com/dailymood/backgrounds/bg_flower_fields.PNG",
    "Castle": "https://keenlychung.com/dailymood/backgrounds/bg_castle.PNG"
}

export const bgImageParser = (bgName) => {
    return backgrounds[bgName];
}

export const bgImages = () => {
    const bgImages = [];
    const bgNames = [];
    const bgs = { bgImages, bgNames };

    for (let key in backgrounds) {
        bgImages.push(backgrounds[key]);
        bgNames.push(key);
    }

    return bgs;
}

export const userBgImages = (userBgs) => {
    const userBgImages = [];
    const userBgNames = [];
    const bgs = { userBgImages, userBgNames };

    for (let key in backgrounds) {
        if (userBgs.includes(key)) {
            userBgImages.push(backgrounds[key]);
            userBgNames.push(key);
        }
    }

    return bgs;
}
