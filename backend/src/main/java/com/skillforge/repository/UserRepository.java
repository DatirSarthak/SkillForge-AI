package com.skillforge.repository;

import com.skillforge.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

import java.util.Optional;
import java.util.UUID;

public interface UserRepository extends JpaRepository<User, UUID>, JpaSpecificationExecutor<User> {

    Optional<User> findByEmail(String email);

    boolean existsByEmail(String email);

    long countByAccountStatus(com.skillforge.entity.AccountStatus accountStatus);

    long countByEmailVerifiedTrue();

    long countByEmailVerifiedFalse();

}