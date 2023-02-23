import cow_ecstatic from "../assets/cow_ecstatic.png";
import cow_happy from "../assets/cow_happy.png";
import cow_content from "../assets/cow_content.png";
import cow_meh from "../assets/cow_meh.png";
import cow_sad from "../assets/cow_sad.png";

export default function moodParser(value) {
    switch (value) {
        case "Sad": {
            return {cow_sad};
        }
        case "Meh": {
            return {cow_meh};
        }
        case "Content": {
            return {cow_content};
        }
        case "Happy": {
            return {cow_happy};
        }
        case "Ecstatic": {
            return {cow_ecstatic};
        }
        default:
            break;
    }
}
