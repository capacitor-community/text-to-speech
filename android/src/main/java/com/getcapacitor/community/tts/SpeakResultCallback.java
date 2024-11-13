package com.getcapacitor.community.tts;

public interface SpeakResultCallback {
    void onDone();
    void onError();
    void onRangeStart(int start, int end);
}
