package com.pontescr.dscatalog.repositories;

import java.util.Optional;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.dao.EmptyResultDataAccessException;

import com.pontescr.dscatalog.entities.Product;

@DataJpaTest
public class ProductRepositoryTests {
	
	@Autowired
	ProductRepository repository;
	
	@Test
	public void deleteShouldDeleteObjectWhenIdExists() {
		
		Long existsId = 1L;
		
		repository.deleteById(existsId);
		
		Optional<Product> result = repository.findById(existsId);
		
		Assertions.assertFalse(result.isPresent());		
	}
	
	@Test
	public void deleteShouldThrowEmptyResultDataAccessExceptionWhenIdDoesNotExists() {
		
		long noExistsId = 10L;
		
		Assertions.assertThrows(EmptyResultDataAccessException.class, () -> {
			repository.deleteById(noExistsId);
		});		
	}
 }
