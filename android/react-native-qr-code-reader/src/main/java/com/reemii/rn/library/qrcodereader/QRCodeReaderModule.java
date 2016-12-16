package com.reemii.rn.library.qrcodereader;

import android.app.Activity;
import android.content.Intent;

import com.facebook.react.bridge.ActivityEventListener;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

/**
 * Created by gongjiangpeng on 13/12/2016.
 */

public final class QRCodeReaderModule extends ReactContextBaseJavaModule implements ActivityEventListener {

    private final int REQUEST_QR_CODE = 819;
    private Promise mQRCodePromise;

    public QRCodeReaderModule(ReactApplicationContext reactContext) {
        super(reactContext);
        reactContext.addActivityEventListener(this);
    }

    @Override
    public String getName() {
        return "QRCodeReaderModule";
    }

    @ReactMethod
    public void startToReadQRCode(Promise promise) {
        mQRCodePromise = promise;

        if (getCurrentActivity() == null) {
            mQRCodePromise.reject("404", "无法启动相机界面", new Throwable());
        } else {
            getCurrentActivity().startActivityForResult(new Intent(getReactApplicationContext(), QRCodeReadActivity.class), REQUEST_QR_CODE);
        }
    }

//    @Override
//    public void onActivityResult(Activity activity, int requestCode, int resultCode, Intent data) {
//        if (requestCode == REQUEST_QR_CODE && resultCode == Activity.RESULT_OK && data != null && data.hasExtra("data")) {
//            mQRCodePromise.resolve(data.getStringExtra("data"));
//        } else if ( mQRCodePromise!= null){
//            mQRCodePromise.reject("404", "没有扫描结果", new Throwable());
//        }
//    }

    @Override
    public void onActivityResult(int requestCode, int resultCode, Intent data) {
        if (requestCode == REQUEST_QR_CODE && resultCode == Activity.RESULT_OK && data != null && data.hasExtra("data")) {
            mQRCodePromise.resolve(data.getStringExtra("data"));
        } else if ( mQRCodePromise!= null){
            mQRCodePromise.reject("404", "没有扫描结果", new Throwable());
        }
    }

    @Override
    public void onNewIntent(Intent intent) {

    }
}
