package com.skillforge.service.impl;

import com.skillforge.dto.auth.AuthResponse;
import com.skillforge.dto.auth.LoginRequest;
import com.skillforge.dto.auth.RefreshTokenResponse;
import com.skillforge.dto.auth.RegisterRequest;
import com.skillforge.dto.auth.UserResponse;
import com.skillforge.entity.AccountStatus;
import com.skillforge.entity.RefreshToken;
import com.skillforge.entity.Role;
import com.skillforge.entity.User;
import com.skillforge.exception.DuplicateResourceException;
import com.skillforge.exception.ResourceNotFoundException;
import com.skillforge.repository.UserRepository;
import com.skillforge.security.JwtService;
import com.skillforge.service.AuthService;
import com.skillforge.service.RefreshTokenService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthServiceImpl implements AuthService {

        private static final String TOKEN_TYPE = "Bearer";

        private static final long ACCESS_TOKEN_EXPIRATION = 3600000L;

        private final UserRepository userRepository;
        private final PasswordEncoder passwordEncoder;
        private final JwtService jwtService;
        private final AuthenticationManager authenticationManager;
        private final RefreshTokenService refreshTokenService;

        @Override
        public AuthResponse register(RegisterRequest request) {

                if (userRepository.existsByEmail(request.getEmail())) {
                        throw new DuplicateResourceException(
                                        "Email already registered.");
                }

                User user = User.builder()
                                .firstName(request.getFirstName())
                                .lastName(request.getLastName())
                                .email(request.getEmail())
                                .passwordHash(
                                                passwordEncoder.encode(request.getPassword()))
                                .role(Role.USER)
                                .accountStatus(AccountStatus.ACTIVE)
                                .emailVerified(false)
                                .build();

                User savedUser = userRepository.save(user);

                String accessToken = jwtService.generateToken(savedUser);

                RefreshToken refreshToken = refreshTokenService.createRefreshToken(savedUser);

                return buildAuthResponse(
                                savedUser,
                                accessToken,
                                refreshToken.getToken());
        }

        @Override
        public AuthResponse login(LoginRequest request) {

                authenticationManager.authenticate(
                                new UsernamePasswordAuthenticationToken(
                                                request.getEmail(),
                                                request.getPassword()));

                User user = userRepository.findByEmail(request.getEmail())
                                .orElseThrow(() -> new ResourceNotFoundException(
                                                "User not found"));

                /*
                 * Remove old refresh tokens before creating
                 * a new session token.
                 */
                refreshTokenService.revokeAllTokens(user);

                String accessToken = jwtService.generateToken(user);

                RefreshToken refreshToken = refreshTokenService.createRefreshToken(user);

                return buildAuthResponse(
                                user,
                                accessToken,
                                refreshToken.getToken());
        }

        @Override
        public void logout(String refreshToken) {
                refreshTokenService.revokeToken(refreshToken);
        }

        @Override
        public RefreshTokenResponse refresh(String refreshToken) {

                RefreshToken storedToken = refreshTokenService.verifyRefreshToken(refreshToken);

                User user = storedToken.getUser();

                UserDetails userDetails = user;

                String newAccessToken = jwtService.generateToken(userDetails);

                return RefreshTokenResponse.builder()
                                .accessToken(newAccessToken)
                                .tokenType(TOKEN_TYPE)
                                .expiresIn(ACCESS_TOKEN_EXPIRATION)
                                .build();
        }

        private AuthResponse buildAuthResponse(
                        User user,
                        String accessToken,
                        String refreshToken) {

                UserResponse userResponse = UserResponse.builder()
                                .id(user.getId())
                                .firstName(user.getFirstName())
                                .lastName(user.getLastName())
                                .email(user.getEmail())
                                .role(user.getRole())
                                .emailVerified(user.getEmailVerified())
                                .profileImageUrl(user.getProfileImageUrl())
                                .build();

                return AuthResponse.builder()
                                .accessToken(accessToken)
                                .refreshToken(refreshToken)
                                .tokenType(TOKEN_TYPE)
                                .expiresIn(ACCESS_TOKEN_EXPIRATION)
                                .user(userResponse)
                                .build();
        }
}