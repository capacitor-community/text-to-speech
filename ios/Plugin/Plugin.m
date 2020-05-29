#import <Foundation/Foundation.h>
#import <Capacitor/Capacitor.h>

// Define the plugin using the CAP_PLUGIN Macro, and
// each method the plugin supports using the CAP_PLUGIN_METHOD macro.
CAP_PLUGIN(TextToSpeech, "TextToSpeech",
           CAP_PLUGIN_METHOD(speak, CAPPluginReturnPromise);
           CAP_PLUGIN_METHOD(stop, CAPPluginReturnPromise);
           CAP_PLUGIN_METHOD(setSpeechRate, CAPPluginReturnPromise);
           CAP_PLUGIN_METHOD(setPitchRate, CAPPluginReturnPromise);
           CAP_PLUGIN_METHOD(openInstall, CAPPluginReturnPromise);
           CAP_PLUGIN_METHOD(getSupportedLanguages, CAPPluginReturnPromise);
)
