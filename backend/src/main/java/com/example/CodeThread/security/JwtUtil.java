package com.example.CodeThread.security;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import lombok.extern.slf4j.Slf4j;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.security.Key;
import java.util.Date;

@Component
public class JwtUtil {

    @Value("${spring.app.jwtSecret}")
    private String secretKey;
    @Value("${spring.app.jwtExpirationMs}")
    private long expirationMs;


    // I can use here @slf4j also .
    private static final Logger log =
            LoggerFactory.getLogger(JwtUtil.class);

    public String generateToken(String email){
        Date now=new Date();
        log.info("Generating JWT token for user: {}", email);
        return Jwts.builder()
                .subject(email)
                .issuedAt(now)
                .expiration(new Date(now.getTime() + expirationMs))
                .signWith(key())
                .compact();
    }

    private Key key(){
        return Keys.hmacShaKeyFor(secretKey.getBytes());
    }

    private Claims extractAllClaims(String token) {
        return Jwts.parser()
                .verifyWith((javax.crypto.SecretKey) key())
                .build()
                .parseSignedClaims(token)
                .getPayload();
    }

    public String extractUsername(String token){
        return extractAllClaims(token).getSubject();
    }

    public Date extractExpiration(String token) {
        return extractAllClaims(token).getExpiration();
    }

    private boolean isTokenExpired(String token) {
        return extractExpiration(token).before(new Date());
    }

    public boolean validateToken(String token) {
        try {
            extractAllClaims(token);
            log.debug("JWT token validated successfully");
            return !isTokenExpired(token);
        }
        catch (Exception e){
            log.warn("JWT token validation failed");
            return false;
        }
    }

}

