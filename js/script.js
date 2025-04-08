function translate(e) {
    // Get input
    const input = e.target.value;
  
    // All keys
    const englishKeys = [..."1234567890-=!@#$%^&*()_+qwertyuiop[]\\QWERTYUIOP{}|asdfghjkl;'ASDFGHJKL:\"zxcvbnm,./ZXCVBNM<>?'"];
    const thaiKeys = [..."ๅ/-ภถุึคตจขช+๑๒๓๔ู฿๕๖๗๘๙ๆไำพะัีรนยบลฃ๐\"ฎฑธํ๊ณฯญฐ,ฅฟหกดเ้่าสวงฤฆฏโฌ็๋ษศซ.ผปแอิืทมใฝ()ฉฮฺ์?ฒฬฦ"];
  
    // Translate
    let translated = [];
    let index = -1;
    
    for (let letter of input) {
      index = englishKeys.findIndex(orgLetter => letter === orgLetter);
  
      // Thai to English
      if (index == -1) {
        index = thaiKeys.findIndex(orgLetter => letter === orgLetter);
        if (index > -1) {
          translated.push(englishKeys[index]);
  
        // No change
        } else {
          translated.push(letter);
        }
  
      // English to Thai
      } else if (index > -1) {
        translated.push(thaiKeys[index]);
      }
    }
  
    // Set value in output textarea
    document.querySelector("#translate-output").value = translated.join("");
  }
  
  function copy() {
    // Get text from output textarea
    const textToCopy = document.querySelector("#translate-output");  
  
    // Copy to clipboard
    navigator.clipboard.writeText(textToCopy.value);
  
    // Show success message for 2s
    document.querySelector("#copy-success").innerHTML = "คัดลอกเรียบร้อย!";
    setTimeout(() => {
      document.querySelector("#copy-success").innerHTML = "";
    }, 2000);
  }
  
  function speak() {
    const textToRead = document.querySelector("#translate-output").value; 
  
    const synth = window.speechSynthesis;
    if (!synth) throw new Error("SpeechSynthesis not supported!");
    const allVoices = synth.getVoices();
    const thVoices = allVoices ? (
        allVoices.filter(({lang}) => lang === "th-TH")
      ) : null;
    const voice = thVoices[0];
    
    // Retry until voice available
    // if(!voice) window.requestIdleCallback(readThai(str))
    
    const utterance = new SpeechSynthesisUtterance(textToRead);
    utterance.voice = voice;
    synth.speak(utterance);
  }
  
  // Event listeners
  document.addEventListener("DOMContentLoaded", () => {
    document.querySelector("#translate-input").addEventListener("input", translate);
    document.querySelector("#copy-btn").addEventListener("click", copy);
    document.querySelector("#speak-btn").addEventListener("click", speak);
  });