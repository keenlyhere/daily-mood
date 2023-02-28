const petImageParser = (flavor, emotion) => {
    const flavors = {
        "Sesame": {
            "normal": "https://keenlychung.com/dailymood/cows/cow_sesame_normal.PNG",
            "happy": "https://keenlychung.com/dailymood/cows/cow_sesame_happy.PNG",
            "sleepy": "https://keenlychung.com/dailymood/cows/cow_sesame_sleepy.PNG",
            "sad": "https://keenlychung.com/dailymood/cows/cow_sesame_sad.PNG",
            "angry": "https://keenlychung.com/dailymood/cows/cow_sesame_angry.PNG",
            "unimpressed": "https://keenlychung.com/dailymood/cows/cow_sesame_unimpressed.PNG",
            "scared": "https://keenlychung.com/dailymood/cows/cow_sesame_scared.PNG",
            "moohouse": "https://keenlychung.com/dailymood/cows/cow_sesame_moohouse.PNG"
        },
        "Strawberry": {
            "normal": "https://keenlychung.com/dailymood/cows/cow_strawberry_normal.PNG",
            "happy": "https://keenlychung.com/dailymood/cows/cow_strawberry_happy.PNG",
            "sleepy": "https://keenlychung.com/dailymood/cows/cow_strawberry_sleepy.PNG",
            "sad": "https://keenlychung.com/dailymood/cows/cow_strawberry_sad.PNG",
            "angry": "https://keenlychung.com/dailymood/cows/cow_strawberry_angry.PNG",
            "unimpressed": "https://keenlychung.com/dailymood/cows/cow_strawberry_unimpressed.PNG",
            "scared": "https://keenlychung.com/dailymood/cows/cow_strawberry_scared.PNG",
            "moohouse": "https://keenlychung.com/dailymood/cows/cow_strawberry_moohouse.PNG"
        },
        "Matcha": {
            "normal": "https://keenlychung.com/dailymood/cows/cow_matcha_normal.PNG",
            "happy": "https://keenlychung.com/dailymood/cows/cow_matcha_happy.PNG",
            "sleepy": "https://keenlychung.com/dailymood/cows/cow_matcha_sleepy.PNG",
            "sad": "https://keenlychung.com/dailymood/cows/cow_matcha_sad.PNG",
            "angry": "https://keenlychung.com/dailymood/cows/cow_matcha_angry.PNG",
            "unimpressed": "https://keenlychung.com/dailymood/cows/cow_matcha_unimpressed.PNG",
            "scared": "https://keenlychung.com/dailymood/cows/cow_matcha_scared.PNG",
            "moohouse": "https://keenlychung.com/dailymood/cows/cow_matcha_moohouse.PNG"
        },
        "Taro": {
            "normal": "https://keenlychung.com/dailymood/cows/cow_taro_normal.PNG",
            "happy": "https://keenlychung.com/dailymood/cows/cow_taro_happy.PNG",
            "sleepy": "https://keenlychung.com/dailymood/cows/cow_taro_sleepy.PNG",
            "sad": "https://keenlychung.com/dailymood/cows/cow_taro_sad.PNG",
            "angry": "https://keenlychung.com/dailymood/cows/cow_taro_angry.PNG",
            "unimpressed": "https://keenlychung.com/dailymood/cows/cow_taro_unimpressed.PNG",
            "scared": "https://keenlychung.com/dailymood/cows/cow_taro_scared.PNG",
            "moohouse": "https://keenlychung.com/dailymood/cows/cow_taro_moohouse.PNG"
        },
        "Blueberry": {
            "normal": "https://keenlychung.com/dailymood/cows/cow_blueberry_normal.PNG",
            "happy": "https://keenlychung.com/dailymood/cows/cow_blueberry_happy.PNG",
            "sleepy": "https://keenlychung.com/dailymood/cows/cow_blueberry_sleepy.PNG",
            "sad": "https://keenlychung.com/dailymood/cows/cow_blueberry_sad.PNG",
            "angry": "https://keenlychung.com/dailymood/cows/cow_blueberry_angry.PNG",
            "unimpressed": "https://keenlychung.com/dailymood/cows/cow_blueberry_unimpressed.PNG",
            "scared": "https://keenlychung.com/dailymood/cows/cow_blueberry_scared.PNG",
            "moohouse": "https://keenlychung.com/dailymood/cows/cow_blueberry_moohouse.PNG"
        },
        "MilkTea": {
            "normal": "https://keenlychung.com/dailymood/cows/cow_milktea_normal.PNG",
            "happy": "https://keenlychung.com/dailymood/cows/cow_milktea_happy.PNG",
            "sleepy": "https://keenlychung.com/dailymood/cows/cow_milktea_sleepy.PNG",
            "sad": "https://keenlychung.com/dailymood/cows/cow_milktea_sad.PNG",
            "angry": "https://keenlychung.com/dailymood/cows/cow_milktea_angry.PNG",
            "unimpressed": "https://keenlychung.com/dailymood/cows/cow_milktea_unimpressed.PNG",
            "scared": "https://keenlychung.com/dailymood/cows/cow_milktea_scared.PNG",
            "moohouse": "https://keenlychung.com/dailymood/cows/cow_milktea_moohouse.PNG"
        },
        "Chocolate": {
            "normal": "https://keenlychung.com/dailymood/cows/cow_chocolate_normal.PNG",
            "happy": "https://keenlychung.com/dailymood/cows/cow_chocolate_happy.PNG",
            "sleepy": "https://keenlychung.com/dailymood/cows/cow_chocolate_sleepy.PNG",
            "sad": "https://keenlychung.com/dailymood/cows/cow_chocolate_sad.PNG",
            "angry": "https://keenlychung.com/dailymood/cows/cow_chocolate_angry.PNG",
            "unimpressed": "https://keenlychung.com/dailymood/cows/cow_chocolate_unimpressed.PNG",
            "scared": "https://keenlychung.com/dailymood/cows/cow_chocolate_scared.PNG",
            "moohouse": "https://keenlychung.com/dailymood/cows/cow_chocolate_moohouse.PNG"
        },
        "Mango": {
            "normal": "https://keenlychung.com/dailymood/cows/cow_mango_normal.PNG",
            "happy": "https://keenlychung.com/dailymood/cows/cow_mango_happy.PNG",
            "sleepy": "https://keenlychung.com/dailymood/cows/cow_mango_sleepy.PNG",
            "sad": "https://keenlychung.com/dailymood/cows/cow_mango_sad.PNG",
            "angry": "https://keenlychung.com/dailymood/cows/cow_mango_angry.PNG",
            "unimpressed": "https://keenlychung.com/dailymood/cows/cow_mango_unimpressed.PNG",
            "scared": "https://keenlychung.com/dailymood/cows/cow_mango_scared.PNG",
            "moohouse": "https://keenlychung.com/dailymood/cows/cow_mango_moohouse.PNG"
        },
        "Moohouse": {
            "normal": "https://keenlychung.com/dailymood/cows/cow_moohouse_normal.PNG",
            "happy": "https://keenlychung.com/dailymood/cows/cow_moohouse_happy.PNG",
            "sleepy": "https://keenlychung.com/dailymood/cows/cow_moohouse_sleepy.PNG",
            "sad": "https://keenlychung.com/dailymood/cows/cow_moohouse_sad.PNG",
            "angry": "https://keenlychung.com/dailymood/cows/cow_moohouse_angry.PNG",
            "unimpressed": "https://keenlychung.com/dailymood/cows/cow_moohouse_unimpressed.PNG",
            "scared": "https://keenlychung.com/dailymood/cows/cow_moohouse_scared.PNG",
            "moohouse": "https://keenlychung.com/dailymood/cows/cow_moohouse_moohouse.PNG"
        }
    }

    return flavors[flavor][emotion];
}

const bgImageParser = (bgName) => {
    const backgrounds = {
        "default": "https://keenlychung.com/dailymood/backgrounds/bg_default.PNG",
        "Farm": "https://keenlychung.com/dailymood/backgrounds/bg_default.PNG",
        "FlowerFields": "https://keenlychung.com/dailymood/backgrounds/bg_flower_fields.PNG",
        "Castle": "https://keenlychung.com/dailymood/backgrounds/bg_castle.PNG"
    }

    return backgrounds[bgName];
}

module.exports = {
    petImageParser,
    bgImageParser
}
