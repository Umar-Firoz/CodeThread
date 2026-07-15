package com.example.CodeThread.utils;

import org.springframework.stereotype.Component;

@Component
public class LanguageDetector {

    public boolean isSupportedFile(
            String fileName
    ) {
        return fileName.endsWith(".java")
                || fileName.endsWith(".js")
                || fileName.endsWith(".ts")
                || fileName.endsWith(".jsx")
                || fileName.endsWith(".tsx")
                || fileName.endsWith(".py")
                || fileName.endsWith(".cpp")
                || fileName.endsWith(".c")
                || fileName.endsWith(".go")
                || fileName.endsWith(".kt");
    }
    public String detectLanguage(
            String fileName
    ) {
        if (fileName.endsWith(".java")) {
            return "JAVA";
        }
        if (fileName.endsWith(".js")) {
            return "JAVASCRIPT";
        }
        if (fileName.endsWith(".ts")) {
            return "TYPESCRIPT";
        }
        if (fileName.endsWith(".py")) {
            return "PYTHON";
        }
        if (fileName.endsWith(".cpp")) {
            return "CPP";
        }
        if (fileName.endsWith(".go")) {
            return "GO";
        }
        return "TEXT";
    }
}
