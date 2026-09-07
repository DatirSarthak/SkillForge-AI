package com.skillforge.service;

import com.skillforge.entity.RefreshToken;
import com.skillforge.entity.User;

public interface RefreshTokenService {

    RefreshToken createRefreshToken(User user);

    RefreshToken verifyRefreshToken(String token);

    void revokeToken(String token);

    void revokeAllTokens(User user);
}