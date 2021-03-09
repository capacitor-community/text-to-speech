import AVFoundation
import Capacitor

@objc(TextToSpeech)
public class TextToSpeech: CAPPlugin, AVSpeechSynthesizerDelegate {
    
    var ttsSynthesizer: AVSpeechSynthesizer?
    var hasInitialized: Bool = false
    var supportedLangs: [String] = Array(AVSpeechSynthesisVoice.speechVoices().map{
        return $0.language
    })
    var ttsUtterance: AVSpeechUtterance?
    
    public func speechSynthesizer(_ synthesizer: AVSpeechSynthesizer, didFinish utterance: AVSpeechUtterance) {
        do {
            try AVAudioSession.sharedInstance().setActive(false)
            try AVAudioSession.sharedInstance().setCategory(AVAudioSession.Category.ambient)
            try AVAudioSession.sharedInstance().setActive(true)
        } catch {}
    }
    
    public override func load() {
        if (!self.hasInitialized) {
            self.ttsSynthesizer = AVSpeechSynthesizer()
            self.ttsSynthesizer?.delegate = self
            self.hasInitialized = true
        }
    }
    
    @objc func speak(_ call: CAPPluginCall) {
        let text = call.getString("text") ?? ""
        let locale = call.getString("locale") ?? "en-US"
        let speechRate = call.getDouble("speechRate") ?? 1.0
        let pitchRate = call.getDouble("pitchRate") ?? 1.0
        let category = call.getString("category") ?? "ambient"
        let volume = call.getDouble("volume") ?? 1.0
        
        var avAudioSessionCategory = AVAudioSession.Category.ambient
        if category != "ambient" {
            avAudioSessionCategory = AVAudioSession.Category.playback
        }
        
        do {
            try AVAudioSession.sharedInstance().setActive(false)
            try AVAudioSession.sharedInstance().setCategory(avAudioSessionCategory, mode:.default, options: AVAudioSession.CategoryOptions.duckOthers)
            try AVAudioSession.sharedInstance().setActive(true)
        } catch {
            call.reject(error.localizedDescription)
        }
        
        self.ttsSynthesizer?.stopSpeaking(at: .immediate)
        
        self.ttsUtterance = type(of: AVSpeechUtterance()).init(string: text)
        self.ttsUtterance?.voice = AVSpeechSynthesisVoice(language: locale)
        self.ttsUtterance?.rate = Float(speechRate)
        self.ttsUtterance?.pitchMultiplier = Float(pitchRate)
        self.ttsUtterance?.volume = Float(volume)
        self.ttsSynthesizer?.speak(self.ttsUtterance!)
        
        call.success()
    }
    
    @objc func stop(_ call: CAPPluginCall) {
        if self.ttsSynthesizer != nil {
            self.ttsSynthesizer?.pauseSpeaking(at: .immediate)
            self.ttsSynthesizer?.stopSpeaking(at: .immediate)
            
            call.success()
        }
    }
    
    @objc func openInstall(_ call: CAPPluginCall) {
        call.success()
    }
    
    @objc func setSpeechRate(_ call: CAPPluginCall) {
        if call.hasOption("speechRate") {
            let speechRate = call.getFloat("speechRate")
            
            if speechRate != nil {
                self.ttsUtterance?.rate = speechRate!
            }
        }
    }
    
    @objc func setPitchRate(_ call: CAPPluginCall) {
        if call.hasOption("pitchRate") {
            let pitchRate = call.getFloat("pitchRate")
            
            if pitchRate != nil {
                self.ttsUtterance?.pitchMultiplier = pitchRate!
            }
        }
    }
    
    @objc func getSupportedLanguages(_ call: CAPPluginCall) {
        call.success([
            "languages": supportedLangs
        ])
    }
    
    @objc func getSupportedVoices(_ call: CAPPluginCall) {
        call.success([
            "voices": []
        ])
    }
}
