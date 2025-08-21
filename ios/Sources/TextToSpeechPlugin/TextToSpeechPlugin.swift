import Foundation
import Capacitor
import AVFoundation

/**
 * Please read the Capacitor iOS Plugin Development Guide
 * here: https://capacitorjs.com/docs/plugins/ios
 */
@objc(TextToSpeechPlugin)
public class TextToSpeechPlugin: CAPPlugin, CAPBridgedPlugin {
    public let identifier = "TextToSpeechPlugin" 
    public let jsName = "TextToSpeech" 
    public let pluginMethods: [CAPPluginMethod] = [
        CAPPluginMethod(name: "speak", returnType: CAPPluginReturnPromise),
        CAPPluginMethod(name: "stop", returnType: CAPPluginReturnPromise),
        CAPPluginMethod(name: "openInstall", returnType: CAPPluginReturnPromise),
        CAPPluginMethod(name: "getSupportedLanguages", returnType: CAPPluginReturnPromise),
        CAPPluginMethod(name: "getSupportedVoices", returnType: CAPPluginReturnPromise),
        CAPPluginMethod(name: "isLanguageSupported", returnType: CAPPluginReturnPromise),
    ] 
    private static let errorUnsupportedLanguage = "This language is not supported."

    private let implementation = TextToSpeech()

    @objc public func speak(_ call: CAPPluginCall) {
        let text = call.getString("text") ?? ""
        let lang = call.getString("lang") ?? "en-US"
        let rate = call.getFloat("rate") ?? 1.0
        let pitch = call.getFloat("pitch") ?? 1.0
        let volume = call.getFloat("volume") ?? 1.0
        let voice = call.getInt("voice") ?? -1
        let category = call.getString("category") ?? "ambient"
        let queueStrategy = call.getInt("queueStrategy") ?? 0

        let isLanguageSupported = implementation.isLanguageSupported(lang)
        guard isLanguageSupported else {
            call.reject(TextToSpeechPlugin.errorUnsupportedLanguage)
            return
        }

        do {
            try implementation.speak(text, lang, rate, pitch, category, volume, voice, queueStrategy, call)
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
            ] as [String: Any]
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
}
