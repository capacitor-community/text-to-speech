package com.getcapacitor.community.tts;

import static com.getcapacitor.community.tts.Constant.ERROR_TEXT_MISSING;
import static com.getcapacitor.community.tts.Constant.ERROR_TTS_NOT_INITIALIZED;
import static com.getcapacitor.community.tts.Constant.ERROR_UNSUPPORTED_LOCALE;
import static com.getcapacitor.community.tts.Constant.ERROR_UTTERANCE;

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
import com.getcapacitor.NativePlugin;
import com.getcapacitor.Plugin;
import com.getcapacitor.PluginCall;
import com.getcapacitor.PluginMethod;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Locale;
import java.util.Set;

@NativePlugin
public class TextToSpeech extends Plugin implements android.speech.tts.TextToSpeech.OnInitListener {

    public static final String TAG = "TextToSpeech";

    private boolean ttsInitialized = false;
    private android.speech.tts.TextToSpeech tts = null;
    private Context context = null;
    private ArrayList<Locale> supportedLocales = new ArrayList<>();

    @Override
    public void onInit(int status) {
        try {
            if (status != android.speech.tts.TextToSpeech.SUCCESS) {
                tts = null;
                ttsInitialized = false;
            } else {
                if (Build.VERSION.SDK_INT >= 21) {
                    Bundle ttsParams = new Bundle();
                    ttsParams.putSerializable(android.speech.tts.TextToSpeech.Engine.KEY_PARAM_UTTERANCE_ID, "");
                    tts.setLanguage(new Locale("en", "US"));
                    tts.speak("", android.speech.tts.TextToSpeech.QUEUE_FLUSH, ttsParams, "");
                } else {
                    HashMap<String, String> ttsParams = new HashMap<>();
                    ttsParams.put(android.speech.tts.TextToSpeech.Engine.KEY_PARAM_UTTERANCE_ID, "");
                    tts.setLanguage(new Locale("en", "US"));
                    tts.speak("", android.speech.tts.TextToSpeech.QUEUE_FLUSH, ttsParams);
                }
                Set<Locale> availableLanguages = tts.getAvailableLanguages();
                if (availableLanguages != null) {
                    this.supportedLocales.addAll(availableLanguages);
                }
                ttsInitialized = true;
            }
        } catch (Exception ex) {
            Log.d(TAG, "Caught exception while listening to OnInitListener.OnInit(): " + ex.getLocalizedMessage());

            ttsInitialized = false;
        }
    }

    @Override
    public void load() {
        super.load();

        try {
            context = getContext();
            tts = new android.speech.tts.TextToSpeech(context, this);
        } catch (Exception ex) {
            Log.d(TAG, "Caught exception on TextToSpeech load(): " + ex.getLocalizedMessage());
        }
    }

    @PluginMethod
    public void speak(final PluginCall call) {
        try {
            String text;
            String locale;
            String voice;
            double speechRate;
            double volume;
            double pitchRate;

            if (!call.hasOption("text") || !isStringValid(call.getString("text"))) {
                call.error(ERROR_TEXT_MISSING);
                return;
            } else {
                text = call.getString("text");
            }

            if (!call.hasOption("text") || !isStringValid(call.getString("locale"))) {
                locale = null;
            } else {
                locale = call.getString("locale");
                if (!supportedLocales.contains(Locale.forLanguageTag((locale)))) {
                    call.error(ERROR_UNSUPPORTED_LOCALE);
                    return;
                }
            }

            if (!call.hasOption("rate") || !isStringValid(call.getString("rate"))) {
                speechRate = 1.0;
            } else {
                speechRate = call.getFloat("rate");
            }

            if (!call.hasOption("pitch") || !isStringValid(call.getString("pitch"))) {
                pitchRate = 1.0;
            } else {
                pitchRate = call.getFloat("pitch");
            }

            if (!call.hasOption("volume") || !isStringValid(call.getString("volume"))) {
                volume = 1.0;
            } else {
                volume = call.getFloat("volume");
            }

            if (!call.hasOption("voice") || !isStringValid(call.getString("voice"))) {
                voice = null;
            } else {
                voice = call.getString("voice");
            }

            if (tts == null) {
                call.error(ERROR_TTS_NOT_INITIALIZED);
                return;
            }

            if (!ttsInitialized) {
                call.error(ERROR_TTS_NOT_INITIALIZED);
            }

            if (locale == null && voice == null) {
                locale = "en-US";
            }

            tts.stop();

            tts.setOnUtteranceProgressListener(
                new UtteranceProgressListener() {
                    @Override
                    public void onStart(String utteranceId) {}

                    @Override
                    public void onDone(String utteranceId) {
                        if (!utteranceId.equals("")) {
                            call.success();
                        }
                    }

                    @Override
                    public void onError(String utteranceId) {
                        if (!utteranceId.equals("")) {
                            call.error(ERROR_UTTERANCE);
                        }
                    }
                }
            );

            if (Build.VERSION.SDK_INT >= 21) {
                Bundle ttsParams = new Bundle();
                ttsParams.putSerializable(android.speech.tts.TextToSpeech.Engine.KEY_PARAM_UTTERANCE_ID, call.getCallbackId());
                ttsParams.putSerializable(android.speech.tts.TextToSpeech.Engine.KEY_PARAM_VOLUME, volume);

                if (locale != null) {
                    tts.setLanguage(new Locale(locale));
                }

                if (voice != null) {
                    for (Voice v : tts.getVoices()) {
                        if (voice.equals(v.getName())) {
                            tts.setVoice(v);
                        }
                    }
                }

                tts.setSpeechRate((float) speechRate);
                tts.setPitch((float) pitchRate);
                tts.speak(text, android.speech.tts.TextToSpeech.QUEUE_FLUSH, ttsParams, call.getCallbackId());
            } else {
                HashMap<String, String> ttsParams = new HashMap<>();
                ttsParams.put(android.speech.tts.TextToSpeech.Engine.KEY_PARAM_UTTERANCE_ID, call.getCallbackId());
                ttsParams.put(android.speech.tts.TextToSpeech.Engine.KEY_PARAM_VOLUME, Double.toString(volume));

                tts.setLanguage(new Locale(locale));
                tts.setPitch((float) pitchRate);
                tts.speak(text, android.speech.tts.TextToSpeech.QUEUE_FLUSH, ttsParams);
            }
        } catch (Exception ex) {
            Log.d(TAG, "Exception caught while handling speak(): " + ex.getLocalizedMessage());
            call.error(ex.getLocalizedMessage());
        }
    }

    @PluginMethod
    public void stop(PluginCall call) {
        try {
            tts.stop();
            call.success();
        } catch (Exception ex) {
            Log.d(TAG, "Exception caught while handling stop(): " + ex.getLocalizedMessage());
            call.error(ex.getLocalizedMessage());
        }
    }

    @PluginMethod
    public void getSupportedLanguages(PluginCall call) {
        try {
            ArrayList<String> languages = new ArrayList<>();
            for (Locale supportedLocale : this.supportedLocales) {
                String tag = supportedLocale.toLanguageTag();
                languages.add(tag);
            }
            JSObject ret = new JSObject();
            ret.put("languages", JSArray.from(languages.toArray()));
            call.success(ret);
        } catch (Exception ex) {
            Log.d(TAG, "Exception caught while handling checkLanguage(): " + ex.getLocalizedMessage());
            call.error(ex.getLocalizedMessage());
        }
    }

    @PluginMethod
    public void setPitchRate(final PluginCall call) {
        float pitchRate = call.getFloat("pitchRate", 1.0f);
        tts.setPitch(pitchRate);

        call.success();
    }

    @PluginMethod
    public void setSpeechRate(final PluginCall call) {
        float speechRate = call.getFloat("speechRate", 1.0f);

        if (Build.VERSION.SDK_INT >= 27) {
            tts.setSpeechRate((float) speechRate * 0.7f);
        } else {
            tts.setSpeechRate((float) speechRate);
        }

        call.success();
    }

    @PluginMethod
    public void openInstall(PluginCall call) {
        try {
            PackageManager packageManager = context.getPackageManager();
            Intent installIntent = new Intent();
            installIntent.setAction(android.speech.tts.TextToSpeech.Engine.ACTION_CHECK_TTS_DATA);

            ResolveInfo resolveInfo = packageManager.resolveActivity(installIntent, PackageManager.MATCH_DEFAULT_ONLY);

            if (resolveInfo == null) {} else {
                installIntent.setFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
                context.startActivity(installIntent);
            }

            call.success();
        } catch (Exception ex) {
            Log.d(TAG, "Caught exception while handling openInstall(): " + ex.getLocalizedMessage());

            call.error(ex.getLocalizedMessage());
        }
    }

    @PluginMethod
    public void getSupportedVoices(PluginCall call) {
        try {
            ArrayList<JSObject> voices = new ArrayList<>();
            Set<Voice> supportedVoices = tts.getVoices();
            for (Voice supportedVoice : supportedVoices) {
                JSObject obj = this.convertVoiceToJSObject(supportedVoice);
                voices.add(obj);
            }
            JSObject ret = new JSObject();
            ret.put("voices", JSArray.from(voices.toArray()));
            call.success(ret);
        } catch (Exception ex) {
            call.error(ex.getLocalizedMessage());
        }
    }

    private boolean isStringValid(String value) {
        return (value != null && !value.isEmpty() && !value.equals("null"));
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
