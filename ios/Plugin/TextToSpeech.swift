import AVFoundation

@objc public class TextToSpeech: NSObject, AVSpeechSynthesizerDelegate {
    let synthesizer = AVSpeechSynthesizer()
    var utterance: AVSpeechUtterance?

    override init() {
        super.init()
        self.synthesizer.delegate = self
    }

    public func speechSynthesizer(_ synthesizer: AVSpeechSynthesizer, didFinish utterance: AVSpeechUtterance) {
        do {
            try AVAudioSession.sharedInstance().setActive(false)
            try AVAudioSession.sharedInstance().setCategory(AVAudioSession.Category.ambient)
            try AVAudioSession.sharedInstance().setActive(true)
        } catch {}
    }

    @objc public func speak(_ text: String, _ lang: String, _ rate: Float, _ pitch: Float, _ category: String, _ volume: Float) throws {
        var avAudioSessionCategory = AVAudioSession.Category.ambient
        if category != "ambient" {
            avAudioSessionCategory = AVAudioSession.Category.playback
        }

        try AVAudioSession.sharedInstance().setActive(false)
        try AVAudioSession.sharedInstance().setCategory(avAudioSessionCategory, mode: .default, options: AVAudioSession.CategoryOptions.duckOthers)
        try AVAudioSession.sharedInstance().setActive(true)

        self.synthesizer.stopSpeaking(at: .immediate)

        self.utterance = type(of: AVSpeechUtterance()).init(string: text)
        self.utterance?.voice = AVSpeechSynthesisVoice(language: lang)
        self.utterance?.rate = adjustRate(rate)
        self.utterance?.pitchMultiplier = pitch
        self.utterance?.volume = volume
        self.synthesizer.speak(self.utterance!)
    }

    @objc public func stop() {
        synthesizer.pauseSpeaking(at: .immediate)
        synthesizer.stopSpeaking(at: .immediate)
    }

    @objc public func getSupportedLanguages() -> [String] {
        return Array(AVSpeechSynthesisVoice.speechVoices().map {
            return $0.language
        })
    }

    @objc public func isLanguageSupported(_ language: String) -> Bool {
        let languages = self.getSupportedLanguages()
        return languages.contains(language)
    }

    // Adjust rate for a closer match to other platform.
    @objc private func adjustRate(_ rate: Float) -> Float {
        let baseRate = AVSpeechUtteranceDefaultSpeechRate
        if rate == 1 {
            return baseRate
        }
        if rate > baseRate {
            return baseRate + (rate * 0.025)
        }
        return rate / 2
    }
}
