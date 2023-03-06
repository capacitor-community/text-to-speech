import AVFoundation
import Capacitor

@objc public class TextToSpeech: NSObject, AVSpeechSynthesizerDelegate {
    let synthesizer = AVSpeechSynthesizer()
    var calls: [CAPPluginCall] = []

    override init() {
        super.init()
        self.synthesizer.delegate = self
    }

    public func speechSynthesizer(_ synthesizer: AVSpeechSynthesizer, didCancel utterance: AVSpeechUtterance) {
        self.resolveCurrentCall()
    }

    public func speechSynthesizer(_ synthesizer: AVSpeechSynthesizer, didFinish utterance: AVSpeechUtterance) {
        self.resolveCurrentCall()
    }

    @objc public func speakUtterance( _ category: String, _ utterance: AVSpeechUtterance, _ call: CAPPluginCall) throws {
        self.synthesizer.stopSpeaking(at: .immediate)

        var avAudioSessionCategory = AVAudioSession.Category.ambient
        if category != "ambient" {
            avAudioSessionCategory = AVAudioSession.Category.playback
        }

        try AVAudioSession.sharedInstance().setCategory(avAudioSessionCategory, mode: .default, options: AVAudioSession.CategoryOptions.duckOthers)
        try AVAudioSession.sharedInstance().setActive(true)

        self.calls.append(call)

        synthesizer.speak(utterance)
    }

    @objc public func stop() {
        synthesizer.stopSpeaking(at: .immediate)
    }

    @objc public func getSupportedLanguages() -> [String] {
        return Array(AVSpeechSynthesisVoice.speechVoices().map {
            return $0.language
        })
    }

    @objc public func isLanguageSupported(_ lang: String) -> Bool {
        let voice = AVSpeechSynthesisVoice(language: lang)
        return voice != nil
    }

    @objc private func resolveCurrentCall() {
        do {
            try AVAudioSession.sharedInstance().setActive(false)
        } catch {
            CAPLog.print(error.localizedDescription)
        }
        guard let call = calls.first else {
            return
        }
        call.resolve()
        calls.removeFirst()
    }
}
