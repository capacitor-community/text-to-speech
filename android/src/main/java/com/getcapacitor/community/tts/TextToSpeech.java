package com.getcapacitor.community.tts;

import android.content.Context;
import android.content.Intent;
import android.content.pm.PackageManager;
import android.content.pm.ResolveInfo;
import android.os.Build;
import android.os.Bundle;
import android.speech.tts.UtteranceProgressListener;
import android.speech.tts.Voice;
import android.util.Log;
import com.getcapacitor.JSArray;
import com.getcapacitor.JSObject;
import java.util.ArrayList;
import java.util.Collections;
import java.util.HashMap;
import java.util.Locale;
import java.util.Map;
import java.util.Set;

public class TextToSpeech implements android.speech.tts.TextToSpeech.OnInitListener {

    public static final String LOG_TAG = "TextToSpeech";

    private Context context;
    private android.speech.tts.TextToSpeech tts = null;
    private int initializationStatus;
    private JSObject[] supportedVoices = null;
    private Map<String, SpeakResultCallback> requests = new HashMap();

    TextToSpeech(Context context) {
        this.context = context;
        try {
            tts = new android.speech.tts.TextToSpeech(context, this);
            tts.setOnUtteranceProgressListener(
                new UtteranceProgressListener() {
                    @Override
                    public void onStart(String utteranceId) {}

                    @Override
                    public void onDone(String utteranceId) {
                        SpeakResultCallback callback = requests.get(utteranceId);
                        if (callback != null) {
                            callback.onDone();
                            requests.remove(utteranceId);
                        }
                    }

                    @Override
                    public void onError(String utteranceId) {
                        SpeakResultCallback callback = requests.get(utteranceId);
                        if (callback != null) {
                            callback.onError();
                            requests.remove(utteranceId);
                        }
                    }

                    @Override
                    public void onRangeStart(String utteranceId, int start, int end, int frame) {
                        SpeakResultCallback callback = requests.get(utteranceId);
                        if (callback != null) {
                            callback.onRangeStart(start, end);
                        }
                    }
                }
            );
        } catch (Exception ex) {
            Log.d(LOG_TAG, ex.getLocalizedMessage());
        }
    }

    @Override
    public void onInit(int status) {
        this.initializationStatus = status;
    }

    public void speak(
        String text,
        String lang,
        float rate,
        float pitch,
        float volume,
        int voice,
        String callbackId,
        SpeakResultCallback resultCallback
    ) {
        speak(text, lang, rate, pitch, volume, voice, callbackId, resultCallback, android.speech.tts.TextToSpeech.QUEUE_FLUSH);
    }

    public void speak(
        String text,
        String lang,
        float rate,
        float pitch,
        float volume,
        int voice,
        String callbackId,
        SpeakResultCallback resultCallback,
        int queueStrategy
    ) {
        if (queueStrategy != android.speech.tts.TextToSpeech.QUEUE_ADD) {
            stop();
        }
        requests.put(callbackId, resultCallback);

        Locale locale = Locale.forLanguageTag(lang);

        Bundle ttsParams = new Bundle();
        ttsParams.putSerializable(android.speech.tts.TextToSpeech.Engine.KEY_PARAM_UTTERANCE_ID, callbackId);
        ttsParams.putSerializable(android.speech.tts.TextToSpeech.Engine.KEY_PARAM_VOLUME, volume);

        tts.setLanguage(locale);
        tts.setSpeechRate(rate);
        tts.setPitch(pitch);

        if (voice >= 0) {
            ArrayList<Voice> supportedVoices = getSupportedVoicesOrdered();
            if (voice < supportedVoices.size()) {
                Voice newVoice = supportedVoices.get(voice);
                int resultCode = tts.setVoice(newVoice);
            }
        }
        tts.speak(text, queueStrategy, ttsParams, callbackId);
    }

    public void stop() {
        tts.stop();
        requests.clear();
    }

    public JSArray getSupportedLanguages() {
        ArrayList<String> languages = new ArrayList<>();
        Set<Locale> supportedLocales = tts.getAvailableLanguages();
        for (Locale supportedLocale : supportedLocales) {
            String tag = supportedLocale.toLanguageTag();
            languages.add(tag);
        }
        JSArray result = JSArray.from(languages.toArray());
        return result;
    }

    /**
     * @return Ordered list of voices. The order is guaranteed to remain the same as long as the voices in tts.getVoices() do not change.
     */
    public ArrayList<Voice> getSupportedVoicesOrdered() {
        Set<Voice> supportedVoices = tts.getVoices();
        ArrayList<Voice> orderedVoices = new ArrayList<Voice>();
        for (Voice supportedVoice : supportedVoices) {
            orderedVoices.add(supportedVoice);
        }

        //voice.getName() is guaranteed to be unique, so will be used for sorting.
        Collections.sort(orderedVoices, (v1, v2) -> v1.getName().compareTo(v2.getName()));

        return orderedVoices;
    }

    public JSArray getSupportedVoices() {
        ArrayList<JSObject> voices = new ArrayList<>();
        ArrayList<Voice> supportedVoices = getSupportedVoicesOrdered();
        for (Voice supportedVoice : supportedVoices) {
            JSObject obj = this.convertVoiceToJSObject(supportedVoice);
            voices.add(obj);
        }
        JSArray result = JSArray.from(voices.toArray());
        return result;
    }

    public void openInstall() {
        PackageManager packageManager = context.getPackageManager();
        Intent installIntent = new Intent();
        installIntent.setAction(android.speech.tts.TextToSpeech.Engine.ACTION_CHECK_TTS_DATA);

        ResolveInfo resolveInfo = packageManager.resolveActivity(installIntent, PackageManager.MATCH_DEFAULT_ONLY);

        if (resolveInfo != null) {
            installIntent.setFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
            context.startActivity(installIntent);
        }
    }

    public boolean isAvailable() {
        if (tts != null && initializationStatus == android.speech.tts.TextToSpeech.SUCCESS) {
            return true;
        }
        return false;
    }

    public boolean isLanguageSupported(String lang) {
        Locale locale = Locale.forLanguageTag(lang);
        int result = tts.isLanguageAvailable(locale);
        return result == tts.LANG_AVAILABLE || result == tts.LANG_COUNTRY_AVAILABLE || result == tts.LANG_COUNTRY_VAR_AVAILABLE;
    }

    public void onDestroy() {
        if (tts == null) {
            return;
        }
        tts.stop();
        tts.shutdown();
    }

    private JSObject convertVoiceToJSObject(Voice voice) {
        Locale locale = voice.getLocale();
        JSObject obj = new JSObject();
        obj.put("voiceURI", voice.getName());
        obj.put("name", locale.getDisplayLanguage() + " " + locale.getDisplayCountry());
        obj.put("lang", locale.toLanguageTag());
        obj.put("localService", !voice.isNetworkConnectionRequired());
        obj.put("default", false);
        return obj;
    }
}
