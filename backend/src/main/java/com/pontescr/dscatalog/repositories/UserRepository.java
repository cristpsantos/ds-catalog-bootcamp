package com.pontescr.dscatalog.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.pontescr.dscatalog.entities.User;

public interface UserRepository extends JpaRepository<User, Long>{
}