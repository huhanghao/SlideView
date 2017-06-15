package com.example.huhanghao.slideview;

import android.content.Context;
import android.util.AttributeSet;
import android.util.Log;
import android.view.MotionEvent;
import android.view.VelocityTracker;
import android.view.View;
import android.widget.LinearLayout;
import android.widget.RelativeLayout;
import android.widget.Scroller;
import android.widget.TextView;

/**
 * Created by huhanghao on 2017/6/13.
 */

public class SlideView extends LinearLayout {

    private Context mContext;

    // 用来放置所有view的容器
    private LinearLayout mViewContent;

    // 用来放置内置view的容器，比如删除 按钮
    private RelativeLayout mHolder;
    private View viewContent;
    private View holder;

    // 弹性滑动对象，提供弹性滑动效果
    private Scroller mScroller;

    // 滑动回调接口，用来向上层通知滑动事件
    private OnSlideListener mOnSlideListener;

    // 内置容器的宽度 单位：dp
    private int mHolderWidth = 120;

    // 分别记录上次滑动的坐标
    private int mLastX = 0;
    private int mLastY = 0;

    // 用来控制滑动角度，仅当角度a满足如下条件才进行滑动：tan a = deltaX / deltaY > 2
    private static final int TAN = 2;

    private VelocityTracker mVelocityTracker; // 测量速度
    private int scrollX;                      // 方向滑动后距离原始位置的x偏移


    public interface OnSlideListener {
        // SlideView的三种状态：开始滑动，打开，关闭
        public static final int SLIDE_STATUS_OFF = 0;
        public static final int SLIDE_STATUS_START_SCROLL = 1;
        public static final int SLIDE_STATUS_ON = 2;

        /**
         * @param view   current SlideView
         * @param status SLIDE_STATUS_ON, SLIDE_STATUS_OFF or
         *               SLIDE_STATUS_START_SCROLL
         */
        public void onSlide(View view, int status);
    }

    public SlideView(Context context) {
        super(context);
        initView();
    }

    public SlideView(Context context, AttributeSet attrs) {
        super(context, attrs);
        initView();
    }

    private void initView() {
        mContext = getContext();
        // 初始化弹性滑动对象
        mScroller = new Scroller(mContext);
        // 设置其方向为横向
        setOrientation(LinearLayout.HORIZONTAL);
        // 将slide_view_merge加载进来
        View.inflate(mContext, R.layout.lib_base_sliding_item, this);
        mViewContent = (LinearLayout) findViewById(R.id.view_content);

        viewContent = findViewById(R.id.view_content);
        holder = findViewById(R.id.holder);

    }

    @Override
    protected void onSizeChanged(int w, int h, int oldw, int oldh) {
        super.onSizeChanged(w, h, oldw, oldh);

        mHolderWidth = holder.getMeasuredWidth();

        Log.d("hhh", "mHolderWidth=" + mHolderWidth);
    }

    // 设置按钮的内容，也可以设置图标啥的，我没写
    public void setButtonText(CharSequence text) {
        ((TextView) findViewById(R.id.delete)).setText(text);
    }

    // 将view加入到ViewContent中
    public void setContentView(View view) {
        mViewContent.addView(view);
    }

    // 设置滑动回调
    public void setOnSlideListener(OnSlideListener onSlideListener) {
        mOnSlideListener = onSlideListener;
    }

    @Override
    public boolean onTouchEvent(MotionEvent event) {
        boolean intercepted = false;
        int x = (int) event.getX();
        int y = (int) event.getY();
        // 获取当前状态和最初始状态滑动的距离
        scrollX = getScrollX();
        Log.d("hhh", "x=" + x + "  y=" + y);
        Log.d("hhh", "mLastX=" + mLastX + "  mLastY=" + mLastY);

        if (mVelocityTracker == null) {
            mVelocityTracker = VelocityTracker.obtain();
        }
        mVelocityTracker.addMovement(event);


        switch (event.getAction()) {
            case MotionEvent.ACTION_DOWN: {

                if (!mScroller.isFinished()) {
                    mScroller.abortAnimation();
                }
                if (mOnSlideListener != null) {
                    mOnSlideListener.onSlide(this,
                            OnSlideListener.SLIDE_STATUS_START_SCROLL);
                }
                intercepted = true;
                break;
            }
            case MotionEvent.ACTION_MOVE: {
                mVelocityTracker.computeCurrentVelocity(100);
                float xVelocitX = mVelocityTracker.getXVelocity();
                Log.d("hhh", "xVelocity = " + xVelocitX);

                Log.d("hhh", "ACTION_MOVE");
                int deltaX = x - mLastX;
                int deltaY = y - mLastY;
                // 当前移动的横向距离小于纵向距离的两倍，则不拦截时间
                if (Math.abs(deltaX) < Math.abs(deltaY) * TAN) {
//                    intercepted = false;
                    break;
                }

                int newScrollX = scrollX - deltaX;

                Log.d("hhh", "deltaX = " + deltaX);
                Log.d("hhh", "scrollX = " + scrollX);
                Log.d("hhh", "newScrollX = " + newScrollX);
                if (deltaX != 0) {
                    if (newScrollX < 0) {
                        newScrollX = 0;
                    } else if (newScrollX > mHolderWidth) {
                        newScrollX = mHolderWidth;
                    }
                    this.scrollTo(newScrollX, 0);
                }
                intercepted = true;
                break;
            }
            case MotionEvent.ACTION_UP: {
                Log.d("hhh", "ACTION_UP");

                fastSlideTo();

                if (mVelocityTracker!=null) {
                    mVelocityTracker.recycle();
                    mVelocityTracker=null;
                }

                intercepted = false;
                break;
            }
            default: // 当手指滑动出控件之后
                fastSlideTo();

                if (mVelocityTracker!=null) {
                    mVelocityTracker.recycle();
                    mVelocityTracker=null;
                }

                intercepted = false;
                break;
        }

        mLastX = x;
        mLastY = y;

        return intercepted;
    }

    private void fastSlideTo() {
        mVelocityTracker.computeCurrentVelocity(100);
        float xVelocitX = mVelocityTracker.getXVelocity();
        Log.d("hhh", "xVelocity = " + xVelocitX);

        int newScrollX = 0;
        Log.d("hhh", "scrollX = " + scrollX + "  mHolderWidth * 0.75= " + (mHolderWidth * 0.75));
        if (scrollX > mHolderWidth * 0.75 || (xVelocitX < -100)) {
            newScrollX = mHolderWidth;
        } else if(scrollX <= mHolderWidth * 0.75 || (xVelocitX > 100)){
            newScrollX = 0;
        }
        this.smoothScrollTo(newScrollX, 0);

        if (mOnSlideListener != null) {
            mOnSlideListener.onSlide(this, newScrollX == 0 ? OnSlideListener.SLIDE_STATUS_OFF
                    : OnSlideListener.SLIDE_STATUS_ON);
        }
    }

    private void smoothScrollTo(int destX, int destY) {
        // 缓慢滚动到指定位置
        int scrollX = getScrollX();
        int delta = destX - scrollX;
        // 以三倍时长滑向destX，效果就是慢慢滑动
        mScroller.startScroll(scrollX, 0, delta, 0, Math.abs(delta) * 3);
        invalidate();
    }

    @Override
    public void computeScroll() {
        if (mScroller.computeScrollOffset()) {
            scrollTo(mScroller.getCurrX(), mScroller.getCurrY());
            postInvalidate();
        }
    }
}
