package com.example.CodeThread.service;

public interface PermissionService {
    void checkMember(Long reviewSessionId);
    void checkAdmin(Long reviewSessionId);
}
