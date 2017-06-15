package com.example.huhanghao.slideview;

import android.os.Bundle;
import android.support.v7.app.AppCompatActivity;
import android.view.LayoutInflater;
import android.view.View;

public class MainActivity extends AppCompatActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        LayoutInflater mInflater = LayoutInflater.from(this);;
        SlideView mSlideView = (SlideView) findViewById(R.id.sv_slide_item);
        View itemView = mInflater.inflate(R.layout.content_view, mSlideView, false);

        mSlideView.setContentView(itemView);
    }
}
