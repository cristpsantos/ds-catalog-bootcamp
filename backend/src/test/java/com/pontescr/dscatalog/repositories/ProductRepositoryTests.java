package com.pontescr.dscatalog.repositories;

import java.util.Optional;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.dao.EmptyResultDataAccessException;

import com.pontescr.dscatalog.entities.Product;
import com.pontescr.dscatalog.tests.Factory;

@DataJpaTest
public class ProductRepositoryTests {
	
	@Autowired
	ProductRepository repository;
	
	long existsId;
	long noExistsId;
	long countIdExists;
	Product product;
	
	@BeforeEach
	void setUp() throws Exception {
		existsId = 1L;
		noExistsId = 1000L;
		countIdExists = 25L;
		product = Factory.createObject();
	}
	
	@Test
	public void findByIdShouldReturnObjectWhenIdIsExists() {
		
		Optional<Product> result = repository.findById(existsId);
		
		Assertions.assertTrue(result.isPresent());
	}
	
	@Test
	public void findByIdShouldNoReturnObjectWhenIdIsDoesNoExists() {
		
		Optional<Product> result = repository.findById(noExistsId);
		
		Assertions.assertTrue(result.isEmpty());
	}
	
	@Test
	public void saveShouldAutoIncrementIdWhenIsIdNull() {
		product.setId(null);
		
		repository.save(product);
		
		Assertions.assertNotNull(product.getId());
		Assertions.assertEquals(countIdExists + 1, product.getId());
	}
	
	@Test
	public void deleteShouldDeleteObjectWhenIdExists() {
		
		repository.deleteById(existsId);
		
		Optional<Product> result = repository.findById(existsId);
		Assertions.assertFalse(result.isPresent());		
	}
	
	@Test
	public void deleteShouldThrowEmptyResultDataAccessExceptionWhenIdDoesNotExists() {
		
		Assertions.assertThrows(EmptyResultDataAccessException.class, () -> {
			repository.deleteById(noExistsId);
		});		
	}
 }
