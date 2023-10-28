import { useState, useEffect, useMemo } from "react";
import mic from "../assets/mic.webp";
import "./SpeechToText.css";
const SpeechToText = () => {
    const [listening, setListening] = useState(false);
    const [recognizedText, setRecognizedText] = useState("");

    const [selectedLanguage, setSelectedLanguage] = useState("en-US"); // Default language is English

    const languageOptions = [
        { label: "Afrikaans", value: "af-ZA" },
        { label: "Albanian", value: "sq-AL" },
        { label: "Amharic", value: "am-ET" },
        { label: "Arabic", value: "ar-SA" },
        { label: "Armenian", value: "hy-AM" },
        { label: "Azerbaijani", value: "az-AZ" },
        { label: "Basque", value: "eu-ES" },
        { label: "Belarusian", value: "be-BY" },
        { label: "Bosnian", value: "bs-BA" },
        { label: "Bulgarian", value: "bg-BG" },
        { label: "Catalan", value: "ca-ES" },
        { label: "Chinese (Simplified)", value: "zh-CN" },
        { label: "Chinese (Traditional)", value: "zh-TW" },
        { label: "Croatian", value: "hr-HR" },
        { label: "Czech", value: "cs-CZ" },
        { label: "Danish", value: "da-DK" },
        { label: "Dutch", value: "nl-NL" },
        { label: "English", value: "en-US" },
        { label: "Estonian", value: "et-EE" },
        { label: "Finnish", value: "fi-FI" },
        { label: "French", value: "fr-FR" },
        { label: "Galician", value: "gl-ES" },
        { label: "Georgian", value: "ka-GE" },
        { label: "German", value: "de-DE" },
        { label: "Greek", value: "el-GR" },
        { label: "Gujarati", value: "gu-IN" },
        { label: "Hebrew", value: "he-IL" },
        { label: "Hindi", value: "hi-IN" },
        { label: "Hungarian", value: "hu-HU" },
        { label: "Icelandic", value: "is-IS" },
        { label: "Indonesian", value: "id-ID" },
        { label: "Irish", value: "ga-IE" },
        { label: "Italian", value: "it-IT" },
        { label: "Japanese", value: "ja-JP" },
        { label: "Kannada", value: "kn-IN" },
        { label: "Kazakh", value: "kk-KZ" },
        { label: "Khmer", value: "km-KH" },
        { label: "Korean", value: "ko-KR" },
        { label: "Lao", value: "lo-LA" },
        { label: "Latvian", value: "lv-LV" },
        { label: "Lithuanian", value: "lt-LT" },
        { label: "Macedonian", value: "mk-MK" },
        { label: "Malay", value: "ms-MY" },
        { label: "Malayalam", value: "ml-IN" },
        { label: "Maltese", value: "mt-MT" },
        { label: "Marathi", value: "mr-IN" },
        { label: "Mongolian", value: "mn-MN" },
        { label: "Nepali", value: "ne-NP" },
        { label: "Norwegian", value: "no-NO" },
        { label: "Persian", value: "fa-IR" },
        { label: "Polish", value: "pl-PL" },
        { label: "Portuguese", value: "pt-PT" },
        { label: "Punjabi", value: "pa-IN" },
        { label: "Romanian", value: "ro-RO" },
        { label: "Russian", value: "ru-RU" },
        { label: "Serbian", value: "sr-RS" },
        { label: "Sinhala", value: "si-LK" },
        { label: "Slovak", value: "sk-SK" },
        { label: "Slovenian", value: "sl-SI" },
        { label: "Spanish", value: "es-ES" },
        { label: "Swahili", value: "sw-KE" },
        { label: "Swedish", value: "sv-SE" },
        { label: "Tamil", value: "ta-IN" },
        { label: "Telugu", value: "te-IN" },
        { label: "Thai", value: "th-TH" },
        { label: "Turkish", value: "tr-TR" },
        { label: "Ukrainian", value: "uk-UA" },
        { label: "Urdu", value: "ur-PK" },
        { label: "Vietnamese", value: "vi-VN" },
        { label: "Welsh", value: "cy-GB" },
        { label: "Yiddish", value: "yi-DE" },
        { label: "Zulu", value: "zu-ZA" },
    ];

    // Continue to add more languages as needed

    const handleLanguageChange = (e) => {
        const selectedValue = e.target.value;
        setSelectedLanguage(selectedValue);
        recognition.lang = selectedValue; // Update the language in the recognition instance
    };

    const recognition = useMemo(() => {
        const recognitionInstance = new window.webkitSpeechRecognition();
        recognitionInstance.lang = selectedLanguage;
        recognitionInstance.continuous = true;
        recognitionInstance.onresult = (event) => {
            const transcript = event.results[0][0].transcript;
            setRecognizedText((prevText) => prevText + transcript);
        };
        return recognitionInstance;
    }, [selectedLanguage]);

    const startListening = () => {
        if (listening) return;
        setListening(true);
        recognition.start();
    };
    const stopListening = () => {
        setListening(false);
        recognition.stop();
    };

    const clearText = () => {
        setRecognizedText("");
    };

    useEffect(() => {
        recognition.onend = () => {
            if (listening) {
                recognition.start();
            }
        };
    }, [listening, recognition]);

    return (
        <div className="container">
            <div className="imgDiv">
                <img src={mic} alt="Microphone" className="micImg" />
            </div>
            <h1 className="h1">Speech Recognition App</h1>
            <div className="contentBody">
                <div className="content">
                    <div className="buttonsContainer">
                        <button onClick={startListening} className="button">
                            Start Listening
                        </button>
                        <button onClick={stopListening} className="button">
                            END
                        </button>
                        <button onClick={clearText} className="button">
                            CLEAR
                        </button>
                    </div>
                    <div className="language">
                        {listening ? <p>Listening...</p> : <p></p>}
                        {/*  SELECT   */}
                        <select
                            onChange={handleLanguageChange}
                            value={selectedLanguage}
                        >
                            {languageOptions.map((option) => (
                                <option key={option.value} value={option.value}>
                                    {option.label}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <textarea
                            className="textArea"
                            readOnly
                            value={recognizedText}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SpeechToText;
