/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.purchase.purchase;

/**
 *
 * @author Kalees
 */

import javax.servlet.ReadListener;
import javax.servlet.ServletInputStream;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletRequestWrapper;
import java.io.BufferedReader;
import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.InputStreamReader;
import java.nio.charset.StandardCharsets;

public class BufferedRequestWrapper extends HttpServletRequestWrapper {
    private byte[] cachedBody;

    public BufferedRequestWrapper(HttpServletRequest request) throws IOException {
        super(request);
        cachedBody = readInputStream(request.getInputStream()); // Cache the body
    }

    private byte[] readInputStream(ServletInputStream inputStream) throws IOException {
        try (ByteArrayOutputStream byteArrayOutputStream = new ByteArrayOutputStream()) {
            byte[] buffer = new byte[1024];
            int bytesRead;
            while ((bytesRead = inputStream.read(buffer)) != -1) {
                byteArrayOutputStream.write(buffer, 0, bytesRead);
            }
            return byteArrayOutputStream.toByteArray();
        }
    }

    @Override
    public ServletInputStream getInputStream() {
        return new CachedBodyInputStream(cachedBody);
    }
    
    public synchronized byte[] getCachedBody() {
        return cachedBody != null ? cachedBody.clone() : null; // Return a copy
    }

    public synchronized void updateCachedBody(byte[] newBody) {
        if (newBody != null) {
            this.cachedBody = newBody.clone(); // Store a copy
        }
    }

    // Example method to clear the cache
    public synchronized void clearCache() {
        this.cachedBody = null;
    }

    @Override
    public BufferedReader getReader() {
        return new BufferedReader(new InputStreamReader(getInputStream(), StandardCharsets.UTF_8));
    }

    private static class CachedBodyInputStream extends ServletInputStream {
        private final ByteArrayInputStream inputStream;

        public CachedBodyInputStream(byte[] cachedBody) {
            this.inputStream = new ByteArrayInputStream(cachedBody);
        }

        @Override
        public boolean isFinished() {
            return inputStream.available() == 0;
        }

        @Override
        public boolean isReady() {
            return true;
        }

        @Override
        public void setReadListener(ReadListener readListener) {
            throw new UnsupportedOperationException();
        }

        @Override
        public int read() {
            return inputStream.read();
        }
    }
}


