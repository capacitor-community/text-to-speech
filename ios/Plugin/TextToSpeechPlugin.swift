import Foundation
import Capacitor
import AVFoundation

/**
 * Please read the Capacitor iOS Plugin Development Guide
 * here: https://capacitorjs.com/docs/plugins/ios
 */
@objc(TextToSpeechPlugin)
public class TextToSpeechPlugin: CAPPlugin {
    private static let errorUnsupportedLanguage = "This language is not supported."
    private static let voiceNotFound = "Unable to locate voice. "

    private let implementation = TextToSpeech()

    @objc public func speak(_ call: CAPPluginCall) {
        let text = call.getString("text") ?? ""
        let lang = call.getString("lang") ?? "en-US"
        let rate = call.getFloat("rate") ?? 1.0
        let pitch = call.getFloat("pitch") ?? 1.0
        let volume = call.getFloat("volume") ?? 1.0
        let voice : Int = Int(call.getFloat("voice") ?? -1.0)
        let category = call.getString("category") ?? "ambient"

        let isLanguageSupported = implementation.isLanguageSupported(lang)
        guard isLanguageSupported else {
            call.reject(TextToSpeechPlugin.errorUnsupportedLanguage)
            return
        }

        let utterance = AVSpeechUtterance(string: text)
        utterance.voice = AVSpeechSynthesisVoice(language: lang)
        utterance.rate = adjustRate(rate)
        utterance.pitchMultiplier = pitch
        utterance.volume = volume

        //Find the voice associated with the voice parameter if a voice specified. 
        //If the specified voice is not available we will fall back to default rather than raising an error. 
        let allVoices = AVSpeechSynthesisVoice.speechVoices()
        if (voice >= 0 && voice < allVoices.count) {
            utterance.voice = allVoices[voice]
        }

        do {
            try implementation.speakUtterance(category, utterance, call)

        } catch {
            call.reject(error.localizedDescription)
        }
    }

    @objc public func stop(_ call: CAPPluginCall) {
        implementation.stop()
        call.resolve()
    }

    @objc public func openInstall(_ call: CAPPluginCall) {
        call.resolve()
    }

    @objc func getSupportedLanguages(_ call: CAPPluginCall) {
        let languages = self.implementation.getSupportedLanguages()
        call.resolve([
            "languages": languages
        ])
    }

    @objc func getSupportedVoices(_ call: CAPPluginCall) {
        let allVoices = AVSpeechSynthesisVoice.speechVoices()
        var res: [[String: Any]] = []

        for voice in allVoices {
            let lang = [
                "default": false,
                "lang": voice.language,
                "localService": true,
                "name": voice.name,
                "voiceURI": voice.identifier
            ] as [String : Any]
            res.append(lang)
        }

        call.resolve([
            "voices": res
        ])
    }

    @objc func isLanguageSupported(_ call: CAPPluginCall) {
        let lang = call.getString("lang") ?? ""
        let isLanguageSupported = self.implementation.isLanguageSupported(lang)
        call.resolve([
            "supported": isLanguageSupported
        ])
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
