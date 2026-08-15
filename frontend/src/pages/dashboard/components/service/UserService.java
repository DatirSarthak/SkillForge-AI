package com.skillforge.service;

import com.skillforge.dto.auth.UserResponse;
import com.skillforge.entity.User;

public interface UserService {

    UserResponse getCurrentUser();

    User getCurrentUserEntity();

}