package com.getcapacitor.community.tts;

import com.getcapacitor.JSArray;
import com.getcapacitor.JSObject;
import com.getcapacitor.Plugin;
import com.getcapacitor.PluginCall;
import com.getcapacitor.PluginMethod;
import com.getcapacitor.annotation.CapacitorPlugin;

@CapacitorPlugin(name = "TextToSpeech")
public class TextToSpeechPlugin extends Plugin {
    public static final String LOG_TAG = "TextToSpeechPlugin";

    public static final String ERROR_UTTERANCE = "Failed to read text.";

    private TextToSpeech implementation;

    @Override
    public void load() {
        implementation = new TextToSpeech(getContext());
    }

    @PluginMethod
    public void speak(PluginCall call) {
        boolean isAvailable = implementation.isAvailable();
        if (!isAvailable) {
            call.unavailable("Not yet initialized or not available on this device.");
            return;
        }

        String text = call.getString("text", "");
        String locale = call.getString("locale", "en-US");
        float rate = call.getFloat("speechRate", 1.0f);
        float pitch = call.getFloat("pitchRate", 1.0f);
        double volume = call.getDouble("volume", 1.0);

        SpeakResultCallback resultCallback = new SpeakResultCallback() {
            @Override
            public void onDone() {
                call.resolve();
            }

            @Override
            public void onError() {
                call.reject(ERROR_UTTERANCE);
            }
        };

        try {
            implementation.speak(text, locale, rate, pitch, volume, call.getCallbackId() ,resultCallback);
        } catch (Exception ex) {
            call.reject(ex.getLocalizedMessage());
        }
    }

    @PluginMethod
    public void stop(PluginCall call) {
        boolean isAvailable = implementation.isAvailable();
        if (!isAvailable) {
            call.unavailable("Not yet initialized or not available on this device.");
            return;
        }
        try {
            implementation.stop();
            call.resolve();
        } catch (Exception ex) {
            call.reject(ex.getLocalizedMessage());
        }
    }

    @PluginMethod
    public void getSupportedLanguages(PluginCall call) {
        try {
            JSArray languages = implementation.getSupportedLanguages();
            JSObject ret = new JSObject();
            ret.put("languages", languages);
            call.resolve(ret);
        } catch (Exception ex) {
            call.reject(ex.getLocalizedMessage());
        }
    }

    @PluginMethod
    public void getSupportedVoices(PluginCall call) {
        try {
            JSArray voices = implementation.getSupportedVoices();
            JSObject ret = new JSObject();
            ret.put("voices", voices);
            call.resolve(ret);
        } catch (Exception ex) {
            call.reject(ex.getLocalizedMessage());
        }
    }

    @PluginMethod
    public void setPitchRate(final PluginCall call) {
        float pitch = call.getFloat("pitchRate", 1.0f);
        try {
            implementation.setPitch(pitch);
            call.resolve();
        } catch (Exception ex) {
            call.reject(ex.getLocalizedMessage());
        }
    }

    @PluginMethod
    public void setSpeechRate(final PluginCall call) {
        float rate = call.getFloat("speechRate", 1.0f);
        try {
            implementation.setPitch(rate);
            call.resolve();
        } catch (Exception ex) {
            call.reject(ex.getLocalizedMessage());
        }
    }

    @PluginMethod
    public void openInstall(PluginCall call) {
        try {
            implementation.openInstall();
            call.resolve();
        } catch (Exception ex) {
            call.reject(ex.getLocalizedMessage());
        }
    }
}
