import { data } from "../utils/db.js"

import en from "./languages/en.js"
import fr from "./languages/fr.js"

const obj = {
    "en": en,
    "fr": fr
}

const language = obj[data.lang]

export {
    language
}