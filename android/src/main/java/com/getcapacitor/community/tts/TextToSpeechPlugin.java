package com.getcapacitor.community.tts;

import android.util.Base64;
import android.util.Log;
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
    public static final String ERROR_UNSUPPORTED_LANGUAGE = "This language is not supported.";

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
        String lang = call.getString("lang", "en-US");
        float rate = call.getFloat("rate", 1.0f);
        float pitch = call.getFloat("pitch", 1.0f);
        float volume = call.getFloat("volume", 1.0f);
        int voice = call.getInt("voice", -1);
        int queueStrategy = call.getInt("queueStrategy", 0);

        boolean isLanguageSupported = implementation.isLanguageSupported(lang);
        if (!isLanguageSupported) {
            call.reject(ERROR_UNSUPPORTED_LANGUAGE);
            return;
        }

        SpeakResultCallback resultCallback = new SpeakResultCallback() {
            @Override
            public void onDone() {
                call.resolve();
            }

            @Override
            public void onError() {
                call.reject(ERROR_UTTERANCE);
            }

            @Override
            public void onRangeStart(int start, int end) {
                JSObject ret = new JSObject();
                ret.put("start", start);
                ret.put("end", end);
                String spokenWord = text.substring(start, end);
                ret.put("spokenWord", spokenWord);
                notifyListeners("onRangeStart", ret);
            }
        };

        try {
            implementation.speak(text, lang, rate, pitch, volume, voice, call.getCallbackId(), resultCallback, queueStrategy);
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
    public void isLanguageSupported(PluginCall call) {
        String lang = call.getString("lang", "");
        try {
            boolean isLanguageSupported = implementation.isLanguageSupported(lang);
            JSObject ret = new JSObject();
            ret.put("supported", isLanguageSupported);
            call.resolve(ret);
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

    @Override
    protected void handleOnDestroy() {
        implementation.onDestroy();
    }
}
