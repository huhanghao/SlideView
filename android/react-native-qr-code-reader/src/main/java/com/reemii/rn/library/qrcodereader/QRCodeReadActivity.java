package com.reemii.rn.library.qrcodereader;

import android.app.Activity;
import android.content.Intent;
import android.os.Bundle;
import android.util.Log;
import android.view.ViewGroup;
import android.widget.FrameLayout;
import android.widget.LinearLayout;
import android.widget.TextView;
import android.widget.Toast;

import com.google.zxing.Result;

import java.util.List;

import me.dm7.barcodescanner.zxing.ZXingScannerView;
import pub.devrel.easypermissions.EasyPermissions;
import static android.Manifest.permission.CAMERA;

/**
 * Created by gongjiangpeng on 13/12/2016.
 */

public class QRCodeReadActivity extends Activity implements ZXingScannerView.ResultHandler, EasyPermissions.PermissionCallbacks {

    private static final String TAG = "QRCodeReadActivity";

    private ZXingScannerView mZXingScannerView;

    private boolean isGetQRCode = false;

    final int RC_CAMERA = 123;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        checkHasCameraPermission();

        initViews();
    }

    private void checkHasCameraPermission() {
        String[] perms = { CAMERA };
        if (!EasyPermissions.hasPermissions(this, perms)) {
            EasyPermissions.requestPermissions(this, "扫描二维码需要摄像头权限", RC_CAMERA, perms);
        }
    }

    private void initViews() {
        FrameLayout root = new FrameLayout(this);
        root.setLayoutParams(new ViewGroup.LayoutParams(ViewGroup.LayoutParams.MATCH_PARENT, ViewGroup.LayoutParams.MATCH_PARENT));
        setContentView(root);

        mZXingScannerView = new ZXingScannerView(this);
        root.addView(mZXingScannerView);
    }

    @Override
    public void onResume() {
        super.onResume();
        mZXingScannerView.setResultHandler(this); // Register ourselves as a handler for scan results.
        mZXingScannerView.startCamera();          // Start camera on resume
    }

    @Override
    public void onPause() {
        super.onPause();
        mZXingScannerView.stopCamera();           // Stop camera on pause
    }

    @Override
    protected void onDestroy() {
        super.onDestroy();
        mZXingScannerView.stopCamera();
        mZXingScannerView = null;
    }

    @Override
    public void handleResult(Result rawResult) {
        if (isGetQRCode) return;

        isGetQRCode = true;
        // Do something with the result here
        Log.v(TAG, rawResult.getText()); // Prints scan results
        Log.v(TAG, rawResult.getBarcodeFormat().toString()); // Prints the scan format (qrcode, pdf417 etc.)

        // If you would like to resume scanning, call this method below:
//        mZXingScannerView.resumeCameraPreview(this);

        Intent result = new Intent();
        result.putExtra("data", rawResult.getText());
        setResult(RESULT_OK, result);
        finish();

        // Note:
        // * Wait 2 seconds to resume the preview.
        // * On older devices continuously stopping and resuming camera preview can result in freezing the app.
        // * I don't know why this is the case but I don't have the time to figure out.
//        Handler handler = new Handler();
//        handler.postDelayed(new Runnable() {
//            @Override
//            public void run() {
//                mZXingScannerView.resumeCameraPreview(QRCodeScannerActivity.this);
//
//
//            }
//        }, 2000);
    }

    @Override
    public void onPermissionsGranted(int requestCode, List<String> perms) {

    }

    @Override
    public void onPermissionsDenied(int requestCode, List<String> perms) {
        if (requestCode == RC_CAMERA) {
            Toast.makeText(this, "您未开启摄像头权限，无法使用该功能", Toast.LENGTH_SHORT).show();
            finish();
        }
    }
}
