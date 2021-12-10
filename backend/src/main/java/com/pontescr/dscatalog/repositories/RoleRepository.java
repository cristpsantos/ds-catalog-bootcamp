package com.pontescr.dscatalog.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.pontescr.dscatalog.entities.Role;

public interface RoleRepository extends JpaRepository<Role, Long> {
}
