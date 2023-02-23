export default function moodParser(value) {
    switch (value) {
        case "Sad": {
            return "https://cdn.icon-icons.com/icons2/2000/PNG/512/crying_emoji_sad_icon_123390.png";
        }
        case "Meh": {
            return "https://cdn.icon-icons.com/icons2/1465/PNG/512/023neutralface_100669.png";
        }
        case "Content": {
            return "https://cdn.icon-icons.com/icons2/1808/PNG/512/emoji-smile_115244.png";
        }
        case "Happy": {
            return "https://cdn.icon-icons.com/icons2/1277/PNG/512/1497560833-smiley-18_85059.png";
        }
        case "Ecstatic": {
            return "https://cdn.icon-icons.com/icons2/860/PNG/512/happy_icon-icons.com_67810.png";
        }
        default:
            break;
    }
}
