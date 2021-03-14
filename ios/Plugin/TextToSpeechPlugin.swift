import Foundation
import Capacitor

/**
 * Please read the Capacitor iOS Plugin Development Guide
 * here: https://capacitorjs.com/docs/plugins/ios
 */
@objc(TextToSpeechPlugin)
public class TextToSpeechPlugin: CAPPlugin {
    private static let ERROR_UNSUPPORTED_LOCALE = "This locale is not supported."

    private let implementation = TextToSpeech()

    @objc public func speak(_ call: CAPPluginCall) {
        let text = call.getString("text") ?? ""
        let locale = call.getString("locale") ?? "en-US"
        let rate = call.getFloat("speechRate") ?? 1.0
        let pitch = call.getFloat("pitchRate") ?? 1.0
        let category = call.getString("category") ?? "ambient"
        let volume = call.getFloat("volume") ?? 1.0

        let isLanguageSupported = implementation.isLanguageSupported(locale)
        guard isLanguageSupported else {
            call.reject(TextToSpeechPlugin.ERROR_UNSUPPORTED_LOCALE)
            return
        }

        do {
            try implementation.speak(text, locale, rate, pitch, category, volume)
            call.resolve()
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
        call.resolve([
            "voices": []
        ])
    }
}
